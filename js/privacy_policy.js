// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileMenuSidebar = document.getElementById('mobile-menu-sidebar');

    if (mobileMenuBtn && mobileMenuSidebar) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuSidebar.style.transform = 'translateX(0)';
        });
    }

    if (closeMenuBtn && mobileMenuSidebar) {
        closeMenuBtn.addEventListener('click', () => {
            mobileMenuSidebar.style.transform = 'translateX(-100%)';
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileMenuSidebar && mobileMenuSidebar.style.transform === 'translateX(0)') {
            if (!mobileMenuSidebar.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                mobileMenuSidebar.style.transform = 'translateX(-100%)';
            }
        }
    });
});
