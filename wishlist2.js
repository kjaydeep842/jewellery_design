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
});

// Expose toggle function globally for HTML onclick attributes
window.toggleMobileDropdown = function (menuId, btn) {
    const menu = document.getElementById(menuId);
    const icon = btn.querySelector('.fa-chevron-down');

    // Close other dropdowns (optional, depending on preference. Keeping it simple for now or matching standard behavior)
    // For this implementation, we'll just toggle the clicked one.

    if (menu.classList.contains('hidden')) {
        menu.classList.remove('hidden');
        icon.classList.add('rotate-180');
    } else {
        menu.classList.add('hidden');
        icon.classList.remove('rotate-180');
    }
};
