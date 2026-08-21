const fs = require('fs');
const path = require('path');

const CATEGORIES = {
  'technical-seo': 'Technical SEO',
  'on-page-seo': 'On-Page SEO',
  'off-page-seo': 'Off-Page SEO',
  'local-seo': 'Local SEO',
  'wordpress-seo': 'WordPress SEO',
  'web-development': 'Web Development'
};

const ARTICLES = [
['technical-seo','technical-seo-audit-checklist','Technical SEO Audit Checklist','technical SEO audit','A practical audit framework for crawlability, indexing, performance, mobile usability, canonical signals and technical quality.'],
['technical-seo','technical-seo-crawlability-checklist','Technical SEO Crawlability Checklist','SEO crawlability','A practical crawlability checklist covering links, robots rules, sitemaps, status codes, redirects and discoverability.'],
['technical-seo','technical-seo-log-file-analysis-guide','Technical SEO Log File Analysis Guide','SEO log file analysis','Learn how log file analysis can reveal crawler behavior, wasted crawl activity, important URLs and technical SEO opportunities.'],
['technical-seo','xml-sitemap-optimization','XML Sitemap Optimization Guide','XML sitemap optimization','Learn how to structure, maintain and validate XML sitemaps so search engines can discover important URLs efficiently.'],
['technical-seo','javascript-seo-rendering-guide','JavaScript SEO Rendering Guide','JavaScript SEO rendering','Understand how JavaScript rendering affects discovery, indexing and content visibility, with practical development checks.'],
['on-page-seo','on-page-seo-checklist','On-Page SEO Checklist','on-page SEO checklist','A practical on-page SEO checklist covering search intent, titles, headings, content, internal links, images and page experience.'],
['on-page-seo','content-refresh-strategy','SEO Content Refresh Strategy','SEO content refresh','Learn how to refresh existing content using search intent, performance data, content gaps, internal links and clear editorial decisions.'],
['on-page-seo','search-intent-content-optimization','Search Intent Content Optimization Guide','search intent optimization','Learn how to align page content with search intent so users find direct answers and search engines understand the page purpose.'],
['on-page-seo','title-tag-optimization','Title Tag Optimization Guide','title tag optimization','A practical guide to writing clear, relevant title tags that communicate page purpose and support organic search visibility.'],
['on-page-seo','on-page-image-optimization','On-Page Image Optimization Guide','on-page image optimization','Learn how to optimize images for relevance, accessibility, performance and search visibility without adding unnecessary page weight.'],
['off-page-seo','link-building-strategies','Link Building Strategies','link building strategies','Explore practical ways to earn relevant backlinks through useful assets, outreach, partnerships, digital PR and editorial value.'],
['off-page-seo','brand-mentions-seo','Brand Mentions and SEO Guide','brand mentions SEO','Learn how brand mentions, citations and digital visibility can support authority, discovery and a stronger off-page SEO profile.'],
['off-page-seo','digital-pr-link-building','Digital PR Link Building Guide','digital PR link building','Learn how digital PR can create useful stories, earn editorial links and strengthen brand visibility without manipulative link tactics.'],
['off-page-seo','digital-pr-seo-guide','Digital PR SEO Guide','digital PR SEO','A practical guide to planning digital PR campaigns that support awareness, authority, referral traffic and sustainable SEO.'],
['off-page-seo','referring-domains-seo-guide','Referring Domains SEO Guide','referring domains','Learn how to evaluate referring domains, prioritize relevant sources and build a healthier backlink profile over time.'],
['local-seo','google-business-profile-optimization','Google Business Profile Optimization Guide','Google Business Profile optimization','Learn how to improve a Google Business Profile with accurate business information, categories, services, reviews, photos and useful updates.'],
['local-seo','local-keyword-research-guide','Local Keyword Research Guide','local keyword research','Learn how to identify location-based search terms and map them to services, pages and local customer needs.'],
['local-seo','local-landing-pages-seo','Local Landing Pages SEO Guide','local landing pages','Learn how to create useful location landing pages with unique local relevance, strong service context and clear conversion paths.'],
['local-seo','local-seo-guide-for-businesses','Local SEO Guide for Businesses','local SEO for businesses','A practical local SEO framework for improving local visibility through profiles, pages, citations, reviews, content and measurement.'],
['local-seo','local-citation-building-guide','Local Citation Building Guide','local citation building','Learn how to build and maintain accurate local citations while keeping business information consistent across relevant directories.'],
['wordpress-seo','wordpress-image-seo-optimization','WordPress Image SEO Optimization Guide','WordPress image SEO','Learn how to optimize WordPress images with relevant filenames, alt text, dimensions, formats, lazy loading and performance checks.'],
['wordpress-seo','wordpress-internal-linking-guide','WordPress Internal Linking Guide','WordPress internal linking','Learn how to build a clear internal linking structure in WordPress that helps users navigate and search engines discover related pages.'],
['wordpress-seo','wordpress-schema-markup','WordPress Schema Markup Guide','WordPress schema markup','Learn how structured data can describe WordPress content clearly and how to implement schema without creating invalid or misleading markup.'],
['wordpress-seo','wordpress-seo-guide','WordPress SEO Guide','WordPress SEO','A practical WordPress SEO guide covering structure, metadata, content, links, media, speed, indexing and ongoing maintenance.'],
['wordpress-seo','wordpress-robots-txt-seo-guide','WordPress Robots.txt SEO Guide','WordPress robots.txt','Learn how robots.txt controls crawler access and how to review WordPress rules without accidentally blocking important resources.'],
['web-development','core-web-vitals-optimization-guide','Core Web Vitals Optimization Guide','Core Web Vitals optimization','Learn how developers can improve loading, responsiveness and layout stability with practical Core Web Vitals optimization steps.'],
['web-development','semantic-html-for-seo','Semantic HTML for SEO Guide','semantic HTML for SEO','Learn how semantic HTML improves structure, accessibility and machine understanding while keeping website code clearer and easier to maintain.'],
['web-development','seo-friendly-website-development-guide','SEO-Friendly Website Development Guide','SEO-friendly website development','Learn how SEO-friendly website development combines clean structure, responsive design, accessibility, performance and technical SEO.'],
['web-development','website-speed-optimization-basics','Website Speed Optimization Basics','website speed optimization','Learn practical website speed optimization techniques for assets, images, CSS, JavaScript, fonts, caching and efficient page delivery.'],
['web-development','accessible-web-development-guide','Accessible Web Development for SEO','accessible web development','Learn how accessible web development improves usability, semantic structure, keyboard access, content clarity and overall page quality.']
];

const SECTION_HEADINGS = {
  'technical-seo':['Why this topic matters','Start with discovery and access','Review indexing signals','Check site structure and URLs','Evaluate rendering and resources','Improve performance and mobile experience','Find errors before they spread','Build a repeatable monitoring process','Common mistakes to avoid','A practical implementation checklist'],
  'on-page-seo':['Why this topic matters','Understand search intent first','Strengthen titles and headings','Build useful content depth','Use keywords naturally','Improve internal linking','Optimize images and page elements','Improve readability and user experience','Review and refresh content','A practical implementation checklist'],
  'off-page-seo':['Why this topic matters','Build relevance before chasing volume','Evaluate backlink quality','Create assets worth referencing','Use outreach with a clear reason','Use digital PR and brand visibility','Monitor links and referring domains','Avoid risky link patterns','Measure meaningful outcomes','A practical implementation checklist'],
  'local-seo':['Why this topic matters','Start with accurate business information','Map local search intent','Strengthen location relevance','Build consistent citations','Use reviews and local trust signals','Create useful local content','Improve local landing pages','Measure local visibility','A practical implementation checklist'],
  'wordpress-seo':['Why this topic matters','Set a clean WordPress foundation','Control URLs and metadata','Improve content structure','Strengthen internal links','Optimize media and performance','Use structured data carefully','Review crawling and indexing','Maintain plugins, themes and security','A practical implementation checklist'],
  'web-development':['Why this topic matters','Plan structure before development','Use semantic and accessible HTML','Build responsive layouts','Improve loading performance','Control JavaScript and rendering','Optimize images and fonts','Create clean URLs and page architecture','Test before and after deployment','A practical implementation checklist']
};

const ANGLES = [
  'The strongest approach is to connect the change to a real user need instead of treating SEO as a collection of isolated settings.',
  'A useful review starts with the current page, identifies the clearest constraint, and then applies changes that can be checked after implementation.',
  'Good SEO work should make a page easier to discover, understand or use. If a change does not support one of those outcomes, it deserves another review.',
  'Consistency matters because search engines and users both rely on predictable structures, clear signals and content that matches the page purpose.',
  'The practical goal is not to add more elements. It is to remove confusion, improve relevance and make important information easier to access.',
  'A measured workflow is safer than making many changes at once. Small improvements can be tested, documented and refined over time.'
];

function esc(v){return String(v).replace(/[&<>\"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[m]));}
function articleBySlug(slug){return ARTICLES.find(a=>a[1]===slug);}
function articleUrl(category,slug){return `/blog/${category}/${slug}/`;}
function imageFor(slug){return `/assests/images/blog-${slug}.svg`;}

function makeParagraph(focus,title,category,heading,n,variant){
  const a=ANGLES[(n+variant)%ANGLES.length];
  return `<p>${a} For <strong>${esc(focus)}</strong>, this means treating “${esc(heading.toLowerCase())}” as part of the wider goal behind <strong>${esc(title)}</strong>. ${esc(category)} work becomes more reliable when the page has a clear purpose, a logical structure and a defined way to judge whether the change helped.</p>`;
}
function makeDetailed(focus,title,category,heading,n,variant){
  const a=ANGLES[(n+variant+2)%ANGLES.length];
  return `<p>When working on ${esc(title.toLowerCase())}, review the current implementation before changing it. Look for missing information, inconsistent signals, unnecessary steps and areas where users may struggle. Then connect the finding to <strong>${esc(focus)}</strong> and document the action you plan to take. ${esc(a)}</p>`;
}
function makeContent(category,title,focus){
  const parts=[];
  parts.push(`<p>${esc(title)} is designed to turn a common SEO or development problem into a practical workflow. The focus keyword for this article is <strong>${esc(focus)}</strong>, but the goal is broader than repeating a phrase. A useful page should answer the visitor’s question, provide enough context to act and make the important information easy to find.</p>`);
  parts.push(`<p>This guide uses a problem-to-solution approach. It explains what to review, why the review matters, what a sensible implementation looks like and how to validate the result. Keep the work focused. ${ANGLES[0]}</p>`);
  SECTION_HEADINGS[category].forEach((h,i)=>{
    parts.push(`<h2>${esc(h)}</h2>`);
    parts.push(makeParagraph(focus,title,CATEGORIES[category],h,i,0));
    parts.push(makeDetailed(focus,title,CATEGORIES[category],h,i,1));
    parts.push(makeParagraph(focus,title,CATEGORIES[category],h,i,3));
  });
  parts.push('<h2>Practical workflow</h2><ol><li>Review the current page and record the baseline.</li><li>Identify the highest-impact issue instead of changing everything at once.</li><li>Map the change to the page purpose, search intent and user journey.</li><li>Implement the change using clean, semantic and maintainable markup or content.</li><li>Test the page on mobile and desktop and check links, images, metadata and performance.</li><li>Record the result and revisit the page after meaningful traffic, content or technical changes.</li></ol>');
  parts.push(`<p>The workflow above keeps <strong>${esc(focus)}</strong> practical. It also creates a simple audit trail. If a change improves the page, keep it. If it creates a new problem, roll it back or refine it. This approach is more dependable than chasing isolated SEO signals.</p>`);
  parts.push('<h2>What good implementation looks like</h2>');
  parts.push(`<p>A strong implementation is clear to both people and machines. The page should communicate its subject early, use headings that describe the sections accurately, keep related information together and avoid unnecessary repetition. ${ANGLES[4]}</p>`);
  parts.push('<p>Quality also depends on maintenance. Search behavior, website architecture, content and technology change over time. A page that was well structured last year may still need a review after a redesign, migration, plugin change or content update. Keep the same core principles, then adjust the implementation to the current situation.</p>');
  parts.push('<h2>Conclusion</h2>');
  parts.push(`<p>${esc(title)} works best when it is treated as an ongoing improvement process rather than a one-time task. Start with the problem, make the page clearer, test the change and keep a record of what you learned.</p>`);
  parts.push(`<p>Use <strong>${esc(focus)}</strong> as the central topic, then support it with closely related concepts and useful examples. That creates content that is focused without being repetitive and gives users a clear path from question to solution.</p>`);
  return parts.join('\n');
}
function faq(title,focus){
 const qs=[
  [`What is ${focus}?`,`${title} explains ${focus} as a practical process. The article focuses on useful implementation decisions rather than repeating the keyword.`],
  [`Why is ${focus} important?`,`${focus} can improve clarity, discoverability, usability or technical quality when it is applied to the right problem.`],
  [`How should I start with ${focus}?`,'Start with a baseline review, identify the highest-impact issue, make one focused change and validate the result before moving to the next task.'],
  ['What mistakes should I avoid?','Avoid keyword stuffing, copied content, unnecessary changes, inconsistent page structures and decisions that block users or search engines from important information.'],
  ['How often should I review the work?','Review it after major content, design, migration or technical changes and include it in routine website maintenance when performance or search visibility changes.']
 ];
 return qs.map((x,i)=>`<div class="blog-faq-item"><h3>${i+1}. ${esc(x[0])}</h3><p>${esc(x[1])}</p></div>`).join('\n');
}
function faqSchema(title,focus){
 const raw=[
  [`What is ${focus}?`,`${title} explains ${focus} as a practical process. The article focuses on useful implementation decisions rather than repeating the keyword.`],
  [`Why is ${focus} important?`,`${focus} can improve clarity, discoverability, usability or technical quality when it is applied to the right problem.`],
  [`How should I start with ${focus}?`,'Start with a baseline review, identify the highest-impact issue, make one focused change and validate the result before moving to the next task.'],
  ['What mistakes should I avoid?','Avoid keyword stuffing, copied content, unnecessary changes, inconsistent page structures and decisions that block users or search engines from important information.'],
  ['How often should I review the work?','Review it after major content, design, migration or technical changes and include it in routine website maintenance when performance or search visibility changes.']
 ];
 return JSON.stringify({'@context':'https://schema.org','@type':'FAQPage',mainEntity:raw.map(x=>({'@type':'Question',name:x[0],acceptedAnswer:{'@type':'Answer',text:x[1]}}))});
}
function shell(){
 const header=fs.readFileSync(path.join(process.cwd(),'components/header.html'),'utf8');
 const footer=fs.readFileSync(path.join(process.cwd(),'components/footer.html'),'utf8');
 return {header,footer};
}
function renderArticle(a){
 const [category,slug,title,focus,description]=a; const {header,footer}=shell();
 const canonical=`https://javed-portfolio-jade.vercel.app${articleUrl(category,slug)}`;
 const html=`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${esc(title)} | Javed Chaudhary</title><meta name="description" content="${esc(description)}"><meta name="author" content="Javed Chaudhary"><meta name="robots" content="index, follow"><link rel="canonical" href="${canonical}"><link rel="stylesheet" href="/css/style.css"><link rel="stylesheet" href="/css/responsive.css"><link rel="stylesheet" href="/css/animation.css"><link rel="stylesheet" href="/css/blog-article.css"><link rel="icon" type="image/svg+xml" href="/assests/favicon.svg"></head><body>${header}<main class="blog-article"><article class="blog-post-content"><h1>${esc(title)}</h1><figure class="blog-post-hero"><img src="${imageFor(slug)}" width="1200" height="650" loading="eager" decoding="async" fetchpriority="high" title="${esc(title)}" alt="${esc(focus)} visual for ${esc(title)}"><figcaption>${esc(CATEGORIES[category])}: a relevant visual supporting the article topic.</figcaption></figure><p class="blog-post-meta"><strong>${esc(CATEGORIES[category])}</strong> · Written by Javed Chaudhary</p><div class="blog-post-body">${makeContent(category,title,focus)}<section class="blog-faq" aria-labelledby="blog-faq-title"><h2 id="blog-faq-title">Frequently Asked Questions</h2>${faq(title,focus)}</section></div></article></main>${footer}<script type="application/ld+json">${faqSchema(title,focus)}</script><script src="/js/script.js"></script></body></html>`;
 return html;
}
function renderCategory(category){
 const {header,footer}=shell(); const items=ARTICLES.filter(a=>a[0]===category);
 const cards=items.map(a=>`<article class="blog-card"><h2><a href="${articleUrl(a[0],a[1])}">${esc(a[2])}</a></h2><p>${esc(a[3].charAt(0).toUpperCase()+a[3].slice(1))}</p><a href="${articleUrl(a[0],a[1])}">Read article</a></article>`).join('');
 return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${esc(CATEGORIES[category])} Articles | Javed Chaudhary</title><meta name="description" content="Practical ${esc(CATEGORIES[category])} articles by Javed Chaudhary."><link rel="stylesheet" href="/css/style.css"><link rel="stylesheet" href="/css/responsive.css"><link rel="icon" type="image/svg+xml" href="/assests/favicon.svg"></head><body>${header}<main class="blog-category-page"><section class="blog-category-hero"><h1>${esc(CATEGORIES[category])}</h1><p>Practical, structured articles written to help you understand and apply ${esc(CATEGORIES[category])} clearly.</p></section><section class="blog-category-grid">${cards}</section></main>${footer}<script src="/js/script.js"></script></body></html>`;
}

module.exports=(req,res)=>{
 const raw=(req.query && req.query.slug) || '';
 const parts=Array.isArray(raw)?raw:String(raw).split('/').filter(Boolean);
 const category=parts[0]||''; const slug=parts[1]||'';
 if(!CATEGORIES[category]) return res.status(404).send('Not found');
 if(!slug) return res.status(200).setHeader('Content-Type','text/html; charset=utf-8').send(renderCategory(category));
 const article=articleBySlug(slug);
 if(!article || article[0]!==category) return res.status(404).send('Article not found');
 res.status(200).setHeader('Content-Type','text/html; charset=utf-8').setHeader('Cache-Control','public, max-age=0, s-maxage=3600, stale-while-revalidate=86400').send(renderArticle(article));
};
