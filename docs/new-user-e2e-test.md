# New User End-to-End Test

This test is for users who do not know GitHub, Git, or GitHub CLI.

The goal is to verify the complete first-time experience:

```text
No GitHub account
↓
Create GitHub account
↓
Install required tools
↓
Let AICodeBackup start GitHub CLI login
↓
Create a private GitHub repository with AICodeBackup
↓
Back up an AI-generated project
↓
Confirm the code is safe on GitHub
```

## Test Profile

Use a tester who matches the target user:

- Has never used GitHub before, or is asked to behave as if they have not.
- Does not understand Git terms such as commit, remote, branch, or push.
- Can follow simple copy-paste commands.
- Uses Windows, macOS, or Linux.

Record:

- Operating system and version.
- Browser.
- Terminal app.
- Whether Git was already installed.
- Whether GitHub CLI was already installed.
- Total time from start to first successful backup.

## Success Criteria

- The tester can create a GitHub account.
- The tester can Let AICodeBackup help install Git and GitHub CLI.
- The tester can log in with `gh auth login`.
- The tester can run `aicodebackup setup`.
- A private GitHub repository is created.
- The project files appear in the GitHub repository.
- The tester can edit a file and run `aicodebackup backup`.
- The second backup appears on GitHub.
- The tester understands whether the backup succeeded.
- The full flow finishes within 5 minutes after Git and GitHub CLI are installed.

## Required Links

Use official links in user-facing instructions:

- GitHub signup: https://github.com/signup
- GitHub account getting started: https://docs.github.com/en/get-started/onboarding/getting-started-with-your-github-account
- GitHub CLI: https://cli.github.com/
- GitHub CLI login manual: https://cli.github.com/manual/gh_auth_login

## Test Script

### 1. Create a GitHub Account

Ask the tester to open:

```text
https://github.com/signup
```

The tester should:

- Enter an email address.
- Create a password.
- Choose a username.
- Complete the on-screen verification.
- Verify email if GitHub asks for it.
- Stay signed in to GitHub in the browser.

Pass condition:

- The tester reaches a signed-in GitHub page.

Notes to record:

- Did the tester understand what GitHub is for?
- Did account verification block the flow?
- Did the tester need help choosing a username?

### 2. Install Git

Check whether Git is installed:

```bash
git --version
```

If Git is missing, ask the tester to install Git from:

```text
https://git-scm.com/downloads
```

Pass condition:

```bash
git --version
```

prints a version number.

Notes to record:

- Did the tester understand why Git is required?
- Was installation confusing on the operating system?

### 3. Install GitHub CLI

Check whether GitHub CLI is installed:

```bash
gh --version
```

If GitHub CLI is missing, ask the tester to install it from:

```text
https://cli.github.com/
```

Pass condition:

```bash
gh --version
```

prints a version number.

Notes to record:

- Did the tester understand the difference between GitHub website and GitHub CLI?
- Did the install page make sense?

### 4. Let AICodeBackup start GitHub CLI login

Run:

```bash
gh auth login
```

Recommended choices for a new user:

```text
GitHub.com
HTTPS
Authenticate Git with your GitHub credentials: Yes
Login with a web browser
```

After the browser opens, the tester should approve the login.

Check login:

```bash
gh auth status
```

Pass condition:

- `gh auth status` reports that the user is logged in to `github.com`.

Notes to record:

- Did the browser-based login make sense?
- Did the tester understand the device code or authorization screen?
- Did 2FA or passkey prompts confuse the tester?

### 5. Install or Link AICodeBackup

For local development testing inside this repository:

```bash
npm install
npm run build
npm link
```

Check:

```bash
aicodebackup --version
```

Pass condition:

```text
0.1.0
```

### 6. Create a Test Project

Create a new folder outside this repository:

```bash
mkdir aicodebackup-new-user-test
cd aicodebackup-new-user-test
```

Create a file:

```bash
echo "My first AI project" > app.txt
```

Pass condition:

- The folder contains `app.txt`.

### 7. Run First Setup

Run:

```bash
aicodebackup setup --lang en
```

For Chinese-language testing:

```bash
aicodebackup setup --lang zh-CN
```

Expected behavior:

- AICodeBackup checks Git.
- AICodeBackup checks GitHub CLI.
- AICodeBackup checks GitHub login.
- AICodeBackup initializes Git if needed.
- AICodeBackup asks for a repository name.
- AICodeBackup creates a private GitHub repository.
- AICodeBackup performs the first backup.

Pass condition:

- The command ends with a success message.
- No Git terms are required for the tester to make progress.

Notes to record:

- Did the tester understand the repository name question?
- Did the tester know what "private repository" means?
- Was the success message clear enough?

### 8. Confirm Backup on GitHub

Ask the tester to open GitHub in the browser and find the new repository.

Confirm:

- The repository exists.
- The repository is private.
- `app.txt` is visible.
- The latest file content matches the local project.

Pass condition:

- Tester can point to the backed-up file on GitHub.

Notes to record:

- Could the tester find the repository?
- Did GitHub's repository page feel understandable?

### 9. Run a Second Backup

Edit the test file:

```bash
echo "Second version" >> app.txt
```

Run:

```bash
aicodebackup backup --lang en
```

Pass condition:

- AICodeBackup prints a success message.
- The updated file appears on GitHub after refresh.

### 10. Run Doctor

Run:

```bash
aicodebackup doctor --lang en
```

For Chinese-language testing:

```bash
aicodebackup doctor --lang zh-CN
```

Pass condition:

- Git installed: success.
- GitHub CLI installed: success.
- GitHub connected: success.
- Remote repository connected: success.
- Last backup available: success.

Notes to record:

- Does the tester understand the status output?
- Does the output tell them whether their code is safe?

## Failure Scenarios

Run these as separate tests.

### GitHub CLI Missing

Temporarily use a machine without GitHub CLI, or remove it from `PATH`.

Run:

```bash
aicodebackup setup
```

Expected:

- The command explains that GitHub CLI is missing.
- The command points to GitHub CLI installation.
- The command does not crash with raw technical output.

### Not Logged In

Run:

```bash
gh auth logout
aicodebackup setup
```

Expected:

- The command explains GitHub is not connected.
- The command tells the user to run `gh auth login`.

### No Changes

After a successful backup, run:

```bash
aicodebackup backup
```

Expected:

- The command says there are no changes.
- The command exits cleanly.

## UX Findings Template

Use this template for each tester:

```md
## Tester

- OS:
- Browser:
- Terminal:
- Git already installed:
- GitHub CLI already installed:
- Time to first backup:

## Result

- Completed full flow:
- Private repository created:
- First backup visible on GitHub:
- Second backup visible on GitHub:

## Confusing Moments

- 

## Exact Error Messages

- 

## Recommended Product Changes

- 
```

## Current Product Gaps to Watch

- AICodeBackup does not create a GitHub account for the user; it must guide them to GitHub signup.
- AICodeBackup attempts to install Git and GitHub CLI automatically on Windows and macOS, but installers can still fail because of operating system permissions, package manager availability, or network issues.
- `gh auth login` is still a GitHub CLI flow, so the experience depends on GitHub's browser login screens.
- Success text currently says "GitHub" even when tests use a local Git remote; this is acceptable for production GitHub use but should be considered in local-only testing.
