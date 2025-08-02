// Dropdown close utility
function closeAllDropdowns() {
  document.querySelectorAll('.dropdown.expanded').forEach(dd => dd.classList.remove('expanded'));
}

// Attach handlers to dropdown parent tabs
document.querySelectorAll('.dropdown .tab.dropdown-toggle').forEach(tab => {
  // Remove any existing click events for safety
  tab.onclick = null;

  const dropdown = tab.closest('.dropdown');
  if (!dropdown) return;

  tab.addEventListener('click', function(e) {
    // For mobile: always toggle on click
    if (window.innerWidth <= 728) {
      e.preventDefault();
      e.stopPropagation();
      if (dropdown.classList.contains('expanded')) {
        dropdown.classList.remove('expanded');
      } else {
        closeAllDropdowns();
        dropdown.classList.add('expanded');
      }
    }
    // For desktop: allow default link if no dropdown, else open on click too
    else if (dropdown.querySelector('.dropdown-content')) {
      e.preventDefault();
      e.stopPropagation();
      closeAllDropdowns();
      dropdown.classList.add('expanded');
    }
    // Otherwise: let link work as usual
  });

  // Remove expanded state on mouseleave for desktop only
  if (window.innerWidth > 728) {
    dropdown.addEventListener('mouseleave', function() {
      dropdown.classList.remove('expanded');
    });
    tab.addEventListener('mouseenter', function() {
      closeAllDropdowns();
      dropdown.classList.add('expanded');
    });
  }
});

// Clicking outside closes all dropdowns
document.addEventListener('click', function(e) {
  document.querySelectorAll('.dropdown.expanded').forEach(dd => {
    if (!dd.contains(e.target)) dd.classList.remove('expanded');
  });
});

// On resize, close all
window.addEventListener('resize', closeAllDropdowns);

console.log('Dropdown handlers attached!');
