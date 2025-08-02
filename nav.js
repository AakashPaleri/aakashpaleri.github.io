document.addEventListener('DOMContentLoaded', function() {
  // Hamburger menu for mobile
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('responsiveNav');
  const navDrawer = document.querySelector('.nav-drawer');

  // For closing all dropdowns
  function closeAllDropdowns() {
    document.querySelectorAll('.dropdown.expanded').forEach(dd => dd.classList.remove('expanded'));
  }

  // Hamburger logic
  if (hamburger && nav && navDrawer) {
    function closeDrawer() {
      nav.classList.remove('expanded');
      nav.classList.add('collapsed');
      hamburger.setAttribute('aria-expanded', 'false');
    }

    function openDrawer() {
      nav.classList.add('expanded');
      nav.classList.remove('collapsed');
      hamburger.setAttribute('aria-expanded', 'true');
    }

    hamburger.addEventListener('click', function(e) {
      e.stopPropagation();
      if (nav.classList.contains('expanded')) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });

    nav.addEventListener('click', function(e) {
      if (e.target === nav && nav.classList.contains('expanded')) {
        closeDrawer();
      }
    });

    navDrawer.addEventListener('click', function(e) {
      if (e.target.tagName === "A") {
        closeDrawer();
      }
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === "Escape") closeDrawer();
    });

    document.body.addEventListener('click', function(e) {
      if (nav.classList.contains('expanded') && !nav.contains(e.target) && e.target !== hamburger) {
        closeDrawer();
      }
    }, true);
  }

  // Dropdown logic for tablet & desktop (≥729px)
  function enableDropdownClickForTablet() {
    document.querySelectorAll('.dropdown').forEach(dropdown => {
      const tab = dropdown.querySelector('.tab');
      if (!tab) return;
      // Remove previous click handler
      tab.onclick = null;
      // Only add on tablet/desktop (not mobile)
      if (window.innerWidth >= 729) {
        tab.onclick = function(e) {
          // Only preventDefault for dropdown parents (not links without dropdown-content)
          if (dropdown.querySelector('.dropdown-content')) {
            e.preventDefault();
            // Toggle logic: open/close
            if (dropdown.classList.contains('expanded')) {
              dropdown.classList.remove('expanded');
            } else {
              closeAllDropdowns();
              dropdown.classList.add('expanded');
            }
          }
        };
      }
    });
    // Close dropdowns when clicking outside (for tablet/desktop)
    document.body.addEventListener('click', function(e) {
      document.querySelectorAll('.dropdown.expanded').forEach(d => {
        if (!d.contains(e.target)) d.classList.remove('expanded');
      });
    });
  }

  // Run on page load and resize
  enableDropdownClickForTablet();
  window.addEventListener('resize', enableDropdownClickForTablet);
});
