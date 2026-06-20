# AICodeBackup Progress Tracking

本文件记录 AICodeBackup 的增长、SEO 复查、数据复盘、alpha 测试和 stable 发布准备实际进度。

## 使用规则

- 每个工作日新增一个日期块，最新日期放在最上面。
- 完成项必须用 `[x]`，并写证据。
- 未完成项必须用 `[ ]`，并写原因或下一步。
- 不记录 npm token、GitHub token、Vercel token、Cookie、OAuth token、恢复码、账号密码或支付信息。
- 没有证据的事项只能写成 `待验证`、`待授权`、`待执行` 或 `Insufficient Data`。

## 2026-06-20

### 今日目标

- [x] 建立标准进度跟踪文档，用于每日收口和次日续跑。
  - Evidence: `docs/startup-pack/EXECUTION.md`、`docs/ledgers/PROGRESS_TRACKING.md`
- [x] 让 dashboard 读取本项目的远端 `EXECUTION.md` 和 `PROGRESS_TRACKING.md`。
- [x] 把阶段模型拆成上线前 SEO、上线后持续 SEO、增长、复盘、生产健康和 stable 准备。
- [ ] 把每天收工记录维护成第二天 dashboard 的任务入口。

### 今日完成

- [x] 增加执行控制入口，明确增长、复盘、alpha/stable 准备任务的读取顺序、审批闸口和断点续跑规则。
- [x] 增加进度跟踪台账，支持完成项打勾、未完成项保留和次日继续项记录。
- [x] 面板已经能识别本项目文档完整状态、数据质量和当前阶段。
- [x] `docs/startup-pack/EXECUTION.md` 已补充 dashboard 每日启动规则和读取口径。

### 未完成 / 阻塞

- [ ] Vercel 部署环境变量需要单独确认 `GITHUB_TOKEN`、登录账号和 session secret。
  - Reason: 本地可读远端仓库；生产部署环境变量不应写进仓库。
- [ ] 本项目真实增长渠道状态、npm downloads、GSC/analytics 指标和发布准备证据仍需要每天按证据更新。
  - Reason: 当前只是进度系统可用，不代表业务增长或 stable 发布已经复盘完成。

### 明天继续

- [ ] 若继续增长任务，先更新渠道状态、证据 URL、UTM/referrer 和 npm downloads 观察点。
- [ ] 若继续 alpha/stable 准备，先补 tester、build/test/lint、website verify、README/npm 页面一致性证据。
- [ ] 收工前回到本文件：完成项打勾，未完成项写原因，明天继续项写成可执行动作。

### 当前闸口

- Gate: 无；涉及 npm 发布、账号授权、付费工具、DNS、生产发布或批量公开发布时再暂停确认。
- Resume point: 打开 dashboard，点击 AICodeBackup，按“今日工作台”的今天要做和本日期块继续。

### 今日总结

dashboard 已具备读取本项目远端进度文件的基础能力。后续要让它真正可用，关键是每天结束前维护本文件，把业务进展、证据、卡点和明天继续写成可执行记录。
