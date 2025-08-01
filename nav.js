document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById("responsiveNav");
  const hamburger = document.getElementById("hamburger");
  if (!nav || !hamburger) return; // Safety: stop if nav or button missing

  const drawer = nav.querySelector('.nav-drawer');
  if (!drawer) return; // Safety: stop if nav-drawer missing

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

  collapseNav();

  hamburger.addEventListener("click", (e) => {
    e.stopPropagation();
    if (nav.classList.contains("expanded")) {
      collapseNav();
    } else {
      expandNav();
    }
  });

  nav.addEventListener("click", function(e) {
    if (e.target === nav && nav.classList.contains("expanded")) {
      collapseNav();
    }
  });

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

  drawer.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", function() {
      if (window.innerWidth <= 980) {
        collapseNav();
      }
    });
  });

  const links = nav.querySelectorAll(".dropdown-content a, .tab");
  const currentPath = window.location.pathname.split("/").pop();
  links.forEach(link => {
    const href = link.getAttribute("href");
    if (href === currentPath) {
      link.classList.add("current");
    }
  });

  nav.querySelectorAll(".dropdown").forEach(dropdown => {
    dropdown.addEventListener("mouseenter", () => {
      if (window.innerWidth > 980) dropdown.classList.add("expanded");
    });
    dropdown.addEventListener("mouseleave", () => {
      if (window.innerWidth > 980) dropdown.classList.remove("expanded");
    });
  });

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

  window.addEventListener("resize", () => {
    if (window.innerWidth > 980) {
      collapseNav();
    }
  });
});
