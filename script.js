
// ==========================================
// SHAHEEN WAZIRI — PORTFOLIO WEBSITE
// Complete script.js
// ==========================================

"use strict";

// Update the copyright year automatically.
const yearElement = document.getElementById("currentYear");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Smooth scrolling for links pointing to page sections.
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
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
          .matches
          ? "auto"
          : "smooth",
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

// Set up the WhatsApp contact button.
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

    whatsappLink.target = "_blank";
    whatsappLink.rel = "noopener noreferrer";
  } else {
    whatsappLink.href = "https://www.whatsapp.com/";
    whatsappLink.target = "_blank";
    whatsappLink.rel = "noopener noreferrer";
  }
}

// Set up the email contact button.
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

// Add a small visual response to buttons when clicked.
document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.add("button-clicked");

    window.setTimeout(() => {
      button.classList.remove("button-clicked");
    }, 180);
  });
});

// Log a message for basic development checks.
console.log("Shaheen Waziri Portfolio loaded successfully.");

