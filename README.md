# 记忆精灵 Memory Sprite

为 DSH 提供“插件记忆”和“环境记忆”的演示插件。

当前版本：**v0.1.0 Demo**。先验证设置页、插件清单读取、快照保存和本地记忆库，不执行恢复，也不修改系统环境。

- [需求文档](docs/REQUIREMENTS.md)
- [版本路线](docs/ROADMAP.md)
- [技术决策](docs/DECISIONS.md)
- [更新日志](CHANGELOG.md)

## 当前能力

- 在 DSH 设置中注册“记忆精灵”页面
- 读取当前已安装插件、插件行和配置项数量
- 读取 DSH shell、PATH 条目和受管脚本目录
- 保存三种记忆：
  - 完整还原点
  - 仅插件记忆
  - 仅环境记忆
- 快照带时间戳和备注，持久化到 `$DSH_HOME/memory-sprite/snapshots.json`

## 这版不做什么

- 不执行插件安装、卸载或恢复
- 不写入环境变量、PATH 或脚本
- 不保存完整配置值和密钥
- 没有实现跨启动救援入口

## 环境记忆设计说明

DSH 的模型 shell 使用非交互方式启动：

- PowerShell：`-NoLogo -NoProfile -NonInteractive -Command`
- bash：`bash -c`

因此环境记忆不能依赖 `$PROFILE` 或 `.bashrc`。后续设计是：

1. 把脚本恢复到一个受管目录，例如 `$DSH_HOME/memory-sprite/bin`
2. 在 DSH 运行时把该目录加入进程 `PATH`
3. 可选地为外部终端写入用户级环境，但需要明确授权

## 目录

```text
index.js            Host 侧：插件清单、环境事实、快照 API
client.js           Client 侧：设置页
cordis.patch.yml    Bundle patch
locale/             插件显示名称和描述
icon.svg            插件图标
docs/               需求、路线图、技术决策
CHANGELOG.md        版本变更记录
```

## 安装

由 DSH Plugin Manager 以本地 bundle 安装：

```text
plugin_manager.install_bundle(target: "<path-to-this-directory>")
```

安装后打开 DSH 设置，在左侧找到“记忆精灵”。

## 状态

Demo / 仅只读采集与快照保存。
