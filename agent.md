# AICodeBackup Agent 指南

## 输出语言与产品语言

Agent 与用户对话时默认使用中文。涉及命令、代码、配置项、错误日志时保留英文原文。

产品本身默认语言为英文，并支持英文、中文切换：

- CLI 默认输出英文。
- README、官网、公开文档、发布说明、推广文案默认和优先使用英文。
- 产品主要面向美国市场用户，面向外部用户的第一语言必须是英文。
- 后续可提供中文文档或中文章节。
- 产品文案、错误提示、交互问题必须支持 i18n，不要把用户可见文案硬编码在业务逻辑中。
- 推荐支持 `--lang en`、`--lang zh-CN` 或配置项切换语言。
- 用户未指定语言时使用英文。

## 品牌与官网约束

- 官方主域名统一为 `https://www.aicodebackup.com`。
- 对外展示、SEO canonical URL、Open Graph URL、sitemap URL、结构化数据 URL 都必须使用 `https://www.aicodebackup.com`。
- `https://aicodebackup.com` 必须 301 或永久重定向到 `https://www.aicodebackup.com`。
- Vercel 项目必须做域名规范化（Domain Canonicalization），避免 apex、www、`vercel.app` 多个地址同时被搜索引擎索引。
- 统一联系邮箱为 `hello@aicodebackup.com`。
- 官网必须符合 Google SEO 基础要求：可抓取、语义化 HTML、唯一 title/description、canonical link、robots.txt、sitemap.xml、结构化数据、移动端体验、性能和可访问性。

## 项目定位

AICodeBackup 是一款面向 AI 编程用户的自动备份工具，核心目标是帮助用户在不了解 Git 和 GitHub 的情况下，把本地项目安全备份到 GitHub 私有仓库。

产品不是传统 Git 工具，而是 AI 编程时代的代码安全层：

- 帮助 Vibe Coder、独立开发者、产品经理、运营、设计师避免 AI 生成代码丢失。
- 降低 Git、GitHub、提交、推送、恢复等概念门槛。
- 让用户在 5 分钟内完成安装、连接 GitHub、创建私有仓库和首次备份。

核心口号：

- 英文：Never lose your AI-generated code again.
- 中文：别让 AI 写出来的代码丢失。

## 目标用户

优先为非专业开发者设计体验：

- 不熟悉 Git 和 GitHub 的 Vibe Coder。
- 会 Git 但经常忘记提交的独立开发者。
- 使用 AI 构建 MVP 的产品经理、运营和设计师。

任何功能、提示文案和错误处理都应假设用户不理解 Git 内部机制。输出要解释用户下一步应该做什么，而不是暴露复杂实现细节。

## 产品阶段

### V0.1 MVP

必须优先实现和维护以下命令：

- `aicodebackup setup`
- `aicodebackup backup`
- `aicodebackup doctor`

#### `aicodebackup setup`

负责引导用户完成首次备份链路：

- 检测 Git，缺失时优先帮助用户自动安装。
- 检测 GitHub CLI，缺失时优先帮助用户自动安装。
- GitHub 未登录时，打开 GitHub 注册页并启动 `gh auth login --web`。
- GitHub 账号注册不能由工具代用户完成，但工具必须打开官方注册页并把用户带回登录流程。
- 初始化 Git 仓库。
- 创建 GitHub 私有仓库。
- 完成首次备份。

#### `aicodebackup backup`

负责一键备份当前项目：

- 执行 `git add .`。
- 自动生成清晰的 commit message。
- 执行 `git commit`。
- 执行 `git push`。

命令设计目标是用户无需理解 Git。

#### `aicodebackup doctor`

负责诊断环境和仓库状态：

- Git 是否安装。
- GitHub CLI 是否安装。
- GitHub 是否已登录。
- 当前目录是否是 Git 仓库。
- 远程仓库是否配置。
- 最近一次备份是否成功。

输出应简洁、明确，例如：

```text
✓ Git Installed
✓ GitHub CLI Installed
✓ GitHub Connected
✓ Remote Repository Connected
✓ Last Backup Successful
```

### V0.2

规划命令：

- `aicodebackup watch`

能力：

- 持续监控项目变更。
- 检测修改文件数量、diff 行数、距离上次备份时间。
- 达到风险阈值时提醒用户备份。

### V0.3

规划能力：

- 自动风险评分。
- Terminal 通知。
- Windows 通知。
- macOS 通知。

风险评分参考维度：

- 修改文件数量。
- diff 行数。
- 距离上次备份时间。
- AI 工具运行时长。

### V1.0

规划能力：

- `aicodebackup restore`
- 历史备份查看。
- 指定版本恢复。
- 多项目管理。
- VS Code 插件。
- Cursor 插件。

## 技术栈约定

默认技术栈：

- Node.js
- TypeScript
- Commander
- simple-git
- execa
- inquirer
- conf
- node-notifier

除非有明确理由，不要引入偏离上述方向的大型框架。

## GitHub 集成约定

项目依赖 GitHub CLI 完成认证和仓库创建：

- 使用 `gh --version` 检测 GitHub CLI。
- 使用 `gh auth status` 检查登录状态。
- 使用 `gh auth login` 引导登录。
- 使用 `gh repo create` 创建 GitHub 私有仓库。
- 使用标准 `git push` 完成推送。

默认创建私有仓库，除非用户明确要求公开仓库。

## 设计原则

### 1. 面向新手

命令输出应该告诉用户：

- 当前发生了什么。
- 是否安全。
- 下一步做什么。

避免只输出底层 Git 错误。需要保留原始错误时，应追加用户可理解的解释。

### 2. 安全优先

不要自动执行破坏性操作：

- 不要自动 `git reset --hard`。
- 不要自动删除用户文件。
- 不要自动覆盖远程仓库历史。
- 不要静默修改用户已有 remote。

遇到可能破坏数据的操作，必须先解释风险并请求用户确认。

### 3. 私有优先

AICodeBackup 的核心承诺是保护代码。默认行为应偏向隐私和安全：

- GitHub 仓库默认 private。
- 不打印 token、凭据、私密 remote URL。
- 不上传明显敏感文件，后续可考虑自动 `.gitignore` 检查和密钥风险提醒。

### 4. 自动化但可解释

用户不需要理解 Git，但应该理解备份结果：

- 成功时说明备份已上传到 GitHub。
- 失败时说明失败环节，例如 Git 未安装、GitHub 未登录、网络失败、没有 remote。
- 给出一条明确的修复命令或下一步动作。

### 5. 跨平台

V0.1 起必须重点适配 Windows 和 Apple macOS。命令执行、路径处理、安装提示、Git/GitHub CLI 检测、权限错误说明都要覆盖 Windows PowerShell 和 macOS Terminal。Linux 可作为兼容目标，但不能优先于 Windows/macOS。

## CLI 交互文案风格

推荐文案：

- 简短。
- 低术语密度。
- 明确状态。
- 明确行动。

示例：

```text
✓ Project backed up to GitHub
Repository: https://github.com/user/project
Backup message: Backup 2026-06-14 10:30
```

错误示例：

```text
GitHub is not connected yet.
Run: aicodebackup setup
```

风险提醒示例：

```text
⚠ High Risk AI Session Detected

12 files changed
640 lines modified
Last backup: 2 hours ago

Run backup now?
```

## 开发约束

- 优先实现 CLI 的真实可用路径，再做包装和扩展。
- 保持命令幂等：重复运行 `setup` 不应破坏已有仓库。
- 对外部命令调用使用结构化封装，便于测试和错误处理。
- Git 相关逻辑应集中封装，避免散落在各命令文件中。
- GitHub CLI 相关逻辑应集中封装，便于替换或扩展。
- 用户交互逻辑与核心执行逻辑尽量分离，方便自动化测试。
- 任何涉及文件系统和 shell 的逻辑都要考虑 Windows 路径。

## 测试重点

优先覆盖：

- 未安装 Git 的提示。
- 未安装 GitHub CLI 的提示。
- GitHub 未登录时的处理。
- 当前目录不是 Git 仓库时的初始化流程。
- 已有 Git 仓库时的重复 setup 行为。
- 没有 remote 时的处理。
- 没有变更时执行 backup 的行为。
- commit 失败、push 失败、网络失败时的错误提示。

## 商业化边界

开源版应包含：

- `setup`
- `backup`
- `doctor`
- `watch`

Pro 版未来可包含：

- GUI 桌面版。
- 多项目管理。
- 自动备份策略。
- 自动恢复。
- 团队版。

当前实现优先保证开源版 MVP 可靠。

## 代码修改准则

当后续 agent 修改本项目时：

- 先阅读现有目录结构、`package.json`、README 和测试配置。
- 遵循已有代码风格。
- 修改前确认是否已有用户未提交变更，不要随意回滚。
- 新增依赖前说明用途，避免引入不必要的复杂度。
- 完成修改后尽量运行类型检查、单元测试或最小可行 CLI 验证。

## 成功标准

阶段性成功标准：

- 用户可以在 5 分钟内完成首次备份。
- 用户无需理解 Git 即可完成 `setup` 和 `backup`。
- `doctor` 能明确告诉用户当前备份链路是否健康。
- 失败场景有可执行的下一步提示。

长期成功标准：

- 成为 AI 编程用户默认安装的代码安全网。
- 在 AI 会话结束、额度耗尽、上下文丢失、误操作、电脑故障等场景下显著降低代码丢失风险。
