/* script.js
 - Navigation and active link updates
 - CSS scroll-snap handles section snapping automatically
*/

document.addEventListener("DOMContentLoaded", function () {
  // Get the scrollable left panel and all content sections
  const leftPanel = document.querySelector(".content-container");
  const sections = Array.from(document.querySelectorAll(".content"));
  const navLinks = document.querySelectorAll(".nav a");

  // Update active navigation links based on scroll position
  function updateActiveNav() {
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

  // Handle navigation clicks
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // Handle side dots clicks
  document.querySelectorAll(".side-dots .dot").forEach(function (dot) {
    dot.addEventListener("click", function () {
      const targetSel = this.dataset.target;
      const target = document.querySelector(targetSel);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // Listen for scroll events to update navigation
  leftPanel.addEventListener("scroll", updateActiveNav);

  // Initialize
  updateActiveNav();
});
