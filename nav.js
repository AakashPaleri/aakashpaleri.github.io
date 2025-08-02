// Dropdown close utility
function closeAllDropdowns() {
  document.querySelectorAll('.dropdown.expanded').forEach(dd => dd.classList.remove('expanded'));
}

// Attach handlers to dropdown parent tabs
document.querySelectorAll('.dropdown .tab.dropdown-toggle').forEach(tab => {
  tab.onclick = null;

  const dropdown = tab.closest('.dropdown');
  if (!dropdown) return;

  function handleClick(e) {
    // Always toggle on click for mobile/tablet/desktop
    if (window.innerWidth <= 728) {
      // Mobile logic: toggle dropdown on click
      e.preventDefault();
      e.stopPropagation();
      if (dropdown.classList.contains('expanded')) {
        dropdown.classList.remove('expanded');
      } else {
        closeAllDropdowns();
        dropdown.classList.add('expanded');
      }
    } else {
      // Tablet/Desktop logic: allow both click and hover
      e.preventDefault();
      e.stopPropagation();
      closeAllDropdowns();
      dropdown.classList.add('expanded');
    }
  }

  tab.addEventListener('click', handleClick);

  // For tablet and desktop: hover also works
  function setupHoverListeners() {
    if (window.innerWidth > 728) {
      dropdown.addEventListener('mouseleave', function() {
        dropdown.classList.remove('expanded');
      });
      tab.addEventListener('mouseenter', function() {
        closeAllDropdowns();
        dropdown.classList.add('expanded');
      });
    }
  }

  setupHoverListeners();
  window.addEventListener('resize', () => {
    // On resize, re-setup hover listeners to adapt to new width
    dropdown.removeEventListener('mouseleave', function() {});
    tab.removeEventListener('mouseenter', function() {});
    setupHoverListeners();
    closeAllDropdowns();
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
