// ==========================================
// SHAHEEN WAZIRI — PORTFOLIO WEBSITE
// Complete script.js
// Themes · palettes · calm mode · animations
// ==========================================

"use strict";

const root = document.documentElement;
const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const isCalm = () => root.dataset.motion === "calm";

// ------------------------------------------
// Saved appearance settings
// ------------------------------------------
const PREFS_KEY = "sw-prefs";

function savePrefs() {
  try {
    localStorage.setItem(
      PREFS_KEY,
      JSON.stringify({
        theme: root.dataset.theme,
        palette: root.dataset.palette,
        motion: root.dataset.motion
      })
    );
  } catch (error) {
    // Storage can be unavailable (private mode); the page still works.
  }
}

function notifyChange() {
  window.dispatchEvent(new Event("prefschange"));
}

// Make sure the attributes exist even if the inline head script was removed.
if (!root.dataset.theme) root.dataset.theme = "dark";
if (!root.dataset.palette) root.dataset.palette = "emerald";
if (!root.dataset.motion) root.dataset.motion = reducedQuery.matches ? "calm" : "lively";

// ------------------------------------------
// Settings dock (palette · light/dark · calm)
// ------------------------------------------
const dock = document.getElementById("dock");
const dockToggle = document.getElementById("dockToggle");
const themeToggle = document.getElementById("themeToggle");
const motionToggle = document.getElementById("motionToggle");
const swatches = document.querySelectorAll(".swatch");
const themeMeta = document.querySelector('meta[name="theme-color"]');

function renderSettings() {
  const light = root.dataset.theme === "light";
  const calm = isCalm();

  swatches.forEach((swatch) => {
    swatch.setAttribute("aria-checked", String(swatch.dataset.palette === root.dataset.palette));
  });

  if (themeToggle) {
    themeToggle.setAttribute("aria-label", light ? "Switch to dark theme" : "Switch to light theme");
  }

  if (motionToggle) {
    motionToggle.setAttribute("aria-pressed", String(calm));
    motionToggle.setAttribute("aria-label", calm ? "Turn on lively motion" : "Turn on calm mode");
    motionToggle.title = calm ? "Lively motion" : "Calm mode";
  }

  if (themeMeta) {
    themeMeta.setAttribute("content", light ? "#f4f7fb" : "#070b14");
  }
}

swatches.forEach((swatch) => {
  swatch.addEventListener("click", () => {
    root.dataset.palette = swatch.dataset.palette;
    renderSettings();
    savePrefs();
    notifyChange();
  });
});

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "light" ? "dark" : "light";
    renderSettings();
    savePrefs();
    notifyChange();
  });
}

if (motionToggle) {
  motionToggle.addEventListener("click", () => {
    root.dataset.motion = isCalm() ? "lively" : "calm";
    renderSettings();
    savePrefs();
    notifyChange();
  });
}

function setDockOpen(open) {
  if (!dock || !dockToggle) return;
  dock.classList.toggle("open", open);
  dockToggle.setAttribute("aria-expanded", String(open));
}

if (dockToggle) {
  dockToggle.addEventListener("click", () => {
    setDockOpen(!dock.classList.contains("open"));
  });

  document.addEventListener("pointerdown", (event) => {
    if (dock.classList.contains("open") && !dock.contains(event.target)) {
      setDockOpen(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && dock.classList.contains("open")) {
      setDockOpen(false);
      dockToggle.focus();
    }
  });
}

renderSettings();

// ------------------------------------------
// Copyright year
// ------------------------------------------
const yearElement = document.getElementById("currentYear");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// ------------------------------------------
// Smooth scrolling for in-page links
// ------------------------------------------
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");

    if (!targetId || targetId === "#") {
      return;
    }

    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      event.preventDefault();
      targetElement.scrollIntoView({
        behavior: reducedQuery.matches ? "auto" : "smooth",
        block: "start"
      });
    }
  });
});

// ==========================================
// CONTACT SETTINGS
// Add your real details here when ready.
// WhatsApp format: country code + number,
// without +, spaces, or dashes.
// Example format for Pakistan: 923001234567
// ==========================================

const CONTACT_SETTINGS = {
  whatsappNumber: "",
  emailAddress: ""
};

const whatsappLink = document.getElementById("whatsappLink");

if (whatsappLink) {
  if (CONTACT_SETTINGS.whatsappNumber.trim()) {
    const number = CONTACT_SETTINGS.whatsappNumber.replace(/\D/g, "");

    whatsappLink.href =
      "https://wa.me/" + number +
      "?text=" +
      encodeURIComponent(
        "Hello Shaheen, I visited your portfolio and would like to discuss your services."
      );
  } else {
    whatsappLink.href = "https://www.whatsapp.com/";
  }

  whatsappLink.target = "_blank";
  whatsappLink.rel = "noopener noreferrer";
}

const emailLink = document.getElementById("emailLink");

if (emailLink) {
  if (CONTACT_SETTINGS.emailAddress.trim()) {
    emailLink.href =
      "mailto:" + CONTACT_SETTINGS.emailAddress +
      "?subject=" +
      encodeURIComponent("Portfolio Services Inquiry") +
      "&body=" +
      encodeURIComponent(
        "Hello Shaheen,\n\nI visited your portfolio and would like to discuss your services.\n\nThank you."
      );
  } else {
    emailLink.href = "mailto:";
  }
}

// Hide the placeholder hint once real contact details are added.
const contactHint = document.getElementById("contactHint");

if (
  contactHint &&
  (CONTACT_SETTINGS.whatsappNumber.trim() || CONTACT_SETTINGS.emailAddress.trim())
) {
  contactHint.hidden = true;
}

// ------------------------------------------
// Scroll progress bar + header state
// ------------------------------------------
const progressBar = document.getElementById("scrollProgress");
const siteHeader = document.getElementById("siteHeader");
let scrollTicking = false;

function updateOnScroll() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? Math.min(scrollTop / maxScroll, 1) : 0;

  if (progressBar) {
    progressBar.style.transform = "scaleX(" + progress + ")";
  }

  if (siteHeader) {
    siteHeader.classList.toggle("scrolled", scrollTop > 20);
  }

  scrollTicking = false;
}

window.addEventListener(
  "scroll",
  () => {
    if (!scrollTicking) {
      window.requestAnimationFrame(updateOnScroll);
      scrollTicking = true;
    }
  },
  { passive: true }
);

updateOnScroll();

// ------------------------------------------
// Typing effect in the hero heading
// ------------------------------------------
const typedElement = document.getElementById("typed");

if (typedElement) {
  const phrases = [
    "useful web apps",
    "responsive websites",
    "mobile-friendly tools",
    "ideas that work"
  ];

  let phraseIndex = 0;
  let charIndex = phrases[0].length;
  let deleting = true;

  function typeLoop() {
    // Calm mode (or reduced motion): show the first phrase and stay still.
    if (isCalm()) {
      phraseIndex = 0;
      charIndex = phrases[0].length;
      deleting = true;
      typedElement.textContent = phrases[0];
      window.setTimeout(typeLoop, 800);
      return;
    }

    const phrase = phrases[phraseIndex];
    let delay = deleting ? 38 : 85;

    charIndex += deleting ? -1 : 1;
    typedElement.textContent = phrase.slice(0, charIndex);

    if (!deleting && charIndex === phrase.length) {
      deleting = true;
      delay = 1800;
    } else if (deleting && charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = 350;
    }

    window.setTimeout(typeLoop, delay);
  }

  window.setTimeout(typeLoop, 2600);
}

// ------------------------------------------
// Scroll reveal
// ------------------------------------------
const revealItems = document.querySelectorAll(".reveal");

function showItem(item) {
  item.classList.add("visible");

  // After the entrance finishes, cards switch to the snappy tilt transition.
  if (item.classList.contains("info-card") || item.classList.contains("project-card")) {
    window.setTimeout(() => item.classList.add("settled"), 1100);
  }
}

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          showItem(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14, rootMargin: "0px 0px -40px 0px" }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach(showItem);
}

// ------------------------------------------
// Active navigation link while scrolling
// ------------------------------------------
const navLinks = document.querySelectorAll(".site-header nav a");
const sections = Array.from(navLinks)
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window && sections.length) {
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === "#" + entry.target.id
            );
          });
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );

  sections.forEach((section) => navObserver.observe(section));
}

// ------------------------------------------
// Card spotlight + gentle 3D tilt (mouse only)
// ------------------------------------------
if (canHover) {
  document.querySelectorAll(".info-card, .project-card").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      card.style.setProperty("--mx", x + "px");
      card.style.setProperty("--my", y + "px");

      if (isCalm()) {
        return;
      }

      const tiltX = (0.5 - y / rect.height) * 4;
      const tiltY = (x / rect.width - 0.5) * 5;

      card.style.setProperty("--rx", tiltX.toFixed(2) + "deg");
      card.style.setProperty("--ry", tiltY.toFixed(2) + "deg");
    });

    card.addEventListener("pointerleave", () => {
      card.style.setProperty("--rx", "0deg");
      card.style.setProperty("--ry", "0deg");
    });
  });

  // Soft glow that follows the cursor.
  const cursorGlow = document.getElementById("cursorGlow");

  if (cursorGlow) {
    window.addEventListener(
      "pointermove",
      (event) => {
        cursorGlow.classList.add("active");
        cursorGlow.style.transform =
          "translate(" + event.clientX + "px, " + event.clientY + "px)";
      },
      { passive: true }
    );

    document.addEventListener("pointerleave", () => {
      cursorGlow.classList.remove("active");
    });
  }

  // Hero parallax: the photo, rings and chips drift at different depths.
  const heroVisual = document.querySelector(".hero-visual");

  if (heroVisual) {
    window.addEventListener(
      "pointermove",
      (event) => {
        if (isCalm()) {
          return;
        }

        const nx = (event.clientX / window.innerWidth - 0.5) * 2;
        const ny = (event.clientY / window.innerHeight - 0.5) * 2;

        heroVisual.style.setProperty("--px", nx.toFixed(3));
        heroVisual.style.setProperty("--py", ny.toFixed(3));
      },
      { passive: true }
    );
  }

  // Magnetic buttons: they lean slightly toward the cursor.
  document.querySelectorAll(".button").forEach((button) => {
    button.addEventListener("pointermove", (event) => {
      if (isCalm()) {
        return;
      }

      const rect = button.getBoundingClientRect();
      const x = (event.clientX - rect.left - rect.width / 2) * 0.16;
      const y = (event.clientY - rect.top - rect.height / 2) * 0.28;

      button.style.setProperty("--bx", x.toFixed(1) + "px");
      button.style.setProperty("--by", y.toFixed(1) + "px");
    });

    button.addEventListener("pointerleave", () => {
      button.style.setProperty("--bx", "0px");
      button.style.setProperty("--by", "0px");
    });
  });
}

// ------------------------------------------
// Button click ripple (feedback for a tap or click)
// ------------------------------------------
document.querySelectorAll(".button").forEach((button) => {
  button.addEventListener("pointerdown", (event) => {
    if (reducedQuery.matches) {
      return;
    }

    const rect = button.getBoundingClientRect();
    const ripple = document.createElement("span");

    ripple.className = "ripple";
    ripple.style.left = event.clientX - rect.left + "px";
    ripple.style.top = event.clientY - rect.top + "px";
    button.appendChild(ripple);

    window.setTimeout(() => ripple.remove(), 650);
  });
});

// ------------------------------------------
// Animated particle network background
// Follows the chosen palette and theme; stops in calm mode.
// ------------------------------------------
const canvas = document.getElementById("bgCanvas");

if (canvas) {
  const ctx = canvas.getContext("2d");
  const mouse = { x: -9999, y: -9999 };
  const LINK_DISTANCE = 130;
  const MOUSE_DISTANCE = 160;

  let particles = [];
  let width = 0;
  let height = 0;
  let rafId = null;
  let running = false;
  let colorA = "85, 240, 178";
  let colorB = "101, 170, 255";
  let lineBoost = 1;

  function readColors() {
    const styles = getComputedStyle(root);

    colorA = styles.getPropertyValue("--g-rgb").trim() || colorA;
    colorB = styles.getPropertyValue("--b-rgb").trim() || colorB;
    lineBoost = root.dataset.theme === "light" ? 1.7 : 1;
  }

  function resizeCanvas() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);

    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

    // Fewer particles on small screens keeps phones smooth.
    const count = Math.min(Math.floor((width * height) / 22000), 75);

    particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      r: Math.random() * 1.4 + 0.6,
      useA: Math.random() > 0.45
    }));
  }

  function drawFrame() {
    if (!running) {
      return;
    }

    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      const mdx = mouse.x - p.x;
      const mdy = mouse.y - p.y;

      if (Math.hypot(mdx, mdy) < MOUSE_DISTANCE) {
        p.x += mdx * 0.003;
        p.y += mdy * 0.003;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(" + (p.useA ? colorA : colorB) + ", 0.7)";
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dist = Math.hypot(p.x - q.x, p.y - q.y);

        if (dist < LINK_DISTANCE) {
          const alpha = (1 - dist / LINK_DISTANCE) * 0.2 * lineBoost;

          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = "rgba(" + colorB + ", " + alpha.toFixed(3) + ")";
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    rafId = window.requestAnimationFrame(drawFrame);
  }

  function startParticles() {
    if (running || isCalm() || document.hidden) {
      return;
    }

    running = true;
    rafId = window.requestAnimationFrame(drawFrame);
  }

  function stopParticles() {
    running = false;
    window.cancelAnimationFrame(rafId);
    ctx.clearRect(0, 0, width, height);
  }

  window.addEventListener(
    "pointermove",
    (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    },
    { passive: true }
  );

  document.addEventListener("pointerleave", () => {
    mouse.x = -9999;
    mouse.y = -9999;
  });

  let resizeTimer = null;

  window.addEventListener("resize", () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(resizeCanvas, 200);
  });

  // Pause when the tab is hidden to save battery.
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopParticles();
    } else {
      startParticles();
    }
  });

  // React to palette, theme and calm-mode changes.
  window.addEventListener("prefschange", () => {
    readColors();

    if (isCalm()) {
      stopParticles();
    } else {
      startParticles();
    }
  });

  readColors();
  resizeCanvas();
  startParticles();
}

console.log("Shaheen Waziri Portfolio loaded successfully.");
