function setupNavDropdowns() {
  // Don't run twice!
  if (window.__nav_dropdowns_attached__) return;
  window.__nav_dropdowns_attached__ = true;

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

// --- MutationObserver to detect when nav is injected ---
const navPlaceholder = document.getElementById('nav-placeholder');
if (navPlaceholder) {
  const observer = new MutationObserver((mutations, obs) => {
    if (navPlaceholder.querySelector('.dropdown .tab')) {
      setupNavDropdowns();
      obs.disconnect(); // Only run once, or remove this line if you want to re-run on every change
    }
  });
  observer.observe(navPlaceholder, { childList: true, subtree: true });
}
