// Mobile Menu Logic
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileMenuSidebar = document.getElementById('mobile-menu-sidebar');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');

    function openMenu() {
        mobileMenuOverlay.classList.remove('hidden');
        // small delay to allow display:block to apply before opacity transition
        setTimeout(() => {
            mobileMenuOverlay.classList.remove('opacity-0');
            mobileMenuSidebar.classList.remove('-translate-x-full');
        }, 10);
    }

    function closeMenu() {
        mobileMenuSidebar.classList.add('-translate-x-full');
        mobileMenuOverlay.classList.add('opacity-0');
        setTimeout(() => {
            mobileMenuOverlay.classList.add('hidden');
        }, 300); // match transition duration
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

function selectSize(btn) {
    // Remove selected style from all buttons
    document.querySelectorAll('#size-container button').forEach(b => {
        b.classList.remove('border-amber-400', 'text-amber-600', 'border-amber-600', 'text-amber-700', 'bg-amber-50', 'font-bold');
        b.classList.add('border-gray-200', 'text-gray-600', 'font-medium', 'bg-white');
    });

    // Add selected style to the clicked button
    btn.classList.remove('border-gray-200', 'text-gray-600', 'bg-white');
    btn.classList.add('border-amber-400', 'text-amber-600', 'bg-amber-50');
}

function toggleSizes() {
    const hiddenSizes = document.querySelectorAll('.extra-size');
    const viewMoreBtn = document.getElementById('view-more-btn');
    const isExpanded = viewMoreBtn.innerText.trim() === 'View Less';

    if (isExpanded) {
        // Collapse: Hide extra sizes
        hiddenSizes.forEach(btn => {
            btn.classList.add('hidden');
        });
        viewMoreBtn.innerText = 'View More';
    } else {
        // Expand: Show all sizes
        hiddenSizes.forEach(btn => {
            btn.classList.remove('hidden');
        });
        viewMoreBtn.innerText = 'View Less';
    }
}

function toggleAccordion(button) {
    const content = button.nextElementSibling;
    const icon = button.querySelector('.accordion-icon');
    const container = button.parentElement;

    if (content.style.maxHeight) {
        // Collapse
        content.style.maxHeight = null;
        content.classList.add('opacity-0');
        content.classList.remove('mt-4');
        icon.innerHTML = '<i class="fa-solid fa-plus text-[#CBA65A]"></i>';
        icon.parentElement.classList.remove('bg-[#F9F5EC]'); // Remove active bg from icon container if needed
    } else {
        // Expand
        content.style.maxHeight = content.scrollHeight + "px";
        content.classList.remove('opacity-0');
        content.classList.add('mt-4');
        icon.innerHTML = '<i class="fa-solid fa-minus text-[#CBA65A]"></i>';
    }
}

function changeImage(src) {
    // Try to find the main image. Using a robust selector since ID might be missing.
    const mainImg = document.querySelector('.space-y-2 .aspect-\\[4\\/5\\] img') || document.getElementById('mainImage');
    if (mainImg) {
        mainImg.src = src;
    }
}

function switchTab(tabName, btn) {
    // Update Buttons
    const buttons = btn.parentElement.querySelectorAll('button');
    buttons.forEach(b => {
        b.classList.remove('bg-black', 'text-white', 'border-black', 'shadow-md');
        b.classList.add('bg-transparent', 'text-gray-600', 'border-[#E8E1D5]');
    });
    btn.classList.remove('bg-transparent', 'text-gray-600', 'border-[#E8E1D5]');
    btn.classList.add('bg-black', 'text-white', 'border-black', 'shadow-md');

    // Hide All Content Sections
    document.getElementById('content-about').classList.add('hidden');
    document.getElementById('content-details').classList.add('hidden');
    document.getElementById('content-price').classList.add('hidden');

    // Show Selected Content
    document.getElementById(`content-${tabName}`).classList.remove('hidden');
}
