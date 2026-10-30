# 技术决策记录

## ADR-001：记忆仅指配置记忆

- 状态：已接受
- 决策：记忆精灵管理 DSH 插件与环境配置，不管理 AI 对话记忆。
- 原因：对话记忆是另一条产品线，混淆会破坏范围。

## ADR-002：插件记忆与环境记忆分开，另设完整还原点

- 状态：已接受
- 决策：两个独立记忆库；完整还原点在同一时刻绑定两层。
- 原因：满足独立恢复，同时支持真正的整体回滚；禁止自动拼接最近的两层记忆。

## ADR-003：环境记忆不依赖 `$PROFILE`

- 状态：已接受
- 决策：DSH 内命令通过受管 bin + 运行时 PATH 生效；`$PROFILE` 只用于可选的外部终端。
- 原因：DSH 的 shell 使用 `-NoProfile` / `bash -c`，profile 内的 alias、function、PATH 不会被模型 shell 加载。

## ADR-004：记忆库独立于插件生命周期

- 状态：已接受
- 决策：记忆库放在插件包和 profile 之外；Demo 使用 `$DSH_HOME/memory-sprite`。
- 原因：卸载插件后仍可恢复；正式版迁移到 DSH 持久化存储域时仍需保持该性质。

## ADR-005：不保存明文密钥

- 状态：已接受
- 决策：Token、密码、SSH 私钥、sudo 凭据默认排除，只保存引用。
- 原因：降低泄漏面；恢复后由用户重新授权。

## ADR-006：恢复是可回退的步骤序列，不是原子事务

- 状态：已接受
- 决策：恢复前创建安全记忆，逐步执行并报告；失败可退回。
- 原因：`pluginManager` 操作不是单事务，且部分变更需要重启。

## ADR-007：坏启动恢复需要独立入口

- 状态：待验证
- 决策：优先使用专用 rescue profile 或伴生 CLI；不承诺仅靠普通设置页恢复无法启动的 DSH。
- 原因：`desktop` profile 由 Electron 独占，公共 CLI 不允许管理；干净 rescue profile 默认不含记忆精灵。

## ADR-008：版本采用 SemVer，并通过 tag + GitHub Release 发布

- 状态：已接受
- 决策：`0.x` 为开发期，`1.0.0` 为核心稳定版；每次发布更新 `package.json`、`CHANGELOG.md`，打 annotated tag。
- 原因：让需求、代码和可回滚版本一一对应。

## ADR-009：Demo 使用同源 HTTP API

- 状态：已接受，正式版可替换
- 决策：设置页通过 `/memory-sprite/api` 与 Host 通信。
- 原因：避免引入额外 RPC 代码生成；正式版可迁移到 DSH Remote/Service。
