//image slidebar
document.addEventListener("DOMContentLoaded", () => {
  const slidesWrapper = document.getElementById('slides');
  const dots = Array.from(document.getElementById('dots').children);
  const total = slidesWrapper.children.length;
  let index = 0;

  function goToSlide(i) {
    index = i;
    slidesWrapper.style.transform = `translateX(${-index * 100}%)`;
    updateDots();
  }

  function updateDots() {
    const isExpanding = document.getElementById('dots').classList.contains('dots-expanding');

    dots.forEach((dot, i) => {
      if (isExpanding) {
        if (i === index) {
          // Active state for expanding dots
          dot.classList.remove('w-3', 'bg-[#E8E1D5]');
          dot.classList.add('w-8', 'bg-[#CBA65A]');
        } else {
          // Inactive state for expanding dots
          dot.classList.remove('w-8', 'bg-[#CBA65A]');
          dot.classList.add('w-3', 'bg-[#E8E1D5]');
        }
        // Remove strictly opacity based classes if they exist from previous logic
        dot.classList.remove('bg-black', 'bg-opacity-75', 'bg-opacity-100');
      } else {
        // Default behavior for other sliders (index.html)
        if (i === index) {
          dot.classList.add('bg-opacity-100');
          dot.classList.remove('bg-opacity-75');
        } else {
          dot.classList.add('bg-opacity-75');
          dot.classList.remove('bg-opacity-100');
        }
      }
    });
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => goToSlide(i));
  });

  // Optional: auto‑slide every 5 seconds
  setInterval(() => {
    goToSlide((index + 1) % total);
  }, 5000);

  // Initialize
  goToSlide(0);
});
//Premium Collectin....
const slider = document.getElementById('jewellerySlider');
const slideIndexLabel = document.getElementById('slideIndex');

function slide(direction) {
  // Calculate scroll amount based on card width + gap
  const cardWidth = slider.querySelector('.group').offsetWidth + 24;

  if (direction === 'right') {
    slider.scrollLeft += cardWidth;
  } else {
    slider.scrollLeft -= cardWidth;
  }
}

// Update the "01" counter when scrolling
slider.addEventListener('scroll', () => {
  const cardWidth = slider.querySelector('.group').offsetWidth + 24;
  const index = Math.round(slider.scrollLeft / cardWidth) + 1;
  slideIndexLabel.innerText = index.toString().padStart(2, '0');
});
// Category Section
const categoryData = [
  { title: "Rings", url: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600" },
  { title: "Pendants", url: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600" },
  { title: "Bracelets", url: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=600" }
];

let currentIdx = 0;

function changeSlide(dir) {
  currentIdx = dir === 'next' ? (currentIdx + 1) % categoryData.length : (currentIdx - 1 + categoryData.length) % categoryData.length;

  const img = document.getElementById('mainCatImg');
  const title = document.getElementById('mainCatTitle');

  img.style.opacity = '0';
  setTimeout(() => {
    img.src = categoryData[currentIdx].url;
    title.innerText = categoryData[currentIdx].title;
    img.style.opacity = '1';
  }, 300);
}
// Customer Review Section
function scrollSlider(direction) {
  const slider = document.getElementById('testimonialSlider');
  // Determine scroll amount based on card width
  const scrollAmount = 600 + 24; // Card width + gap

  if (direction === 'left') {
    slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  } else {
    slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }
}
//image slidebar second
document.addEventListener("DOMContentLoaded", () => {
  const slidesWrapper = document.getElementById('slides1');
  const dots = Array.from(document.getElementById('dots1').children);
  const total = slidesWrapper.children.length;
  let index = 0;

  function goToSlide(i) {
    index = i;
    slidesWrapper.style.transform = `translateX(${-index * 100}%)`;
    updateDots();
  }

  function updateDots() {
    dots.forEach((dot, i) => {
      if (i === index) {
        dot.classList.add('bg-opacity-100');
        dot.classList.remove('bg-opacity-75');
      } else {
        dot.classList.add('bg-opacity-75');
        dot.classList.remove('bg-opacity-100');
      }
    });
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => goToSlide(i));
  });

  // Optional: auto‑slide every 5 seconds
  setInterval(() => {
    goToSlide((index + 1) % total);
  }, 5000);

  // Initialize
  goToSlide(0);
});



// Unique Style Slider Logic
document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById('uniqueStyleSlider');
  if (!slider) return;

  let autoSlideInterval;
  const slideIntervalTime = 2000; // 2 seconds
  let isDown = false;
  let startX;
  let scrollLeft;

  // Auto Scroll Function
  const startAutoSlide = () => {
    stopAutoSlide(); // Ensure no duplicate intervals
    autoSlideInterval = setInterval(() => {
      // Calculate scroll amount (item width + gap)
      const item = slider.firstElementChild;
      if (!item) return;

      const isMd = window.matchMedia('(min-width: 768px)').matches;
      const gap = isMd ? 20 : 4;
      const itemWidth = item.getBoundingClientRect().width;
      const scrollAmount = itemWidth + gap;

      // Check if we are at the end to loop back (optional, or just infinite scroll feel)
      // For simple "next" slide:
      if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 10) {
        slider.scrollTo({ left: 0, behavior: 'smooth' }); // Loop back to start
      } else {
        slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }, slideIntervalTime);
  };

  const stopAutoSlide = () => {
    clearInterval(autoSlideInterval);
  };

  // Mouse Drag / Swipe Logic
  slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active'); // Optional: for changing cursor style
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
    stopAutoSlide(); // Pause on interaction
  });

  slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('active');
    startAutoSlide(); // Resume on leave
  });

  slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('active');
    startAutoSlide(); // Resume on release
  });

  slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2; // Scroll-fast 
    slider.scrollLeft = scrollLeft - walk;
  });

  // Touch events for mobile (optional explicit handling, though overflow-x usually handles it)
  slider.addEventListener('touchstart', () => {
    stopAutoSlide();
  });

  slider.addEventListener('touchend', () => {
    startAutoSlide();
  });

  // Initialize
  startAutoSlide();
});


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