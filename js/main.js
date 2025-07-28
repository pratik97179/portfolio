const about = document.querySelector("#about");
const contact = document.querySelector("#contact");
const work = document.querySelector("#work");
const aboutContent = document.querySelector("#about-content");
const contactContent = document.querySelector("#contact-content");

let aboutBox = null;
let contactBox = null;
let workBox = null;

const workContent = document.createElement("div");
workContent.id = "work-content";
workContent.innerHTML = `<h2>work:$<span class="cursor"> _</span></h2><pre id="work-terminal"></pre>`;
document.querySelector(".hidden").appendChild(workContent);

const workTerminal = workContent.querySelector("#work-terminal");

window.addEventListener('load', () => {
  const splash = document.getElementById('splash-screen');
  setTimeout(() => {
    splash.style.display = 'none';
  }, 2500); // match animation time
});


const experiences = [
    {
        id: "5paisa",
        company: "5paisa Capital Ltd.",
        role: "Software Developer",
        duration: "Nov 2024 - July 2025 · Bangalore, India",
        description: "Retail trading app for Stocks, F&O and MF.",
        visit: '<a href="https://www.5paisa.com" target="_blank">Visit</a>',
    },
    {
        id: "antino",
        company: "Antino Labs",
        role: "Senior Software Developer",
        duration: "Jun 2024 - Oct 2024 · Bangalore, India",
        description: "Technology consulting & digital development.",
        visit: '<a href="https://www.antino.com/" target="_blank">Visit</a>',
    },
    {
        id: "techalchemy",
        company: "Tech Alchemy",
        role: "SDE-1",
        duration: "Jul 2021 - May 2024 · Remote, India",
        description: "Full-stack mobile and web product development.",
        visit: '<a href="https://techalchemy.com/" target="_blank">Visit</a>',
    },
];

let openStates = {};
experiences.forEach((exp) => (openStates[exp.id] = false));

function renderWorkTerminal() {
    let output = `<span class="cd">$ cd </span><span>/work</span>\n<span class="cd">$ ls</span>\n\n`;

    experiences.forEach((exp) => {
        const symbol = openStates[exp.id] ? "-" : "+";
        output += `<span class="green" data-id="${exp.id}">${symbol} ${exp.company}</span>\n`;

        if (openStates[exp.id]) {
            output += `   ├── <span class="grey">Role</span>: ${exp.role}\n`;
            output += `   ├── <span class="grey">Duration</span>: ${exp.duration}\n`;
            output += `   └── <span class="grey">Description</span>: ${exp.description}\n`;
            output += `   └── ${exp.visit}\n\n`;
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
        onclose: function () {
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
        onclose: function () {
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
        onclose: function () {
            workBox = null;
        },
    });
    renderWorkTerminal();
});
