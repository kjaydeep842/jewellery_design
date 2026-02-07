document.addEventListener('DOMContentLoaded', function () {
    // Dropdown Logic
    const sortContainer = document.getElementById('sort-dropdown-container');
    const sortButton = document.getElementById('sort-button');
    const sortMenu = document.getElementById('sort-menu');
    const sortIcon = document.getElementById('sort-icon');
    const selectedSortSpan = document.getElementById('selected-sort');
    const sortOptions = sortMenu.querySelectorAll('a');

    if (sortButton && sortMenu) {
        function toggleMenu() {
            const isHidden = sortMenu.classList.contains('hidden');
            if (isHidden) {
                sortMenu.classList.remove('hidden');
                sortIcon.style.transform = 'rotate(180deg)';
            } else {
                sortMenu.classList.add('hidden');
                sortIcon.style.transform = 'rotate(0deg)';
            }
        }

        function closeMenu() {
            sortMenu.classList.add('hidden');
            sortIcon.style.transform = 'rotate(0deg)';
        }

        sortButton.addEventListener('click', function (e) {
            e.stopPropagation();
            toggleMenu();
        });

        document.addEventListener('click', function (e) {
            if (sortContainer && !sortContainer.contains(e.target)) {
                closeMenu();
            }
        });

        sortOptions.forEach(option => {
            option.addEventListener('click', function (e) {
                e.preventDefault();
                const text = this.textContent.trim();
                if (selectedSortSpan) selectedSortSpan.textContent = text;
                closeMenu();
                console.log('Sorting by:', text);
            });
        });
    }

    // Filter Chips Logic (Optional interactivity for the demo)
    const chips = document.querySelectorAll('.filter-chip i');
    chips.forEach(icon => {
        icon.addEventListener('click', function () {
            const chip = this.closest('.filter-chip');
            if (chip) {
                chip.style.display = 'none';
            }
        });
    });

    // Sidebar Accordion Logic
    const accordionHeaders = document.querySelectorAll('.filter-accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function () {
            const content = this.nextElementSibling;
            const icon = this.querySelector('.accordion-icon');
            const title = this.querySelector('span');

            if (content.classList.contains('hidden')) {
                content.classList.remove('hidden');
                if (icon) icon.classList.add('rotate-180');
                if (title) {
                    title.classList.remove('text-gray-700');
                    title.classList.add('text-[#CBA65A]');
                }
            } else {
                content.classList.add('hidden');
                if (icon) icon.classList.remove('rotate-180');
                if (title) {
                    title.classList.add('text-gray-700');
                    title.classList.remove('text-[#CBA65A]');
                }
            }
        });
    });
});
