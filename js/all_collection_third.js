document.addEventListener('DOMContentLoaded', function () {
    const sortContainer = document.getElementById('sort-dropdown-container');
    const sortButton = document.getElementById('sort-button');
    const sortMenu = document.getElementById('sort-menu');
    const sortIcon = document.getElementById('sort-icon');
    const selectedSortSpan = document.getElementById('selected-sort');
    const sortOptions = sortMenu.querySelectorAll('a');

    if (!sortButton || !sortMenu) return;

    function toggleMenu() {
        const isHidden = sortMenu.classList.contains('hidden');
        if (isHidden) {
            sortMenu.classList.remove('hidden');
            // sortMenu.classList.add('block'); // Removed block because we might want transitions or just rely on removing hidden
            sortIcon.style.transform = 'rotate(180deg)';
        } else {
            sortMenu.classList.add('hidden');
            // sortMenu.classList.remove('block');
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
});
