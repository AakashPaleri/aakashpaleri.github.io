(function(){
  function closeAllDropdowns() {
    document.querySelectorAll('.dropdown.expanded').forEach(dd => dd.classList.remove('expanded'));
  }

  document.querySelectorAll('.dropdown .tab').forEach(tab => {
    tab.onclick = null;
    const dropdown = tab.closest('.dropdown');
    const hasDropdown = dropdown && dropdown.querySelector('.dropdown-content');

    if (hasDropdown) {
      tab.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation(); // this prevents the document click from firing
        if (dropdown.classList.contains('expanded')) {
          dropdown.classList.remove('expanded');
        } else {
          closeAllDropdowns();
          dropdown.classList.add('expanded');
        }
      });
    }
  });

  // Close dropdowns on outside click
  document.addEventListener('click', function(e) {
    document.querySelectorAll('.dropdown.expanded').forEach(dd => {
      if (!dd.contains(e.target)) dd.classList.remove('expanded');
    });
  });

  window.addEventListener('resize', closeAllDropdowns);
})();
