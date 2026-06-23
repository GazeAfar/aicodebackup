# AICodeBackup Startup Pack

本启动包面向已上线的 AICodeBackup 项目，用来约束后续 SEO 增长、数据复盘、alpha 测试进度跟踪和 stable 发布准备。

## 当前站点事实

- Product: `AICodeBackup`
- Type: npm CLI + static marketing website
- Production URL: `https://www.aicodebackup.com`
- Package: `aicodebackup`
- Main audience: 美国市场里使用 Codex、Claude Code、Cursor、Trae、Gemini CLI 等 AI coding agent 的开发者和 vibe coders。
- Core promise: 自动把 AI 生成代码备份到私有 GitHub 仓库，降低丢代码、不会 Git、忘记提交和本地目录混乱的风险。
- Current phase: V0.2 alpha 小范围测试、官网 SEO 获客、安装和 first backup 成功率验证。
- Contact: `hello@aicodebackup.com`

## 文件说明

- `AGENTS.md`: 站点级执行边界和自动交接规则。
- `docs/startup-pack/README.md`: 启动包入口和当前执行方式。
- `docs/startup-pack/EXECUTION.md`: 当前阶段、断点续跑、审批闸口和每日收口规则。
- `docs/ledgers/PROGRESS_TRACKING.md`: 每日实际进度，固定只保留 `今日待办`、`今日完成`、`明日待办`。
- `docs/startup-pack/SEO_PLAN.md`: Google SEO、页面组、关键词组和上线后优化规则。
- `docs/startup-pack/LAUNCH_CHECKLIST.md`: 已上线站点健康复查、发布前检查和人工审批闸口。
- `docs/startup-pack/REVIEW_METRICS.md`: 周复盘、页面复盘、npm/alpha 测试指标和决策口径。
- `docs/growth-plan.md`: 增长渠道、内容扩展、UTM/referrer 和渠道状态口径。
- `docs/audits/README.md`: SEO、安全、性能、发布和渠道审计证据口径。
- `docs/ledgers/README.md`: 周复盘、渠道、alpha tester、npm release 和页面优化台账字段。

## 使用原则

- 先复盘真实数据，再决定优化动作。
- 没有证据的数据标记为 `Insufficient Data`，不补写成已完成。
- 官网 SEO、README、npm package 页面、GitHub repo 和 alpha tester 文档必须保持承诺一致。
- 所有生产发布、npm 发布、账号登录、token、DNS、Vercel 配置和公开外联都必须先经过用户确认。
