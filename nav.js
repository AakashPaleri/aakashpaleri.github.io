function closeAllDropdowns() {
  document.querySelectorAll('.dropdown.expanded').forEach(dd => dd.classList.remove('expanded'));
}

function setupDropdowns() {
  document.querySelectorAll('.dropdown .tab.dropdown-toggle').forEach(tab => {
    const dropdown = tab.closest('.dropdown');
    if (!dropdown) return;

    // Open on click
    tab.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      if (dropdown.classList.contains('expanded')) {
        dropdown.classList.remove('expanded');
      } else {
        closeAllDropdowns();
        dropdown.classList.add('expanded');
      }
    });

    // Open on focus (keyboard Tab navigation)
    tab.addEventListener('focus', function(e) {
      closeAllDropdowns();
      dropdown.classList.add('expanded');
    });

    // Close when tabbing out (keyboard navigation)
    tab.addEventListener('blur', function(e) {
      setTimeout(() => { // Timeout lets next focus event run first
        if (!dropdown.contains(document.activeElement)) {
          dropdown.classList.remove('expanded');
        }
      }, 50);
    });

    // Hover open/close for desktop and tablet
    dropdown.addEventListener('mouseenter', function() {
      if (window.innerWidth >= 729) {
        closeAllDropdowns();
        dropdown.classList.add('expanded');
      }
    });
    dropdown.addEventListener('mouseleave', function() {
      if (window.innerWidth >= 729) {
        dropdown.classList.remove('expanded');
      }
    });
  });

  // Clicking outside closes all dropdowns
  document.addEventListener('click', function(e) {
    document.querySelectorAll('.dropdown.expanded').forEach(dd => {
      if (!dd.contains(e.target)) dd.classList.remove('expanded');
    });
  });

  // On resize, close all
  window.addEventListener('resize', closeAllDropdowns);
}

// Loader logic (keep after nav.html is injected!)
if (typeof setupDropdowns === "undefined" || !window.setupDropdownsAttached) {
  window.setupDropdownsAttached = true;
  if (document.readyState === "complete" || document.readyState === "interactive") {
    setupDropdowns();
  } else {
    document.addEventListener("DOMContentLoaded", setupDropdowns);
  }
}
