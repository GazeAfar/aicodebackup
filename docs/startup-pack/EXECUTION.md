# AICodeBackup Execution Control

本文件是已上线项目的当前执行控制页。Codex 每次处理增长、SEO 复查、数据复盘、alpha 测试或 stable 发布准备任务时，先读 `AGENTS.md` 和本文件，再读最新进度记录。

## 1. 当前状态

- Site: `AICodeBackup`
- Stage: `上线后持续运营：08 增长外链 / 09 数据复盘 / 06B 持续 SEO / 07B 生产健康复查 / Stable 发布准备`
- Current owner: Codex
- Last updated: `2026-06-20`
- Current task: `根据 dashboard 读取的“明天继续”项，推进增长渠道、npm downloads 观察、数据复盘或 stable 发布准备。`
- Current gate: `无；涉及 npm 发布、账号授权、付费工具、DNS、生产发布或批量公开发布时再暂停确认。`
- Resume point: 打开 dashboard，选择 AICodeBackup，按“今日工作台”中的今天要做、当前卡点和断点续跑继续。
- Next automatic handoff: 按 `AGENTS.md` 的 Autopilot Pipeline 交接。

## 2. Dashboard 每日启动规则

1. 每天开始工作时，先打开 dashboard，点击本项目。
2. 先看“今日工作台”的今天要做、当前卡点、断点续跑和最新记录日期。
3. 如果今天要做为空或过期，读取 `docs/ledgers/PROGRESS_TRACKING.md` 最新日期块，先把今天目标补成可执行动作。
4. 只执行当前用户明确任务和低风险相邻检查；涉及 npm 发布、账号、支付、DNS、生产发布、批量公开发布时停在审批闸口。
5. 结束当天工作前，必须更新 `docs/ledgers/PROGRESS_TRACKING.md`，否则第二天 dashboard 不会有可靠任务来源。

## 3. 执行顺序

1. 读取 `AGENTS.md`，确认已上线项目边界、npm 发布边界和人工审批事项。
2. 读取本文件，确认当前增长/复盘/stable 准备阶段、审批闸口和断点。
3. 读取 `docs/ledgers/PROGRESS_TRACKING.md`，确认最近一次完成项、未完成项和次日继续项。
4. 按任务读取：
   - SEO：`docs/startup-pack/SEO_PLAN.md`
   - 增长：`docs/growth-plan.md`
   - 复盘：`docs/startup-pack/REVIEW_METRICS.md`
   - 生产健康和发布：`docs/startup-pack/LAUNCH_CHECKLIST.md`
   - 审计：`docs/audits/README.md`
   - 台账：`docs/ledgers/README.md`
5. 执行用户当前明确任务和低风险相邻检查。
6. 结束当天工作前更新 `docs/ledgers/PROGRESS_TRACKING.md`。

## 4. 每日收口规则

- 完成项用 `[x]` 勾选，并写证据路径、命令或外部状态。
- 未完成项用 `[ ]` 保留，并写原因。
- 明天继续项必须具体到页面、数据源、npm/GitHub/Vercel/GSC 状态、命令或审批闸口。
- 阻塞项必须写清需要用户做什么，以及用户确认后从哪里继续。
- 不能把未运行检查、未授权平台、未发布版本、未验证下载量或未完成 tester 反馈写成已完成。

## 5. Dashboard 读取口径

dashboard 读取本文件的 `Stage`、`Current task`、`Current gate`、`Resume point`，并读取 `docs/ledgers/PROGRESS_TRACKING.md` 最新日期块中的今日目标、今日完成、未完成/阻塞、明天继续、当前闸口和今日总结。Markdown 是事实源；面板只是展示和写回入口。
