# AICodeBackup Alpha Tester Guide

Thank you for testing AICodeBackup.

AICodeBackup helps you back up AI-generated code to a private GitHub repository, even if you do not know Git.

## What You Need

- A computer with Windows, macOS, or Linux.
- Node.js installed.
- A GitHub account.
- Git installed.
- GitHub CLI installed.

If you do not have a GitHub account, create one here:

```text
https://github.com/signup
```

Install GitHub CLI here:

```text
https://cli.github.com/
```

## 1. Log In to GitHub CLI

Run:

```bash
gh auth login
```

Recommended choices:

```text
GitHub.com
HTTPS
Authenticate Git with your GitHub credentials: Yes
Login with a web browser
```

Check login:

```bash
gh auth status
```

## 2. Install AICodeBackup Alpha

Run:

```bash
npm install -g aicodebackup@alpha
```

Check:

```bash
aicodebackup --version
```

Expected:

```text
0.1.0-alpha.5
```

If Windows reports cleanup or `EPERM` errors from a previous failed install, close terminals that may be running AICodeBackup, then run:

```powershell
npm uninstall -g aicodebackup
Remove-Item "$env:APPDATA\npm\node_modules\aicodebackup" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item "$env:APPDATA\npm\aicodebackup*" -Force -ErrorAction SilentlyContinue
```

## 3. Create a Test Project

Run:

```bash
mkdir aicodebackup-test
cd aicodebackup-test
echo "My first AI project" > app.txt
```

## 4. Run First Backup

Run:

```bash
aicodebackup setup
```

Chinese output:

```bash
aicodebackup setup --lang zh-CN
```

Expected:

- AICodeBackup checks your computer.
- AICodeBackup creates a private GitHub repository.
- AICodeBackup backs up your project.

## 5. Confirm on GitHub

Open GitHub in your browser.

Confirm:

- A new repository exists.
- The repository is private.
- `app.txt` is visible.

## 6. Test Another Backup

Run:

```bash
echo "Second version" >> app.txt
aicodebackup backup
```

Refresh GitHub and confirm the file changed.

## 7. Check Health

Run:

```bash
aicodebackup doctor
```

Chinese output:

```bash
aicodebackup doctor --lang zh-CN
```

## Feedback Questions

Please record:

- Where did you get stuck?
- Which words were confusing?
- Did you understand that the GitHub repository is private?
- Did you understand whether backup succeeded?
- How long did it take from install to first backup?
