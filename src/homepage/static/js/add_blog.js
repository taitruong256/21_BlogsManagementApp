document.addEventListener('DOMContentLoaded', async function() {
    const categorySelect = document.getElementById('category');

    try {
        const response = await fetch('/api/categories/');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const categories = await response.json();
        console.log(categories);
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.name;
            categorySelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading categories:', error);
    }
});
