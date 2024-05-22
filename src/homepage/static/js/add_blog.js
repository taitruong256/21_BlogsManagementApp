document.addEventListener('DOMContentLoaded', async function() {
    const categorySelect = document.getElementById('category');

    try {
        const response = await fetch('/api/categories/');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const categories = await response.json();
        console.log(categories); // Sửa lỗi đánh máy ở đây
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.category_id; // Sửa từ category.id thành category.category_id
            option.textContent = category.name_category;
            categorySelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading categories:', error);
    }

    
});
