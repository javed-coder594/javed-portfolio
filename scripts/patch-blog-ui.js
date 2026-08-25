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

const files = walk(root);
let patched = 0;

for (const file of files) {
  let html = fs.readFileSync(file, 'utf8');
  const original = html;

  // Apply the unified blog UI to every generated blog page.
  if (!html.includes('/css/blog-pages.css')) {
    html = html.replace('</head>', `${cssLink}</head>`);
  }

  // Category pages keep one feature image per article card.
  // Article pages keep their single feature image from the master article template.
  // The category-specific stylesheet only makes category images smaller and cleaner.
  if (html.includes('class="blog-category-page"') && !html.includes('/css/blog-category.css')) {
    html = html.replace('</head>', `${categoryCssLink}</head>`);
  }

  if (html !== original) {
    fs.writeFileSync(file, html, 'utf8');
    patched += 1;
  }
}

console.log(`Patched ${patched} generated blog HTML files with the unified blog UI.`);
