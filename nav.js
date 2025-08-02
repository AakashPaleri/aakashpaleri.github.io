(function(){
  function closeAllDropdowns() {
    document.querySelectorAll('.dropdown.expanded').forEach(dd => dd.classList.remove('expanded'));
  }

  // Attach click handlers to all .tab links with dropdown-content
  document.querySelectorAll('.dropdown .tab').forEach(tab => {
    // Remove any previous event listeners (for safety, though re-injection is rare with your approach)
    tab.onclick = null;

    const dropdown = tab.closest('.dropdown');
    const hasDropdown = dropdown && dropdown.querySelector('.dropdown-content');

    // Only attach handler if this tab has a dropdown menu
    if (hasDropdown) {
      tab.addEventListener('click', function(e) {
        // Always prevent default for parent tabs with dropdowns, so they never navigate
        e.preventDefault();
        if (dropdown.classList.contains('expanded')) {
          dropdown.classList.remove('expanded');
        } else {
          closeAllDropdowns();
          dropdown.classList.add('expanded');
        }
      });
    }
  });

  // Clicking anywhere else closes all dropdowns
  document.addEventListener('click', function(e) {
    document.querySelectorAll('.dropdown.expanded').forEach(dd => {
      if (!dd.contains(e.target)) dd.classList.remove('expanded');
    });
  });

  // On resize, close all open menus
  window.addEventListener('resize', closeAllDropdowns);
})();
