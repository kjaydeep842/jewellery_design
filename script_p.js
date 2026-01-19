function changeImage(src) {
  const mainImage = document.getElementById('mainImage');
  if (mainImage) {
    mainImage.src = src;
  }
}

function selectSize(element) {
  // Reset all buttons
  const buttons = document.querySelectorAll('.size-btn');
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