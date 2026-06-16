# V0.1 Alpha Release Checklist

Use this checklist before inviting testers.

## Release Goal

Validate whether a non-GitHub, non-Git user can complete the full backup journey:

```text
Create GitHub account
Install Git and GitHub CLI
Log in with gh auth login
Install AICodeBackup
Run setup
Confirm a private GitHub repository contains the project
Run backup after changing files
```

## Pre-Release Checks

- [x] `npm install` works from a clean checkout.
- [x] `npm run build` passes.
- [x] `npm test` passes.
- [x] `npm run lint` passes.
- [x] `npm audit` reports 0 vulnerabilities.
- [x] `aicodebackup --help` works after local build.
- [x] `aicodebackup doctor --lang en` works.
- [x] `aicodebackup doctor --lang zh-CN` works.
- [x] npm Alpha install works: `npm install -g aicodebackup@alpha`.
- [x] `aicodebackup --version` prints `0.1.0-alpha.5`.

## GitHub Install Policy

The Alpha branch commits `dist/` and uses GitHub tag tarball installation instead of the `github:` npm shortcut.

Reason:

- GitHub installs should work for non-developer testers.
- Testers should not need TypeScript or a local build toolchain.
- `npm install -g aicodebackup@alpha` should install the prebuilt CLI.

## Alpha Tag

Use:

```bash
git tag v0.1.0-alpha.5
git push origin main
git push origin v0.1.0-alpha.5
```

## Tester Requirements

Recruit 3 to 5 testers who match at least one profile:

- Vibe coder who uses AI coding tools but does not know Git.
- Product manager, designer, or operator building an MVP.
- Indie developer who forgets Git commits.

At least 2 testers should start without an existing GitHub account.

## Tester Success Criteria

- Tester finishes first backup.
- GitHub repository is private.
- Project files appear in GitHub.
- Tester can make a change and run `aicodebackup backup`.
- Tester understands whether backup succeeded.
- Tester can describe what was confusing.

## Blockers for V0.1 Stable

Do not publish V0.1 stable until these are true:

- New users can complete first backup without developer help.
- GitHub account creation instructions are clear.
- GitHub CLI install and login instructions are clear.
- Error messages point to the next action.
- At least 3 full new-user tests are completed.
