import { existsSync, readFileSync } from "node:fs";
import { log } from "node:console";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { env } from "node:process";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const publicRoot = join(root, "public");
const indexPath = join(publicRoot, "index.html");
const vercelPath = join(root, "vercel.json");
const robotsPath = join(publicRoot, "robots.txt");
const sitemapPath = join(publicRoot, "sitemap.xml");

const index = readFileSync(indexPath, "utf8");
const vercel = readFileSync(vercelPath, "utf8");
const robots = readFileSync(robotsPath, "utf8");
const sitemap = readFileSync(sitemapPath, "utf8");

const canonicalUrl = "https://www.aicodebackup.com/";
const contactEmail = "hello@aicodebackup.com";

const failures = [];

function check(condition, message) {
  if (!condition) {
    failures.push(message);
  }
}

function matchOne(pattern, label) {
  const match = index.match(pattern);
  check(Boolean(match), `Missing ${label}.`);
  return match?.[1] ?? "";
}

function attr(tag, name) {
  const match = tag.match(new RegExp(`${name}="([^"]*)"`));
  return match?.[1] ?? "";
}

function count(pattern) {
  return [...index.matchAll(pattern)].length;
}

const title = matchOne(/<title>([^<]+)<\/title>/, "title");
const description = matchOne(/<meta\s+name="description"\s+content="([^"]+)"\s*\/>/, "meta description");
const h1 = matchOne(/<h1[^>]*>([^<]+)<\/h1>/, "H1");

check(title.length >= 45 && title.length <= 60, `Title should be 45-60 characters. Current: ${title.length}.`);
check(description.length >= 120 && description.length <= 160, `Meta description should be 120-160 characters. Current: ${description.length}.`);
check(count(/<h1\b/g) === 1, "Homepage must contain exactly one H1.");
check(h1.includes("AI-generated code"), "H1 must match the homepage search intent.");
check(index.includes('<html lang="en">'), "Homepage must use html lang en.");
check(index.includes('<meta name="viewport" content="width=device-width, initial-scale=1" />'), "Missing mobile viewport.");
check(index.includes(`<link rel="canonical" href="${canonicalUrl}" />`), "Canonical URL must use https://www.aicodebackup.com/.");
check(index.includes('name="keywords"'), "Missing meta keywords for third-party audit compatibility.");
check(index.includes(`<meta property="og:url" content="${canonicalUrl}" />`), "Open Graph URL must use canonical URL.");
check(index.includes('property="og:image" content="https://www.aicodebackup.com/assets/social-preview.png"'), "Missing canonical Open Graph image.");
check(index.includes('property="og:image:width" content="1200"'), "Open Graph image width must be declared.");
check(index.includes('property="og:image:height" content="630"'), "Open Graph image height must be declared.");
check(index.includes('name="twitter:card" content="summary_large_image"'), "Missing Twitter summary_large_image card.");
check(index.includes('name="twitter:image" content="https://www.aicodebackup.com/assets/social-preview.png"'), "Missing canonical Twitter image.");
check(!index.includes("twitter:site"), "twitter:site must not be set before an official X account exists.");
check(index.includes(contactEmail), "Homepage must include the official contact email.");
check(!/[\u4e00-\u9fff]/.test(index), "Public homepage must be English-only.");
check(!/vercel\.app/i.test(index), "Homepage must not promote vercel.app URLs.");
check(!/<script(?![^>]*type="application\/ld\+json")/i.test(index), "Homepage must not depend on client-side JavaScript.");

const imgTags = [...index.matchAll(/<img\b[^>]*>/g)].map((match) => match[0]);
check(imgTags.length > 0, "Homepage must include a meaningful visual asset.");
for (const tag of imgTags) {
  check(attr(tag, "alt").trim().length > 0, `Image is missing descriptive alt text: ${tag}`);
  check(attr(tag, "width").trim().length > 0 && attr(tag, "height").trim().length > 0, `Image needs stable width and height: ${tag}`);
}

const anchorTags = [...index.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)];
check(anchorTags.length >= 5, "Homepage should expose crawlable navigation and CTA links.");
for (const [, href, body] of anchorTags) {
  check(!href.startsWith("javascript:"), `Link must be crawlable: ${href}`);
  check(body.replace(/<[^>]*>/g, "").trim().length > 0, `Link needs visible anchor text: ${href}`);
}

const jsonLd = matchOne(/<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/, "JSON-LD");
try {
  const schema = JSON.parse(jsonLd);
  check(schema["@type"] === "SoftwareApplication", "JSON-LD must describe the visible software application.");
  check(schema.url === canonicalUrl, "JSON-LD URL must use canonical URL.");
  check(schema.publisher?.email === contactEmail, "JSON-LD publisher email must use official contact email.");
  check(schema.operatingSystem === "Windows, macOS", "JSON-LD must declare Windows and macOS support.");
} catch (error) {
  failures.push(`JSON-LD must be valid JSON: ${error.message}`);
}

check(robots.includes("User-agent: *"), "robots.txt must define user-agent.");
check(robots.includes(`Sitemap: ${canonicalUrl}sitemap.xml`), "robots.txt must reference canonical sitemap.");
check(!/Disallow:\s*\//i.test(robots), "robots.txt must not block the public site.");
check(sitemap.includes(`<loc>${canonicalUrl}</loc>`), "sitemap.xml must include only the canonical homepage URL.");
check(!/vercel\.app/i.test(sitemap), "sitemap.xml must not include Vercel preview URLs.");

for (const path of ["styles.css", "assets/product-preview.svg", "assets/social-preview.svg", "assets/social-preview.png", "favicon.svg"]) {
  check(existsSync(join(publicRoot, path)), `Missing public asset: ${path}`);
}

const socialPreview = readFileSync(join(publicRoot, "assets/social-preview.svg"), "utf8");
check(socialPreview.includes('width="1200"') && socialPreview.includes('height="630"'), "Social preview image should be 1200x630.");

if (!env.VERCEL) {
  check(vercel.includes('"outputDirectory": "public"'), "Vercel output directory must be public.");
  check(vercel.includes("https://www.aicodebackup.com/$1"), "Vercel redirect must target canonical www URL.");
  check(vercel.includes('"statusCode": 301'), "Vercel apex redirect must explicitly use statusCode 301.");
  check(!vercel.includes('"permanent": true'), "Vercel redirect must not rely on permanent:true because it emits 308.");
}

if (failures.length > 0) {
  throw new Error(`SEO audit failed:\n- ${failures.join("\n- ")}`);
}

log("Website SEO audit passed.");
