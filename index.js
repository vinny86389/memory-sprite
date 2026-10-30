import { readdir, mkdir, readFile, rename, writeFile } from 'node:fs/promises'
import { randomBytes } from 'node:crypto'
import { arch, homedir, platform } from 'node:os'
import { delimiter, dirname, join } from 'node:path'

const API_ROOT = '/memory-sprite/api'
const DSH_HOME = process.env.DSH_HOME || join(homedir(), '.dsh')
const VAULT_DIR = join(DSH_HOME, 'memory-sprite')
const VAULT_FILE = join(VAULT_DIR, 'snapshots.json')
const MANAGED_BIN = join(VAULT_DIR, 'bin')
const MAX_SNAPSHOTS = 60

export const inject = ['webServer', 'connection', 'pluginManager', 'configEditor']

function localized(value, fallback) {
  if (typeof value === 'string' && value.length > 0) return value
  if (value && typeof value === 'object') {
    const locale = process.env.DSH_LOCALE || 'zh'
    const text = value[locale] || value.en || value.zh
    if (typeof text === 'string' && text.length > 0) return text
  }
  return fallback
}

async function listManagedScripts() {
  try {
    const entries = await readdir(MANAGED_BIN, { withFileTypes: true })
    return entries
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name)
      .sort((left, right) => left.localeCompare(right))
      .slice(0, 40)
  } catch (error) {
    if (error && error.code === 'ENOENT') return []
    throw error
  }
}

async function readSnapshots() {
  try {
    const text = await readFile(VAULT_FILE, 'utf8')
    const parsed = JSON.parse(text)
    return Array.isArray(parsed) ? parsed : []
  } catch (error) {
    if (error && error.code === 'ENOENT') return []
    return []
  }
}

async function writeSnapshots(snapshots) {
  await mkdir(dirname(VAULT_FILE), { recursive: true })
  const temp = `${VAULT_FILE}.${process.pid}.${Date.now()}.tmp`
  await writeFile(temp, `${JSON.stringify(snapshots, null, 2)}\n`, 'utf8')
  await rename(temp, VAULT_FILE)
}

async function collectInventory(ctx) {
  const [bundles, plugins] = await Promise.all([
    ctx.pluginManager.listBundles(),
    ctx.pluginManager.listPlugins(),
  ])
  const configurations = ctx.configEditor.configuration()
  const installed = bundles
    .filter((bundle) => bundle.installed && bundle.availability !== 'missing')
    .map((bundle) => ({
      name: bundle.name,
      title: localized(bundle.meta?.title, bundle.name),
      version: bundle.version || '',
      enabled: Boolean(bundle.enabled),
      official: Boolean(bundle.official),
      source: bundle.source || '',
      rows: Array.isArray(bundle.rows) ? bundle.rows.length : 0,
    }))
    .sort((left, right) => left.name.localeCompare(right.name))

  const pathEntries = (process.env.PATH || '')
    .split(delimiter)
    .map((entry) => entry.trim())
    .filter(Boolean)

  const environment = {
    platform: platform(),
    arch: arch(),
    shell: platform() === 'win32' ? 'PowerShell (-NoProfile)' : 'bash -c',
    pathEntries: pathEntries.length,
    managedBin: MANAGED_BIN,
    scripts: await listManagedScripts(),
  }

  return {
    app: {
      dshHome: DSH_HOME,
      profileName: process.env.DSH_PROFILE || '',
      profileDir: process.env.DSH_PROFILE_DIR || '',
    },
    vault: {
      dir: VAULT_DIR,
      file: VAULT_FILE,
    },
    plugin: {
      bundleCount: installed.length,
      pluginRows: plugins.length,
      configEntries: configurations.length,
      bundles: installed,
    },
    environment,
  }
}

function sendJson(res, status, payload) {
  if (res.writableEnded) return
  const body = JSON.stringify(payload)
  res.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
    'content-length': Buffer.byteLength(body),
  })
  res.end(body)
}

async function readJson(req) {
  const chunks = []
  let size = 0
  for await (const chunk of req) {
    size += chunk.length
    if (size > 256 * 1024) throw new Error('request body is too large')
    chunks.push(chunk)
  }
  if (size === 0) return {}
  return JSON.parse(Buffer.concat(chunks).toString('utf8'))
}

function authorize(ctx, req, res) {
  const rejection = ctx.connection.requestRejection({ headers: req.headers })
  if (rejection) {
    sendJson(res, rejection, { error: 'unauthorized' })
    return false
  }
  return true
}

async function handleState(ctx, req, res) {
  if (!authorize(ctx, req, res)) return
  const inventory = await collectInventory(ctx)
  const snapshots = await readSnapshots()
  sendJson(res, 200, {
    ok: true,
    generatedAt: new Date().toISOString(),
    ...inventory,
    snapshots,
  })
}

async function handleCreateSnapshot(ctx, req, res) {
  if (!authorize(ctx, req, res)) return
  const body = await readJson(req)
  const kind = ['full', 'plugin', 'environment'].includes(body.kind) ? body.kind : 'full'
  const note = typeof body.note === 'string' ? body.note.trim().slice(0, 240) : ''
  const inventory = await collectInventory(ctx)
  const snapshot = {
    id: `mem-${Date.now().toString(36)}-${randomBytes(3).toString('hex')}`,
    createdAt: new Date().toISOString(),
    kind,
    note,
    plugin: kind === 'environment' ? null : inventory.plugin,
    environment: kind === 'plugin' ? null : inventory.environment,
  }
  const existing = await readSnapshots()
  const next = [snapshot, ...existing].slice(0, MAX_SNAPSHOTS)
  await writeSnapshots(next)
  sendJson(res, 201, { ok: true, snapshot, snapshots: next })
}

function route(handler) {
  return (req, res) => {
    Promise.resolve(handler(req, res)).catch((error) => {
      sendJson(res, 500, {
        error: error instanceof Error ? error.message : String(error),
      })
    })
  }
}

export function apply(ctx) {
  ctx.effect(() => {
    const disposers = [
      ctx.webServer.register({
        kind: 'exact',
        path: `${API_ROOT}/state`,
        handler: route((req, res) => handleState(ctx, req, res)),
      }),
      ctx.webServer.register({
        kind: 'exact',
        path: `${API_ROOT}/snapshots`,
        handler: route((req, res) => handleCreateSnapshot(ctx, req, res)),
      }),
    ]
    return () => {
      for (const dispose of disposers) dispose()
    }
  }, 'memory-sprite demo routes')
}
