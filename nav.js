// Attach handlers right away, since nav is already present in DOM
function setupNavDropdowns() {
  function closeAllDropdowns() {
    document.querySelectorAll('.dropdown.expanded').forEach(dd => dd.classList.remove('expanded'));
  }

  document.querySelectorAll('.dropdown .tab').forEach(tab => {
    tab.onclick = null; // Remove previous
    tab.addEventListener('click', function(e) {
      const dropdown = tab.closest('.dropdown');
      if (!dropdown) return;
      const dropdownContent = dropdown.querySelector('.dropdown-content');
      if (!dropdownContent) return; // Only toggle for real dropdowns
      e.preventDefault();
      if (dropdown.classList.contains('expanded')) {
        dropdown.classList.remove('expanded');
      } else {
        closeAllDropdowns();
        dropdown.classList.add('expanded');
      }
    });
  });

  // Clicking anywhere else closes all
  document.body.addEventListener('click', function(e) {
    document.querySelectorAll('.dropdown.expanded').forEach(d => {
      if (!d.contains(e.target)) d.classList.remove('expanded');
    });
  });

  // On resize, close all open menus
  window.addEventListener('resize', closeAllDropdowns);
}

// Just call the function now (no need for DOMContentLoaded)
setupNavDropdowns();
