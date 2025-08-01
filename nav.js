document.addEventListener('DOMContentLoaded', function() {
  // Utility: Are we in mobile mode?
  function isMobile() {
    return window.innerWidth <= 728;
  }

  function closeAllDropdowns() {
    document.querySelectorAll('.dropdown.expanded').forEach(dd => dd.classList.remove('expanded'));
  }

  function setupMobileDropdowns() {
    // Remove all previous click listeners (by cloning)
    const navDrawer = document.querySelector('.nav-drawer');
    if (!navDrawer) return;
    const cleanNavDrawer = navDrawer.cloneNode(true);
    navDrawer.parentNode.replaceChild(cleanNavDrawer, navDrawer);

    // Only set up listeners on mobile
    if (isMobile()) {
      cleanNavDrawer.querySelectorAll('.dropdown').forEach(dropdown => {
        const tab = dropdown.querySelector('.tab');
        const dropdownContent = dropdown.querySelector('.dropdown-content');
        if (!tab) return;
        tab.addEventListener('click', function(e) {
          // Only toggle for tabs with a dropdown-content
          if (dropdownContent) {
            e.preventDefault();
            // Toggle open/close
            if (dropdown.classList.contains('expanded')) {
              dropdown.classList.remove('expanded');
            } else {
              closeAllDropdowns();
              dropdown.classList.add('expanded');
            }
          }
          // If no dropdown-content, do nothing—let link work as normal
        });
      });
    } else {
      closeAllDropdowns();
    }
  }

  // Optional: highlight current tab based on URL
  function highlightCurrentTab() {
    const currentPage = window.location.pathname.split('/').pop();
    document.querySelectorAll('.tab').forEach(tab => {
      tab.classList.remove('current');
      const href = tab.getAttribute('href');
      if (href && href === currentPage) {
        tab.classList.add('current');
      }
    });
  }

  // Initial run
  setupMobileDropdowns();
  highlightCurrentTab();

  // Rerun on resize for responsiveness
  window.addEventListener('resize', function() {
    setupMobileDropdowns();
    highlightCurrentTab();
  });
});
