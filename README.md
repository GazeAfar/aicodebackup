# AICodeBackup

<p align="right">
  <a href="./README.md">English</a> | <a href="./README.zh-CN.md">简体中文</a>
</p>

Never lose your AI-generated code again.

> Status: V0.2 Alpha. AICodeBackup is published on npm for small-group testing, but not yet recommended for broad production use.

AICodeBackup is an automatic backup tool for people building software with AI coding agents such as Codex, Claude Code, Cursor, Trae, and Gemini CLI.

It helps you back up local projects to private GitHub repositories without needing to understand Git or GitHub.

Official website:

```text
https://www.aicodebackup.com
```

Contact:

```text
hello@aicodebackup.com
```

## Why This Exists

AI coding sessions can move fast. In a single session, an AI agent may create features, edit dozens of files, and restructure a project. Then the session ends, tokens run out, context is lost, or a mistake breaks the code.

Without backups, that work can disappear.

AICodeBackup is designed to become the safety layer for AI-generated code.

## Who It Is For

- Vibe coders who use AI tools but do not know Git.
- Indie developers who know Git but forget to commit and push.
- Product managers, operators, and designers building MVPs with AI.
- Anyone who wants a simple backup command for AI-assisted development.

## Core Idea

```text
Local project
↓
Private GitHub repository
↓
Automatic backup
```

## Installation

For Alpha testing from npm:

```bash
npm install -g aicodebackup@alpha
```

After installation:

```bash
aicodebackup --help
```

If a previous failed install left files locked on Windows, close terminals that may be running `aicodebackup`, then run:

```powershell
npm uninstall -g aicodebackup
Remove-Item "$env:APPDATA\npm\node_modules\aicodebackup" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item "$env:APPDATA\npm\aicodebackup*" -Force -ErrorAction SilentlyContinue
```

The stable release will use:

```bash
npm install -g aicodebackup
```

For local development:

```bash
npm install
npm run build
node dist/index.js --help
```

## Usage

For a complete first-time user test starting from GitHub account creation, see:

```text
docs/new-user-e2e-test.md
```

For Alpha release and tester coordination, see:

```text
docs/alpha-release-checklist.md
docs/alpha-tester-guide.md
docs/website-and-market-requirements.md
```

### Setup

```bash
aicodebackup setup
```

Initializes the current project and connects it to a private GitHub repository.

What it does:

- Check whether Git is installed, and try to install it when missing.
- Check whether GitHub CLI is installed, and try to install it when missing.
- Ask whether the user already has a GitHub account.
- Open GitHub signup for new users, or GitHub login for existing users.
- Start GitHub CLI authorization in the default browser. GitHub requires the user to confirm this authorization before AICodeBackup can create repositories.
- Configure GitHub CLI to use HTTPS for Git operations.
- Initialize Git if needed.
- Create a private GitHub repository.
- Run the first backup.

GitHub repositories are private by default.

### Backup

```bash
aicodebackup backup
```

Backs up the current project.

Internally, it will run the equivalent of:

```bash
git add .
git commit
git push
```

The user should not need to understand those commands.

### Doctor

```bash
aicodebackup doctor
```

Checks whether the local backup setup is healthy.

Example output:

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

Watches the current project and recommends a backup when local AI coding changes become risky.

Default risk thresholds:

- 5 changed files
- 200 changed lines
- 30 minutes since the last backup

When a threshold is reached, AICodeBackup asks before running a backup:

```text
Risky AI coding session detected.
7 files changed
286 lines modified
Last backup: 34 minutes ago

Backup now?
```

To back up automatically when risk is detected:

```bash
aicodebackup watch --auto
```

V0.2 watch is terminal-based. It does not yet include IDE plugins, system notifications, or direct AI tool process detection.

### Restore

```bash
aicodebackup restore --list
aicodebackup restore --to ../my-project-restored
aicodebackup restore --to ../my-project-restored --ref <commit>
```

Restores the connected GitHub backup into a new folder outside the current project.

The restore MVP is intentionally conservative: it clones into a missing or empty target folder, rejects the current project folder and nested project folders, rejects non-empty targets, and checks out `--ref` in detached mode when a specific version is requested.

## Language Support

AICodeBackup defaults to English on first use.

When you pass `--lang en` or `--lang zh-CN`, AICodeBackup saves that language preference locally. Future commands without `--lang` will use the saved language.

Supported language options:

- English
- Simplified Chinese

CLI examples:

```bash
aicodebackup doctor --lang en
aicodebackup doctor --lang zh-CN
```

## Tech Stack

Current implementation stack:

- Node.js
- TypeScript
- Commander
- execa
- inquirer
- conf

Git operations currently run through the local `git` CLI. GitHub authentication and private repository creation run through GitHub CLI.

## GitHub Integration

AICodeBackup uses GitHub CLI for authentication and repository creation.

Current integration commands:

```bash
gh --version
gh auth status
gh auth login --web
gh repo create
git push
```

Repositories should be private by default.

## Current Alpha Limits

- `restore` is a safe-folder MVP: it restores into a new folder outside the current project and does not perform in-place rollback or overwrite.
- `watch` is terminal-based and does not include IDE plugins or system notifications yet.
- Automatic Git and GitHub CLI installation is best-effort and currently focused on Windows and macOS.
- GitHub account creation and GitHub CLI authorization require browser confirmation for security reasons.
- AICodeBackup does not overwrite an existing Git remote.
- AICodeBackup does not run destructive Git commands such as `git reset --hard`.

## Roadmap

### V0.1

- `aicodebackup setup`
- `aicodebackup backup`
- `aicodebackup doctor`
- Private GitHub repository creation
- First backup flow

### V0.2

- `aicodebackup watch`
- `aicodebackup restore`
- File change monitoring
- Diff size monitoring
- Backup reminders
- Optional automatic backup with `watch --auto`
- Safe restore into a new folder

### V0.3

- Risk score
- Terminal notifications
- Windows notifications
- macOS notifications

### V1.0

- Backup history improvements
- Guided restore version selection
- Multi-project management
- VS Code extension
- Cursor extension

## Product Principle

AICodeBackup is not a Git tool.

It is a code safety net for the AI coding era.

Let AI write the code. Let AICodeBackup protect it.
