document.addEventListener('DOMContentLoaded', function() {
  // MOBILE: Accordion for dropdown menus
  function setupMobileDropdowns() {
    if (window.innerWidth <= 1110) {
      document.querySelectorAll('.dropdown-toggle').forEach(tab => {
        tab.onclick = function(e) {
          e.preventDefault();
          const parent = this.parentElement;
          // Collapse others
          document.querySelectorAll('.dropdown').forEach(d => {
            if (d !== parent) d.classList.remove('expanded');
          });
          // Toggle this one
          parent.classList.toggle('expanded');
        };
      });
    } else {
      // Remove click handlers on desktop
      document.querySelectorAll('.dropdown-toggle').forEach(tab => {
        tab.onclick = null;
      });
      // Remove expanded from all
      document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('expanded'));
    }
  }

  // Initial run
  setupMobileDropdowns();
  // Rerun on resize
  window.addEventListener('resize', setupMobileDropdowns);
});
