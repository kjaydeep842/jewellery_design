document.addEventListener('DOMContentLoaded', function () {
    console.log('Payment Wallet JS Loaded');

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function () {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Sidebar Navigation
    const paymentOptions = document.querySelectorAll('.payment-option');
    paymentOptions.forEach(option => {
        option.addEventListener('click', function () {
            const text = this.innerText || this.textContent;
            if (text.includes('UPI')) window.location.href = 'payment_upi.html';
            else if (text.includes('Credit/Debit Card')) window.location.href = 'payment_credit_card.html';
            else if (text.includes('Net Banking')) window.location.href = 'payment_netbaking.html';
            else if (text.includes('Wallets')) window.location.href = 'payment_wallet.html';
            else if (text.includes('EMI')) window.location.href = 'payment_emi.html';
            else if (text.includes('Cash On Delivery')) window.location.href = 'payment_cash.html';
        });
    });

    // Initialize Checkbox Logic (Adapted for current COD-feature look)
    const codOption = document.getElementById('cod_option');
    if (codOption) {
        codOption.addEventListener('change', function () {
            console.log('Wallet/COD option changed');
        });
    }

    // Fallback if we revert to wallet radios
    const walletOptions = document.querySelectorAll('input[name="wallet_name"]');
    if (walletOptions.length > 0) {
        walletOptions.forEach(option => {
            option.addEventListener('change', function () {
                console.log('Selected Wallet:', this.value);
            });
        });
    }
});
