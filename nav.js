// nav.js
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById("responsiveNav");
  const hamburger = document.getElementById("hamburger");
  const drawer = nav.querySelector('.nav-drawer'); // HIGHLIGHTED: Use existing nav-drawer

  // Collapse menu by default on page load
  function collapseNav() {
    nav.classList.remove("expanded");
    nav.classList.add("collapsed");
    document.body.style.overflow = "";
  }
  function expandNav() {
    nav.classList.add("expanded");
    nav.classList.remove("collapsed");
    document.body.style.overflow = "hidden";
  }

  // Always start collapsed
  collapseNav();

  // Hamburger toggles expanded/collapsed and drawer overlay
  hamburger.addEventListener("click", (e) => {
    e.stopPropagation();
    if (nav.classList.contains("expanded")) {
      collapseNav();
    } else {
      expandNav();
    }
  });

  // Clicking overlay closes menu (if open)
  nav.addEventListener("click", function(e) {
    if (e.target === nav && nav.classList.contains("expanded")) {
      collapseNav();
    }
  });

  // Expand/collapse dropdowns inside the drawer
  drawer.querySelectorAll(".dropdown > .tab").forEach(tab => {
    tab.addEventListener("click", function(e) {
      let dropdown = this.parentElement;
      let hasDropdown = dropdown.querySelector(".dropdown-content");
      if (window.innerWidth <= 980 && hasDropdown) {
        e.preventDefault();
        dropdown.classList.toggle("expanded");
      }
    });
  });

  // When a link is clicked, close nav and allow scroll again
  drawer.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", function() {
      if (window.innerWidth <= 980) {
        collapseNav();
      }
    });
  });

  // Desktop: Highlight current page tab
  const links = nav.querySelectorAll(".dropdown-content a, .tab");
  const currentPath = window.location.pathname.split("/").pop();
  links.forEach(link => {
    const href = link.getAttribute("href");
    if (href === currentPath) {
      link.classList.add("current");
    }
  });

  // Desktop: Dropdowns on hover
  nav.querySelectorAll(".dropdown").forEach(dropdown => {
    dropdown.addEventListener("mouseenter", () => {
      if (window.innerWidth > 980) dropdown.classList.add("expanded");
    });
    dropdown.addEventListener("mouseleave", () => {
      if (window.innerWidth > 980) dropdown.classList.remove("expanded");
    });
  });

  // Keyboard accessibility for dropdowns
  links.forEach(tab => {
    tab.setAttribute("tabindex", "0");
    tab.addEventListener("keydown", (e) => {
      if ((e.key === "Enter" || e.key === " ") && tab.nextElementSibling && tab.nextElementSibling.classList.contains('dropdown-content')) {
        e.preventDefault();
        let dropdown = tab.parentElement;
        dropdown.classList.toggle("expanded");
      }
    });
  });

  // Collapse menu if resizing to desktop view
  window.addEventListener("resize", () => {
    if (window.innerWidth > 980) {
      collapseNav();
    }
  });
});
