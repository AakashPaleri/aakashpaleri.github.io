// Utility: Close all dropdowns
function closeAllDropdowns() {
  document.querySelectorAll('.dropdown.expanded').forEach(dd => dd.classList.remove('expanded'));
}

// Set up listeners for dropdown parent tabs
function setupDropdowns() {
  document.querySelectorAll('.dropdown .tab.dropdown-toggle').forEach(tab => {
    tab.onclick = null; // Reset first

    const dropdown = tab.closest('.dropdown');
    if (!dropdown) return;

    // Remove old listeners if any (by cloning node)
    const tabClone = tab.cloneNode(true);
    tab.parentNode.replaceChild(tabClone, tab);
    tab = tabClone;

    // CLICK always toggles dropdown at all widths
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

    // For desktop AND tablet (729px+): also allow hover to open
    function addHoverListeners() {
      if (window.innerWidth >= 729) {
        dropdown.addEventListener('mouseenter', mouseEnterHandler);
        dropdown.addEventListener('mouseleave', mouseLeaveHandler);
      } else {
        dropdown.removeEventListener('mouseenter', mouseEnterHandler);
        dropdown.removeEventListener('mouseleave', mouseLeaveHandler);
      }
    }
    function mouseEnterHandler() {
      closeAllDropdowns();
      dropdown.classList.add('expanded');
    }
    function mouseLeaveHandler() {
      dropdown.classList.remove('expanded');
    }
    addHoverListeners();

    // Update hover logic on resize
    window.addEventListener('resize', addHoverListeners);
  });
}

// Clicking outside closes all dropdowns
document.addEventListener('click', function(e) {
  document.querySelectorAll('.dropdown.expanded').forEach(dd => {
    if (!dd.contains(e.target)) dd.classList.remove('expanded');
  });
});

// On resize, close all
window.addEventListener('resize', closeAllDropdowns);

// Setup after DOM loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setupDropdowns);
} else {
  setupDropdowns();
}
