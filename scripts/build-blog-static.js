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

const categoryNames = {
  'technical-seo':'Technical SEO',
  'on-page-seo':'On-Page SEO',
  'off-page-seo':'Off-Page SEO',
  'local-seo':'Local SEO',
  'wordpress-seo':'WordPress SEO',
  'web-development':'Web Development'
};

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

for (const category of Object.keys(categoryNames)) {
  const file = path.join(process.cwd(), 'blog', category, 'index.html');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, render(category), 'utf8');
}

const header = fs.readFileSync(path.join(process.cwd(), 'components/header.html'), 'utf8');
const footer = fs.readFileSync(path.join(process.cwd(), 'components/footer.html'), 'utf8');
const groups = Object.keys(categoryNames).map(category => {
  const links = pages.filter(p => p[0] === category).map(([,slug]) => {
    const title = slug.split('-').map(w => w.charAt(0).toUpperCase()+w.slice(1)).join(' ');
    return `<li><a href="/blog/${category}/${slug}/">${title}</a></li>`;
  }).join('');
  return `<section class="blog-category-block"><h2><a href="/blog/${category}/">${categoryNames[category]}</a></h2><ul>${links}</ul></section>`;
}).join('');
fs.writeFileSync(path.join(process.cwd(), 'blog.html'), `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>SEO & Web Development Blog | Javed Chaudhary</title><meta name="description" content="Practical Technical SEO, On-Page SEO, Off-Page SEO, Local SEO, WordPress SEO and Web Development articles by Javed Chaudhary."><link rel="stylesheet" href="/css/style.css"><link rel="stylesheet" href="/css/responsive.css"></head><body>${header}<main class="blog-index"><section class="blog-index-hero"><h1>SEO & Web Development Blog</h1><p>Practical, structured articles covering six SEO and web development categories.</p></section>${groups}</main>${footer}<script src="/js/script.js"></script></body></html>`, 'utf8');

const urls = ['https://javed-portfolio-jade.vercel.app/','https://javed-portfolio-jade.vercel.app/blog/'];
urls.push(...Object.keys(categoryNames).map(c => `https://javed-portfolio-jade.vercel.app/blog/${c}/`));
urls.push(...pages.map(([c,s]) => `https://javed-portfolio-jade.vercel.app/blog/${c}/${s}/`));
const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(u => `<url><loc>${u}</loc></url>`).join('')}</urlset>`;
fs.writeFileSync(path.join(process.cwd(), 'sitemap.xml'), xml, 'utf8');

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

console.log(`Generated ${pages.length} standardized SEO article pages, six category indexes and a 30-article sitemap.`);
