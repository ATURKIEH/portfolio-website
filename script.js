// ----- buttons (hero) -----
const viewWorkBtn = document.getElementById("viewWorkBtn");
const getInTouchBtn = document.getElementById("getInTouchBtn");

if (viewWorkBtn) {
  viewWorkBtn.addEventListener("click", () => {
    document.getElementById("projects").scrollIntoView({ behavior: "smooth" });
  });
}

if (getInTouchBtn) {
  getInTouchBtn.addEventListener("click", () => {
    document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
  });
}

// ----- footer year -----
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ----- scroll spy (active nav link) -----
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

function setActiveLink() {
  let currentId = "";

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    // section considered active when its top is near the header area
    if (rect.top <= 120 && rect.bottom >= 120) {
      currentId = section.id;
    }
  });

  navLinks.forEach((a) => {
    a.classList.toggle("active", a.getAttribute("href") === `#${currentId}`);
  });
}


// ---------- custom cursor (desktop) ----------
const dot = document.querySelector(".cursor-dot");
const ring = document.querySelector(".cursor-ring");

let mouseX = 0;
let mouseY = 0;
let ringX = 0;
let ringY = 0;

function showCursorOnce() {
  if (!dot || !ring) return;
  dot.style.opacity = "1";
  ring.style.opacity = "1";
  window.removeEventListener("mousemove", showCursorOnce);
}
window.addEventListener("mousemove", showCursorOnce);

window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  if (dot) {
    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
  }
});

// smooth follow for ring
function animateRing() {
  if (ring) {
    ringX += (mouseX - ringX) * 0.14;
    ringY += (mouseY - ringY) * 0.14;
    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;
  }
  requestAnimationFrame(animateRing);
}
animateRing();

// hover effect on clickable elements
const hoverTargets = "a, button, .project-card, .skill-card, .experience-card, .chip";
document.addEventListener("mouseover", (e) => {
  if (!ring) return;
  if (e.target.closest(hoverTargets)) ring.classList.add("cursor-hover");
});
document.addEventListener("mouseout", (e) => {
  if (!ring) return;
  if (e.target.closest(hoverTargets)) ring.classList.remove("cursor-hover");
});


// ----- reveal on scroll -----
const revealEls = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        revealObserver.unobserve(entry.target); // animate once
      }
    });
  },
  { threshold: 0.12 }
);

revealEls.forEach((el) => revealObserver.observe(el));


window.addEventListener("scroll", setActiveLink);
window.addEventListener("load", setActiveLink);

// ----- contact form (mailto) -----
const sendBtn = document.getElementById("sendBtn");

if (sendBtn) {
  sendBtn.addEventListener("click", () => {
    const name = document.getElementById("contactName")?.value.trim() || "";
    const email = document.getElementById("contactEmail")?.value.trim() || "";
    const message = document.getElementById("contactMessage")?.value.trim() || "";

    if (!message) {
      alert("Please write a message first.");
      return;
    }

    const to = "turkieharef@gmail.com";
    const subject = `Portfolio message from ${name || "Someone"}`;

    const bodyLines = [
      `Name: ${name || "-"}`,
      `Email: ${email || "-"}`,
      "",
      "Message:",
      message,
    ];

    const body = bodyLines.join("\n");

    // build mailto safely
    const mailto = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
  });
}

