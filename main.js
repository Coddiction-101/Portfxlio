const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

if (hamburger && navLinks) {
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const isOpen = navLinks.classList.contains('active');
    const icon = hamburger.querySelector('i');

    if (isOpen) {
        icon.className = 'ri-close-line';
    } else {
        icon.className = 'ri-menu-3-line';
    }
});
}

document.querySelectorAll('#nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (!navLinks || !hamburger) {
            return;
        }

        navLinks.classList.remove('active');
        const icon = hamburger.querySelector('i');
        if (icon) {
            icon.className = 'ri-menu-3-line';
        }
    });
});

if (themeToggle && themeIcon) {
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    themeIcon.className = newTheme === 'dark' ? 'ri-sun-line' : 'ri-moon-line';
});
}

const savedTheme = localStorage.getItem('theme');
if (savedTheme && themeIcon) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeIcon.className = savedTheme === 'dark' ? 'ri-sun-line' : 'ri-moon-line';
}


const progressBar = document.getElementById("progressBar");
const projectSlider = document.querySelector(".project-slider");
const projectTrack = document.querySelector(".project-track");

if (projectSlider && projectTrack) {
    let isDragging = false;
    let startX = 0;
    let startScrollLeft = 0;
    let didDrag = false;

    projectSlider.addEventListener("pointerdown", (event) => {
        if (event.button !== 0) {
            return;
        }

        if (event.target.closest(".project-links a")) {
            didDrag = false;
            return;
        }

        isDragging = true;
        didDrag = false;
        startX = event.clientX;
        startScrollLeft = projectSlider.scrollLeft;

        projectSlider.classList.add("is-dragging");
        projectSlider.setPointerCapture(event.pointerId);
    });

    projectSlider.addEventListener("pointermove", (event) => {
        if (!isDragging) {
            return;
        }

        const distance = event.clientX - startX;

        if (Math.abs(distance) > 5) {
            didDrag = true;
        }

        projectSlider.scrollLeft = startScrollLeft - distance;
    });

    const stopDragging = (event) => {
        if (!isDragging) {
            return;
        }

        isDragging = false;
        projectSlider.classList.remove("is-dragging");

        if (projectSlider.hasPointerCapture(event.pointerId)) {
            projectSlider.releasePointerCapture(event.pointerId);
        }
    };

    projectSlider.addEventListener("pointerup", stopDragging);
    projectSlider.addEventListener("pointercancel", stopDragging);

    projectSlider.addEventListener("click", (event) => {
        if (event.target.closest(".project-links a")) {
            didDrag = false;
            return;
        }

        if (!didDrag) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();
        didDrag = false;
    }, true);
}

if (progressBar) {
window.addEventListener("scroll", () => {

    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

    progressBar.style.width = progress + "%";

});
}

const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15
});

reveals.forEach((el) => observer.observe(el));
