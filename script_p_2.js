function selectSize(btn) {
  // Remove selected style from all buttons
  document.querySelectorAll('.size-btn').forEach(b => {
    b.classList.remove('border-amber-400', 'text-amber-600');
    b.classList.add('border-gray-200', 'text-gray-600');
  });

  // Add selected style to the clicked button
  btn.classList.remove('border-gray-200', 'text-gray-600');
  btn.classList.add('border-amber-400', 'text-amber-600');
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