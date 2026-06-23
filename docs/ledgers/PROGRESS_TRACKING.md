# AICodeBackup Progress Tracking

本文件是 dashboard 的事实源，记录 AICodeBackup 的日进度。最新日期块放在最上面。

## 使用规则

- 每个日期块只保留三个小节：`今日待办`、`今日完成`、`明日待办`。
- `今日待办` 和 `明日待办` 不打勾；事项完成后，从待办移动到 `今日完成`。
- `今日完成` 必须使用 `[x]`，并写清文件、命令、外部平台状态或用户确认等证据。
- 不记录 npm token、GitHub token、Vercel token、Cookie、OAuth token、恢复码、账号密码或支付信息。
- AICodeBackup 的本地 npm publish token 是用户明确保留的发布前提；除非用户明确要求 rotate/remove，不把“删除本地 npm token”写成默认收尾动作。

## 2026-06-23

### 今日待办

- 若今天做数据复盘，先补 npm downloads、GSC/analytics、GitHub repo 和官网访问数据。
- 若今天做 stable 准备，先运行 build/test/lint、website verify，并核对 README、npm 页面、官网安装说明和 CLI 行为。

### 今日完成

- [x] 将 `docs/ledgers/PROGRESS_TRACKING.md` 重写为 dashboard 三段式结构。
  - Evidence: `docs/ledgers/PROGRESS_TRACKING.md`
- [x] 保留 AICodeBackup 当前真实阶段：已上线后的增长、SEO 复查、数据复盘、alpha 测试和 stable 发布准备。
  - Evidence: `AGENTS.md`、`docs/startup-pack/EXECUTION.md`
- [x] 保留 npm 发布边界：本轮不执行 npm publish、dist-tag、token rotate/remove 或账号操作。
  - Evidence: `AGENTS.md`、本文件使用规则

### 明日待办

- 补 npm downloads、GSC/analytics、GitHub repo 和官网访问数据；缺失数据标记为 `Insufficient Data`。
- 收集 alpha tester 反馈，并归类为产品问题、文档问题、安装问题或发布阻塞。
- 刷新 stable 发布前的 build/test/lint、website verify、README/npm 页面一致性证据。
- 若涉及 npm 发布、dist-tag、release tag、GitHub release 或 token 操作，先停在人工确认闸口。

## 2026-06-22

### 今日待办

- 读取 `docs/startup-pack/EXECUTION.md`，确认继续增长、数据复盘或 stable 发布准备。

### 今日完成

- [x] 当前阶段和待办项已收敛为 dashboard 次日可读的任务入口。
  - Evidence: `docs/ledgers/PROGRESS_TRACKING.md`
- [x] 未把未运行的 GSC、analytics、npm downloads、tester 反馈、stable 发布或官网验证写成已完成。
  - Evidence: `docs/ledgers/PROGRESS_TRACKING.md`

### 明日待办

- 若做数据复盘，先补 npm downloads、GSC/analytics、GitHub repo 和官网访问数据；缺失数据标记为 `Insufficient Data`。
- 若做 stable 准备，先运行 build/test/lint、website verify，并核对 README、npm 页面、官网安装说明和 CLI 行为。
- 若涉及 npm 发布或 token 操作，先停在人工确认闸口，不默认清理本地 npm token。
