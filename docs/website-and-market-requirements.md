# Website and Market Requirements

## Market and Language

AICodeBackup primarily targets users in the United States.

Default public-facing language:

- Website: English first.
- README: English first.
- CLI: English by default.
- Release notes: English first.
- Social posts and launch copy: English first.

Chinese can be supported as a secondary language, but it must not be the default presentation for public-facing product pages.

## Platform Support

The product must support both:

- Windows
- Apple macOS

Website and documentation must include setup instructions for both platforms.

CLI behavior must be tested on:

- Windows PowerShell
- macOS Terminal

Key flows to verify on both platforms:

- Node.js availability.
- Git installation check.
- GitHub CLI installation check.
- `gh auth login`.
- `aicodebackup setup`.
- `aicodebackup backup`.
- `aicodebackup doctor`.

## Canonical Domain

Canonical domain:

```text
https://www.aicodebackup.com
```

All public references must use:

```text
https://www.aicodebackup.com
```

Do not use these as canonical URLs:

```text
https://aicodebackup.com
http://aicodebackup.com
http://www.aicodebackup.com
https://*.vercel.app
```

## Domain Redirects

Required redirects:

```text
http://aicodebackup.com        -> https://www.aicodebackup.com
https://aicodebackup.com       -> https://www.aicodebackup.com
http://www.aicodebackup.com    -> https://www.aicodebackup.com
```

The apex domain must permanently redirect to the `www` domain.

Use Vercel domain redirects or equivalent permanent redirects. For SEO language, call this domain canonicalization.

Vercel notes:

- Add both `aicodebackup.com` and `www.aicodebackup.com` to the Vercel project.
- Set `www.aicodebackup.com` as the primary production domain.
- Add a permanent domain redirect from `aicodebackup.com` to `www.aicodebackup.com`.
- Ensure the default `*.vercel.app` deployment URL is not promoted as the public URL.

## Contact Email

Use this contact email everywhere:

```text
hello@aicodebackup.com
```

Required locations:

- Website footer.
- README contact section.
- GitHub repository metadata if applicable.
- Privacy/contact pages when added.
- Product Hunt and launch profiles.

## Google SEO Requirements

The official website must satisfy these baseline requirements before launch:

- Uses semantic HTML.
- Has a unique, descriptive `<title>` on every public page.
- Has a unique meta description on every public page.
- Uses canonical links pointing to `https://www.aicodebackup.com`.
- Provides `robots.txt`.
- Provides `sitemap.xml`.
- Uses HTTPS only.
- Has Open Graph and Twitter/X card tags.
- Includes JSON-LD structured data for `SoftwareApplication` or `WebSite`.
- Has crawlable content without requiring client-side interaction.
- Works well on mobile.
- Has accessible headings, labels, contrast, and keyboard navigation.
- Avoids duplicate content across apex, www, and Vercel preview domains.

Recommended homepage target keywords:

- AI code backup
- AI coding backup
- backup AI-generated code
- GitHub backup for vibe coders
- automatic GitHub backup
- Codex backup
- Claude Code backup
- Cursor backup

## Homepage Requirements

The first production homepage must communicate:

- Product name: AICodeBackup.
- Core promise: Never lose your AI-generated code again.
- Target user: AI coding users who do not want to learn Git.
- Main outcome: Back up local projects to private GitHub repositories.
- Install command.
- 3-step usage flow.
- Windows and macOS compatibility.
- GitHub private repository default.
- Alpha or stable release status.
- Contact email: `hello@aicodebackup.com`.

## Vercel Deployment Requirements

When deploying the website on Vercel:

- Production domain must be `www.aicodebackup.com`.
- Apex domain must permanently redirect to `www.aicodebackup.com`.
- Project settings and generated metadata must use `https://www.aicodebackup.com`.
- Any `vercel.json` redirects must preserve path and query where appropriate.
- Verify redirects with:

```bash
curl -I https://aicodebackup.com
curl -I http://aicodebackup.com
curl -I http://www.aicodebackup.com
curl -I https://www.aicodebackup.com
```

Expected:

- Non-canonical URLs return a permanent redirect to `https://www.aicodebackup.com`.
- Canonical URL returns `200`.

## Launch Timing

Before public promotion on X, Reddit, or Product Hunt:

- npm Alpha install must work.
- At least 3 new-user tests must complete.
- Windows and macOS setup must be tested.
- Website must be live at `https://www.aicodebackup.com`.
- Canonical redirects must be verified.
- Basic SEO files must be present.

Product Hunt should wait until:

- Stable npm release is available.
- Website is polished.
- Demo GIF or short video exists.
- At least 5 to 10 target users have tested the product.
