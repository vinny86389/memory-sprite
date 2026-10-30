# 记忆精灵 需求文档

- 文档版本：`0.1.0`
- 状态：基线冻结
- 更新日期：2026-10-30
- 对应代码版本：`v0.1.0`

## 1. 产品定位

记忆精灵是 **DSH 配置的版本控制与时光机**，不是整机备份工具，也不是 AI 对话记忆。

核心价值：

- 敢装：安装新插件前有安全记忆
- 敢改：环境配置变更可追踪
- 敢卸：卸载插件后仍可恢复
- 可回退：冲突或不好用时回到之前的稳定状态

## 2. 核心概念

### 2.1 插件记忆

DSH 应用层状态：

- 已安装 bundle / 插件包及版本
- 启用、禁用状态和加载顺序
- `cordis.patch.yml` 覆盖
- 插件 Config
- Agent preset、MCP 配置
- 插件注册的命令（随插件恢复）

### 2.2 环境记忆

DSH 运行时和用户环境：

- 可执行脚本，包括 SUDO 脚本
- 受管 bin 目录
- 非敏感环境变量
- PATH 条目
- 可选的外部终端 profile 代管区块

不包含：sudo 密码、SSH 私钥、API Key、系统级 sudoers、注册表驱动、系统服务。

### 2.3 记忆粒度

| 类型 | 用途 | 是否用于整层回滚 |
|---|---|---|
| 单项记忆 | 记住一个插件或一个命令 | 否 |
| 插件状态记忆 | 插件层快照 | 仅插件层 |
| 环境状态记忆 | 环境层快照 | 仅环境层 |
| 完整还原点 | 同一时刻绑定插件层和环境层 | 是 |

### 2.4 记忆库

记忆库独立于插件包和 DSH profile，卸载插件后仍保留。Demo 当前写入：

```text
$DSH_HOME/memory-sprite/snapshots.json
```

正式版优先使用 DSH 持久化存储域，仍需保证卸载后数据不丢失，并支持导出。

## 3. 范围

### 3.1 当前范围

- 当前 DSH profile
- 当前用户级环境
- Windows / macOS / Linux 的 DSH 运行时环境
- 手动保存、快照列表、时间戳、备注
- 后续接入恢复能力

### 3.2 明确不做

- 整机备份、系统还原、注册表/驱动/系统服务备份
- 云同步、团队共享
- 明文密钥保险库
- AI 对话记忆、知识库
- 自动执行恢复的脚本，尤其不自动 sudo
- 跨 DSH 大版本静默恢复

## 4. 需求清单

| ID | 优先级 | 需求 | 验收标准 | 目标版本 | 状态 |
|---|---|---|---|---|---|
| REQ-UI-001 | P0 | 在 DSH 设置中注册“记忆精灵”页面 | 设置左侧出现入口，页面可打开 | v0.1.0 | 已实现 |
| REQ-PLUGIN-001 | P0 | 读取当前插件清单 | 能看到 bundle 名称、版本、启停、插件行数量 | v0.1.0 | 已实现 |
| REQ-MEM-001 | P0 | 手动保存记忆 | 支持完整/插件/环境三种范围，自动时间戳和备注 | v0.1.0 | 已实现 |
| REQ-VAULT-001 | P0 | 记忆库独立于插件生命周期 | 卸载重装后可读取旧记忆 | v0.1.0 | 部分实现，待验证 |
| REQ-SEC-001 | P0 | 默认不保存明文密钥 | 快照与日志不出现 Token/密码 | v0.1.0 | 已实现基础约束 |
| REQ-MEM-002 | P0 | 变更检测 | 展示“自上次记忆以来”的插件/环境变化 | v0.2.0 | 待实现 |
| REQ-MEM-003 | P0 | 完整还原点 | 同一时刻捕获两层，缺一层则标记不完整 | v0.2.0 | 部分实现 |
| REQ-PLUGIN-002 | P0 | 插件层恢复 | 可安装缺失插件、恢复启停与配置 | v0.3.0 | 待实现 |
| REQ-RESTORE-001 | P0 | 恢复前差异预览 | 展示新增、移除、版本和配置变化 | v0.3.0 | 待实现 |
| REQ-RESTORE-002 | P0 | 恢复前安全记忆 | 每次恢复前自动创建，可一键退回 | v0.3.0 | 待实现 |
| REQ-RESTORE-003 | P0 | 冲突处理 | 缺包、版本不匹配、文件冲突均明确报告 | v0.3.0 | 待实现 |
| REQ-ENV-001 | P0 | 环境资产登记与快照 | 能登记脚本、PATH、非敏感环境变量 | v0.4.0 | 部分实现，仅只读事实 |
| REQ-ENV-002 | P0 | 环境运行时恢复 | 受管 bin + 运行时 PATH 生效，不依赖 `$PROFILE` | v0.4.0 | 待实现 |
| REQ-AUTO-001 | P1 | 记忆模式与自动安全记忆 | 手动/智能/自动模式；安装和恢复前可自动保护 | v0.4.0 | 待实现 |
| REQ-ITEM-001 | P1 | 单项记忆 | 可单独记住一个插件或命令 | v0.4.0 | 待实现 |
| REQ-EXPORT-001 | P1 | 导出/导入 | 生成可迁移的记忆包 | v0.5.0 | 待实现 |
| REQ-OFFLINE-001 | P1 | 离线恢复 | 无网络时可恢复已缓存的插件包 | v0.5.0 | 待实现 |
| REQ-RESCUE-001 | P0 | DSH 无法启动时恢复 | 独立救援档案或伴生 CLI 可修复主 profile | v0.5.0 | 待验证 |
| REQ-CROSS-001 | P2 | 跨设备/团队同步 | 记忆包可共享 | 未定 | 未开始 |

## 5. 快照范围

| 层级 | 纳入 | 排除 |
|---|---|---|
| 插件层 | bundle、版本、来源、启停、加载顺序、patch 覆盖、插件 Config、preset、MCP、插件命令 | 插件业务数据、缓存、明文密钥 |
| 环境层 | 脚本、受管 bin、PATH、非敏感环境变量、可选外部终端代管区块 | sudo 密码、SSH 私钥、系统级配置、整份 dotfile |
| 元数据 | 时间、时区、触发方式、profile、DSH 版本、平台、内容哈希、备注、固定状态 | — |

## 6. 关键规则

1. 插件记忆和环境记忆分开存储、分开恢复。
2. 完整还原点只绑定两层，不自动拼接“最近的插件记忆”和“最近的环境记忆”。
3. 回滚是新增一条恢复记录，不删除历史。
4. 恢复前必须自动创建安全记忆。
5. 恢复可以失败，但必须可退回。
6. 不静默部分成功；缺包、版本不匹配、权限不足都要报告。
7. 不覆盖整份 shell profile，只操作受管区块。
8. 不自动执行恢复的脚本，不自动 sudo。
9. 密钥默认排除，只保存引用。
10. 跨 DSH 大版本默认阻止，兼容模式需显式确认。

## 7. 数据模型

```ts
type MemoryKind = 'plugin' | 'environment' | 'checkpoint' | 'item'

interface Memory {
  id: string
  schemaVersion: number
  kind: MemoryKind
  createdAt: string
  timezone: string
  trigger: 'manual' | 'auto-safety' | 'pre-restore'
  note?: string
  profile: string
  dshVersion: string
  platform: string
  status: 'complete' | 'partial' | 'invalid'
  plugin?: PluginSnapshot
  environment?: EnvironmentSnapshot
}
```

当前 Demo 只存插件清单和环境事实，不存完整 Config 值。

## 8. 技术约束

- DSH 设置页扩展点：`settings.section`
- 插件清单与恢复：`pluginManager.listBundles()`、`listPlugins()`、`installBundle()`、`removeBundle()`、`setBundleEnabled()`、`setPluginEnabled()`
- 配置：`configEditor.configuration()`、`configEditor.edit()`
- 持久化：`storageDomain`；Demo 使用 `$DSH_HOME/memory-sprite` JSON
- DSH 模型 shell：
  - PowerShell：`-NoLogo -NoProfile -NonInteractive -Command`
  - bash：`bash -c`
- 因此环境记忆不能依赖 `$PROFILE` / `.bashrc`；必须走受管 bin + 运行时 PATH
- `plugin-manager/changed` 不覆盖 HMR/CLI/手改 patch，变更检测必须结合文件监听和快照 diff
- `desktop` profile 由 Electron 独占，公共 CLI 不允许直接管理；坏启动恢复需要独立救援档案或伴生工具
- 插件恢复是“可回退的步骤序列”，不是单事务原子操作

## 9. v0.1.0 验收

- 设置中出现“记忆精灵”
- 可以读取真实插件清单和数量
- 可以保存三种范围的记忆
- 快照带时间戳和备注
- 刷新页面后快照仍存在
- 演示版不修改插件和环境

## 10. 版本映射

| 版本 | 主题 |
|---|---|
| v0.1.0 | Demo：页面、清单、快照保存 |
| v0.2.0 | 需求基线、变更检测、数据模型 |
| v0.3.0 | 插件层恢复、差异预览、安全记忆 |
| v0.4.0 | 环境记忆、受管 bin、自动保护 |
| v0.5.0 | 导出/导入、离线包、救援 |
| v1.0.0 | 核心稳定版 |
