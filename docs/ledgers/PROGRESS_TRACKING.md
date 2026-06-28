# AICodeBackup Progress Tracking

本文件是 dashboard 的事实源，记录 AICodeBackup 的日进度。最新日期块放在最上面。

## 使用规则

- 每个日期块只保留三个小节：`今日待办`、`今日完成`、`明日待办`。
- `今日待办` 和 `明日待办` 不打勾；事项完成后，从待办移动到 `今日完成`。
- `今日完成` 必须使用 `[x]`，并写清文件、命令、外部平台状态或用户确认等证据。
- 如果最新日期块早于今天，dashboard 会把上一条 `明日待办` 显示为今天的 `今日待办`；开始工作前应点击或手动生成当天日期块，让 Markdown 事实源和面板保持一致。
- 如果上一条 `明日待办` 为空，今天的待办应从 `docs/startup-pack/EXECUTION.md` 的 `Current task`、`Resume point` 或当前阶段生成。
- 不记录账号密码、token、Cookie、支付标识、私人联系信息或无关用户隐私。

## 2026-06-28

### 今日待办
- 本轮决策已收口；见 `今日完成` 和 `明日待办`。

### 今日完成
- [x] 补齐公开可验证数据，并将缺失平台数据保持为 `Insufficient Data`。
  - Evidence: `npm view aicodebackup version dist-tags description --json`：`latest=0.1.0-alpha.5`，`alpha=0.2.0-alpha.2`。
  - Evidence: npm downloads API：`2026-06-22..2026-06-28` 为 37 downloads，`2026-05-30..2026-06-28` 为 645 downloads。
  - Evidence: GitHub API：`GazeAfar/aicodebackup` 为 3 stars、0 forks、0 open issues、default branch `main`、topics 为空。
  - Evidence: AICodeBackup 线上首页包含 GA4 loader、`gtag('config')` 和 Measurement ID；GSC Search Analytics API 可读取 `sc-domain:aicodebackup.com`，`2026-05-31..2026-06-27` 返回点击 1、曝光 14、CTR 7.14%、平均排名 9.07。
- [x] 确认 AICodeBackup 的 GA4/GSC 接入任务可关闭，后续进入数据复盘。
  - Evidence: 静态站构建脚本 `website/scripts/sync-zh-cn-pages.mjs` 注入 GA4，`website/scripts/audit-seo.mjs` 校验 GA4；GSC API 查询 `sc-domain:aicodebackup.com` 返回 OK；工厂 dashboard 记录 Vercel 首个 Ready Production 部署日期为 `2026-06-17`。
- [x] 刷新 stable 准备的低风险本地检查。
  - Evidence: `npm run build` 通过。
  - Evidence: `npm test` 通过，9 test files / 46 tests。
  - Evidence: `npm run lint` 通过。
  - Evidence: `cd website && npm run verify` 通过，Website SEO audit passed for 30 pages。
- [x] 核对官网安装入口和 npm 包口径，完成优先级决策。
  - Evidence: `https://www.aicodebackup.com/` 和 `/guides/` 返回 200，均包含 `npm install -g aicodebackup@alpha` 和安装 CTA。
  - Evidence: `npm view aicodebackup@alpha version readmeFilename homepage repository keywords --json`：`version=0.2.0-alpha.2`，`readmeFilename=README.zh-CN.md`，`homepage/repository` 未返回。
  - Evidence: `npm view aicodebackup@latest version readmeFilename homepage repository keywords --json`：`version=0.1.0-alpha.5`，`readmeFilename` 为空，`homepage/repository` 未返回。
  - Evidence: `npm pack --dry-run --json` 确认本地包会包含 `README.md` 和 `README.zh-CN.md`。
  - Decision: 优先处理 `README / npm / 官网一致性`。当前 npm 默认入口、readme metadata、homepage/repository metadata 和 GitHub topics 是增长前的公开入口缺口；alpha tester 仍缺反馈证据，增长渠道草稿应在公开入口口径收敛后推进。

### 明日待办
- 起草并实施 README/npm/官网一致性修复：核对 `package.json` 的 `repository`、`homepage`、`bugs`、keywords、README 主语言、npm readme 显示路径、官网安装说明和 GitHub repo description/topics。
- 产出 npm 发布前检查清单；如需要 npm publish、dist-tag、release tag、GitHub release 或 token 操作，停在人工确认闸口。
- 继续收集 alpha tester 反馈，至少补齐 tester 类型、OS、setup 完成、first backup 完成、confusing step 和 error message。
- 在公开入口一致性和 tester 反馈有证据后，再准备增长渠道草稿和 UTM/referrer 字段。

## 2026-06-25

### 今日待办
- 补 npm downloads、GitHub 仓库状态、GSC/analytics 和官网访问数据；缺失数据标记为 `Insufficient Data`。
- 若进入 stable 准备，运行 package build/test/lint 和 website verify，并核对 README、npm 页面、官网安装说明和 CLI 行为是否一致。
- 收集 alpha tester 反馈，归类为安装问题、文档问题、CLI 行为问题、备份成功率问题或发布阻塞。

### 今日完成
- [x] 更新 `docs/startup-pack/EXECUTION.md` 和 `docs/ledgers/PROGRESS_TRACKING.md`，明确 AICodeBackup 今日数据复盘和 stable 准备入口。
  - Evidence: `docs/startup-pack/EXECUTION.md`、`docs/ledgers/PROGRESS_TRACKING.md`

### 明日待办
- 根据今天补齐的数据，决定优先修 README/npm/官网一致性、alpha tester 阻塞，还是准备增长渠道草稿。
- 如涉及 npm publish、dist-tag、release tag、GitHub release 或 token 操作，先停在人工确认闸口。

## 2026-06-24

### 今日待办
- `待填写`

### 今日完成
- [x] 统一进度台账为 dashboard 三段式滚动规则：当天无记录时，从上一条 `明日待办` 承接到今天的 `今日待办`。
  - Evidence: `docs/ledgers/PROGRESS_TRACKING.md`
- [x] 更新启动执行文档，明确每日启动、收工和事实源写回规则。
  - Evidence: `docs/startup-pack/EXECUTION.md`

### 明日待办
- 继续处理今天未完成的待办，并在收工前更新 `今日完成` 和下一天 `明日待办`。

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
