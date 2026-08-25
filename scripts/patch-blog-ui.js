const fs = require('fs');
const path = require('path');

const root = path.join(process.cwd(), 'public');
const cssLink = '<link rel="stylesheet" href="/css/blog-pages.css">';
const categoryCssLink = '<link rel="stylesheet" href="/css/blog-category.css">';

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (entry.isFile() && entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

function escAttr(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function addCategoryCardImages(html) {
  return html.replace(/<article class="blog-card">([\s\S]*?)<\/article>/g, (match, inner) => {
    if (inner.includes('class="blog-card-image"')) return match;

    const hrefMatch = inner.match(/href="\/blog\/([^/]+)\/([^/]+)\//);
    if (!hrefMatch) return match;

    const slug = hrefMatch[2];
    const titleMatch = inner.match(/<h2><a[^>]*>([\s\S]*?)<\/a><\/h2>/);
    const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : slug;
    const image = `<img class="blog-card-image" src="/assests/images/blog-${slug}.svg" width="1200" height="650" loading="lazy" decoding="async" alt="${escAttr(title)}">`;

    return `<article class="blog-card">${image}<div class="blog-card-content">${inner}</div></article>`;
  });
}

const files = walk(root);
let patched = 0;

for (const file of files) {
  let html = fs.readFileSync(file, 'utf8');
  const original = html;

  // Apply the unified blog UI to every generated blog page.
  if (!html.includes('/css/blog-pages.css')) {
    html = html.replace('</head>', `${cssLink}</head>`);
  }

  // Category pages use the same card structure as the master blog UI:
  // one unique feature image, content wrapper and the standard yellow CTA.
  if (html.includes('class="blog-category-page"')) {
    html = addCategoryCardImages(html);
    if (!html.includes('/css/blog-category.css')) {
      html = html.replace('</head>', `${categoryCssLink}</head>`);
    }
  }

  if (html !== original) {
    fs.writeFileSync(file, html, 'utf8');
    patched += 1;
  }
}

console.log(`Patched ${patched} generated blog HTML files with the unified blog UI.`);
