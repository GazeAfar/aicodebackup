# AICodeBackup

<p align="right">
  <a href="./README.md">English</a> | <a href="./README.zh-CN.md">简体中文</a>
</p>

别让 AI 写出来的代码丢失。

> 状态：V0.2 Alpha。AICodeBackup 已发布到 npm，用于小范围测试，但暂不建议大规模生产使用。

AICodeBackup 是一款面向 AI 编程用户的自动备份工具，适合使用 Codex、Claude Code、Cursor、Trae、Gemini CLI 等 AI 编程工具的人。

它帮助你在不需要理解 Git 或 GitHub 的情况下，把本地项目备份到 GitHub 私有仓库。

官方网站：

```text
https://www.aicodebackup.com
```

联系邮箱：

```text
hello@aicodebackup.com
```

## 为什么需要它

AI 编程会话推进速度很快。一次会话里，AI 可能会创建功能、修改几十个文件、重构项目。随后会话结束、额度耗尽、上下文丢失，或者一次错误修改让代码无法运行。

如果没有备份，这些工作就可能丢失。

AICodeBackup 的目标是成为 AI 生成代码的安全层。

## 适合谁

- 使用 AI 工具但不了解 Git 的 vibe coder。
- 会用 Git 但经常忘记提交和推送的独立开发者。
- 用 AI 构建 MVP 的产品经理、运营和设计师。
- 想用一个简单命令保护 AI 辅助开发项目的人。

## 核心思路

```text
本地项目
↓
GitHub 私有仓库
↓
自动备份
```

## 安装

Alpha 测试版本：

```bash
npm install -g aicodebackup@alpha
```

安装后运行：

```bash
aicodebackup --help
```

如果 Windows 上之前失败的安装留下了被锁定的文件，请关闭可能正在运行 `aicodebackup` 的终端，然后运行：

```powershell
npm uninstall -g aicodebackup
Remove-Item "$env:APPDATA\npm\node_modules\aicodebackup" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item "$env:APPDATA\npm\aicodebackup*" -Force -ErrorAction SilentlyContinue
```

稳定版未来会使用：

```bash
npm install -g aicodebackup
```

本地开发：

```bash
npm install
npm run build
node dist/index.js --help
```

## 使用

完整的新用户端到端测试流程，包括从注册 GitHub 账号开始，请查看：

```text
docs/new-user-e2e-test.md
```

Alpha 发布和测试人员协调文档：

```text
docs/alpha-release-checklist.md
docs/alpha-tester-guide.md
docs/website-and-market-requirements.md
```

### Setup

```bash
aicodebackup setup
```

初始化当前项目，并连接到一个 GitHub 私有仓库。

它会执行：

- 检查 Git 是否已安装，缺失时尝试安装。
- 检查 GitHub CLI 是否已安装，缺失时尝试安装。
- 询问用户是否已有 GitHub 账号。
- 新用户打开 GitHub 注册页，已有账号用户打开 GitHub 登录页。
- 在默认浏览器中启动 GitHub CLI 授权。出于安全原因，GitHub 需要用户在浏览器中确认授权后，AICodeBackup 才能创建仓库。
- 将 GitHub CLI 配置为使用 HTTPS 执行 Git 操作。
- 在需要时初始化 Git。
- 创建 GitHub 私有仓库。
- 执行首次备份。

GitHub 仓库默认创建为私有仓库。

### Backup

```bash
aicodebackup backup
```

备份当前项目。

内部会执行等价于以下 Git 操作的流程：

```bash
git add .
git commit
git push
```

用户不需要理解这些命令。

### Doctor

```bash
aicodebackup doctor
```

检查当前本地备份配置是否健康。

示例输出：

```text
✓ Git Installed
✓ GitHub CLI Installed
✓ GitHub Connected
✓ Remote Repository Connected
✓ Last Backup Successful
```

### Watch

```bash
aicodebackup watch
```

监控当前项目，并在本地 AI 编程改动变得有风险时提醒备份。

默认风险阈值：

- 5 个变更文件
- 200 行变更
- 距离上次备份 30 分钟

达到阈值后，AICodeBackup 会先询问再执行备份：

```text
检测到高风险 AI 编程会话。
7 个文件已变更
286 行已修改
上次备份：34 分钟前

现在备份吗？
```

如果希望检测到风险后自动备份：

```bash
aicodebackup watch --auto
```

V0.2 的 watch 仍然是 terminal-based，不包含 IDE 插件、系统通知或 AI 工具进程识别。

### Restore

```bash
aicodebackup restore --list
aicodebackup restore --to ../my-project-restored
aicodebackup restore --to ../my-project-restored --ref <commit>
```

将已连接的 GitHub 备份恢复到当前项目外的新目录。

当前 restore MVP 采用保守安全边界：只克隆到不存在或空目录的目标路径，拒绝当前项目目录、项目内部目录和非空目录；指定 `--ref` 时以 detached checkout 检出对应版本。

## 语言支持

AICodeBackup 首次使用默认英文。

当你传入 `--lang en` 或 `--lang zh-CN` 时，AICodeBackup 会在本机保存这个语言偏好。之后不带 `--lang` 的命令会自动使用上一次保存的语言。

支持的语言：

- 英文
- 简体中文

CLI 示例：

```bash
aicodebackup doctor --lang en
aicodebackup doctor --lang zh-CN
```

## 技术栈

当前实现技术栈：

- Node.js
- TypeScript
- Commander
- execa
- inquirer
- conf

Git 操作目前通过本地 `git` CLI 执行。GitHub 登录和私有仓库创建通过 GitHub CLI 执行。

## GitHub 集成

AICodeBackup 使用 GitHub CLI 完成认证和仓库创建。

当前集成命令：

```bash
gh --version
gh auth status
gh auth login --web
gh repo create
git push
```

仓库默认应为私有仓库。

## 当前 Alpha 限制

- `restore` 是安全目录 MVP：只恢复到当前项目外的新目录，不做原地回滚或覆盖。
- `watch` 目前仍是 terminal-based，暂不包含 IDE 插件或系统通知。
- 自动安装 Git 和 GitHub CLI 是 best-effort，目前主要面向 Windows 和 macOS。
- GitHub 账号注册和 GitHub CLI 授权需要用户在浏览器中确认，这是 GitHub 的安全要求。
- AICodeBackup 不会覆盖已有 Git remote。
- AICodeBackup 不会执行 `git reset --hard` 等破坏性 Git 命令。

## 路线图

### V0.1

- `aicodebackup setup`
- `aicodebackup backup`
- `aicodebackup doctor`
- 创建 GitHub 私有仓库
- 首次备份流程

### V0.2

- `aicodebackup watch`
- `aicodebackup restore`
- 文件变更监控
- Diff 大小监控
- 备份提醒
- 支持 `watch --auto` 可选自动备份
- 安全恢复到新目录

### V0.3

- 风险评分
- Terminal 通知
- Windows 通知
- macOS 通知

### V1.0

- 备份历史增强
- 引导式版本选择恢复
- 多项目管理
- VS Code 插件
- Cursor 插件

## 产品原则

AICodeBackup 不是 Git 工具。

它是 AI 编程时代的代码安全网。

让 AI 负责写代码，让 AICodeBackup 负责保护代码。
