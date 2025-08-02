function setupDropdowns() {
  // Remove any previously attached listeners to avoid duplicates
  document.querySelectorAll('.dropdown').forEach(dropdown => {
    dropdown.replaceWith(dropdown.cloneNode(true));
  });

  document.querySelectorAll('.dropdown .tab.dropdown-toggle').forEach(tab => {
    const dropdown = tab.closest('.dropdown');
    if (!dropdown) return;

    tab.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      if (dropdown.classList.contains('expanded')) {
        dropdown.classList.remove('expanded');
      } else {
        document.querySelectorAll('.dropdown.expanded').forEach(dd => dd.classList.remove('expanded'));
        dropdown.classList.add('expanded');
      }
    });

    // Hover for tablet/desktop (>728px)
    function mouseEnterHandler() {
      if (window.innerWidth >= 729) {
        document.querySelectorAll('.dropdown.expanded').forEach(dd => dd.classList.remove('expanded'));
        dropdown.classList.add('expanded');
      }
    }
    function mouseLeaveHandler() {
      if (window.innerWidth >= 729) {
        dropdown.classList.remove('expanded');
      }
    }

    dropdown.addEventListener('mouseenter', mouseEnterHandler);
    dropdown.addEventListener('mouseleave', mouseLeaveHandler);
  });

  // Close all when clicking outside
  document.addEventListener('click', function(e) {
    document.querySelectorAll('.dropdown.expanded').forEach(dd => {
      if (!dd.contains(e.target)) dd.classList.remove('expanded');
    });
  });

  // On resize, close all
  window.addEventListener('resize', function() {
    document.querySelectorAll('.dropdown.expanded').forEach(dd => dd.classList.remove('expanded'));
  });
}

// Run setup only after DOM/nav loaded
if (document.readyState === "complete" || document.readyState === "interactive") {
  setupDropdowns();
} else {
  document.addEventListener("DOMContentLoaded", setupDropdowns);
}
