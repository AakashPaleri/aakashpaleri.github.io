document.addEventListener('DOMContentLoaded', function() {
  // --- Detect first touch and flag body as 'touch-friendly'
  function setTouchFriendly() {
    document.body.classList.add('touch-friendly');
    window.removeEventListener('pointerdown', setTouchFriendly, { once: true });
  }
  window.addEventListener('pointerdown', setTouchFriendly, { once: true });

  function closeAllDropdowns() {
    document.querySelectorAll('.dropdown.expanded').forEach(dd => dd.classList.remove('expanded'));
  }

  document.querySelectorAll('.dropdown .tab').forEach(tab => {
    tab.onclick = null; // Remove existing click
    tab.addEventListener('click', function(e) {
      // If parent dropdown has submenu
      const dropdown = tab.closest('.dropdown');
      const hasMenu = dropdown && dropdown.querySelector('.dropdown-content');
      if (!hasMenu) return; // direct links, do nothing
      // If in touch mode or not using mouse, always toggle with click/tap
      if (document.body.classList.contains('touch-friendly')) {
        e.preventDefault();
        if (dropdown.classList.contains('expanded')) {
          dropdown.classList.remove('expanded');
        } else {
          closeAllDropdowns();
          dropdown.classList.add('expanded');
        }
      }
      // On desktop mouse, let hover handle it; on touch, force click toggle
    });
  });

  // Clicking outside closes all
  document.addEventListener('click', function(e) {
    document.querySelectorAll('.dropdown.expanded').forEach(d => {
      if (!d.contains(e.target)) d.classList.remove('expanded');
    });
  });

  // On resize, close all open menus (optional)
  window.addEventListener('resize', closeAllDropdowns);
});
