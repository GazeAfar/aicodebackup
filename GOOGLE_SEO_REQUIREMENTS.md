# Google SEO Requirements

本文件是 AICodeBackup 官网和公开内容页的 Google SEO 约束文档。它用于约束首页、产品页、文档页、下载页、教程页、博客页、定价页、FAQ、比较页和后续增长页面。

默认权威主机：`https://www.aicodebackup.com`

## 1. 基本原则

- 页面必须先服务用户，再服务搜索引擎。每个可索引页面都要解决一个明确问题，不能只为覆盖关键词而发布。
- 不发布薄内容、重复内容、只替换关键词的模板页、自动拼接页或缺少事实支撑的 AI 草稿。
- 公开页面默认使用英文，面向美国市场；内部执行说明可以使用中文。
- 任何 SEO 页面都必须能回答：这个页面适合谁、解决什么问题、用户下一步应该做什么、页面信息是否比普通搜索结果更有帮助。
- 不能承诺 Google 收录、排名、收入或搜索流量。

## 2. Title 和 Meta Description

- 每个可索引页面必须有唯一、描述性、简洁的 `<title>`。
- Title 默认目标长度为 45-60 个英文字符；超过 60 个英文字符时必须人工复核是否会被截断或影响可读性。
- Title、H1、首屏主标题和主要 CTA 必须围绕同一个搜索意图。
- Title 不得关键词堆砌，不得全站重复套模板。品牌名只在需要时放在末尾，例如 `Primary Keyword | AICodeBackup`。
- 每个可索引页面必须有唯一的 `meta description`。
- Meta description 默认目标长度为 120-160 个英文字符；应说明页面价值、适用用户和主要动作。
- 不添加 `meta keywords`。Google 不把 `meta keywords` 作为搜索约束；关键词目标应体现在页面内容、标题、H1、内链和页面结构里。

## 3. Canonical、域名和 URL 规范化

- 唯一生产权威 URL 必须使用 `https://www.aicodebackup.com`。
- `https://aicodebackup.com` 必须 301 到 `https://www.aicodebackup.com`。
- `http://aicodebackup.com` 和 `http://www.aicodebackup.com` 必须 301 到 HTTPS 的 www 版本。
- Vercel 项目必须配置 Domain Canonicalization / Domain Redirect，避免 apex、www、`.vercel.app` 多个地址同时被索引。
- 每个可索引页面必须输出绝对 canonical URL，并指向最终返回 200 的 `https://www.aicodebackup.com/...` URL。
- canonical、sitemap、内部链接、Open Graph URL、Twitter URL、结构化数据 URL 和外部提交 URL 必须统一使用 www 版本。
- 同一站点必须统一尾斜杠策略；canonical、sitemap、内链和重定向结果不得混用 `/path` 与 `/path/`。
- `.vercel.app`、预览域、测试页、内部页、未完成页和薄内容页不能进入 sitemap；可公开访问时必须 noindex 或受访问控制保护。

## 4. 渲染和可抓取性

- 核心 SEO 页面必须使用 SSR/SSG，或至少在首屏 HTML 中输出主要内容、metadata、H1、重要内链和结构化数据。
- 不允许核心正文、FAQ、主要内链或结构化数据只在用户点击后或客户端异步渲染后才出现。
- 重要链接必须使用可抓取的 `<a href="...">`，不能只用 `onclick`、`span`、按钮或 JS 事件模拟链接。
- 404、410、401、403、重定向和错误页必须返回语义正确的 HTTP 状态码；不存在页面不能返回 200。

## 5. 内容质量和页面准入

- 每个页面只回答一个核心问题，避免把多个搜索意图混在一个页面里。
- 首页应清楚说明 AICodeBackup 是什么、适合谁、如何保护 AI 生成代码、下一步如何开始。
- 教程页必须提供可执行步骤、适用系统、前置条件、常见错误和修复方式。
- 比较页必须真实比较，不能编造竞品功能、价格、排名、评分或用户评价。
- FAQ 必须回答真实用户问题，不得为了塞关键词制造低质量问答。
- AI 可参与草稿和整理，但发布前必须人工审查事实、语气、可读性和合规边界。
- 页面内容必须避免误导用户，例如暗示官方合作、自动保证备份成功、绕过 GitHub 政策或承诺不可验证结果。

## 6. Heading、语言和页面结构

- 每个可索引页面默认只有一个主 H1。
- H1 必须与页面主意图一致，不能与 title 或正文主题冲突。
- H2/H3 用于真实内容层级，不为视觉样式滥用。
- `<html lang>` 必须与页面主语言一致；英文页面默认使用 `en` 或 `en-US`。
- 必须存在移动端 viewport，移动端和桌面端应展示一致的核心内容。

## 7. 图片、图标和媒体

- 非装饰图片必须有描述性 `alt`。
- 装饰图片可以使用空 `alt=""`，但不能把重要文字只放在图片里。
- 图片作为链接时，`alt` 必须能表达链接目的。
- 图片 `title` 不是 Google 排名必须项；只有在帮助用户理解或满足审计工具时才补充，且不得关键词堆砌。
- 每个站点必须配置 favicon。
- 每个核心分享页面必须配置可公开访问的社交预览图，默认 `og:image` 和 `twitter:image` 使用 1200x630 或同等大图比例。

## 8. 链接和内链

- 重要内链 anchor text 必须具体、可理解，避免只写 `click here`、`read more`、`learn more`。
- 每个重要页面至少应被一个可抓取页面链接到。
- 首页、安装页、教程页、FAQ、Pricing/下载入口和核心文档页必须形成自然内链。
- 链接 `title` 不是 Google 排名必须项；图标、卡片或短导航链接可补简洁 title，但不能替代可见 anchor text。
- 外链必须指向可信来源；赞助、联盟、广告或用户生成链接按需要使用 `rel="sponsored"`、`rel="ugc"` 或 `nofollow`。

## 9. Open Graph 和 Twitter Card

- 每个核心页面必须配置 `og:title`、`og:description`、`og:type`、`og:url`、`og:site_name`、`og:image`。
- 每个核心页面必须配置 `twitter:card`、`twitter:title`、`twitter:description`、`twitter:image`。
- 只有存在官方 X/Twitter 账号时才配置 `twitter:site`；不得虚构账号。
- 社交预览字段不替代 Google SEO 元信息；title、description、canonical 和页面可见内容仍是主约束。

## 10. Robots、Sitemap 和索引控制

- `robots.txt` 必须可访问，不能屏蔽核心页面、CSS、JS、图片和 SEO 必需资源。
- `sitemap.xml` 必须可访问，只包含应进入搜索结果的 canonical URL。
- sitemap URL 必须全部使用 `https://www.aicodebackup.com`。
- 测试页、内部页、账号页、支付回调、API 路由、参数重复页、失败状态页和薄内容页默认 noindex 或不进入 sitemap。
- 不用 `robots.txt` 解决 canonical 问题；重复 URL 应通过 301、canonical、内链和 sitemap 一致性处理。

## 11. 结构化数据

- 结构化数据默认使用 JSON-LD。
- 按页面类型选择 WebSite、Organization、SoftwareApplication、FAQPage、HowTo、BreadcrumbList、Article 等。
- 结构化数据必须真实代表页面可见内容；不得标注用户看不到的内容、虚假评分、虚假评论、无证据价格或误导性关系。
- 结构化数据中的 URL、image、logo、sameAs 必须可抓取，并与 canonical 主机一致。
- 上线前至少用 Rich Results Test、Schema validator 或等效方式检查关键页面；无法执行时必须记录原因。

## 12. 移动端、性能和页面体验

- 页面必须移动端可用，核心内容在移动端和桌面端保持一致。
- 移动端不得隐藏核心正文、内链、结构化数据对应内容或主要行动入口。
- 核心页面上线前必须做 Lighthouse/PageSpeed 或等效检查；重点关注 LCP、INP、CLS、图片尺寸、懒加载、字体加载和阻塞脚本。
- 不使用妨碍内容访问的弹窗、遮挡式广告、误导性下载按钮或强制登录墙。

## 13. Google Search Console 和 Analytics

- 生产站点默认准备 Google Search Console Domain property 和 `https://www.aicodebackup.com` URL-prefix property。
- sitemap 提交到 Search Console 后，记录提交日期、生产 URL、索引基线和未授权状态。
- 默认接入 GA4、Plausible 或等效 analytics；如果不接入，必须记录原因和替代复盘数据源。
- SEO 复盘至少跟踪 impressions、clicks、CTR、position、indexed pages、top queries、top pages、下载/安装/注册/购买等转化事件。

## 14. 非必需项和第三方工具差异

- `meta keywords` 不作为 Google SEO 要求，不因第三方工具显示 N/A 就补。
- Google AdSense 不是 SEO 必需项；只有商业化选择广告时才配置。
- Hreflang 只在多语言或多地区版本真实存在时配置；单一英文站不添加虚假 hreflang。
- 图片 `title` 和链接 `title` 不是 Google 排名必需项；它们可以作为可访问性、可用性或第三方审计通过项，但不能代替 alt、可见文本和可抓取链接。
- 第三方 SEO 工具的字符数建议可作为审计基线，但不得覆盖 Google 官方原则：描述性、唯一、简洁、对用户有帮助。

## 15. 上线前检查清单

- Title：唯一、描述性、默认 45-60 英文字符；超过 60 已复核。
- Meta description：唯一、描述性、默认 120-160 英文字符。
- H1：每个核心页面一个主 H1，且与搜索意图一致。
- Canonical：绝对 URL，指向 `https://www.aicodebackup.com` 最终 200 页面。
- Redirect：apex 到 www，HTTP 到 HTTPS，Vercel Domain Canonicalization / Domain Redirect。
- Render：核心内容、内链和 metadata 不依赖用户交互后才出现。
- Images：非装饰图有 alt；核心页面有 favicon、`og:image`、`twitter:image`。
- Links：重要链接是 `<a href>`；anchor text 描述性；必要时给图标/卡片链接补 title。
- Social：OG/Twitter 字段完整；`twitter:site` 只在有官方账号时配置。
- Robots/Sitemap：核心页不被屏蔽；sitemap 只含 canonical 生产 URL。
- Schema：JSON-LD 有效，内容真实可见。
- Mobile/Performance：移动端可用，主要 Core Web Vitals 问题已记录或修复。
- GSC/Analytics：Search Console、analytics 和 sitemap 提交流程已准备。

## 16. 官方参考

- Google SEO Starter Guide: https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- Creating helpful, reliable, people-first content: https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- Google Search spam policies: https://developers.google.com/search/docs/essentials/spam-policies
- Title links: https://developers.google.com/search/docs/appearance/title-link
- Snippets and meta descriptions: https://developers.google.com/search/docs/appearance/snippet
- Supported meta tags: https://developers.google.com/search/docs/crawling-indexing/special-tags
- Crawlable links: https://developers.google.com/search/docs/crawling-indexing/links-crawlable
- Image SEO: https://developers.google.com/search/docs/appearance/google-images
- JavaScript SEO basics: https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics
- Canonicalization: https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- Sitemaps: https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview
- Robots meta and X-Robots-Tag: https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag
- Structured data guidelines: https://developers.google.com/search/docs/appearance/structured-data/sd-policies
