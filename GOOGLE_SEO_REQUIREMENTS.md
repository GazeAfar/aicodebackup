# Google SEO Requirements

This document defines the current SEO rules for the public AICodeBackup website and future public content pages. Public pages target the US market and should use English by default.

Canonical host:

```text
https://www.aicodebackup.com
```

## Core Rules

- Serve users first. Every indexable page must answer a clear user problem.
- Use static HTML or server-rendered content for core page copy, headings, metadata, links, and structured data.
- Use one descriptive `<title>` and one descriptive `meta description` per indexable page.
- Keep visible page content, title, H1, canonical URL, Open Graph URL, Twitter URL, and sitemap URL aligned around the same search intent.
- Avoid thin pages, duplicate templates, misleading claims, invented reviews, keyword stuffing, or pages generated only to target keyword variations.
- Do not promise Google indexing, ranking, traffic, revenue, or conversion outcomes.

## Metadata

- Each indexable page must include a unique `<title>`.
- Each indexable page must include a unique `meta description`.
- Public pages may include `meta keywords` for third-party audit compatibility, but the page must not rely on it for Google SEO.
- Each indexable page must include an absolute canonical URL using `https://www.aicodebackup.com`.
- Each core page must include Open Graph and Twitter card metadata.
- Only add `twitter:site` after an official AICodeBackup X account exists.

## Domain Canonicalization

Use this production URL everywhere:

```text
https://www.aicodebackup.com
```

Required 301 redirects:

```text
http://aicodebackup.com        -> https://www.aicodebackup.com
https://aicodebackup.com       -> https://www.aicodebackup.com
http://www.aicodebackup.com    -> https://www.aicodebackup.com
```

Vercel configuration must keep `www.aicodebackup.com` as the primary production domain and redirect the apex domain to the `www` domain with status code `301`. Do not promote `*.vercel.app` URLs as public URLs.

## Content Structure

- Use exactly one primary H1 per indexable page.
- Use H2 and H3 elements for real content hierarchy.
- Use crawlable `<a href="...">` links for important navigation and CTAs.
- Keep all public homepage content in English.
- Include the official contact email where users expect contact information:

```text
hello@aicodebackup.com
```

## Images and Media

- Provide a favicon.
- Provide an Open Graph and Twitter preview image for core public pages.
- Use descriptive `alt` text for meaningful images.
- Use empty `alt=""` only for decorative images.
- Do not place important text only inside images.

## Robots and Sitemap

- Provide `robots.txt`.
- Provide `sitemap.xml`.
- Do not block core pages, CSS, JavaScript, or images required for rendering.
- Sitemap URLs must use only canonical production URLs.
- Do not include Vercel preview URLs, internal pages, test pages, or unfinished pages in the sitemap.

## Structured Data

- Use JSON-LD for structured data.
- Use schema types that match visible page content, such as `SoftwareApplication`, `Organization`, or `WebSite`.
- Do not add fake ratings, fake reviews, unsupported pricing claims, or relationships not visible on the page.

## Mobile, Performance, and Accessibility

- Public pages must work on mobile and desktop.
- Text must not overlap, clip, or become unreadable across common viewport sizes.
- CTAs and navigation must remain accessible by keyboard.
- Avoid intrusive popups or forced login walls on public SEO pages.
- Keep the homepage lightweight and avoid unnecessary client-side JavaScript.

## Launch Checklist

- Title is unique and descriptive.
- Meta description is unique and useful.
- Canonical URL points to `https://www.aicodebackup.com`.
- Apex domain redirects with `301` to `https://www.aicodebackup.com`.
- `robots.txt` is available and references the canonical sitemap.
- `sitemap.xml` includes only canonical URLs.
- Open Graph and Twitter card tags are present.
- JSON-LD is valid and reflects visible content.
- Homepage is static and crawlable.
- Mobile layout is readable.
- Contact email is `hello@aicodebackup.com`.

## Official References

- Google SEO Starter Guide: https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- Google helpful content guidance: https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- Google supported meta tags: https://developers.google.com/search/docs/crawling-indexing/special-tags
- Google canonicalization guidance: https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- Google sitemap guidance: https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview
- Vercel domains: https://vercel.com/docs/domains
- Vercel redirects: https://vercel.com/docs/redirects
