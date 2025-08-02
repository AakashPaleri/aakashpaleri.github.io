document.addEventListener('DOMContentLoaded', function() {
  // Get the hamburger button, nav container, and nav drawer
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('responsiveNav');
  const navDrawer = document.querySelector('.nav-drawer');
  if (!hamburger || !nav || !navDrawer) return;

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

  // Hamburger click toggles menu
  hamburger.addEventListener('click', function(e) {
    e.stopPropagation();
    if (nav.classList.contains('expanded')) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  // Clicking overlay closes menu
  nav.addEventListener('click', function(e) {
    if (e.target === nav && nav.classList.contains('expanded')) {
      closeDrawer();
    }
  });

  // Clicking a nav link in the drawer closes the menu (mobile)
  navDrawer.addEventListener('click', function(e) {
    if (e.target.tagName === "A") {
      closeDrawer();
    }
  });

  // ESC key closes menu
  document.addEventListener('keydown', function(e) {
    if (e.key === "Escape") closeDrawer();
  });

  // Clicking outside nav closes drawer (on mobile)
  document.body.addEventListener('click', function(e) {
    if (nav.classList.contains('expanded') && !nav.contains(e.target) && e.target !== hamburger) {
      closeDrawer();
    }
  }, true);
  
  // --- Dropdown click support for tablet/desktop (for touch screens) ---
  function enableDropdownClickForTablet() {
    // Only apply this on screens >= 729px (not on mobile)
    if (window.innerWidth >= 729) {
      document.querySelectorAll('.dropdown').forEach(dropdown => {
        const tab = dropdown.querySelector('.tab');
        if (!tab) return;

        // Remove any old listeners to prevent stacking
        tab.onclick = null;

        tab.addEventListener('click', function(e) {
          // If the dropdown is already open via 'expanded', close it
          if (dropdown.classList.contains('expanded')) {
            dropdown.classList.remove('expanded');
          } else {
            // Close other dropdowns first
            document.querySelectorAll('.dropdown.expanded').forEach(d => d.classList.remove('expanded'));
            dropdown.classList.add('expanded');
          }
          // Prevent navigation if this tab is a parent for a dropdown
          e.preventDefault();
        });
      });

      // Clicking anywhere else closes dropdowns
      document.body.addEventListener('click', function(e) {
        document.querySelectorAll('.dropdown.expanded').forEach(d => {
          if (!d.contains(e.target)) d.classList.remove('expanded');
        });
      });
    }
  }

  enableDropdownClickForTablet();

  // On resize, re-enable logic as needed
  window.addEventListener('resize', function() {
    enableDropdownClickForTablet();
  });
});
