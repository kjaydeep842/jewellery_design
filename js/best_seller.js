document.addEventListener('DOMContentLoaded', () => {
    // Select all elements that act as headers for the accordion
    const headers = document.querySelectorAll('.filter-accordion-header');

    headers.forEach(header => {
        header.addEventListener('click', () => {
            // The content div is the next sibling
            const content = header.nextElementSibling;
            const icon = header.querySelector('.accordion-icon');

            // Toggle the hidden class
            content.classList.toggle('hidden');

            // Rotate the icon
            if (content.classList.contains('hidden')) {
                icon.classList.remove('rotate-180');
            } else {
                icon.classList.add('rotate-180');
            }
        });
    });

    // --- Product Image Logic (Added) ---

    // 1. Create and inject Modal HTML
    const modalHTML = `
        <div id="product-modal" class="fixed inset-0 z-[100] bg-black/80 hidden flex items-center justify-center p-4">
            <button id="modal-close" class="absolute top-4 right-4 text-white hover:text-gray-300 z-[101]">
                <i class="fa-solid fa-xmark text-4xl"></i>
            </button>
            <div class="relative w-full max-w-4xl max-h-[90vh] flex items-center justify-center p-4">
                 <img id="modal-image" src="" alt="Full View" class="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl bg-white">
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const modal = document.getElementById('product-modal');
    const modalImage = document.getElementById('modal-image');
    const modalClose = document.getElementById('modal-close');

    // Modal Close Logic
    const closeModal = () => modal.classList.add('hidden');
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
    });


    // 2. Select all product cards
    const productCards = document.querySelectorAll('.grid > .group');

    productCards.forEach(card => {
        const imageContainer = card.querySelector('.aspect-square');
        if (!imageContainer) return;

        // Find product images (they have mix-blend-multiply class)
        const productImages = Array.from(imageContainer.querySelectorAll('img.mix-blend-multiply'));

        let mainImg = productImages[0];
        let secondaryImg = productImages[1];

        // Gather Image URLs
        let imageUrls = [];
        if (mainImg) imageUrls.push(mainImg.src);
        if (secondaryImg) {
            imageUrls.push(secondaryImg.src);
            // Remove secondary image from DOM to disable CSS hover effect
            secondaryImg.remove();
        } else {
            // If only one image exists, try to infer the second one or just use the first one
            // Ideally we'd have a data attribute, but for now we assume a convention or just duplicate
            if (imageUrls.length > 0) imageUrls.push('assets/hover_image_p.png');
        }

        // Cleanup Main Image classes to remove hover fade-out
        if (mainImg) {
            mainImg.classList.remove('group-hover:opacity-0');
            mainImg.classList.add('transition-all', 'duration-300'); // Ensure smooth transition remains
        }

        let currentImageIndex = 0;

        // Check/Create Side Navigation Buttons (Injected dynamically)
        let prevBtnSide = imageContainer.querySelector('.nav-prev-side');
        let nextBtnSide = imageContainer.querySelector('.nav-next-side');

        if (!prevBtnSide) {
            prevBtnSide = document.createElement('button');
            // User CSS: Reduced width to 18px, Icon color gray
            prevBtnSide.className = "absolute z-20 nav-prev-side hover:bg-[#C5C5C8] transition-colors cursor-pointer flex items-center justify-center";
            prevBtnSide.style.cssText = "width: 18px; height: 30px; left: 0px; top: calc(50% - 38px); background: #D7D7DA; border-radius: 0px 100px 100px 0px;";
            prevBtnSide.innerHTML = '<i class="fa-solid fa-chevron-left text-[10px] text-gray-500"></i>';
            imageContainer.appendChild(prevBtnSide);
        }

        if (!nextBtnSide) {
            nextBtnSide = document.createElement('button');
            // Mirrored CSS for Right Side
            nextBtnSide.className = "absolute z-20 nav-next-side hover:bg-[#C5C5C8] transition-colors cursor-pointer flex items-center justify-center";
            nextBtnSide.style.cssText = "width: 18px; height: 30px; right: 0px; top: calc(50% - 38px); background: #D7D7DA; border-radius: 100px 0px 0px 100px;";
            nextBtnSide.innerHTML = '<i class="fa-solid fa-chevron-right text-[10px] text-gray-500"></i>';
            imageContainer.appendChild(nextBtnSide);
        }

        // Add event listeners to side buttons
        const handlePrev = (e) => {
            e.preventDefault();
            e.stopPropagation();
            currentImageIndex = (currentImageIndex - 1 + imageUrls.length) % imageUrls.length;
            if (mainImg) mainImg.src = imageUrls[currentImageIndex];
        };

        const handleNext = (e) => {
            e.preventDefault();
            e.stopPropagation();
            currentImageIndex = (currentImageIndex + 1) % imageUrls.length;
            if (mainImg) mainImg.src = imageUrls[currentImageIndex];
        };

        if (prevBtnSide) prevBtnSide.onclick = handlePrev; // Use onclick to avoid duplicate listeners if run multiple times
        if (nextBtnSide) nextBtnSide.onclick = handleNext;

        // Optional: Keep bottom buttons working if they exist
        const navContainer = imageContainer.querySelector('.absolute.inset-x-0.bottom-0');
        if (navContainer) {
            const buttons = navContainer.querySelectorAll('button');
            if (buttons.length >= 3) {
                const prevBtn = buttons[0];
                const nextBtn = buttons[2];
                prevBtn.onclick = handlePrev;
                nextBtn.onclick = handleNext;
            }
        }

        // Wishlist Button
        // Find by alt text for robustness
        const wishlistImg = imageContainer.querySelector('img[alt="wishlist"]');
        const wishlistBtn = wishlistImg ? wishlistImg.closest('div') : null;

        if (wishlistBtn) {
            wishlistBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();

                // Check if already liked (red bg)
                const isLiked = wishlistBtn.classList.contains('bg-red-500');

                if (!isLiked) {
                    wishlistBtn.classList.remove('bg-white');
                    wishlistBtn.classList.add('bg-red-500');
                    // Invert icon color to white using filter
                    const icon = wishlistBtn.querySelector('img');
                    if (icon) icon.style.filter = "brightness(0) invert(1)";
                } else {
                    wishlistBtn.classList.add('bg-white');
                    wishlistBtn.classList.remove('bg-red-500');
                    // Reset icon color
                    const icon = wishlistBtn.querySelector('img');
                    if (icon) icon.style.filter = "";
                }
            });
        }

        // Expand Button (Full View)
        const expandImg = imageContainer.querySelector('img[alt="expand"]');
        const expandBtn = expandImg ? expandImg.closest('div') : null;

        if (expandBtn) {
            expandBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (mainImg) {
                    modalImage.src = mainImg.src;
                    modal.classList.remove('hidden');
                }
            });
        }

    });
});
