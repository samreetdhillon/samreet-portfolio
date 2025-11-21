/* script.js
 - Smooth scrolling for navigation
 - Side dots hover label already handled by CSS; we implement click-to-scroll
*/

document.addEventListener("DOMContentLoaded", function () {
  // Get the scrollable left panel
  const leftPanel = document.querySelector(".content-container");

  // Redirect all wheel/scroll events to the left panel
  document.addEventListener(
    "wheel",
    function (e) {
      e.preventDefault();
      leftPanel.scrollTop += e.deltaY;
    },
    { passive: false }
  );

  // Handle touch events for mobile
  let touchStartY = 0;
  document.addEventListener(
    "touchstart",
    function (e) {
      touchStartY = e.touches[0].clientY;
    },
    { passive: true }
  );

  document.addEventListener(
    "touchmove",
    function (e) {
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;
      leftPanel.scrollTop += deltaY;
      touchStartY = touchY;
    },
    { passive: true }
  );

  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // Side dots click -> scroll
  document.querySelectorAll(".side-dots .dot").forEach(function (dot) {
    dot.addEventListener("click", function () {
      const targetSel = this.dataset.target;
      const target = document.querySelector(targetSel);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // Update active nav link based on scroll position of left panel
  const navLinks = document.querySelectorAll(".nav a");
  const sections = Array.from(document.querySelectorAll("[id]")).filter((el) =>
    ["home", "about", "experience", "education", "contact"].includes(el.id)
  );

  function onScroll() {
    const scrollTop = leftPanel.scrollTop;
    let current = sections[0];

    for (const section of sections) {
      if (section.offsetTop <= scrollTop + 100) {
        current = section;
      }
    }

    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      const isActive = href === `#${current.id}`;
      link.classList.toggle("active", isActive);
    });
  }

  leftPanel.addEventListener("scroll", onScroll);
  onScroll();
});
