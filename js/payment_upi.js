document.addEventListener('DOMContentLoaded', function () {
    console.log('Payment UPI JS Loaded');

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

    // Checkbox/Radio logic for UPI options
    const upiOptions = document.querySelectorAll('input[name="upi_method"]');
    upiOptions.forEach(option => {
        option.addEventListener('change', function () {
            console.log('Selected UPI method:', this.id);
        });
    });
});
