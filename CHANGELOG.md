# Changelog

所有重要变更记录在此文件。格式参考 Keep a Changelog，版本号遵循 SemVer。

## [0.1.0] - 2026-10-30

### Added

- 设置页“记忆精灵”
- 插件清单、插件行、配置项数量读取
- 环境事实展示：DSH shell、PATH 条目、受管 bin
- 保存完整还原点、仅插件记忆、仅环境记忆
- 快照时间线、时间戳、备注
- 本地记忆库：`$DSH_HOME/memory-sprite/snapshots.json`
- 演示用同源 API

### Known limitations

- 不支持恢复
- 不写入插件或环境
- 不保存完整配置值和密钥
- 没有坏启动救援入口
- 变更检测和数据模型尚未完成
