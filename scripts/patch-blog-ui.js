const fs = require('fs');
const path = require('path');

const root = path.join(process.cwd(), 'public');
const cssLink = '<link rel="stylesheet" href="/css/blog-pages.css">';

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

function patchCategoryCards(html) {
  if (!html.includes('class="blog-category-page"')) return html;

  return html.replace(/<article class="blog-card">([\s\S]*?)<\/article>/g, (whole, inner) => {
    if (inner.includes('blog-card-image')) return whole;

    const match = inner.match(/href="\/blog\/([^/]+)\/([^/]+)\//);
    if (!match) return whole;

    const [, category, slug] = match;
    const image = `<img class="blog-card-image" src="/assests/images/blog-${slug}.svg" width="1200" height="650" loading="lazy" decoding="async" alt="${slug.replace(/-/g, ' ')}">`;

    return `<article class="blog-card">${image}<div class="blog-card-content">${inner}</div></article>`;
  });
}

const files = walk(root);
let patched = 0;

for (const file of files) {
  let html = fs.readFileSync(file, 'utf8');
  const original = html;

  if (!html.includes('/css/blog-pages.css')) {
    html = html.replace('</head>', `${cssLink}</head>`);
  }

  html = patchCategoryCards(html);

  if (html !== original) {
    fs.writeFileSync(file, html, 'utf8');
    patched += 1;
  }
}

console.log(`Patched ${patched} generated blog HTML files with the unified blog UI.`);
