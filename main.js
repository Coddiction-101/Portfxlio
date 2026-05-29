const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

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

document.querySelectorAll('#nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = hamburger.querySelector('i');
        icon.className = 'ri-menu-3-line';
    });
});

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    themeIcon.className = newTheme === 'dark' ? 'ri-sun-line' : 'ri-moon-line';
});

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeIcon.className = savedTheme === 'dark' ? 'ri-sun-line' : 'ri-moon-line';
}


const progressBar = document.getElementById("progressBar");
const projectSlider = document.querySelector(".project-slider");
const projectTrack = document.querySelector(".project-track");

if (projectSlider && projectTrack) {
    const projectCards = Array.from(projectTrack.children);
    let isDragging = false;
    let startX = 0;
    let startTranslate = 0;
    let didDrag = false;
    let resumeTimer;

    projectCards.forEach((card) => {
        const clone = card.cloneNode(true);
        clone.setAttribute("aria-hidden", "true");
        clone.querySelectorAll("a").forEach((link) => {
            link.setAttribute("tabindex", "-1");
        });
        projectTrack.appendChild(clone);
    });

    const getTrackTranslate = () => {
        const transform = window.getComputedStyle(projectTrack).transform;

        if (transform === "none") {
            return 0;
        }

        const matrix = new DOMMatrixReadOnly(transform);
        return matrix.m41;
    };

    const normalizeTranslate = (value) => {
        const loopWidth = projectTrack.scrollWidth / 2;

        if (!loopWidth) {
            return value;
        }

        if (value > 0) {
            return value - loopWidth;
        }

        if (value < -loopWidth) {
            return value + loopWidth;
        }

        return value;
    };

    const resumeProjectSlide = () => {
        resumeTimer = window.setTimeout(() => {
            projectTrack.style.animation = "";
            projectTrack.style.transform = "";
        }, 600);
    };

    projectSlider.addEventListener("pointerdown", (event) => {
        if (event.button !== 0) {
            return;
        }

        window.clearTimeout(resumeTimer);
        isDragging = true;
        didDrag = false;
        startX = event.clientX;
        startTranslate = getTrackTranslate();

        projectTrack.style.animation = "none";
        projectTrack.style.transform = `translateX(${startTranslate}px)`;
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

        const nextTranslate = normalizeTranslate(startTranslate + distance);
        projectTrack.style.transform = `translateX(${nextTranslate}px)`;
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

        resumeProjectSlide();
    };

    projectSlider.addEventListener("pointerup", stopDragging);
    projectSlider.addEventListener("pointercancel", stopDragging);

    projectSlider.addEventListener("click", (event) => {
        if (!didDrag) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();
        didDrag = false;
    }, true);
}

window.addEventListener("scroll", () => {

    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const progress = (scrollTop / scrollHeight) * 100;

    progressBar.style.width = progress + "%";

});

const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
        }
    });
}, {
    threshold: 0.15
});

reveals.forEach((el) => observer.observe(el));
