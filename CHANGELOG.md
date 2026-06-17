# Changelog

## 0.1.0-alpha.7

### Changed

- Split README documentation into English and Simplified Chinese versions with language switch links.
- Documented that `--lang en` and `--lang zh-CN` save the local language preference for future commands.
- Included `README.zh-CN.md` in the npm package.

### Removed

- Removed `agent.md` from the public repository and ignored it for future commits.

## 0.1.0-alpha.6

### Changed

- Updated package metadata for the next npm alpha release.

## 0.1.0-alpha.5

### Changed

- `setup` now attempts to install Git and GitHub CLI on Windows and macOS instead of only showing manual instructions.
- `setup` opens GitHub signup and starts `gh auth login --web` when GitHub is not connected.
- Published to npm with the `alpha` dist tag.

## 0.1.0-alpha.4

### Fixed

- `setup` now configures a local Git author identity from the logged-in GitHub account when the project has no `user.name` or `user.email`.

## 0.1.0-alpha.3

### Fixed

- Replaced the `github:` install instruction with a GitHub tag tarball URL, which installs the prebuilt package reliably for Alpha testers.

## 0.1.0-alpha.2

### Fixed

- GitHub install no longer requires a local TypeScript build toolchain.
- Prebuilt `dist/` files are committed for Alpha testers.

## 0.1.0-alpha.1

Initial Alpha release for small-group testing.

### Added

- `aicodebackup setup`
- `aicodebackup backup`
- `aicodebackup doctor`
- English CLI output by default
- Simplified Chinese output with `--lang zh-CN`
- GitHub private repository creation through GitHub CLI
- Git and GitHub CLI environment checks
- New-user end-to-end testing guide

### Not Included

- `watch`
- `restore`
- Automatic Git installation
- Automatic GitHub CLI installation
- GUI desktop app
- VS Code or Cursor extension
