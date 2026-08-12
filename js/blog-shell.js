document.addEventListener('DOMContentLoaded',()=>{
    const styleLinks = [
        '/css/responsive.css',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css'
    ];

    styleLinks.forEach(href=>{
        if(!document.querySelector(`link[href="${href}"]`)){
            const link=document.createElement('link');
            link.rel='stylesheet';
            link.href=href;
            document.head.appendChild(link);
        }
    });

    const h=`<header class="header"><div class="container"><a href="/" class="logo"><span>J</span>aved</a><nav class="navbar"><ul class="nav-links"><li><a href="/#home">Home</a></li><li><a href="/#about">About</a></li><li><a href="/#experience">Experience</a></li><li><a href="/#skills">Skills</a></li><li><a href="/#projects">Projects</a></li><li><a href="/#achievements">Achievements</a></li><li><a href="/#contact">Contact</a></li></ul></nav><a href="/#contact" class="hire-btn">Hire Me</a><div class="menu-toggle"><span></span><span></span><span></span></div></div></header>`;
    const f=`<footer class="footer"><div class="container"><div class="footer-grid"><div class="footer-col"><a href="/" class="footer-logo"><span>J</span>aved</a><p>SEO Executive specializing in Technical SEO, On-Page SEO, Off-Page SEO, WordPress Development, and Website Optimization.</p></div><div class="footer-col"><h3>Quick Links</h3><ul><li><a href="/#home">Home</a></li><li><a href="/#about">About</a></li><li><a href="/#experience">Experience</a></li><li><a href="/#skills">Skills</a></li><li><a href="/#projects">Projects</a></li><li><a href="/#achievements">Achievements</a></li><li><a href="/blog/">Blog</a></li><li><a href="/#contact">Contact</a></li></ul></div><div class="footer-col"><h3>Blogs</h3><ul><li><a href="/blog/technical-seo/">Technical SEO</a></li><li><a href="/blog/on-page-seo/">On-Page SEO</a></li><li><a href="/blog/off-page-seo/">Off-Page SEO</a></li><li><a href="/blog/local-seo/">Local SEO</a></li><li><a href="/blog/wordpress-seo/">WordPress SEO</a></li><li><a href="/blog/web-development/">Web Development</a></li></ul></div><div class="footer-col"><h3>Contact</h3><ul><li>javedchaudhary594@gmail.com</li><li>+91 9390988594</li><li>Hyderabad, India</li></ul><h3>Follow Me</h3><div class="footer-social"><a href="https://www.linkedin.com/in/javed-chaudhary-b898a7260/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a><a href="https://github.com/javed-coder594" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><i class="fab fa-github"></i></a><a href="mailto:javedchaudhary594@gmail.com" aria-label="Email"><i class="fas fa-envelope"></i></a><a href="https://wa.me/919390988594" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><i class="fab fa-whatsapp"></i></a></div></div></div><div class="footer-bottom"><p>© 2026 <span>Javed Chaudhary</span>. All Rights Reserved.</p></div></div></footer>`;

    document.body.insertAdjacentHTML('afterbegin',h);
    document.body.insertAdjacentHTML('beforeend',f);

    const menu=document.querySelector('.menu-toggle');
    const navbar=document.querySelector('.navbar');
    if(menu && navbar){
        menu.addEventListener('click',()=>{
            navbar.classList.toggle('active');
            menu.classList.toggle('active');
        });
    }
});
