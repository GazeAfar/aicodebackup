# AICodeBackup Website

This is the static English marketing website for AICodeBackup.

Canonical production URL:

```text
https://www.aicodebackup.com
```

Contact email:

```text
hello@aicodebackup.com
```

## Local Verification

Run the static SEO and deployment checks:

```bash
npm run verify
```

Run a local static server from this directory:

```bash
python -m http.server 4173 --directory public
```

Then open:

```text
http://localhost:4173
```

## Vercel Deployment

Create a Vercel project with these settings:

- Framework preset: Other
- Root directory: `website`
- Build command: `npm run build`
- Output directory: `.`
- Production domain: `www.aicodebackup.com`

Add both domains to the project:

```text
www.aicodebackup.com
aicodebackup.com
```

Set `www.aicodebackup.com` as the primary production domain. Configure the apex domain to permanently redirect to the `www` domain. The included `vercel.json` also defines a permanent redirect from `aicodebackup.com` to `https://www.aicodebackup.com`.

## DNS Checklist

- Point `www.aicodebackup.com` to Vercel.
- Point `aicodebackup.com` to Vercel.
- Confirm Vercel shows valid SSL for both domains.
- Confirm `https://aicodebackup.com` returns a 301 to `https://www.aicodebackup.com`.
- Confirm `https://www.aicodebackup.com` returns 200.

## SEO Checklist

- `index.html` includes title, description, keywords, canonical URL, Open Graph tags, Twitter card tags, and JSON-LD.
- `robots.txt` references the canonical sitemap.
- `sitemap.xml` only lists `https://www.aicodebackup.com/`.
- The page is rendered as static HTML and does not depend on client-side JavaScript for primary content.
- Social preview image is available at `/assets/social-preview.svg`.
