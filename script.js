import { profileInfo, projects, skills, quotes, fetchGitHub } from "./infoObj.js"

const themeToggle = document.getElementById('themeToogle');
const htmlTag = document.documentElement;
const navbar = document.querySelector('nav');
const projectsBody = document.querySelector("#projects #projects-body");
const imgIcon01 = document.querySelector("#img-icon-01");
const skillsContainer = document.querySelector("#skills .badge-container");
const bgImg = document.querySelector(".container-nav-head.bg-img");
const quoteElement = document.getElementById("random-qoute");
const contactSection = document.getElementById('contact');
const contactLinks = contactSection.querySelector('.contact-links');
const profileContainer = document.getElementById('profileInfo');

document.addEventListener('DOMContentLoaded', async function () {
    // after DOM load
    try {
        // await fetchGitHub();
    }
    catch (err) {
        console.log(err)
    }
    loadSkills();
    loadProjs();
    loadSocialLinks();
    random();
    loadProfileInfo();

    // Initialize the theme state
    let isDark = true;

    // Set initial theme
    htmlTag.setAttribute('data-theme', 'dark');
    themeToggle.innerHTML = `<i class="fa-solid fa-moon"></i>`;

    themeToggle.addEventListener('click', function () {
        // Toggle the theme state
        isDark = !isDark;

        if (isDark) {
            htmlTag.setAttribute('data-theme', 'dark');
            themeToggle.innerHTML = `<i class="fa-solid fa-moon"></i>`;
        } else {
            htmlTag.setAttribute('data-theme', 'light');
            themeToggle.innerHTML = `<i class="fa-regular fa-sun"></i>`;
        }
        // Initial navbar color update on load
        updateNavbarBackground();
    });

});

function loadSkills() {
    Object.values(skills).flat().forEach(skill => {
        const span = document.createElement("span");
        span.classList.add("badge");
        span.textContent = skill;
        skillsContainer.appendChild(span);
    });
}
function loadProjs() {
    Object.values(projects).forEach((proj) => {
        const project = `
        <details>
            <summary role="button" class="outline secondary">${proj.name} <i class="fa-solid ${proj.faIcon ? proj.faIcon : "fa-umbrella"}"></i></summary>
            <article>
                <h6>
                    ${proj.link ? `<a href="${proj.link}" target="_blank">
                        ${proj.gitTitle ? proj.gitTitle : proj.name}
                        <i class="link fa-solid fa-up-right-from-square"></i></a>` : ''}
                </h6>
                <p>${proj.description}</p>
                <p>⚪ Tools Used: ${proj.tools ? proj.tools.join(", ") : "N/A"}</p>
            </article>
        </details>
        `;
        projectsBody.innerHTML += project;
    });

    // Auto-close after 60 seconds
    document.querySelectorAll('#projects-body details').forEach(details => {
        details.addEventListener('toggle', () => {
            if (details.open) {
                // Clear any existing timers for this details element
                clearTimeout(details.closeTimer);

                // Start a new 60 second timer
                details.closeTimer = setTimeout(() => {
                    details.open = false;
                }, 60000);
            }
        });
    });
}

const bgImgSrc = ["./assets/bg1.jpg", "./assets/bg2.png"]

function random() {
    // Set image PFP
    const randomIndexImg = Math.floor(Math.random() * profileInfo.images.length);
    imgIcon01.setAttribute("src", `${profileInfo.images[randomIndexImg]}`)
    // Set random Quote
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quoteElement.textContent = quotes[randomIndex] ? quotes[randomIndex] : "No matter where you go, everyone's connected.";
    // Set bg
    // Use current time to decide which one to take
    const index = Date.now() % bgImgSrc.length;
    const selectedImage = bgImgSrc[index];
    bgImg.style.backgroundImage = `url("${bgImgSrc[1]}")`;
}

function loadProfileInfo() {
    let info = `
        <article>
            <p><strong>Name:</strong> ${profileInfo.name}</p>
            <p><strong>Degree:</strong> ${profileInfo.degree}</p>
            <p>
                <a href=${profileInfo.links.github}" target="_blank" class="contrast">
                    <i class="fa-brands fa-github"></i> </a>
                <a href="${profileInfo.links.linkedin}" target="_blank">
                    <i class="fa-brands fa-linkedin"></i> </a>
            </p>
        </article>`
    profileContainer.innerHTML += info
}
function loadSocialLinks() {
    // Add LinkedIn link
    // Add GitHub link
    // --- Add Blog link if exists
    if (profileInfo.links.github && profileInfo.links.linkedin) {
        let links = `
        <a href="${profileInfo.links.github}" target="_blank" rel="noopener noreferrer">
        <i class="fa-brands fa-github"></i>
        </a>
        <a href="${profileInfo.links.linkedin}" target="_blank" rel="noopener noreferrer">
        <i class="fa-brands fa-linkedin"></i>
        </a>
        `;
        contactLinks.innerHTML += links
    }
}

function updateNavbarBackground() {
    const currentTheme = htmlTag.getAttribute('data-theme');

    if (currentTheme === 'light') {
        navbar.style.backgroundColor = (window.scrollY > 300) ? "#7585a3" : "hsla(0, 0%, 4%, 0.2)";
        navbar.style.top = (window.scrollY > 300) ? "0" : "8px";
    } else {
        if (window.scrollY > 300) {
            let picoBg = getComputedStyle(document.documentElement)
                .getPropertyValue("--pico-background-color").trim();
            navbar.style.backgroundColor = picoBg;
            navbar.style.top = "0";
        } else {
            navbar.style.backgroundColor = "hsla(0, 0%, 4%, 0.2)";
            navbar.style.top = "8px";
        }
    }
}
document.addEventListener('scroll', updateNavbarBackground);

const handleClick = (e) => {
    e.preventDefault(); // Prevent the default anchor behavior

    const target = e.target.getAttribute('href');
    const location = document.querySelector(target).offsetTop;

    console.log(location);

    const navbarHeight = document.querySelector("nav").offsetHeight;

    window.scrollTo({
        left: 0,
        top: location - (navbarHeight + 20),  // Adjust for navbar height
        behavior: 'smooth'  // Smooth scrolling
    });
}