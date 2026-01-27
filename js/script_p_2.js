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