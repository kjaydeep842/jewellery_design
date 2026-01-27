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

// Global function for mobile dropdowns (called via inline onclick)
window.toggleMobileDropdown = function (menuId, btn) {
  const menu = document.getElementById(menuId);
  const icon = btn.querySelector('i');

  // Close other dropdowns (optional, but good for UX)
  // document.querySelectorAll('[id^="menu-"]').forEach(m => {
  //     if (m.id !== menuId && !m.classList.contains('hidden')) {
  //          m.classList.add('hidden');
  //          // reset icon rotation if needed
  //     }
  // });

  if (menu) {
    menu.classList.toggle('hidden');
    if (icon) {
      icon.style.transform = menu.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
    }
  }
};
function changeImage(src) {
  const mainImage = document.getElementById('mainImage');
  if (mainImage) {
    mainImage.src = src;
  }
}

function selectSize(element) {
  // Reset all buttons
  const buttons = document.querySelectorAll('#size-container button[onclick]');
  buttons.forEach(btn => {
    btn.classList.remove('border-2', 'border-amber-600', 'text-amber-700', 'bg-amber-50', 'font-bold');
    btn.classList.add('border', 'border-gray-200', 'text-gray-600', 'font-medium');
  });

  // Apply active styles to clicked button
  element.classList.remove('border', 'border-gray-200', 'text-gray-600', 'font-medium');
  element.classList.add('border-2', 'border-amber-600', 'text-amber-700', 'bg-amber-50', 'font-bold');
}

// Client Reviews
let currentReviewIndex = 0;
const reviewSlides = document.querySelectorAll('.review-slide');

function showReview(index) {
  reviewSlides.forEach((slide, i) => {
    if (i === index) {
      slide.classList.remove('hidden');
      slide.classList.add('block'); // Ensure it displays
    } else {
      slide.classList.add('hidden');
      slide.classList.remove('block');
    }
  });
}

function nextReview() {
  if (reviewSlides.length === 0) return;
  currentReviewIndex = (currentReviewIndex + 1) % reviewSlides.length;
  showReview(currentReviewIndex);
}

function prevReview() {
  if (reviewSlides.length === 0) return;
  currentReviewIndex = (currentReviewIndex - 1 + reviewSlides.length) % reviewSlides.length;
  showReview(currentReviewIndex);
}

// Initialize Reviews
if (reviewSlides.length > 0) {
  showReview(currentReviewIndex);
}


// Image Slider
let currentImageIndex = 0;
const imageSlides = document.querySelectorAll('.slide');

function updateImageSlider() {
  imageSlides.forEach((slide, index) => {
    slide.style.opacity = index === currentImageIndex ? '1' : '0';
  });
}

function nextSlide() {
  if (imageSlides.length === 0) return;
  currentImageIndex = (currentImageIndex + 1) % imageSlides.length;
  updateImageSlider();
}

function prevSlide() {
  if (imageSlides.length === 0) return;
  currentImageIndex = (currentImageIndex - 1 + imageSlides.length) % imageSlides.length;
  updateImageSlider();
}

// Auto-initialize if needed, though functions are called onclick.