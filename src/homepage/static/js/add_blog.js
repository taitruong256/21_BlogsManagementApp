document.addEventListener('DOMContentLoaded', async function() {
    const categorySelect = document.getElementById('category');
    const saveCategoryBtn = document.getElementById('saveCategoryBtn');

    document.getElementById('logout').addEventListener('click', function() {
        window.location.href = '/logout';  // Thay '/logout' bằng URL logout của bạn
    });


    $('#addCategoryButton').click(function() {
        $('#categoryModal').modal('show');
    });

    
    $("#logo").click(function () {
        // Chuyển hướng người dùng đến trang chủ
        window.location.href = "/home"; // Thay đổi URL cho phù hợp với đường dẫn của trang chủ ("/home")
    });


    // Hàm để lấy CSRF token từ cookie
    function getCSRFToken() {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i].trim();
                if (cookie.substring(0, 'csrftoken'.length + 1) === 'csrftoken=') {
                    cookieValue = decodeURIComponent(cookie.substring('csrftoken'.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }


    // Gọi API để load tất cả các thể loại 
    async function loadCategories() {
        try {
            const response = await fetch('/api/category/list');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        
            const categories = await response.json();
            categorySelect.innerHTML = ''; // Clear existing options before adding new ones
            categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category.category_id;
                option.textContent = category.name_category;
                categorySelect.appendChild(option);
            });
            } catch (error) {
            console.error('Error loading categories:', error);
        }
    }
    await loadCategories();

    
    saveCategoryBtn.addEventListener('click', async (event) => {
        console.log("Đã clicked");
        event.preventDefault();  // Prevent default form submission behavior

        // Get form data
        const name = document.getElementById('categoryName').value;
        const description = document.getElementById('description').value || '';  


        try {
            // Send POST request to the API endpoint
            const response = await fetch('/api/category/add/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCSRFToken()
            },
            body: JSON.stringify({
                name_category: name,
                description: description,
                })
            });

            if (!response.ok) {
            throw new Error(`Error saving category: ${response.statusText}`);
            }

            const responseData = await response.json();
            alert('Thể loại đã được tạo thành công!');
            await loadCategories();
            addCategoryForm.reset();  // Clear the form fields
            $('#categoryModal').modal('hide');  // Hide the modal
        } catch (error) {
            console.error('An error occurred:', error);
        }
        });
});
