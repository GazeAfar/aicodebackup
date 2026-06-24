# AICodeBackup Execution Control

本文件是已上线项目的当前执行控制页。Codex 每次处理增长、SEO 复查、数据复盘、alpha 测试或 stable 发布准备任务时，先读 `AGENTS.md` 和本文件，再读最新进度记录。

## 1. 当前状态

- Site: `AICodeBackup`
- Stage: `08 增长外链 -> 09 数据复盘 -> 06 SEO 内容优化 -> 07 生产健康复查 -> stable 发布准备`
- Current owner: Codex
- Last updated: `待更新`
- Current task: `待填写`
- Current gate: `无 / 待用户确认`
- Resume point: 用户确认后从本文件的“当前任务”和 `docs/ledgers/PROGRESS_TRACKING.md` 最新记录继续。
- Next automatic handoff: 按 `AGENTS.md` 的 Autopilot Pipeline 交接。

## 2. 执行顺序

1. 读取 `AGENTS.md`，确认已上线项目边界、npm 发布边界和人工审批事项。
2. 读取本文件，确认当前增长/复盘/stable 准备阶段、审批闸口和断点。
3. 读取 `docs/ledgers/PROGRESS_TRACKING.md`，确认最近一次今日待办、今日完成和明日待办。
4. 按任务读取：
   - SEO：`docs/startup-pack/SEO_PLAN.md`
   - 增长：`docs/growth-plan.md`
   - 复盘：`docs/startup-pack/REVIEW_METRICS.md`
   - 生产健康和发布：`docs/startup-pack/LAUNCH_CHECKLIST.md`
   - 审计：`docs/audits/README.md`
   - 台账：`docs/ledgers/README.md`
5. 执行用户当前明确任务和低风险相邻检查。
6. 结束当天工作前更新 `docs/ledgers/PROGRESS_TRACKING.md`。

## 3. 每日收口规则

- 完成项用 `[x]` 勾选，并写证据路径、命令或外部状态。
- `今日待办` 和 `明日待办` 不打勾；完成后移动到 `今日完成`。
- `明日待办` 必须具体到页面、数据源、npm/GitHub/Vercel/GSC 状态、命令或审批闸口。
- 阻塞项必须写清需要用户做什么，以及用户确认后从哪里继续。
- 不能把未运行检查、未授权平台、未发布版本、未验证下载量或未完成 tester 反馈写成已完成。

## 4. 可视化面板口径

后续如果开发可视化面板，面板应读取 `docs/ledgers/PROGRESS_TRACKING.md` 的固定字段，展示 SEO、npm、alpha tester、增长渠道、阻塞项和次日继续项。

## Dashboard 日更规则

- `docs/ledgers/PROGRESS_TRACKING.md` 是 dashboard 的每日进度事实源。
- 每天开始工作时，如果最新日期块早于今天，先把上一条 `明日待办` 承接为今天的 `今日待办`；如果上一条 `明日待办` 为空，则用本文件的 `Current task`、`Resume point` 或当前阶段生成一条可执行待办。
- 当天完成的事项必须从 `今日待办` 移到 `今日完成`，并使用 `[x]`；没有证据的事项不得写入完成。
- 收工前必须补齐下一天 `明日待办`，否则第二天 dashboard 只能显示兜底待办。
