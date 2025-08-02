document.addEventListener('DOMContentLoaded', function() {
  // Remove previous click handlers for reliability (prevents stacking)
  document.querySelectorAll('.dropdown .tab').forEach(tab => {
    tab.onclick = null;
  });

  document.querySelectorAll('.dropdown').forEach(dropdown => {
    const tab = dropdown.querySelector('.tab');
    if (!tab) return;
    tab.addEventListener('click', function(e) {
      // Only handle if tab has a dropdown-content child (dropdown parent)
      if (dropdown.querySelector('.dropdown-content')) {
        e.preventDefault();
        // Toggle expanded state, close others
        if (!dropdown.classList.contains('expanded')) {
          document.querySelectorAll('.dropdown.expanded').forEach(d => d.classList.remove('expanded'));
          dropdown.classList.add('expanded');
        } else {
          dropdown.classList.remove('expanded');
        }
      }
    });
  });

  // Clicking outside any open dropdown closes all
  document.addEventListener('click', function(e) {
    document.querySelectorAll('.dropdown.expanded').forEach(d => {
      if (!d.contains(e.target)) d.classList.remove('expanded');
    });
  });

  // On window resize, remove all expanded menus
  window.addEventListener('resize', function() {
    document.querySelectorAll('.dropdown.expanded').forEach(d => d.classList.remove('expanded'));
  });
});
