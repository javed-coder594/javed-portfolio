const texts = [
    "SEO Executive",
    "Technical SEO Specialist",
    "WordPress Developer",
    "On-Page SEO Specialist",
    "Off-Page SEO Specialist"
];

function startTyping() {
    const typingElement = document.querySelector(".typing");
    if (!typingElement) return;
    let count = 0;
    let index = 0;
    function type() {
        if (count === texts.length) count = 0;
        const currentText = texts[count];
        typingElement.textContent = currentText.slice(0, ++index);
        if (index === currentText.length) {
            setTimeout(() => { index = 0; count++; type(); }, 1800);
        } else setTimeout(type, 75);
    }
    type();
}

function setupMobileMenu() {
    const menu = document.querySelector(".menu-toggle");
    const navbar = document.querySelector(".navbar");
    if (!menu || !navbar || menu.dataset.menuReady === "true") return;
    menu.dataset.menuReady = "true";
    menu.addEventListener("click", () => {
        navbar.classList.toggle("active");
        menu.classList.toggle("active");
        menu.setAttribute("aria-expanded", navbar.classList.contains("active") ? "true" : "false");
    });
}

function setupHeroRedesign() {
    const hero = document.querySelector(".hero#home") || document.querySelector(".hero");
    if (!hero || hero.dataset.redesigned === "true") return;
    hero.dataset.redesigned = "true";
    hero.classList.add("hero-modern");
    hero.innerHTML = `
        <div class="hero-bg-image" aria-hidden="true"></div>
        <div class="hero-overlay" aria-hidden="true"></div>
        <div class="hero-glow" aria-hidden="true"></div>
        <div class="hero-grid" aria-hidden="true"></div>
        <div class="container hero-background-container">
            <div class="hero-modern-content">
                <div class="hero-kicker"><i class="fa-solid fa-sparkles"></i> SEO & Website Growth Specialist</div>
                <h1 class="hero-title">
                    <span class="hero-name">Javed <span>Chaudhary</span></span>
                    <span class="hero-main-line">SEO <span>Specialist</span></span>
                </h1>
                <div class="hero-role-line"><span class="hero-role-label">I AM A</span><span class="typing"></span><span class="hero-cursor">|</span></div>
                <p class="hero-description">I help businesses improve search visibility, grow organic traffic, and build fast, search-friendly websites through practical SEO and modern web development.</p>
                <div class="hero-highlights">
                    <span class="hero-highlight"><i class="fa-solid fa-magnifying-glass-chart"></i> Technical SEO</span>
                    <span class="hero-highlight"><i class="fa-solid fa-arrow-trend-up"></i> On-Page SEO</span>
                    <span class="hero-highlight"><i class="fa-solid fa-link"></i> Off-Page SEO</span>
                    <span class="hero-highlight"><i class="fa-brands fa-wordpress"></i> WordPress</span>
                </div>
                <div class="hero-btns"><a href="#contact" class="btn">Hire Me</a><a href="assests/Javed_Chaudhary_CV.pdf" class="outline-btn" download>Download CV</a></div>
                <div class="hero-scroll"><i class="fa-solid fa-arrow-down"></i> Explore my work</div>
            </div>
            <div class="hero-side-badge" aria-hidden="true"><strong>SEO</strong><span>Specialist</span></div>
        </div>`;
    const modernCss = document.createElement("link");
    modernCss.rel = "stylesheet";
    modernCss.href = "css/hero-modern.css";
    document.head.appendChild(modernCss);
    const referenceCss = document.createElement("link");
    referenceCss.rel = "stylesheet";
    referenceCss.href = "css/hero-reference.css";
    document.head.appendChild(referenceCss);
}

function setupBlogsFooter() {
    const blogCategories = [
        ["Technical SEO", "/blog/technical-seo/"],
        ["On-Page SEO", "/blog/on-page-seo/"],
        ["Off-Page SEO", "/blog/off-page-seo/"],
        ["Local SEO", "/blog/local-seo/"],
        ["WordPress SEO", "/blog/wordpress-seo/"],
        ["Web Development", "/blog/web-development/"]
    ];

    let footer = document.querySelector("footer.footer");
    if (!footer) {
        footer = document.createElement("footer");
        footer.className = "footer";
        footer.innerHTML = `<div class="container"><div class="footer-grid">
            <div class="footer-col"><a href="/" class="footer-logo"><span>J</span>aved</a><p>SEO Executive and WordPress Developer helping businesses improve online visibility, website performance, and organic growth.</p></div>
            <div class="footer-col"><h3>Quick Links</h3><ul><li><a href="/#home">Home</a></li><li><a href="/#about">About</a></li><li><a href="/#experience">Experience</a></li><li><a href="/#skills">Skills</a></li><li><a href="/#projects">Projects</a></li><li><a href="/#contact">Contact</a></li></ul></div>
            <div class="footer-col"><h3><a href="/blog/">Blogs</a></h3><ul></ul></div>
            <div class="footer-col"><h3>Contact</h3><ul><li><i class="fas fa-envelope"></i> javedchaudhary594@gmail.com</li><li><i class="fas fa-phone"></i> +91 9390988594</li><li><i class="fas fa-location-dot"></i> Hyderabad, India</li></ul></div>
        </div><div class="footer-bottom"><p>© 2026 <span>Javed Chaudhary</span>. All Rights Reserved.</p></div></div>`;
        document.body.appendChild(footer);
    }

    const columns = Array.from(footer.querySelectorAll(".footer-col"));
    let blogsColumn = columns.find(col => {
        const heading = col.querySelector("h3");
        return heading && /^(services|blogs)$/i.test(heading.textContent.trim());
    });
    if (!blogsColumn) {
        blogsColumn = document.createElement("div");
        blogsColumn.className = "footer-col";
        footer.querySelector(".footer-grid")?.appendChild(blogsColumn);
    }

    const heading = blogsColumn.querySelector("h3") || document.createElement("h3");
    heading.innerHTML = '<a href="/blog/" aria-label="Open Blogs page">Blogs</a>';
    if (!heading.parentElement) blogsColumn.appendChild(heading);

    const blogHeadingLink = heading.querySelector("a");
    if (blogHeadingLink) {
        blogHeadingLink.href = "/blog/";
        blogHeadingLink.style.display = "inline-block";
        blogHeadingLink.style.position = "relative";
        blogHeadingLink.style.zIndex = "10";
        blogHeadingLink.addEventListener("click", event => {
            event.preventDefault();
            window.location.assign("/blog/");
        });
    }

    let list = blogsColumn.querySelector("ul");
    if (!list) {
        list = document.createElement("ul");
        blogsColumn.appendChild(list);
    }
    list.innerHTML = blogCategories.map(([name, url]) => `<li><a href="${url}">${name}</a></li>`).join("");

    footer.querySelectorAll("a").forEach(link => {
        if (/^blogs?$/i.test(link.textContent.trim())) link.href = "/blog/";
    });
}

document.addEventListener("DOMContentLoaded", () => {
    setupHeroRedesign();
    setupMobileMenu();
    setupBlogsFooter();
    startTyping();
});
