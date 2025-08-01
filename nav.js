document.addEventListener('DOMContentLoaded', function() {
  // Detect mobile (breakpoint)
  function isMobile() {
    return window.innerWidth <= 728;
  }

  // Mobile dropdown toggle logic: open/close on repeated taps
  function setupMobileDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');
    const tabs = document.querySelectorAll('.dropdown-toggle');

    // Remove all click handlers before re-adding (prevents duplicates)
    tabs.forEach(tab => {
      tab.onclick = null;
    });

    if (isMobile()) {
      tabs.forEach(tab => {
        tab.onclick = function(e) {
          e.preventDefault();
          const parent = this.parentElement;
          // If already open, close it. If closed, open and close others.
          if (parent.classList.contains('expanded')) {
            parent.classList.remove('expanded');
          } else {
            dropdowns.forEach(d => {
              d.classList.remove('expanded');
            });
            parent.classList.add('expanded');
          }
        };
      });
    } else {
      // Remove expanded from all on desktop, and all click handlers
      dropdowns.forEach(d => d.classList.remove('expanded'));
    }
  }

  // Highlight current tab based on URL (if you had this, it's preserved)
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

  // Rerun on resize (for responsiveness)
  window.addEventListener('resize', function() {
    setupMobileDropdowns();
    highlightCurrentTab();
  });
});
