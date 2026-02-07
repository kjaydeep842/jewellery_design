document.addEventListener('DOMContentLoaded', function () {
    console.log('Payment Address 2 JS Loaded');

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function () {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Place Order Button Logic
    const placeOrderBtn = document.querySelector('button.bg-\\[linear-gradient\\(90deg\\2c\\#D9BE87_0\\%\\2c\\#BE933C_100\\%\\)\\]');
    if (placeOrderBtn) {
        placeOrderBtn.addEventListener('click', function () {
            console.log('Place Order clicked');
            // Navigate to payment method or confirmation
            window.location.href = '#';
        });
    }

    // Add New Address Button Logic
    const addAddressBtn = document.querySelector('button.border-\\[\\#CBA65A\\]');
    if (addAddressBtn) {
        addAddressBtn.addEventListener('click', function () {
            // Navigate to Add Address page (payment_address_1.html based on context)
            window.location.href = 'payment_address_1.html';
        });
    }
});
