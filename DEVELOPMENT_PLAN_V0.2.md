# AICodeBackup V0.2 Development Plan

## Goal

Turn AICodeBackup from a manual backup helper into an active safety layer that watches local AI coding changes and recommends or runs backups before risky work is left unprotected.

## Scope

- [x] Implement `aicodebackup watch`
- [x] Implement `aicodebackup watch --auto`
- [x] Monitor changed file count
- [x] Monitor diff line count
- [x] Monitor time since last backup
- [x] Remind by default instead of backing up without confirmation
- [x] Auto backup only when `--auto` is explicitly enabled
- [x] Keep the first version terminal-based
- [x] Do not implement IDE plugins in V0.2
- [x] Do not implement system notifications in V0.2
- [x] Do not implement AI tool process detection in V0.2

## Watch Defaults

- [x] Default interval: 30 seconds
- [x] Default changed file threshold: 5 files
- [x] Default diff line threshold: 200 changed lines
- [x] Default time threshold: 30 minutes since last backup
- [x] Only warn when the working tree has changes
- [x] Avoid repeated prompts while risk remains unchanged

## Command Requirements

- [x] Require current directory to be a Git repository
- [x] Require remote repository
- [x] Print a clear startup message
- [x] Print changed files, diff lines, and last backup age when risk is detected
- [x] Prompt before backup in default mode
- [x] Run backup automatically in `--auto` mode
- [x] Update last backup timestamp after successful automatic backup
- [x] Handle no-change state quietly
- [x] Support `--lang en`
- [x] Support `--lang zh-CN`

## Tests

- [x] Test risk detection from changed file count
- [x] Test risk detection from diff line count
- [x] Test time threshold behavior
- [x] Test no-risk state
- [x] Test watch prompt mode
- [x] Test watch auto mode
- [x] Test Git service diff line parsing

## Documentation

- [x] Update README usage section
- [x] Update README.zh-CN usage section
- [x] Update changelog
- [x] Document V0.2 limitations

## Acceptance Criteria

- [x] `npm run build` passes
- [x] `npm test` passes
- [x] `npm run lint` passes
- [x] `node dist/index.js watch --help` works
- [x] `node dist/index.js --version` still works
