// Mobile Menu Logic
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileMenuSidebar = document.getElementById('mobile-menu-sidebar');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');

    function openMenu() {
        if (mobileMenuSidebar && mobileMenuOverlay) {
            mobileMenuOverlay.classList.remove('hidden');
            // small delay to allow display:block to apply before opacity transition
            setTimeout(() => {
                mobileMenuOverlay.classList.remove('opacity-0');
                mobileMenuSidebar.classList.remove('-translate-x-full');
            }, 10);
        }
    }

    function closeMenu() {
        if (mobileMenuSidebar && mobileMenuOverlay) {
            mobileMenuSidebar.classList.add('-translate-x-full');
            mobileMenuOverlay.classList.add('opacity-0');
            setTimeout(() => {
                mobileMenuOverlay.classList.add('hidden');
            }, 300); // match transition duration
        }
    }

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', openMenu);
    }

    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', closeMenu);
    }

    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', closeMenu);
    }
});
