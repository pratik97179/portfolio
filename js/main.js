// DOM Element References
const about = document.querySelector("#about");
const contact = document.querySelector("#contact");
const work = document.querySelector("#work");
const aboutContent = document.querySelector("#about-content");
const contactContent = document.querySelector("#contact-content");

// WinBox Instances
let aboutBox = null;
let contactBox = null;
let workBox = null;

// Create Work Content
const workContent = document.querySelector("#work-content");
document.querySelector(".hidden").appendChild(workContent);

const workTerminal = workContent.querySelector("#work-terminal");

// Splash Screen Loader
const dotLoader = document.querySelector(".dot-loader");
let dotCount = 0;

const interval = setInterval(() => {
    dotCount = (dotCount + 1) % 4;
    dotLoader.textContent = ".".repeat(dotCount);
}, 400);

setTimeout(() => {
    document.getElementById("splash-screen").style.opacity = "0";
    setTimeout(() => {
        document.getElementById("splash-screen").style.display = "none";
    }, 500);
    clearInterval(interval);
}, 2000);

// Experience Data
const experiences = [
    {
        id: "5paisa",
        company: "5paisa Capital Ltd.",
        role: "Software Developer",
        duration: "Nov 2024 - July 2025 · Bangalore, India",
        description: "Retail trading app for stocks, F&O, and mutual funds.",
        visit: '<a href="https://www.5paisa.com" target="_blank">Visit</a>',
    },
    {
        id: "antino",
        company: "Antino Labs",
        role: "Senior Software Developer",
        duration: "Jun 2024 - Oct 2024 · Bangalore, India",
        description: "Full-cycle tech consulting and product engineering.",
        visit: '<a href="https://www.antino.com/" target="_blank">Visit</a>',
    },
    {
        id: "techalchemy",
        company: "Tech Alchemy",
        role: "SDE-1",
        duration: "Jul 2021 - May 2024 · Remote, India",
        description: "Custom mobile/web product builds with global reach.",
        visit: '<a href="https://techalchemy.com/" target="_blank">Visit</a>',
    },
];

// Expand/Collapse States
let openStates = {};
experiences.forEach((exp) => (openStates[exp.id] = false));

// Render Work Terminal UI
function renderWorkTerminal() {
    let output =
        '<p><span class="cd">$ cd </span><span>/work</span>\n<span class="cd">$ ls</span></p>';

    experiences.forEach((exp) => {
        const symbol = openStates[exp.id] ? "-" : "+";
        output += `<p class="p2"><span class="green" data-id="${exp.id}">${symbol} ${exp.company}</span>\n</p>`;

        if (openStates[exp.id]) {
            output += `<p class="p2">   ├── <span class="grey">Role</span>: ${exp.role}\n`;
            output += `   ├── <span class="grey">Duration</span>: ${exp.duration}\n`;
            output += `   ├── <span class="grey">About</span>: ${exp.description}\n`;
            output += `   └── ${exp.visit}</p>`;
        }
    });

    workTerminal.innerHTML = output.trim();

    workTerminal.querySelectorAll(".green[data-id]").forEach((el) => {
        el.addEventListener("click", () => {
            const id = el.getAttribute("data-id");
            openStates[id] = !openStates[id];
            renderWorkTerminal();
        });
    });
}

// WinBox Handlers
about.addEventListener("click", () => {
    if (aboutBox && !aboutBox.closed) {
        aboutBox.focus();
        return;
    }
    aboutBox = new WinBox({
        title: "About Me",
        width: "500px",
        height: "450px",
        top: 50,
        right: 50,
        bottom: 50,
        left: 50,
        mount: aboutContent,
        onfocus() {
            this.setBackground("#00aa00");
        },
        onblur() {
            this.setBackground("#777");
        },
        onclose() {
            aboutBox = null;
        },
    });
});

contact.addEventListener("click", () => {
    if (contactBox && !contactBox.closed) {
        contactBox.focus();
        return;
    }
    contactBox = new WinBox({
        title: "Contact Me",
        width: "500px",
        height: "450px",
        top: 150,
        left: 200,
        mount: contactContent,
        onfocus() {
            this.setBackground("#00aa00");
        },
        onblur() {
            this.setBackground("#777");
        },
        onclose() {
            contactBox = null;
        },
    });
});

work.addEventListener("click", () => {
    if (workBox && !workBox.closed) {
        workBox.focus();
        return;
    }
    workBox = new WinBox({
        title: "Work",
        width: "500px",
        height: "450px",
        top: 250,
        left: 350,
        mount: workContent,
        onfocus() {
            this.setBackground("#00aa00");
        },
        onblur() {
            this.setBackground("#777");
        },
        onclose() {
            workBox = null;
        },
    });
    renderWorkTerminal();
});

// Hover Image Animation (Head Section)
const hoverName = document.querySelector(".hover-name");
const hoverImg = document.querySelector(".hover-image");

let mouseX = 0,
    mouseY = 0;
let imgX = 0,
    imgY = 0;
let isHovering = false;

const animate = () => {
    if (!isHovering) return;
    imgX += (mouseX - imgX) * 0.12;
    imgY += (mouseY - imgY) * 0.12;
    hoverImg.style.transform = `translate(${imgX + 10}px, ${
        imgY - 80
    }px) scale(1)`;
    requestAnimationFrame(animate);
};

hoverName.addEventListener("mouseenter", () => {
    isHovering = true;
    hoverImg.style.opacity = "0.8";
    animate();
});

hoverName.addEventListener("mousemove", (e) => {
    const rect = hoverName.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
});

hoverName.addEventListener("mouseleave", () => {
    isHovering = false;
    hoverImg.style.opacity = "0";
    hoverImg.style.transform = "translate(0, 0) scale(0.95)";
});
