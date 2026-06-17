import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { log } from "node:console";
import { env } from "node:process";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const publicRoot = join(root, "public");
const index = readFileSync(join(publicRoot, "index.html"), "utf8");
const vercel = readFileSync(join(root, "vercel.json"), "utf8");
const robots = readFileSync(join(publicRoot, "robots.txt"), "utf8");
const sitemap = readFileSync(join(publicRoot, "sitemap.xml"), "utf8");

const required = [
  ["canonical", '<link rel="canonical" href="https://www.aicodebackup.com/"'],
  ["title", "<title>AICodeBackup - Never lose your AI-generated code again</title>"],
  ["meta description", 'name="description"'],
  ["meta keywords", 'name="keywords"'],
  ["open graph url", 'property="og:url" content="https://www.aicodebackup.com/"'],
  ["open graph image", 'property="og:image" content="https://www.aicodebackup.com/assets/social-preview.png"'],
  ["twitter card", 'name="twitter:card"'],
  ["twitter image", 'name="twitter:image" content="https://www.aicodebackup.com/assets/social-preview.png"'],
  ["json ld", 'application/ld+json'],
  ["contact email", "hello@aicodebackup.com"],
  ["npm alpha install", "npm install -g aicodebackup@alpha"],
  ["english only html lang", '<html lang="en">'],
];

for (const [label, needle] of required) {
  if (!index.includes(needle)) {
    throw new Error(`Missing ${label}: ${needle}`);
  }
}

if (!env.VERCEL && !vercel.includes('"outputDirectory": "public"')) {
  throw new Error("Missing Vercel public output directory.");
}

if (!env.VERCEL && (!vercel.includes("https://www.aicodebackup.com/$1") || !vercel.includes('"statusCode": 301'))) {
  throw new Error("Missing Vercel canonical 301 redirect.");
}

if (!robots.includes("Sitemap: https://www.aicodebackup.com/sitemap.xml")) {
  throw new Error("robots.txt does not reference canonical sitemap.");
}

if (!sitemap.includes("<loc>https://www.aicodebackup.com/</loc>")) {
  throw new Error("sitemap.xml does not use canonical URL.");
}

for (const path of ["styles.css", "assets/product-preview.svg", "assets/social-preview.svg", "assets/social-preview.png", "favicon.svg"]) {
  if (!existsSync(join(publicRoot, path))) {
    throw new Error(`Missing asset: ${path}`);
  }
}

log("Website SEO and deployment checks passed.");
