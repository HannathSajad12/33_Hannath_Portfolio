// Hannath Sajad Portfolio — Vanilla JavaScript / DOM
const projects = [
    {
        title: "AI-Powered GitHub Dev Assistant",
        description: "AI platform that analyzes GitHub commits to automate code refactoring, detect bug patterns and security vulnerabilities, and generate repository pull requests.",
        image: "images/github-assistant.svg",
        tags: ["AI", "LLM", "GitHub", "Analytics"],
        category: "AI",
        link: "https://github.com/HannathSajad"
    },
    {
        title: "FPGA-Based Hardware Acceleration System",
        description: "FPGA acceleration system designed to improve execution throughput and reduce latency using sequential and parallel processing architectures.",
        image: "images/fpga.svg",
        tags: ["Hardware", "FPGA", "Parallel Processing"],
        category: "Hardware",
        link: "https://github.com/HannathSajad"
    },
    {
        title: "Smart Aquarium Monitoring System",
        description: "IoT monitoring platform using ESP32 and environmental sensors, with AWS data pipelines, threshold alerts and a live visualization dashboard.",
        image: "images/aquarium.svg",
        tags: ["IoT", "ESP32", "AWS", "Sensors"],
        category: "IoT",
        link: "https://github.com/HannathSajad"
    }
];

const projectGrid = document.querySelector("#projectGrid");
const filterButtons = document.querySelectorAll(".filter-btn");

const renderProjects = (filter = "All") => {
    if (!projectGrid) return;
    const visibleProjects = filter === "All"
        ? projects
        : projects.filter(({ category }) => category === filter);

    projectGrid.innerHTML = visibleProjects.map(({ title, description, image, tags, link }) => `
        <article class="project-card">
            <img src="${image}" alt="${title} project illustration">
            <div class="project-body">
                <h3>${title}</h3>
                <p>${description}</p>
                <div class="tags">
                    ${tags.map(tag => `<span>${tag}</span>`).join("")}
                </div>
                <a class="project-link" href="${link}" target="_blank" rel="noopener">View Repository ↗</a>
            </div>
        </article>
    `).join("");
};

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
        renderProjects(button.dataset.filter);
    });
});

// Mobile navigation toggle
const navToggle = document.querySelector("#navToggle");
const navLinks = document.querySelector("#navLinks");

if (navToggle && navLinks) navToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
});

if (navLinks) navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => navLinks.classList.remove("open"));
});

// Theme preference persisted with localStorage
const themeToggle = document.querySelector("#themeToggle");
const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme) document.documentElement.dataset.theme = savedTheme;
if (themeToggle) themeToggle.textContent = document.documentElement.dataset.theme === "light" ? "☀" : "☾";

if (themeToggle) themeToggle.addEventListener("click", () => {
    const current = document.documentElement.dataset.theme;
    const next = current === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("portfolio-theme", next);
    themeToggle.textContent = next === "light" ? "☀" : "☾";
});

// Contact form validation with regular expressions — no page reload
const form = document.querySelector("#contactForm");
const status = document.querySelector("#formStatus");

const validators = {
    name: {
        regex: /^[A-Za-z][A-Za-z\s.'-]{2,39}$/,
        message: "Enter a valid name (3–40 characters)."
    },
    email: {
        regex: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
        message: "Enter a valid email address."
    },
    message: {
        regex: /^[\s\S]{10,500}$/,
        message: "Message must contain 10–500 characters."
    }
};

const validateField = (field) => {
    const input = document.querySelector(`#${field}`);
    const error = document.querySelector(`#${field}Error`);
    const value = input.value.trim();

    if (!validators[field].regex.test(value)) {
        error.textContent = validators[field].message;
        input.setAttribute("aria-invalid", "true");
        return false;
    }

    error.textContent = "";
    input.setAttribute("aria-invalid", "false");
    return true;
};

Object.keys(validators).forEach(field => {
    const fieldElement = document.querySelector(`#${field}`);
    if (fieldElement) fieldElement.addEventListener("input", () => validateField(field));
});

if (form) form.addEventListener("submit", event => {
    event.preventDefault();
    const valid = Object.keys(validators).every(validateField);

    if (!valid) {
        status.textContent = "Please correct the highlighted fields.";
        return;
    }

    status.textContent = "Message validated successfully! Thank you.";
    form.reset();
});

// Scroll-to-top button
const toTop = document.querySelector("#toTop");
window.addEventListener("scroll", () => {
    toTop.classList.toggle("show", window.scrollY > 500);
});
toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

document.querySelector("#year").textContent = new Date().getFullYear();

// Initial DOM rendering
renderProjects();
