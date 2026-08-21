const fs = require('fs');
const path = require('path');
const handler = require('../api/blog/[...slug].js');

const pages = [
  ['technical-seo','technical-seo-audit-checklist'],
  ['technical-seo','technical-seo-crawlability-checklist'],
  ['technical-seo','technical-seo-log-file-analysis-guide'],
  ['technical-seo','xml-sitemap-optimization'],
  ['technical-seo','javascript-seo-rendering-guide'],
  ['on-page-seo','on-page-seo-checklist'],
  ['on-page-seo','content-refresh-strategy'],
  ['on-page-seo','search-intent-content-optimization'],
  ['on-page-seo','title-tag-optimization'],
  ['on-page-seo','on-page-image-optimization'],
  ['off-page-seo','link-building-strategies'],
  ['off-page-seo','brand-mentions-seo'],
  ['off-page-seo','digital-pr-link-building'],
  ['off-page-seo','digital-pr-seo-guide'],
  ['off-page-seo','referring-domains-seo-guide'],
  ['local-seo','google-business-profile-optimization'],
  ['local-seo','local-keyword-research-guide'],
  ['local-seo','local-landing-pages-seo'],
  ['local-seo','local-seo-guide-for-businesses'],
  ['local-seo','local-citation-building-guide'],
  ['wordpress-seo','wordpress-image-seo-optimization'],
  ['wordpress-seo','wordpress-internal-linking-guide'],
  ['wordpress-seo','wordpress-schema-markup'],
  ['wordpress-seo','wordpress-seo-guide'],
  ['wordpress-seo','wordpress-robots-txt-seo-guide'],
  ['web-development','core-web-vitals-optimization-guide'],
  ['web-development','semantic-html-for-seo'],
  ['web-development','seo-friendly-website-development-guide'],
  ['web-development','website-speed-optimization-basics'],
  ['web-development','accessible-web-development-guide']
];

function render(slug) {
  let body = '';
  const res = {
    status(code) { this.statusCode = code; return this; },
    setHeader() { return this; },
    send(value) { body = value; return this; }
  };
  handler({ query: { slug } }, res);
  if (res.statusCode && res.statusCode >= 400) throw new Error(`Blog renderer returned ${res.statusCode} for ${slug}`);
  return body;
}

for (const [category, slug] of pages) {
  const output = render(`${category}/${slug}`);
  const file = path.join(process.cwd(), 'blog', category, `${slug}.html`);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, output, 'utf8');
}

if (pages.length !== 30) throw new Error(`Expected 30 pages, found ${pages.length}`);

const root = process.cwd();
const publicDir = path.join(root, 'public');
fs.rmSync(publicDir, { recursive: true, force: true });
fs.mkdirSync(publicDir, { recursive: true });

function copyTree(src, dest) {
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    if (['.git','.vercel','node_modules','public'].includes(entry.name)) continue;
    const from = path.join(src, entry.name);
    const to = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      fs.mkdirSync(to, { recursive: true });
      copyTree(from, to);
    } else {
      fs.copyFileSync(from, to);
    }
  }
}
copyTree(root, publicDir);

console.log(`Generated ${pages.length} standardized SEO article pages and copied the site to public/.`);
