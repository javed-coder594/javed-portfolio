const texts = [
    "SEO Executive",
    "On-Page SEO Specialist",
    "Off-Page SEO Specialist",
    "Technical SEO Specialist",
    "WordPress Developer",
    "HTML • CSS • JavaScript"
];

const typingElement = document.querySelector(".typing");

if (typingElement) {
    let count = 0;
    let index = 0;

    (function type() {
        if (count === texts.length) {
            count = 0;
        }

        const currentText = texts[count];
        typingElement.textContent = currentText.slice(0, ++index);

        if (index === currentText.length) {
            setTimeout(() => {
                index = 0;
                count++;
                type();
            }, 1800);
        } else {
            setTimeout(type, 90);
        }
    })();
}

// Mobile menu - works on homepage and every blog page.
document.addEventListener("DOMContentLoaded", () => {
    const menu = document.querySelector(".menu-toggle");
    const navbar = document.querySelector(".navbar");

    if (menu && navbar) {
        menu.addEventListener("click", () => {
            navbar.classList.toggle("active");
            menu.classList.toggle("active");
        });
    }
});
