document.addEventListener('DOMContentLoaded', function () {
    console.log('Payment Bag JS Loaded');

    // === Mobile Menu Functionality ===
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileMenuSidebar = document.getElementById('mobile-menu-sidebar');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');

    function openMenu() {
        if (mobileMenuSidebar && mobileMenuOverlay) {
            mobileMenuSidebar.classList.remove('-translate-x-full');
            mobileMenuOverlay.classList.remove('hidden', 'opacity-0');
            // Allow small delay for opacity transition to trigger
            setTimeout(() => {
                mobileMenuOverlay.classList.add('opacity-100');
            }, 10);
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
    }

    function closeMenu() {
        if (mobileMenuSidebar && mobileMenuOverlay) {
            mobileMenuSidebar.classList.add('-translate-x-full');
            mobileMenuOverlay.classList.remove('opacity-100');
            mobileMenuOverlay.classList.add('opacity-0');
            setTimeout(() => {
                mobileMenuOverlay.classList.add('hidden');
            }, 300); // Match transition duration
            document.body.style.overflow = '';
        }
    }

    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMenu);
    if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeMenu);
    if (mobileMenuOverlay) mobileMenuOverlay.addEventListener('click', closeMenu);

    // === Mobile Dropdown Toggle ===
    window.toggleMobileDropdown = function (menuId, btn) {
        const menu = document.getElementById(menuId);
        const icon = btn.querySelector('i');

        if (menu) {
            const isHidden = menu.classList.contains('hidden');

            // Close all other dropdowns (optional, depending on preference)
            // document.querySelectorAll('.mobile-dropdown > div').forEach(d => d.classList.add('hidden'));
            // document.querySelectorAll('.mobile-dropdown button i').forEach(i => i.classList.remove('rotate-180'));

            if (isHidden) {
                menu.classList.remove('hidden');
                if (icon) icon.classList.add('rotate-180');
            } else {
                menu.classList.add('hidden');
                if (icon) icon.classList.remove('rotate-180');
            }
        }
    };

    // === Cart Remove Functionality ===
    const removeButtons = document.querySelectorAll('.remove-item-btn'); // Add class to HTML if needed
    removeButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            // Find parent card and remove it or hide it
            const card = this.closest('.product-card'); // Add class to HTML if needed
            if (card) {
                card.style.display = 'none';
                updateSummary();
            }
        });
    });

    function updateSummary() {
        // Logic to recalculate total would go here
        console.log('Summary updated');
    }

    // === Quantity Dropdown Logic ===
    window.toggleQuantityMenu = function (btn) {
        const container = btn.closest('.quantity-dropdown-container');
        const menu = container.querySelector('div.absolute'); // The dropdown menu
        const icon = btn.querySelector('i');

        // Close other open dropdowns first (optional)
        document.querySelectorAll('.quantity-dropdown-container .absolute').forEach(el => {
            if (el !== menu) el.classList.add('hidden');
        });
        document.querySelectorAll('.quantity-dropdown-container i').forEach(el => {
            if (el !== icon) el.classList.remove('rotate-180');
        });

        menu.classList.toggle('hidden');
        icon.classList.toggle('rotate-180');
    };

    window.selectQuantity = function (option, value) {
        const container = option.closest('.quantity-dropdown-container');
        const display = container.querySelector('.qty-display');
        const menu = container.querySelector('div.absolute');
        const icon = container.querySelector('i');

        display.textContent = `Qty: ${value}`;

        // Hide menu
        menu.classList.add('hidden');
        icon.classList.remove('rotate-180');

        // Trigger update logic here if needed
        console.log(`Quantity updated to ${value}`);
        updateSummary();
    };

    // Close dropdowns when clicking outside
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.quantity-dropdown-container')) {
            document.querySelectorAll('.quantity-dropdown-container .absolute').forEach(el => {
                el.classList.add('hidden');
            });
            document.querySelectorAll('.quantity-dropdown-container i').forEach(icon => {
                icon.classList.remove('rotate-180');
            });
        }
    });
});
