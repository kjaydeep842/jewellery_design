document.addEventListener('DOMContentLoaded', () => {

    // Mobile Menu
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileMenuSidebar = document.getElementById('mobile-menu-sidebar');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');

    function openMenu() {
        if (mobileMenuSidebar && mobileMenuOverlay) {
            mobileMenuSidebar.classList.remove('-translate-x-full');
            mobileMenuOverlay.classList.remove('hidden', 'opacity-0');
            setTimeout(() => {
                mobileMenuOverlay.classList.add('opacity-100');
            }, 10);
            document.body.style.overflow = 'hidden';
        }
    }

    function closeMenu() {
        if (mobileMenuSidebar && mobileMenuOverlay) {
            mobileMenuSidebar.classList.add('-translate-x-full');
            mobileMenuOverlay.classList.remove('opacity-100');
            mobileMenuOverlay.classList.add('opacity-0');
            setTimeout(() => {
                mobileMenuOverlay.classList.add('hidden');
            }, 300);
            document.body.style.overflow = '';
        }
    }

    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMenu);
    if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeMenu);
    if (mobileMenuOverlay) mobileMenuOverlay.addEventListener('click', closeMenu);

    // Search Dropdown
    const searchInput = document.getElementById('search-input');
    const searchDropdown = document.getElementById('search-dropdown');
    const searchClearBtn = document.getElementById('search-clear-btn');
    const searchContainer = document.getElementById('search-container');

    if (searchInput && searchDropdown && searchContainer) {
        searchInput.addEventListener('focus', () => {
            searchDropdown.classList.remove('hidden');
        });

        document.addEventListener('click', (e) => {
            if (!searchContainer.contains(e.target)) {
                searchDropdown.classList.add('hidden');
            }
        });

        searchInput.addEventListener('input', () => {
            if (searchInput.value.length > 0) {
                searchClearBtn.classList.remove('hidden');
            } else {
                searchClearBtn.classList.add('hidden');
            }
        });

        if (searchClearBtn) {
            searchClearBtn.addEventListener('click', () => {
                searchInput.value = '';
                searchClearBtn.classList.add('hidden');
                searchInput.focus();
            });
        }
    }

    // User Dropdown Interaction
    const userMenuBtn = document.getElementById('user-menu-btn');
    const userDropdownMenu = document.getElementById('user-dropdown-menu');
    const userMenuContainer = document.getElementById('user-menu-container');

    if (userMenuBtn && userDropdownMenu && userMenuContainer) {
        userMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            userDropdownMenu.classList.toggle('hidden');
        });

        document.addEventListener('click', (e) => {
            if (!userMenuContainer.contains(e.target)) {
                userDropdownMenu.classList.add('hidden');
            }
        });
    }

    // === Bag Quantity Logic ===
    window.toggleQuantityMenu = function (btn) {
        const container = btn.closest('.quantity-dropdown-container');
        const menu = container.querySelector('.quantity-dropdown-menu');
        const icon = btn.querySelector('.fa-chevron-down');

        // Close other open dropdowns first
        document.querySelectorAll('.quantity-dropdown-menu').forEach(el => {
            if (el !== menu) el.classList.add('hidden');
        });
        document.querySelectorAll('.quantity-dropdown-container .fa-chevron-down').forEach(el => {
            if (el !== icon) el.classList.remove('rotate-180');
        });

        if (menu.classList.contains('hidden')) {
            menu.classList.remove('hidden');
            icon.classList.add('rotate-180');
        } else {
            menu.classList.add('hidden');
            icon.classList.remove('rotate-180');
        }
    };

    window.selectQuantity = function (option, value) {
        const container = option.closest('.quantity-dropdown-container');
        const display = container.querySelector('.qty-display');
        const menu = container.querySelector('.quantity-dropdown-menu');
        const icon = container.querySelector('.fa-chevron-down');

        display.textContent = `Qty: ${value}`;
        menu.classList.add('hidden');
        icon.classList.remove('rotate-180');
    };

    // Close quantity dropdowns when clicking outside
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.quantity-dropdown-container')) {
            document.querySelectorAll('.quantity-dropdown-menu').forEach(el => {
                el.classList.add('hidden');
            });
            document.querySelectorAll('.quantity-dropdown-container .fa-chevron-down').forEach(icon => {
                icon.classList.remove('rotate-180');
            });
        }
    });

    // === Mobile Dropdown Toggle ===
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
});
