from pathlib import Path
import html, json, re

ROOT = Path('.')
LABELS = {
    'technical-seo': 'Technical SEO', 'on-page-seo': 'On-Page SEO',
    'off-page-seo': 'Off-Page SEO', 'local-seo': 'Local SEO',
    'wordpress-seo': 'WordPress SEO', 'web-development': 'Web Development'
}

ARTICLES = [
# Technical SEO
('technical-seo','technical-seo-audit-checklist','Technical SEO Audit Checklist','technical SEO audit','A practical audit framework for crawlability, indexing, performance, mobile usability, canonical signals and technical quality.'),
('technical-seo','technical-seo-crawlability-checklist','Technical SEO Crawlability Checklist','SEO crawlability','A practical crawlability checklist covering links, robots rules, sitemaps, status codes, redirects and discoverability.'),
('technical-seo','technical-seo-log-file-analysis-guide','Technical SEO Log File Analysis Guide','SEO log file analysis','Learn how log file analysis can reveal crawler behavior, wasted crawl activity, important URLs and technical SEO opportunities.'),
('technical-seo','xml-sitemap-optimization','XML Sitemap Optimization Guide','XML sitemap optimization','Learn how to structure, maintain and validate XML sitemaps so search engines can discover important URLs efficiently.'),
('technical-seo','javascript-seo-rendering-guide','JavaScript SEO Rendering Guide','JavaScript SEO rendering','Understand how JavaScript rendering affects discovery, indexing and content visibility, with practical development checks.'),
# On-Page SEO
('on-page-seo','on-page-seo-checklist','On-Page SEO Checklist','on-page SEO checklist','A practical on-page SEO checklist covering search intent, titles, headings, content, internal links, images and page experience.'),
('on-page-seo','content-refresh-strategy','SEO Content Refresh Strategy','SEO content refresh','Learn how to refresh existing content using search intent, performance data, content gaps, internal links and clear editorial decisions.'),
('on-page-seo','search-intent-content-optimization','Search Intent Content Optimization Guide','search intent optimization','Learn how to align page content with search intent so users find direct answers and search engines understand the page purpose.'),
('on-page-seo','title-tag-optimization','Title Tag Optimization Guide','title tag optimization','A practical guide to writing clear, relevant title tags that communicate page purpose and support organic search visibility.'),
('on-page-seo','on-page-image-optimization','On-Page Image Optimization Guide','on-page image optimization','Learn how to optimize images for relevance, accessibility, performance and search visibility without adding unnecessary page weight.'),
# Off-Page SEO
('off-page-seo','link-building-strategies','Link Building Strategies','link building strategies','Explore practical ways to earn relevant backlinks through useful assets, outreach, partnerships, digital PR and editorial value.'),
('off-page-seo','brand-mentions-seo','Brand Mentions and SEO Guide','brand mentions SEO','Learn how brand mentions, citations and digital visibility can support authority, discovery and a stronger off-page SEO profile.'),
('off-page-seo','digital-pr-link-building','Digital PR Link Building Guide','digital PR link building','Learn how digital PR can create useful stories, earn editorial links and strengthen brand visibility without manipulative link tactics.'),
('off-page-seo','digital-pr-seo-guide','Digital PR SEO Guide','digital PR SEO','A practical guide to planning digital PR campaigns that support awareness, authority, referral traffic and sustainable SEO.'),
('off-page-seo','referring-domains-seo-guide','Referring Domains SEO Guide','referring domains','Learn how to evaluate referring domains, prioritize relevant sources and build a healthier backlink profile over time.'),
# Local SEO
('local-seo','google-business-profile-optimization','Google Business Profile Optimization Guide','Google Business Profile optimization','Learn how to improve a Google Business Profile with accurate business information, categories, services, reviews, photos and useful updates.'),
('local-seo','local-keyword-research-guide','Local Keyword Research Guide','local keyword research','Learn how to identify location-based search terms and map them to services, pages and local customer needs.'),
('local-seo','local-landing-pages-seo','Local Landing Pages SEO Guide','local landing pages','Learn how to create useful location landing pages with unique local relevance, strong service context and clear conversion paths.'),
('local-seo','local-seo-guide-for-businesses','Local SEO Guide for Businesses','local SEO for businesses','A practical local SEO framework for improving local visibility through profiles, pages, citations, reviews, content and measurement.'),
('local-seo','local-citation-building-guide','Local Citation Building Guide','local citation building','Learn how to build and maintain accurate local citations while keeping business information consistent across relevant directories.'),
# WordPress SEO
('wordpress-seo','wordpress-image-seo-optimization','WordPress Image SEO Optimization Guide','WordPress image SEO','Learn how to optimize WordPress images with relevant filenames, alt text, dimensions, formats, lazy loading and performance checks.'),
('wordpress-seo','wordpress-internal-linking-guide','WordPress Internal Linking Guide','WordPress internal linking','Learn how to build a clear internal linking structure in WordPress that helps users navigate and search engines discover related pages.'),
('wordpress-seo','wordpress-schema-markup','WordPress Schema Markup Guide','WordPress schema markup','Learn how structured data can describe WordPress content clearly and how to implement schema without creating invalid or misleading markup.'),
('wordpress-seo','wordpress-seo-guide','WordPress SEO Guide','WordPress SEO','A practical WordPress SEO guide covering structure, metadata, content, links, media, speed, indexing and ongoing maintenance.'),
('wordpress-seo','wordpress-robots-txt-seo-guide','WordPress Robots.txt SEO Guide','WordPress robots.txt','Learn how robots.txt controls crawler access and how to review WordPress rules without accidentally blocking important resources.'),
# Web Development
('web-development','core-web-vitals-optimization-guide','Core Web Vitals Optimization Guide','Core Web Vitals optimization','Learn how developers can improve loading, responsiveness and layout stability with practical Core Web Vitals optimization steps.'),
('web-development','semantic-html-for-seo','Semantic HTML for SEO Guide','semantic HTML for SEO','Learn how semantic HTML improves structure, accessibility and machine understanding while keeping website code clearer and easier to maintain.'),
('web-development','seo-friendly-website-development-guide','SEO-Friendly Website Development Guide','SEO-friendly website development','Learn how SEO-friendly website development combines clean structure, responsive design, accessibility, performance and technical SEO.'),
('web-development','website-speed-optimization-basics','Website Speed Optimization Basics','website speed optimization','Learn practical website speed optimization techniques for assets, images, CSS, JavaScript, fonts, caching and efficient page delivery.'),
('web-development','accessible-web-development-guide','Accessible Web Development for SEO','accessible web development','Learn how accessible web development improves usability, semantic structure, keyboard access, content clarity and overall page quality.'),
]

SECTION_HEADINGS = {
    'technical-seo': ['Why this topic matters','Start with discovery and access','Review indexing signals','Check site structure and URLs','Evaluate rendering and resources','Improve performance and mobile experience','Find errors before they spread','Build a repeatable monitoring process','Common mistakes to avoid','A practical implementation checklist'],
    'on-page-seo': ['Why this topic matters','Understand search intent first','Strengthen titles and headings','Build useful content depth','Use keywords naturally','Improve internal linking','Optimize images and page elements','Improve readability and user experience','Review and refresh content','A practical implementation checklist'],
    'off-page-seo': ['Why this topic matters','Build relevance before chasing volume','Evaluate backlink quality','Create assets worth referencing','Use outreach with a clear reason','Use digital PR and brand visibility','Monitor links and referring domains','Avoid risky link patterns','Measure meaningful outcomes','A practical implementation checklist'],
    'local-seo': ['Why this topic matters','Start with accurate business information','Map local search intent','Strengthen location relevance','Build consistent citations','Use reviews and local trust signals','Create useful local content','Improve local landing pages','Measure local visibility','A practical implementation checklist'],
    'wordpress-seo': ['Why this topic matters','Set a clean WordPress foundation','Control URLs and metadata','Improve content structure','Strengthen internal links','Optimize media and performance','Use structured data carefully','Review crawling and indexing','Maintain plugins, themes and security','A practical implementation checklist'],
    'web-development': ['Why this topic matters','Plan structure before development','Use semantic and accessible HTML','Build responsive layouts','Improve loading performance','Control JavaScript and rendering','Optimize images and fonts','Create clean URLs and page architecture','Test before and after deployment','A practical implementation checklist'],
}

ANGLES = [
    'The strongest approach is to connect the change to a real user need instead of treating SEO as a collection of isolated settings.',
    'A useful review starts with the current page, identifies the clearest constraint, and then applies changes that can be checked after implementation.',
    'Good SEO work should make a page easier to discover, understand or use. If a change does not support one of those outcomes, it deserves another review.',
    'Consistency matters because search engines and users both rely on predictable structures, clear signals and content that matches the page purpose.',
    'The practical goal is not to add more elements. It is to remove confusion, improve relevance and make important information easier to access.',
    'A measured workflow is safer than making many changes at once. Small improvements can be tested, documented and refined over time.',
]


def slug_path(category, slug):
    existing = {
      ('local-seo','local-keyword-research-guide'): 'blog/local-seo/local-keyword-research-guide/index.html',
      ('off-page-seo','digital-pr-seo-guide'): 'blog/off-page-seo/digital-pr-seo-guide/index.html',
      ('on-page-seo','content-refresh-strategy'): 'blog/on-page-seo/content-refresh-strategy/index.html',
      ('technical-seo','technical-seo-log-file-analysis-guide'): 'blog/technical-seo/technical-seo-log-file-analysis-guide/index.html',
      ('web-development','core-web-vitals-optimization-guide'): 'blog/web-development/core-web-vitals-optimization-guide/index.html',
      ('wordpress-seo','wordpress-internal-linking-guide'): 'blog/wordpress-seo/wordpress-internal-linking-guide/index.html',
    }
    return existing.get((category,slug), f'blog/{category}/{slug}.html')


def canonical_for(path):
    rel = path.relative_to(ROOT).as_posix()
    if rel.endswith('/index.html'):
        rel = rel[:-10]
    else:
        rel = rel[:-5]
    return 'https://javed-portfolio-jade.vercel.app/' + rel.strip('/') + '/'


def paragraph(focus, title, category, heading, n, variant):
    angle = ANGLES[(n+variant) % len(ANGLES)]
    return f'''<p>{angle} For <strong>{html.escape(focus)}</strong>, this means treating “{html.escape(heading.lower())}” as part of the wider goal behind <strong>{html.escape(title)}</strong>. {html.escape(category)} work becomes more reliable when the page has a clear purpose, a logical structure and a defined way to judge whether the change helped.</p>'''


def detailed_paragraph(focus, title, category, heading, n, variant):
    angle = ANGLES[(n+variant+2) % len(ANGLES)]
    return f'''<p>When working on {html.escape(title.lower())}, review the current implementation before changing it. Look for missing information, inconsistent signals, unnecessary steps and areas where users may struggle. Then connect the finding to <strong>{html.escape(focus)}</strong> and document the action you plan to take. {html.escape(angle)}</p>'''


def build_content(category, title, focus):
    heads = SECTION_HEADINGS[category]
    parts = []
    parts.append(f'''<p>{html.escape(title)} is designed to turn a common SEO or development problem into a practical workflow. The focus keyword for this article is <strong>{html.escape(focus)}</strong>, but the goal is broader than repeating a phrase. A useful page should answer the visitor’s question, provide enough context to act and make the important information easy to find.</p>''')
    parts.append(f'''<p>This guide uses a problem-to-solution approach. It explains what to review, why the review matters, what a sensible implementation looks like and how to validate the result. Keep the work focused. {html.escape(ANGLES[0])}</p>''')
    for i, h in enumerate(heads):
        parts.append(f'<h2>{html.escape(h)}</h2>')
        parts.append(paragraph(focus,title,category,h,i,0))
        parts.append(detailed_paragraph(focus,title,category,h,i,1))
        parts.append(paragraph(focus,title,category,h,i,3))
    parts.append('<h2>Practical workflow</h2>')
    steps = ['Review the current page and record the baseline.','Identify the highest-impact issue instead of changing everything at once.','Map the change to the page purpose, search intent and user journey.','Implement the change using clean, semantic and maintainable markup or content.','Test the page on mobile and desktop and check links, images, metadata and performance.','Record the result and revisit the page after meaningful traffic, content or technical changes.']
    parts.append('<ol>' + ''.join(f'<li>{html.escape(s)}</li>' for s in steps) + '</ol>')
    parts.append(f'''<p>The workflow above keeps <strong>{html.escape(focus)}</strong> practical. It also creates a simple audit trail. If a change improves the page, keep it. If it creates a new problem, roll it back or refine it. This approach is more dependable than chasing isolated SEO signals.</p>''')
    parts.append('<h2>What good implementation looks like</h2>')
    parts.append(f'''<p>A strong implementation is clear to both people and machines. The page should communicate its subject early, use headings that describe the sections accurately, keep related information together and avoid unnecessary repetition. {html.escape(ANGLES[4])}</p>''')
    parts.append(f'''<p>Quality also depends on maintenance. Search behavior, website architecture, content and technology change over time. A page that was well structured last year may still need a review after a redesign, migration, plugin change or content update. Keep the same core principles, then adjust the implementation to the current situation.</p>''')
    parts.append('<h2>Conclusion</h2>')
    parts.append(f'''<p>{html.escape(title)} works best when it is treated as an ongoing improvement process rather than a one-time task. Start with the problem, make the page clearer, test the change and keep a record of what you learned.</p>''')
    parts.append(f'''<p>Use <strong>{html.escape(focus)}</strong> as the central topic, then support it with closely related concepts and useful examples. That creates content that is focused without being repetitive and gives users a clear path from question to solution.</p>''')
    return '\n'.join(parts)


def faq_html(title, focus):
    qs = [
      (f'What is {focus}?', f'{title} explains {focus} as a practical process. The page focuses on useful implementation decisions rather than repeating the keyword.'),
      (f'Why is {focus} important?', f'{focus.capitalize()} can improve clarity, discoverability, usability or technical quality when it is applied to the right problem.'),
      (f'How should I start with {focus}?', 'Start with a baseline review. Identify the highest-impact issue, make one focused change and validate the result before moving to the next task.'),
      ('What mistakes should I avoid?', 'Avoid keyword stuffing, copied content, unnecessary changes, inconsistent page structures and decisions that block users or search engines from important information.'),
      ('How often should I review the work?', 'Review it after major content, design, migration or technical changes and include it in routine website maintenance when performance or search visibility changes.'),
    ]
    return '\n'.join(f'<div class="blog-faq-item"><h3>{i}. {html.escape(q)}</h3><p>{html.escape(a)}</p></div>' for i,(q,a) in enumerate(qs,1))


def schema(title, focus, items):
    data={'@context':'https://schema.org','@type':'FAQPage','mainEntity':[]}
    for q,a in items:
        data['mainEntity'].append({'@type':'Question','name':q,'acceptedAnswer':{'@type':'Answer','text':a}})
    return '<script type="application/ld+json">'+json.dumps(data,ensure_ascii=False,separators=(',',':'))+'</script>'


def make_svg(path, title, category):
    image = ROOT/'assests/images'/f'blog-{path.stem}.svg'
    image.parent.mkdir(parents=True,exist_ok=True)
    if not image.exists():
        safe_title=html.escape(title[:58])
        safe_cat=html.escape(category.upper())
        image.write_text(f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 650"><rect width="1200" height="650" fill="#0D1117"/><rect x="70" y="70" width="1060" height="510" rx="28" fill="#121923" stroke="#243142"/><text x="110" y="210" fill="#F5F7FA" font-family="Arial,sans-serif" font-size="54" font-weight="700">SEO INSIGHT</text><text x="110" y="285" fill="#4C9AFF" font-family="Arial,sans-serif" font-size="26">{safe_cat}</text><text x="110" y="365" fill="#DDE5EF" font-family="Arial,sans-serif" font-size="28">{safe_title}</text><text x="110" y="465" fill="#7F8FA3" font-family="Arial,sans-serif" font-size="20">Practical guide by Javed Chaudhary</text></svg>''',encoding='utf-8')
    return '/assests/images/'+image.name


def main():
    template=(ROOT/'templates/blog-post.html').read_text(encoding='utf-8')
    header=(ROOT/'components/header.html').read_text(encoding='utf-8')
    footer=(ROOT/'components/footer.html').read_text(encoding='utf-8')
    article_paths=[]
    focus_seen=set()
    for category,slug,title,focus,description in ARTICLES:
        if focus.lower() in focus_seen: raise RuntimeError('Duplicate focus keyword: '+focus)
        focus_seen.add(focus.lower())
        path=ROOT/slug_path(category,slug)
        path.parent.mkdir(parents=True,exist_ok=True)
        image=make_svg(path,title,LABELS[category])
        content=build_content(category,title,focus)
        faq_pairs=[
          (f'What is {focus}?',f'{title} explains {focus} as a practical process. The article focuses on useful implementation decisions rather than repeating the keyword.'),
          (f'Why is {focus} important?',f'{focus.capitalize()} can improve clarity, discoverability, usability or technical quality when it is applied to the right problem.'),
          (f'How should I start with {focus}?','Start with a baseline review, identify the highest-impact issue, make one focused change and validate the result before moving to the next task.'),
          ('What mistakes should I avoid?','Avoid keyword stuffing, copied content, unnecessary changes, inconsistent page structures and decisions that block users or search engines from important information.'),
          ('How often should I review the work?','Review it after major content, design, migration or technical changes and include it in routine website maintenance when performance or search visibility changes.'),
        ]
        faq=faq_html(title,focus)
        canonical=canonical_for(path)
        replacements={
          '{{TITLE}}':html.escape(title+' | Javed Chaudhary',quote=True),
          '{{TITLE_TEXT}}':html.escape(title),
          '{{DESCRIPTION}}':html.escape(description,quote=True),
          '{{CANONICAL}}':canonical,
          '{{CATEGORY}}':html.escape(LABELS[category]),
          '{{IMAGE}}':html.escape(image,quote=True),
          '{{IMAGE_ALT}}':html.escape(f'{focus} visual for {title}',quote=True),
          '{{HEADER}}':header,'{{FOOTER}}':footer,'{{CONTENT}}':content,
          '{{FAQ}}':faq,'{{SCHEMA}}':schema(title,focus,faq_pairs),
        }
        out=template
        for k,v in replacements.items(): out=out.replace(k,v)
        out=re.sub(r'<img\\b[^>]*>',lambda m:m.group(0),out)
        if len(re.findall(r'<img\\b',out,re.I))!=1: raise RuntimeError(f'{path}: image count is not 1')
        if len(re.findall(r'<h1\\b',out,re.I))!=1: raise RuntimeError(f'{path}: H1 count is not 1')
        path.write_text(out,encoding='utf-8')
        article_paths.append((category,path,slug,title,focus,image))

    # Category pages: exactly five article cards/links per category, using the same clean structure.
    for category in LABELS:
        items=[x for x in article_paths if x[0]==category]
        links=[]
        for _,p,slug,title,focus,image in items:
            url=canonical_for(p).replace('https://javed-portfolio-jade.vercel.app','')
            links.append(f'<article class="blog-card"><h2><a href="{url}">{html.escape(title)}</a></h2><p>{html.escape(focus.capitalize())} — a practical guide for improving search visibility and website quality.</p><a href="{url}">Read article</a></article>')
        page=ROOT/'blog'/category/'index.html'
        page.parent.mkdir(parents=True,exist_ok=True)
        page.write_text(f'''<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>{html.escape(LABELS[category])} Articles | Javed Chaudhary</title><meta name="description" content="Practical {html.escape(LABELS[category])} articles by Javed Chaudhary."><link rel="stylesheet" href="/css/style.css"><link rel="stylesheet" href="/css/responsive.css"><link rel="icon" type="image/svg+xml" href="/assests/favicon.svg"></head><body>{header}<main class="blog-category-page"><section class="blog-category-hero"><h1>{html.escape(LABELS[category])}</h1><p>Practical, structured articles written to help you understand and apply {html.escape(LABELS[category])} clearly.</p></section><section class="blog-category-grid">{''.join(links)}</section></main>{footer}<script src="/js/script.js"></script></body></html>''',encoding='utf-8')

    # Main blog page: six categories, five articles each.
    cards=[]
    for category in LABELS:
        items=[x for x in article_paths if x[0]==category]
        url='/blog/'+category+'/'
        cards.append(f'<section class="blog-category-block"><h2><a href="{url}">{LABELS[category]}</a></h2><div class="blog-grid">'+''.join(f'<article class="blog-card"><h3><a href="{canonical_for(p).replace("https://javed-portfolio-jade.vercel.app","")}">{html.escape(title)}</a></h3><p>{html.escape(focus.capitalize())}</p></article>' for _,p,slug,title,focus,image in items)+'</div></section>')
    (ROOT/'blog/index.html').write_text(f'''<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>SEO Blog | Javed Chaudhary</title><meta name="description" content="SEO and web development articles by Javed Chaudhary."><link rel="stylesheet" href="/css/style.css"><link rel="stylesheet" href="/css/responsive.css"><link rel="icon" type="image/svg+xml" href="/assests/favicon.svg"></head><body>{header}<main class="blog-index"><section class="blog-index-hero"><h1>SEO & Web Development Blog</h1><p>Practical guides covering Technical SEO, On-Page SEO, Off-Page SEO, Local SEO, WordPress SEO and Web Development.</p></section>{''.join(cards)}</main>{footer}<script src="/js/script.js"></script></body></html>''',encoding='utf-8')

    # Sitemap: exactly 30 article URLs plus key pages.
    urls=['https://javed-portfolio-jade.vercel.app/','https://javed-portfolio-jade.vercel.app/blog/']
    urls += ['https://javed-portfolio-jade.vercel.app/blog/'+c+'/' for c in LABELS]
    urls += [canonical_for(p) for _,p,_,_,_,_ in article_paths]
    xml='<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+''.join(f'<url><loc>{html.escape(u)}</loc></url>' for u in urls)+'</urlset>'
    (ROOT/'sitemap.xml').write_text(xml,encoding='utf-8')

    if len(article_paths)!=30: raise RuntimeError(f'Expected 30 articles, found {len(article_paths)}')
    counts={c:len([x for x in article_paths if x[0]==c]) for c in LABELS}
    if any(v!=5 for v in counts.values()): raise RuntimeError('Category count is not 5 each: '+str(counts))
    if len(focus_seen)!=30: raise RuntimeError('Focus keywords are not unique')
    print('Built 30 articles:',counts)

if __name__=='__main__': main()
