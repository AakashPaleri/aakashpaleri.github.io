// nav.js
document.addEventListener('DOMContentLoaded', () => {
  // Wait for nav to be loaded
  const checkNav = setInterval(() => {
    const nav = document.getElementById("responsiveNav");
    const toggleButton = document.getElementById("hamburger");
    if (nav && toggleButton) {
      // Attach menu toggle
      toggleButton.addEventListener("click", () => {
        nav.classList.toggle("expanded");
        nav.classList.toggle("collapsed");
      });

      // Highlight current page tab
      const links = nav.querySelectorAll(".dropdown-content a, .tab");
      const currentPath = window.location.pathname.split("/").pop();
      links.forEach(link => {
        const href = link.getAttribute("href");
        if (href === currentPath) {
          link.classList.add("current");
        }
      });

      // Close nav after click on mobile
      links.forEach(link => {
        link.addEventListener("click", () => {
          if (window.innerWidth <= 980) {
            nav.classList.remove("expanded");
            nav.classList.add("collapsed");
          }
        });
      });

      // Keyboard accessibility for dropdowns
      const dropdowns = nav.querySelectorAll(".dropdown");
      dropdowns.forEach(dropdown => {
        const tab = dropdown.querySelector(".tab");
        if (tab) {
          tab.setAttribute("tabindex", "0");
          tab.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              const content = dropdown.querySelector(".dropdown-content");
              if (content) {
                // For desktop, toggle dropdown display
                const isOpen = content.style.display === "block";
                content.style.display = isOpen ? "none" : "block";
              }
            }
          });
        }
      });

      clearInterval(checkNav); // stop checking
    }
  }, 50); // check every 50ms for nav load
});
