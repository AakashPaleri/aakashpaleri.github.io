function setupDropdowns() {
  document.querySelectorAll('.dropdown .tab.dropdown-toggle').forEach(tab => {
    const dropdown = tab.closest('.dropdown');
    if (!dropdown) return;
    const content = dropdown.querySelector('.dropdown-content');

    // Open on click
    tab.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();

      const alreadyOpen = dropdown.classList.contains('expanded');
      closeAllDropdowns();

      if (!alreadyOpen) {
        dropdown.classList.add('expanded');
        // Position the dropdown if in tablet view
        if (window.innerWidth >= 729 && window.innerWidth <= 1110 && content) {
          // Get tab position relative to viewport
          const tabRect = tab.getBoundingClientRect();
          content.style.left = tabRect.left + "px";
          content.style.top = (tabRect.bottom + 2) + "px"; // +2px for nav border
          content.style.minWidth = tabRect.width + "px";
        } else if (content) {
          // Remove inline positioning for non-tablet views
          content.style.left = "";
          content.style.top = "";
          content.style.minWidth = "";
        }
      }
    });

    // Close dropdown on mouseleave for tablet/desktop
    dropdown.addEventListener('mouseleave', function() {
      if (window.innerWidth >= 729) {
        dropdown.classList.remove('expanded');
      }
    });

    // Optionally: Hover to open on desktop/tablet
    dropdown.addEventListener('mouseenter', function() {
      if (window.innerWidth >= 729) {
        closeAllDropdowns();
        dropdown.classList.add('expanded');
        if (window.innerWidth <= 1110 && content) {
          const tabRect = tab.getBoundingClientRect();
          content.style.left = tabRect.left + "px";
          content.style.top = (tabRect.bottom + 2) + "px";
          content.style.minWidth = tabRect.width + "px";
        }
      }
    });
  });

  // Clicking outside closes all dropdowns
  document.addEventListener('click', function(e) {
    document.querySelectorAll('.dropdown.expanded').forEach(dd => {
      if (!dd.contains(e.target)) dd.classList.remove('expanded');
    });
  });

  // On resize, close all and remove inline styles
  window.addEventListener('resize', function() {
    document.querySelectorAll('.dropdown.expanded').forEach(dd => dd.classList.remove('expanded'));
    document.querySelectorAll('.dropdown-content').forEach(content => {
      content.style.left = "";
      content.style.top = "";
      content.style.minWidth = "";
    });
  });
}
