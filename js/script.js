const texts = [
        "SEO Executive",
    "On-Page SEO Specialist",
    "Off-Page SEO Specialist",
    "Technical SEO Specialist",
    "WordPress Developer",
    "HTML • CSS • JavaScript"   
];

let count = 0;
let index = 0;
let currentText = "";
let letter = "";

(function type() {

    if (count === texts.length) {
        count = 0;
    }

    currentText = texts[count];
    letter = currentText.slice(0, ++index);

    document.querySelector(".typing").textContent = letter;

    if (letter.length === currentText.length) {

        setTimeout(() => {

            index = 0;
            count++;

            type();

        }, 1800);

    } else {

        setTimeout(type, 90);

    }

})();   

// Mobile Menu

const menu = document.querySelector(".menu-toggle");
const navbar = document.querySelector(".navbar");

menu.addEventListener("click", () => {

    navbar.classList.toggle("active");

});

// Add Blog to footer Quick Links only (keeps Blog out of the main navigation)
document.addEventListener("DOMContentLoaded", () => {
    const footerQuickLinks = document.querySelector(".footer .footer-col:nth-child(2) ul");

    if (footerQuickLinks && !footerQuickLinks.querySelector('a[href="blog.html"]')) {
        const blogItem = document.createElement("li");
        blogItem.innerHTML = '<a href="blog.html">Blog</a>';
        footerQuickLinks.appendChild(blogItem);
    }
});
