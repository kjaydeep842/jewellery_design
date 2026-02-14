// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileMenuSidebar = document.getElementById('mobile-menu-sidebar');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');

    function openMenu() {
        mobileMenuSidebar.classList.remove('-translate-x-full');
        mobileMenuOverlay.classList.remove('hidden');
        setTimeout(() => {
            mobileMenuOverlay.classList.remove('opacity-0');
        }, 10);
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        mobileMenuSidebar.classList.add('-translate-x-full');
        mobileMenuOverlay.classList.add('opacity-0');
        setTimeout(() => {
            mobileMenuOverlay.classList.add('hidden');
        }, 300);
        document.body.style.overflow = '';
    }

    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMenu);
    if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeMenu);
    if (mobileMenuOverlay) mobileMenuOverlay.addEventListener('click', closeMenu);


    // Search Dropdown Functionality
    const searchInput = document.getElementById('search-input');
    const searchDropdown = document.getElementById('search-dropdown');
    const searchClearBtn = document.getElementById('search-clear-btn');
    const searchContainer = document.getElementById('search-container');

    if (searchInput && searchDropdown && searchContainer) {

        // Show dropdown on focus
        searchInput.addEventListener('focus', () => {
            searchDropdown.classList.remove('hidden');
        });

        // Hide dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!searchContainer.contains(e.target)) {
                searchDropdown.classList.add('hidden');
            }
        });

        // Handle typing to show/hide clear button
        searchInput.addEventListener('input', () => {
            if (searchInput.value.length > 0) {
                searchClearBtn.classList.remove('hidden');
            } else {
                searchClearBtn.classList.add('hidden');
            }
        });

        // Handle clear button click
        if (searchClearBtn) {
            searchClearBtn.addEventListener('click', () => {
                searchInput.value = '';
                searchClearBtn.classList.add('hidden');
                searchInput.focus(); // Keep focus on input
            });
        }
    }
});

// Expose toggle function globally for HTML onclick attributes
window.toggleMobileDropdown = function (menuId, btn) {
    const menu = document.getElementById(menuId);
    const icon = btn.querySelector('.fa-chevron-down');

    if (menu.classList.contains('hidden')) {
        menu.classList.remove('hidden');
        icon.classList.add('rotate-180');
    } else {
        menu.classList.add('hidden');
        icon.classList.remove('rotate-180');
    }
};
