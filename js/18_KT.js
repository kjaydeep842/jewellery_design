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
});
