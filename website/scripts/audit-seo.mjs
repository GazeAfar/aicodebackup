import { existsSync, readFileSync } from "node:fs";
import { log } from "node:console";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { env } from "node:process";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const publicRoot = join(root, "public");
const vercelPath = join(root, "vercel.json");
const robotsPath = join(publicRoot, "robots.txt");
const sitemapPath = join(publicRoot, "sitemap.xml");

const vercel = readFileSync(vercelPath, "utf8");
const robots = readFileSync(robotsPath, "utf8");
const sitemap = readFileSync(sitemapPath, "utf8");

const canonicalHost = "https://www.aicodebackup.com";
const canonicalHome = `${canonicalHost}/`;
const contactEmail = "hello@aicodebackup.com";
const failures = [];

function check(condition, message) {
  if (!condition) {
    failures.push(message);
  }
}

function pagePathFromUrl(url) {
  const path = url.replace(canonicalHost, "");
  if (path === "/") {
    return join(publicRoot, "index.html");
  }
  return join(publicRoot, path, "index.html");
}

function extract(html, pattern) {
  return html.match(pattern)?.[1] ?? "";
}

function count(html, pattern) {
  return [...html.matchAll(pattern)].length;
}

function attr(tag, name) {
  return tag.match(new RegExp(`${name}="([^"]*)"`))?.[1] ?? "";
}

const sitemapUrls = [...sitemap.matchAll(/<loc>(https:\/\/www\.aicodebackup\.com\/[^<]*)<\/loc>/g)].map(
  (match) => match[1],
);

check(sitemapUrls.length >= 6, "sitemap.xml should include homepage, guides, legal pages, and guide articles.");
check(new Set(sitemapUrls).size === sitemapUrls.length, "sitemap.xml must not include duplicate URLs.");

for (const url of sitemapUrls) {
  const filePath = pagePathFromUrl(url);
  check(existsSync(filePath), `Sitemap URL has no matching local page: ${url}`);
  if (!existsSync(filePath)) {
    continue;
  }

  const html = readFileSync(filePath, "utf8");
  const pageLabel = url.replace(canonicalHost, "") || "/";
  const title = extract(html, /<title>([^<]+)<\/title>/);
  const description = extract(html, /<meta\s+name="description"\s+content="([^"]+)"\s*\/>/);
  const canonical = extract(html, /<link rel="canonical" href="([^"]+)"\s*\/>/);

  check(title.length >= 30 && title.length <= 65, `${pageLabel}: title should be 30-65 characters. Current: ${title.length}.`);
  check(description.length >= 110 && description.length <= 165, `${pageLabel}: meta description should be 110-165 characters. Current: ${description.length}.`);
  check(count(html, /<h1\b/g) === 1, `${pageLabel}: page must contain exactly one H1.`);
  check(html.includes('<html lang="en">'), `${pageLabel}: page must use html lang en.`);
  check(html.includes('<meta name="viewport" content="width=device-width, initial-scale=1" />'), `${pageLabel}: missing mobile viewport.`);
  check(canonical === url, `${pageLabel}: canonical must match sitemap URL.`);
  check(html.includes(`property="og:url" content="${url}"`), `${pageLabel}: Open Graph URL must match canonical URL.`);
  check(html.includes('property="og:image" content="https://www.aicodebackup.com/assets/social-preview.png"'), `${pageLabel}: missing canonical Open Graph image.`);
  check(html.includes('name="twitter:card" content="summary_large_image"'), `${pageLabel}: missing Twitter summary_large_image card.`);
  check(html.includes('name="twitter:image" content="https://www.aicodebackup.com/assets/social-preview.png"'), `${pageLabel}: missing canonical Twitter image.`);
  check(!html.includes("twitter:site"), `${pageLabel}: twitter:site must not be set before an official X account exists.`);
  check(!/[\u4e00-\u9fff]/.test(html), `${pageLabel}: public page must be English-only.`);
  check(!/vercel\.app/i.test(html), `${pageLabel}: page must not promote vercel.app URLs.`);
  check(!/<script(?![^>]*type="application\/ld\+json")/i.test(html), `${pageLabel}: page must not depend on client-side JavaScript.`);

  const anchorTags = [...html.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)];
  check(anchorTags.length >= 3, `${pageLabel}: page should expose crawlable navigation and contact links.`);
  for (const [, href, body] of anchorTags) {
    check(!href.startsWith("javascript:"), `${pageLabel}: link must be crawlable: ${href}`);
    check(body.replace(/<[^>]*>/g, "").trim().length > 0, `${pageLabel}: link needs visible anchor text: ${href}`);
  }
}

const homepage = readFileSync(join(publicRoot, "index.html"), "utf8");
check(homepage.includes(contactEmail), "Homepage must include the official contact email.");
check(homepage.includes("&copy; 2026 AICodeBackup"), "Footer must use the HTML copyright entity.");
check(homepage.includes("/privacy/") && homepage.includes("/terms/"), "Homepage footer must link to Privacy Policy and Terms of Use.");
check(homepage.includes("/guides/backup-ai-generated-code/"), "Homepage must link to the AI-generated code backup guide.");
check(homepage.includes("/guides/github-backup-for-vibe-coders/"), "Homepage must link to the vibe coder GitHub backup guide.");
check(homepage.includes('application/ld+json'), "Homepage must include JSON-LD structured data.");

try {
  const jsonLd = JSON.parse(extract(homepage, /<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/));
  check(jsonLd["@type"] === "SoftwareApplication", "JSON-LD must describe the visible software application.");
  check(jsonLd.url === canonicalHome, "JSON-LD URL must use canonical homepage URL.");
  check(jsonLd.publisher?.email === contactEmail, "JSON-LD publisher email must use official contact email.");
  check(jsonLd.operatingSystem === "Windows, macOS", "JSON-LD must declare Windows and macOS support.");
} catch (error) {
  failures.push(`Homepage JSON-LD must be valid JSON: ${error.message}`);
}

const imgTags = [...homepage.matchAll(/<img\b[^>]*>/g)].map((match) => match[0]);
check(imgTags.length > 0, "Homepage must include a meaningful visual asset.");
for (const tag of imgTags) {
  check(attr(tag, "alt").trim().length > 0, `Homepage image is missing descriptive alt text: ${tag}`);
  check(attr(tag, "width").trim().length > 0 && attr(tag, "height").trim().length > 0, `Homepage image needs stable width and height: ${tag}`);
}

check(robots.includes("User-agent: *"), "robots.txt must define user-agent.");
check(robots.includes(`Sitemap: ${canonicalHost}/sitemap.xml`), "robots.txt must reference canonical sitemap.");
check(!/Disallow:\s*\//i.test(robots), "robots.txt must not block the public site.");
check(!/vercel\.app/i.test(sitemap), "sitemap.xml must not include Vercel preview URLs.");

for (const path of ["styles.css", "assets/product-preview.svg", "assets/social-preview.svg", "assets/social-preview.png", "favicon.svg"]) {
  check(existsSync(join(publicRoot, path)), `Missing public asset: ${path}`);
}

const socialPreview = readFileSync(join(publicRoot, "assets/social-preview.svg"), "utf8");
check(socialPreview.includes('width="1200"') && socialPreview.includes('height="630"'), "Social preview SVG should be 1200x630.");

if (!env.VERCEL) {
  check(vercel.includes('"outputDirectory": "public"'), "Vercel output directory must be public.");
  check(vercel.includes('"trailingSlash": true'), "Vercel trailingSlash must match canonical URLs with trailing slash.");
  check(vercel.includes("https://www.aicodebackup.com/$1"), "Vercel redirect must target canonical www URL.");
  check(vercel.includes('"statusCode": 301'), "Vercel apex redirect must explicitly use statusCode 301.");
  check(!vercel.includes('"permanent": true'), "Vercel redirect must not rely on permanent:true because it emits 308.");
}

if (failures.length > 0) {
  throw new Error(`SEO audit failed:\n- ${failures.join("\n- ")}`);
}

log(`Website SEO audit passed for ${sitemapUrls.length} pages.`);
