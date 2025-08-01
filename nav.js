document.addEventListener('DOMContentLoaded', function() {
  // Mobile: Accordion for dropdown menus
  function setupMobileDropdowns() {
    if (window.innerWidth <= 728) {
      document.querySelectorAll('.dropdown-toggle').forEach(tab => {
        tab.onclick = function(e) {
          e.preventDefault();
          const parent = this.parentElement;
          // Collapse others
          document.querySelectorAll('.dropdown').forEach(d => {
            if (d !== parent) d.classList.remove('expanded');
          });
          // Toggle this one
          parent.classList.toggle('expanded');
        };
      });
    } else {
      // Remove click handlers on desktop
      document.querySelectorAll('.dropdown-toggle').forEach(tab => {
        tab.onclick = null;
      });
      // Remove expanded from all
      document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('expanded'));
    }
  }

  // "More" Dropdown for midwidth screens
  function setupMoreDropdown() {
    const nav = document.querySelector('.main-nav .nav-drawer');
    const moreTab = document.getElementById('moreTab');
    const moreDropdown = document.getElementById('moreDropdown');
    if (!nav || !moreTab || !moreDropdown) return;
    // Remove previously hidden state
    moreTab.style.display = 'none';
    moreDropdown.innerHTML = '';
    const visibleTabs = Array.from(nav.children)
      .filter(child =>
        child.classList.contains('dropdown') &&
        !child.classList.contains('more-tab')
      );

    // Only run "More" logic at midwidth
    if (window.innerWidth <= 1110 && window.innerWidth >= 729) {
      // Reset display for all
      visibleTabs.forEach(tab => tab.style.display = '');
      moreTab.style.display = 'none';
      // Find the last tab that fits
      let navWidth = nav.offsetWidth;
      let used = 0;
      let lastTabIdx = -1;
      // Use offsetWidth only after rendering!
      for (let i = 0; i < visibleTabs.length; i++) {
        used += visibleTabs[i].offsetWidth;
        if (used > navWidth - 120) { // 120px reserve for "More" tab
          lastTabIdx = i;
          break;
        }
      }
      if (lastTabIdx !== -1) {
        // Some tabs need to move into More
        for (let i = lastTabIdx; i < visibleTabs.length; i++) {
          let tabLink = visibleTabs[i].querySelector('.tab').cloneNode(true);
          // If tab has dropdown-content, copy as submenu
          let dropdown = visibleTabs[i].querySelector('.dropdown-content');
          if (dropdown) {
            let sub = dropdown.cloneNode(true);
            tabLink.appendChild(sub);
          }
          moreDropdown.appendChild(tabLink);
          visibleTabs[i].style.display = 'none';
        }
        moreTab.style.display = 'flex';
      }
    } else {
      // Always show all tabs and hide moreTab otherwise
      visibleTabs.forEach(tab => tab.style.display = '');
      moreTab.style.display = 'none';
    }
  }

  // Toggle More dropdown
  function setupMoreDropdownToggle() {
    const moreTab = document.getElementById('moreTab');
    if (!moreTab) return;
    moreTab.onclick = function(e) {
      e.stopPropagation();
      moreTab.classList.toggle('open');
    };
    document.addEventListener('click', () => moreTab.classList.remove('open'));
  }

  // Initial setup
  setupMobileDropdowns();
  setupMoreDropdown();
  setupMoreDropdownToggle();

  // Re-setup on resize
  window.addEventListener('resize', function() {
    setupMobileDropdowns();
    setupMoreDropdown();
  });
});
