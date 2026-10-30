window.__ModuleLoader__.load({
  id: '@local/memory-sprite-demo',
  factory(require) {
    const React = require('react')
    const h = React.createElement
    const NS = 'memory-sprite'
    const API = '/memory-sprite/api'

    const zh = {
      nav: '记忆精灵',
      kicker: 'DSH 配置记忆',
      title: '记忆精灵',
      subtitle: '把插件与环境配置保存成可回看的记忆，先让记忆链路跑起来。',
      demo: '演示模式',
      connected: '本地记忆库已连接',
      refresh: '刷新',
      statPlugins: '插件记忆',
      statEnv: '环境记忆',
      statSnapshots: '记忆快照',
      statPluginsSub: '个已安装插件包',
      statEnvSub: '条 PATH 记录',
      statSnapshotsSub: '条已保存记忆',
      saveTitle: '保存一条记忆',
      saveDesc: '演示版会记录当前插件清单、配置数量和 DSH 运行环境；不会写入或修改环境。',
      kindFull: '完整还原点',
      kindFullDesc: '插件 + 环境',
      kindPlugin: '仅插件记忆',
      kindPluginDesc: '不记录环境',
      kindEnv: '仅环境记忆',
      kindEnvDesc: '不记录插件',
      notePlaceholder: '给这条记忆写个备注，例如：这套组合很稳',
      save: '保存记忆',
      saving: '保存中…',
      saved: '已保存到本地记忆库',
      timeline: '时间线',
      plugins: '插件记忆',
      environment: '环境记忆',
      emptyTitle: '还没有记忆',
      emptyDesc: '保存第一条记忆，之后就能在这里看到时间线和变更。',
      restore: '还原',
      restoreSoon: '演示版暂未开放恢复',
      pluginCount: '插件',
      envPath: 'PATH',
      rowCount: '插件行',
      configCount: '配置项',
      pluginList: '当前插件清单',
      enabled: '启用',
      disabled: '停用',
      demoReadonly: '演示版只读取清单，不会安装、卸载或修改插件。',
      more: '还有更多插件未展示',
      envTitle: '当前环境',
      envShell: 'DSH Shell',
      envPathCount: 'PATH 条目',
      envManagedBin: '受管脚本目录',
      envVault: '记忆库',
      envScripts: '受管脚本',
      envNone: '暂无',
      envNote: 'DSH 的 shell 使用 -NoProfile / bash -c，环境记忆不会依赖 $PROFILE。后续会把脚本放进受管 bin，并在运行时注入 PATH。',
      vault: '记忆库位置',
      loading: '正在读取记忆库…',
      errorTitle: '读取失败',
      retry: '重试',
      errorHint: '请确认记忆精灵的 Host 插件已启动，并查看 DSH 日志。',
      profile: '配置档案',
    }

    const en = {
      nav: 'Memory Sprite',
      kicker: 'DSH CONFIG MEMORY',
      title: 'Memory Sprite',
      subtitle: 'Save plugin and environment configuration as memories you can revisit.',
      demo: 'Demo mode',
      connected: 'Local vault connected',
      refresh: 'Refresh',
      statPlugins: 'Plugin memory',
      statEnv: 'Environment memory',
      statSnapshots: 'Snapshots',
      statPluginsSub: 'installed bundles',
      statEnvSub: 'PATH entries',
      statSnapshotsSub: 'saved memories',
      saveTitle: 'Save a memory',
      saveDesc: 'The demo records the current plugin inventory, config count, and DSH runtime facts. It does not write or modify the environment.',
      kindFull: 'Full restore point',
      kindFullDesc: 'Plugins + environment',
      kindPlugin: 'Plugin memory only',
      kindPluginDesc: 'No environment',
      kindEnv: 'Environment memory only',
      kindEnvDesc: 'No plugins',
      notePlaceholder: 'Add a note, e.g. this combination is stable',
      save: 'Save memory',
      saving: 'Saving…',
      saved: 'Saved to the local vault',
      timeline: 'Timeline',
      plugins: 'Plugin memory',
      environment: 'Environment memory',
      emptyTitle: 'No memories yet',
      emptyDesc: 'Save your first memory to start a timeline.',
      restore: 'Restore',
      restoreSoon: 'Restore is not enabled in the demo',
      pluginCount: 'plugins',
      envPath: 'PATH',
      rowCount: 'plugin rows',
      configCount: 'config entries',
      pluginList: 'Current plugins',
      enabled: 'enabled',
      disabled: 'disabled',
      demoReadonly: 'The demo only reads the inventory. It does not install, remove, or modify plugins.',
      more: 'More plugins are not shown',
      envTitle: 'Current environment',
      envShell: 'DSH shell',
      envPathCount: 'PATH entries',
      envManagedBin: 'Managed script directory',
      envVault: 'Vault',
      envScripts: 'Managed scripts',
      envNone: 'None',
      envNote: 'DSH shells run with -NoProfile / bash -c, so environment memory must not rely on $PROFILE. The next step is a managed bin plus a runtime PATH overlay.',
      vault: 'Vault location',
      loading: 'Reading the vault…',
      errorTitle: 'Could not load',
      retry: 'Retry',
      errorHint: 'Make sure the Memory Sprite host plugin is running and check the DSH logs.',
      profile: 'Profile',
    }

    const css = `
      .ms-root {
        display: flex;
        flex-direction: column;
        gap: 16px;
        width: 100%;
        padding: 4px 0 32px;
        color: var(--dsw-alias-label-primary);
        font-size: 14px;
        line-height: 22px;
        box-sizing: border-box;
      }
      .ms-root *, .ms-root *::before, .ms-root *::after { box-sizing: border-box; }
      .ms-hero {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 24px;
        padding: 20px;
        border: 1px solid var(--dsw-alias-border-l1);
        border-radius: 14px;
        background: var(--dsw-alias-bg-layer-1);
      }
      .ms-kicker {
        color: var(--dsw-alias-brand-primary);
        font-size: 11px;
        font-weight: 600;
        letter-spacing: .09em;
        text-transform: uppercase;
      }
      .ms-title {
        margin: 4px 0 4px;
        font-size: 24px;
        line-height: 32px;
        font-weight: 600;
      }
      .ms-subtitle {
        margin: 0;
        max-width: 560px;
        color: var(--dsw-alias-label-secondary);
        font-size: 13px;
        line-height: 20px;
      }
      .ms-hero-side {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 10px;
        flex: none;
      }
      .ms-pill {
        display: inline-flex;
        align-items: center;
        gap: 7px;
        padding: 4px 9px;
        border: 1px solid var(--dsw-alias-border-l1);
        border-radius: 999px;
        color: var(--dsw-alias-label-secondary);
        font-size: 12px;
        white-space: nowrap;
      }
      .ms-dot {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: var(--dsw-alias-state-success-primary);
        box-shadow: 0 0 0 3px color-mix(in srgb, var(--dsw-alias-state-success-primary) 16%, transparent);
      }
      .ms-btn {
        appearance: none;
        border: 1px solid var(--dsw-alias-border-l2);
        border-radius: 8px;
        background: transparent;
        color: var(--dsw-alias-label-primary);
        padding: 6px 12px;
        font: inherit;
        font-size: 13px;
        line-height: 20px;
        cursor: pointer;
      }
      .ms-btn:hover:not(:disabled) { background: var(--dsw-alias-bg-layer-2); }
      .ms-btn:disabled { cursor: not-allowed; opacity: .45; }
      .ms-btn-primary {
        border-color: transparent;
        background: var(--dsw-alias-brand-primary);
        color: #fff;
        font-weight: 500;
      }
      .ms-btn-primary:hover:not(:disabled) { filter: brightness(1.06); }
      .ms-stats {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 10px;
      }
      .ms-stat {
        padding: 14px 16px;
        border: 1px solid var(--dsw-alias-border-l1);
        border-radius: 12px;
        background: var(--dsw-alias-bg-layer-1);
      }
      .ms-stat-label { color: var(--dsw-alias-label-secondary); font-size: 12px; }
      .ms-stat-value { margin-top: 4px; font-size: 22px; line-height: 28px; font-weight: 600; }
      .ms-stat-sub { margin-top: 2px; color: var(--dsw-alias-label-secondary); font-size: 11px; }
      .ms-tabs {
        display: flex;
        gap: 2px;
        border-bottom: 1px solid var(--dsw-alias-border-l1);
      }
      .ms-tab {
        appearance: none;
        border: none;
        border-bottom: 2px solid transparent;
        background: transparent;
        color: var(--dsw-alias-label-secondary);
        padding: 8px 12px;
        margin-bottom: -1px;
        font: inherit;
        font-size: 13px;
        cursor: pointer;
      }
      .ms-tab:hover { color: var(--dsw-alias-label-primary); }
      .ms-tab-active {
        color: var(--dsw-alias-label-primary);
        border-bottom-color: var(--dsw-alias-brand-primary);
        font-weight: 500;
      }
      .ms-card {
        border: 1px solid var(--dsw-alias-border-l1);
        border-radius: 12px;
        background: var(--dsw-alias-bg-layer-1);
      }
      .ms-save { padding: 16px; }
      .ms-card-head {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 16px;
      }
      .ms-card-title { font-size: 15px; line-height: 22px; font-weight: 600; }
      .ms-card-desc { margin-top: 3px; color: var(--dsw-alias-label-secondary); font-size: 12px; line-height: 18px; }
      .ms-saved {
        flex: none;
        color: var(--dsw-alias-state-success-primary);
        font-size: 12px;
        white-space: nowrap;
      }
      .ms-kinds {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 8px;
        margin-top: 14px;
      }
      .ms-kind {
        appearance: none;
        text-align: left;
        border: 1px solid var(--dsw-alias-border-l1);
        border-radius: 9px;
        background: var(--dsw-alias-bg-layer-2);
        color: var(--dsw-alias-label-primary);
        padding: 10px 12px;
        font: inherit;
        cursor: pointer;
      }
      .ms-kind:hover { border-color: var(--dsw-alias-border-l2); }
      .ms-kind-active {
        border-color: var(--dsw-alias-brand-primary);
        box-shadow: inset 0 0 0 1px var(--dsw-alias-brand-primary);
      }
      .ms-kind-title { font-size: 13px; font-weight: 500; }
      .ms-kind-desc { margin-top: 2px; color: var(--dsw-alias-label-secondary); font-size: 11px; }
      .ms-save-row {
        display: flex;
        gap: 8px;
        margin-top: 12px;
      }
      .ms-input {
        flex: 1;
        min-width: 0;
        border: 1px solid var(--dsw-alias-border-l1);
        border-radius: 8px;
        background: var(--dsw-alias-bg-base);
        color: var(--dsw-alias-label-primary);
        padding: 7px 10px;
        font: inherit;
        font-size: 13px;
        line-height: 20px;
        outline: none;
      }
      .ms-input:focus { border-color: var(--dsw-alias-brand-primary); }
      .ms-error {
        margin-top: 10px;
        color: var(--dsw-alias-state-error-primary);
        font-size: 12px;
        line-height: 18px;
      }
      .ms-section-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        margin: 2px 0 8px;
      }
      .ms-section-title { margin: 0; font-size: 14px; line-height: 22px; font-weight: 600; }
      .ms-count { color: var(--dsw-alias-label-secondary); font-size: 12px; }
      .ms-list { display: flex; flex-direction: column; gap: 8px; }
      .ms-snap {
        padding: 13px 14px;
        border: 1px solid var(--dsw-alias-border-l1);
        border-radius: 11px;
        background: var(--dsw-alias-bg-layer-1);
      }
      .ms-snap-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
      }
      .ms-snap-title { display: flex; align-items: center; gap: 8px; min-width: 0; }
      .ms-badge {
        display: inline-flex;
        align-items: center;
        border-radius: 999px;
        padding: 1px 8px;
        font-size: 11px;
        line-height: 18px;
        font-weight: 500;
        white-space: nowrap;
      }
      .ms-badge-full { color: var(--dsw-alias-brand-primary); background: color-mix(in srgb, var(--dsw-alias-brand-primary) 12%, transparent); }
      .ms-badge-plugin { color: var(--dsw-alias-state-success-primary); background: color-mix(in srgb, var(--dsw-alias-state-success-primary) 12%, transparent); }
      .ms-badge-environment { color: var(--dsw-alias-state-warn-primary); background: color-mix(in srgb, var(--dsw-alias-state-warn-primary) 14%, transparent); }
      .ms-time { color: var(--dsw-alias-label-secondary); font-size: 12px; white-space: nowrap; }
      .ms-note { margin-top: 7px; color: var(--dsw-alias-label-primary); font-size: 13px; line-height: 20px; }
      .ms-meta { margin-top: 5px; color: var(--dsw-alias-label-secondary); font-size: 11px; }
      .ms-empty {
        padding: 28px 20px;
        border: 1px dashed var(--dsw-alias-border-l2);
        border-radius: 12px;
        text-align: center;
        background: var(--dsw-alias-bg-layer-1);
      }
      .ms-empty-title { font-size: 14px; font-weight: 500; }
      .ms-empty-desc { margin-top: 4px; color: var(--dsw-alias-label-secondary); font-size: 12px; }
      .ms-info {
        border: 1px solid var(--dsw-alias-border-l1);
        border-radius: 12px;
        background: var(--dsw-alias-bg-layer-1);
        overflow: hidden;
      }
      .ms-info-row {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 20px;
        padding: 11px 14px;
        border-bottom: 1px solid var(--dsw-alias-border-l1);
      }
      .ms-info-row:last-child { border-bottom: none; }
      .ms-info-label { flex: none; color: var(--dsw-alias-label-secondary); font-size: 12px; }
      .ms-info-value {
        min-width: 0;
        text-align: right;
        font-size: 12px;
        overflow-wrap: anywhere;
      }
      .ms-mono { font-family: var(--ds-font-family-code, ui-monospace, SFMono-Regular, Consolas, monospace); }
      .ms-callout {
        margin-top: 12px;
        padding: 12px 14px;
        border: 1px solid var(--dsw-alias-border-l1);
        border-left: 3px solid var(--dsw-alias-brand-primary);
        border-radius: 8px;
        background: var(--dsw-alias-bg-layer-2);
        color: var(--dsw-alias-label-secondary);
        font-size: 12px;
        line-height: 18px;
      }
      .ms-plugin-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        padding: 10px 14px;
        border-bottom: 1px solid var(--dsw-alias-border-l1);
      }
      .ms-plugin-row:last-child { border-bottom: none; }
      .ms-plugin-name { min-width: 0; }
      .ms-plugin-title { font-size: 13px; line-height: 19px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .ms-plugin-id { color: var(--dsw-alias-label-secondary); font-size: 11px; overflow-wrap: anywhere; }
      .ms-plugin-side { display: flex; align-items: center; gap: 8px; flex: none; }
      .ms-version { color: var(--dsw-alias-label-secondary); font-size: 11px; }
      .ms-status { font-size: 11px; color: var(--dsw-alias-state-success-primary); }
      .ms-status-off { color: var(--dsw-alias-label-secondary); }
      .ms-foot {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        color: var(--dsw-alias-label-secondary);
        font-size: 11px;
        line-height: 18px;
      }
      .ms-loading {
        padding: 40px 0;
        color: var(--dsw-alias-label-secondary);
        text-align: center;
      }
      .ms-error-box {
        padding: 16px;
        border: 1px solid var(--dsw-alias-state-error-primary);
        border-radius: 10px;
        background: color-mix(in srgb, var(--dsw-alias-state-error-primary) 7%, transparent);
      }
      .ms-error-title { font-weight: 600; color: var(--dsw-alias-state-error-primary); }
      .ms-error-text { margin-top: 4px; color: var(--dsw-alias-label-secondary); font-size: 12px; overflow-wrap: anywhere; }
      @media (max-width: 640px) {
        .ms-hero { flex-direction: column; }
        .ms-hero-side { align-items: flex-start; }
        .ms-stats { grid-template-columns: 1fr; }
        .ms-kinds { grid-template-columns: 1fr; }
        .ms-save-row { flex-direction: column; }
        .ms-btn-primary { width: 100%; }
      }
    `

    function formatTime(iso) {
      if (!iso) return ''
      const date = new Date(iso)
      if (Number.isNaN(date.getTime())) return iso
      return date.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      })
    }

    function Stat({ label, value, sub }) {
      return h('div', { className: 'ms-stat' },
        h('div', { className: 'ms-stat-label' }, label),
        h('div', { className: 'ms-stat-value' }, value),
        h('div', { className: 'ms-stat-sub' }, sub),
      )
    }

    function MemoryPage({ t }) {
      const copy = (key) => (typeof t === 'function' ? t(key) : key)
      const [data, setData] = React.useState(null)
      const [loadError, setLoadError] = React.useState('')
      const [tab, setTab] = React.useState('timeline')
      const [kind, setKind] = React.useState('full')
      const [note, setNote] = React.useState('')
      const [busy, setBusy] = React.useState(false)
      const [saveError, setSaveError] = React.useState('')
      const [saved, setSaved] = React.useState(false)

      const load = React.useCallback(async () => {
        setLoadError('')
        try {
          const response = await fetch(`${API}/state`, { headers: { accept: 'application/json' } })
          if (!response.ok) throw new Error(`HTTP ${response.status}`)
          setData(await response.json())
        } catch (error) {
          setLoadError(error instanceof Error ? error.message : String(error))
        }
      }, [])

      React.useEffect(() => {
        void load()
      }, [load])

      React.useEffect(() => {
        if (!saved) return undefined
        const timer = setTimeout(() => setSaved(false), 3200)
        return () => clearTimeout(timer)
      }, [saved])

      async function save() {
        if (busy) return
        setBusy(true)
        setSaveError('')
        try {
          const response = await fetch(`${API}/snapshots`, {
            method: 'POST',
            headers: { 'content-type': 'application/json', accept: 'application/json' },
            body: JSON.stringify({ kind, note }),
          })
          const body = await response.json().catch(() => ({}))
          if (!response.ok) throw new Error(body.error || `HTTP ${response.status}`)
          setNote('')
          setSaved(true)
          setData((current) => current ? { ...current, snapshots: body.snapshots } : current)
          await load()
        } catch (error) {
          setSaveError(error instanceof Error ? error.message : String(error))
        } finally {
          setBusy(false)
        }
      }

      if (loadError) {
        return h('div', { className: 'ms-root' },
          h('style', null, css),
          h('div', { className: 'ms-error-box' },
            h('div', { className: 'ms-error-title' }, copy('errorTitle')),
            h('div', { className: 'ms-error-text' }, loadError),
            h('div', { className: 'ms-error-text' }, copy('errorHint')),
            h('div', { style: { marginTop: '10px' } },
              h('button', { type: 'button', className: 'ms-btn', onClick: () => void load() }, copy('retry')),
            ),
          ),
        )
      }

      if (!data) {
        return h('div', { className: 'ms-root' },
          h('style', null, css),
          h('div', { className: 'ms-loading' }, copy('loading')),
        )
      }

      const plugin = data.plugin || { bundleCount: 0, pluginRows: 0, configEntries: 0, bundles: [] }
      const environment = data.environment || { shell: '', pathEntries: 0, managedBin: '', scripts: [] }
      const snapshots = data.snapshots || []
      const bundles = plugin.bundles || []
      const visibleBundles = bundles.slice(0, 14)
      const more = bundles.length - visibleBundles.length

      const tabs = [
        ['timeline', copy('timeline')],
        ['plugins', copy('plugins')],
        ['environment', copy('environment')],
      ]

      const kindOptions = [
        ['full', copy('kindFull'), copy('kindFullDesc')],
        ['plugin', copy('kindPlugin'), copy('kindPluginDesc')],
        ['environment', copy('kindEnv'), copy('kindEnvDesc')],
      ]

      function snapshotSummary(snapshot) {
        const parts = []
        if (snapshot.plugin) parts.push(`${copy('pluginCount')} ${snapshot.plugin.bundleCount}`)
        if (snapshot.environment) parts.push(`${copy('envPath')} ${snapshot.environment.pathEntries}`)
        return parts.join(' · ')
      }

      function tabContent() {
        if (tab === 'plugins') {
          return h('div', null,
            h('div', { className: 'ms-section-head' },
              h('h3', { className: 'ms-section-title' }, copy('pluginList')),
              h('span', { className: 'ms-count' }, `${bundles.length}`),
            ),
            h('div', { className: 'ms-info' },
              visibleBundles.map((bundle) => h('div', { className: 'ms-plugin-row', key: bundle.name },
                h('div', { className: 'ms-plugin-name' },
                  h('div', { className: 'ms-plugin-title' }, bundle.title || bundle.name),
                  h('div', { className: 'ms-plugin-id' }, bundle.name),
                ),
                h('div', { className: 'ms-plugin-side' },
                  h('span', { className: 'ms-version' }, bundle.version),
                  h('span', { className: `ms-status${bundle.enabled ? '' : ' ms-status-off'}` }, bundle.enabled ? copy('enabled') : copy('disabled')),
                ),
              )),
              more > 0 ? h('div', { className: 'ms-info-row' },
                h('span', { className: 'ms-info-label' }, copy('more')),
                h('span', { className: 'ms-info-value' }, `+${more}`),
              ) : null,
              bundles.length === 0 ? h('div', { className: 'ms-loading' }, copy('envNone')) : null,
            ),
            h('div', { className: 'ms-callout' }, copy('demoReadonly')),
          )
        }
        if (tab === 'environment') {
          return h('div', null,
            h('div', { className: 'ms-section-head' },
              h('h3', { className: 'ms-section-title' }, copy('envTitle')),
            ),
            h('div', { className: 'ms-info' },
              h('div', { className: 'ms-info-row' },
                h('span', { className: 'ms-info-label' }, copy('envShell')),
                h('span', { className: 'ms-info-value ms-mono' }, environment.shell || '—'),
              ),
              h('div', { className: 'ms-info-row' },
                h('span', { className: 'ms-info-label' }, copy('envPathCount')),
                h('span', { className: 'ms-info-value' }, String(environment.pathEntries ?? 0)),
              ),
              h('div', { className: 'ms-info-row' },
                h('span', { className: 'ms-info-label' }, copy('envManagedBin')),
                h('span', { className: 'ms-info-value ms-mono' }, environment.managedBin || '—'),
              ),
              h('div', { className: 'ms-info-row' },
                h('span', { className: 'ms-info-label' }, copy('envScripts')),
                h('span', { className: 'ms-info-value ms-mono' }, (environment.scripts || []).length ? environment.scripts.join(', ') : copy('envNone')),
              ),
              h('div', { className: 'ms-info-row' },
                h('span', { className: 'ms-info-label' }, copy('envVault')),
                h('span', { className: 'ms-info-value ms-mono' }, data.vault?.dir || '—'),
              ),
            ),
            h('div', { className: 'ms-callout' }, copy('envNote')),
          )
        }
        return h('div', null,
          h('section', { className: 'ms-card ms-save' },
            h('div', { className: 'ms-card-head' },
              h('div', null,
                h('div', { className: 'ms-card-title' }, copy('saveTitle')),
                h('div', { className: 'ms-card-desc' }, copy('saveDesc')),
              ),
              saved ? h('div', { className: 'ms-saved' }, copy('saved')) : null,
            ),
            h('div', { className: 'ms-kinds' },
              kindOptions.map(([value, label, desc]) => h('button', {
                key: value,
                type: 'button',
                className: `ms-kind${kind === value ? ' ms-kind-active' : ''}`,
                'aria-pressed': kind === value,
                onClick: () => setKind(value),
              },
                h('div', { className: 'ms-kind-title' }, label),
                h('div', { className: 'ms-kind-desc' }, desc),
              )),
            ),
            h('div', { className: 'ms-save-row' },
              h('input', {
                className: 'ms-input',
                value: note,
                maxLength: 240,
                placeholder: copy('notePlaceholder'),
                onChange: (event) => setNote(event.target.value),
                onKeyDown: (event) => {
                  if (event.key === 'Enter' && !event.nativeEvent?.isComposing) void save()
                },
              }),
              h('button', {
                type: 'button',
                className: 'ms-btn ms-btn-primary',
                disabled: busy,
                onClick: () => void save(),
              }, busy ? copy('saving') : copy('save')),
            ),
            saveError ? h('div', { className: 'ms-error', role: 'alert' }, saveError) : null,
          ),
          h('section', { style: { marginTop: '16px' } },
            h('div', { className: 'ms-section-head' },
              h('h3', { className: 'ms-section-title' }, copy('timeline')),
              h('span', { className: 'ms-count' }, `${snapshots.length}`),
            ),
            snapshots.length === 0
              ? h('div', { className: 'ms-empty' },
                h('div', { className: 'ms-empty-title' }, copy('emptyTitle')),
                h('div', { className: 'ms-empty-desc' }, copy('emptyDesc')),
              )
              : h('div', { className: 'ms-list' },
                snapshots.map((snapshot) => h('article', { className: 'ms-snap', key: snapshot.id },
                  h('div', { className: 'ms-snap-top' },
                    h('div', { className: 'ms-snap-title' },
                      h('span', { className: `ms-badge ms-badge-${snapshot.kind}` }, copy(`kind${{ full: 'Full', plugin: 'Plugin', environment: 'Env' }[snapshot.kind] || 'Full'}`)),
                      h('span', { className: 'ms-time' }, formatTime(snapshot.createdAt)),
                    ),
                    h('button', {
                      type: 'button',
                      className: 'ms-btn',
                      disabled: true,
                      title: copy('restoreSoon'),
                    }, copy('restore')),
                  ),
                  snapshot.note ? h('div', { className: 'ms-note' }, `“${snapshot.note}”`) : null,
                  h('div', { className: 'ms-meta' }, snapshotSummary(snapshot)),
                )),
              ),
          ),
        )
      }

      return h('div', { className: 'ms-root' },
        h('style', null, css),
        h('div', { className: 'ms-hero' },
          h('div', null,
            h('div', { className: 'ms-kicker' }, copy('kicker')),
            h('h2', { className: 'ms-title' }, copy('title')),
            h('p', { className: 'ms-subtitle' }, copy('subtitle')),
          ),
          h('div', { className: 'ms-hero-side' },
            h('span', { className: 'ms-pill' }, h('span', { className: 'ms-dot' }), copy('demo')),
            h('button', { type: 'button', className: 'ms-btn', onClick: () => void load() }, copy('refresh')),
          ),
        ),
        h('div', { className: 'ms-stats' },
          h(Stat, { label: copy('statPlugins'), value: String(plugin.bundleCount ?? 0), sub: `${plugin.pluginRows ?? 0} ${copy('rowCount')} · ${plugin.configEntries ?? 0} ${copy('configCount')}` }),
          h(Stat, { label: copy('statEnv'), value: String(environment.pathEntries ?? 0), sub: environment.shell || '—' }),
          h(Stat, { label: copy('statSnapshots'), value: String(snapshots.length), sub: copy('connected') }),
        ),
        h('div', { className: 'ms-tabs' },
          tabs.map(([value, label]) => h('button', {
            key: value,
            type: 'button',
            className: `ms-tab${tab === value ? ' ms-tab-active' : ''}`,
            onClick: () => setTab(value),
          }, label)),
        ),
        tabContent(),
        h('div', { className: 'ms-foot' },
          h('span', null, `${copy('vault')}:`),
          h('span', { className: 'ms-mono' }, data.vault?.file || '—'),
          data.app?.profileName ? h('span', null, `· ${copy('profile')}: ${data.app.profileName}`) : null,
        ),
      )
    }

    return {
      inject: ['slots', 'locale'],
      apply(ctx) {
        ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'memory-sprite locale')
        const t = ctx.locale.bind(NS)
        ctx.slots.inject('settings.section', () => ctx.slots.register({
          name: 'settings.section',
          id: 'memory-sprite',
          order: 17,
          label: () => t('nav'),
          locale: NS,
        }, MemoryPage))
      },
    }
  },
})
