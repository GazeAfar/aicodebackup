# AICodeBackup V0.1 Development Plan

## Goal

Build a usable V0.1 CLI that helps users back up local AI-generated code to a private GitHub repository without needing to understand Git.

## Scope

- [x] Implement `aicodebackup setup`
- [x] Implement `aicodebackup backup`
- [x] Implement `aicodebackup doctor`
- [x] Default CLI language: English
- [x] Support language switching: `en` and `zh-CN`
- [x] Create GitHub repositories as private by default
- [x] Do not implement `watch` in V0.1

## Project Setup

- [x] Initialize npm project
- [x] Add TypeScript
- [x] Add Commander
- [x] Add simple-git
- [x] Add execa
- [x] Add inquirer
- [x] Add conf
- [x] Add Vitest
- [x] Add ESLint and Prettier
- [x] Add CLI bin entry
- [x] Add build script
- [x] Add test script

## Core Modules

- [x] Add shell command executor
- [x] Add Git service
- [x] Add GitHub CLI service
- [x] Add i18n dictionary
- [x] Add language resolver
- [x] Add CLI output helpers
- [x] Add error normalization

## Commands

- [x] Implement root CLI
- [x] Implement `--version`
- [x] Implement `--help`
- [x] Implement `--lang en`
- [x] Implement `--lang zh-CN`
- [x] Implement `doctor`
- [x] Implement `backup`
- [x] Implement `setup`

## setup Requirements

- [x] Check Git installation
- [x] Check GitHub CLI installation
- [x] Check GitHub login status
- [x] Initialize Git repo if needed
- [x] Detect existing remote
- [x] Do not overwrite existing remote
- [x] Create GitHub private repo when remote is missing
- [x] Run first backup

## backup Requirements

- [x] Require current directory to be a Git repo
- [x] Require remote repository
- [x] Detect no-change state
- [x] Run `git add .`
- [x] Create automatic commit message
- [x] Run `git push`
- [x] Print clear success output
- [x] Print actionable failure output

## doctor Requirements

- [x] Check Git installed
- [x] Check GitHub CLI installed
- [x] Check GitHub auth status
- [x] Check Git repo status
- [x] Check remote status
- [x] Check working tree status
- [x] Print English output by default
- [x] Print Chinese output with `--lang zh-CN`

## Tests

- [x] Test i18n key coverage
- [x] Test language fallback
- [x] Test Git service command behavior
- [x] Test GitHub CLI service command behavior
- [x] Test `doctor` success state
- [x] Test `doctor` failure state
- [x] Test `backup` with no changes
- [x] Test `backup` without remote
- [x] Test `setup` without GitHub CLI
- [x] Test `setup` with existing remote

## Documentation

- [x] Update README installation section
- [x] Update README usage section
- [x] Document private repo default
- [x] Document language switching
- [x] Document V0.1 limitations

## Acceptance Criteria

- [x] `npm run build` passes
- [x] `npm test` passes
- [x] `aicodebackup --help` works
- [x] `aicodebackup doctor --lang en` works
- [x] `aicodebackup doctor --lang zh-CN` works
- [x] `aicodebackup backup` handles no-change state cleanly
- [x] `aicodebackup setup` creates or connects to a private GitHub repository
