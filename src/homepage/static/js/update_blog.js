document.addEventListener('DOMContentLoaded', async function() {
    const { userId, blogId } = getUrlSegments();
    const categorySelect = document.getElementById('category');
    const saveCategoryBtn = document.getElementById('saveCategoryBtn');
    const jwtToken = getCookie('jwt'); // Lấy JWT từ cookie


    // Lấy user_id và blog_id từ URL
    function getUrlSegments() {
        const pathSegments = window.location.pathname.split("/").filter(segment => segment !== '');
        return {
            userId: pathSegments[pathSegments.length - 2], // Giả sử user_id nằm trước blog_id
            blogId: pathSegments[pathSegments.length - 1]
        };
    }


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

    
    // Hàm để lấy JWT Token từ cookie 
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
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


    // Hàm gọi API để lấy dữ liệu blog
    async function loadBlogData() {
        try {
            const response = await fetch(`/api/blog/detail/${userId}/${blogId}/`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        
            const blogData = await response.json();
            console.log(blogData);
            fillFormFields(blogData); // Điền dữ liệu vào các trường form
        } catch (error) {
            console.error('Error loading blog data:', error);
        }
    }


    // Hàm điền dữ liệu từ blogData vào các trường form
    function fillFormFields(blogData) {
        document.getElementById('title').value = blogData.title;
        document.getElementById('description').value = blogData.description;
        // Đảm bảo CKEditor đã được khởi tạo trước khi đặt giá trị
        if (CKEDITOR.instances.markdown) {
            CKEDITOR.instances.markdown.setData(blogData.markdown);
        }
        const categoryId = blogData.category.category_id;
        document.getElementById('category').value = categoryId;
        const datePublished = new Date(blogData.date_published);
        const formattedDate = datePublished.toISOString().slice(0, 16); // Format ngày giống với datetime-local
        document.getElementById('date_published').value = formattedDate;
    }


    // Gọi hàm loadBlogData khi trang được tải lên
    await loadBlogData();


    // Xử lý sự kiện khi người dùng click Update blog 
    document.querySelector('.blog-form').addEventListener('submit', function(event) {
        event.preventDefault(); 

        const data = {
            title: document.getElementById('title').value,
            description: document.getElementById('description').value,
            markdown: CKEDITOR.instances.markdown.getData(),
            category: document.getElementById('category').value,
            date_published: document.getElementById('date_published').value
        };

        const jwtToken = getCookie('jwt'); // Lấy JWT token từ cookie

        // Gửi yêu cầu AJAX PUT với CSRF token và JWT token để xác thực người dùng. 
        $.ajax({
            url: `/api/blog/update/${userId}/${blogId}/`,
            type: 'PUT',
            data: JSON.stringify(data),
            contentType: 'application/json',
            headers: {
                'Authorization': 'Bearer ' + jwtToken,  // Thêm JWT token vào header của yêu cầu
                'X-CSRFToken': getCSRFToken()  // Thêm CSRF token vào header của yêu cầu nếu cần
            },
            success: function(response) {
                console.log(response); // In ra console để kiểm tra
                window.location.href = `/home/blog-detail/${userId}/${blogId}`;
                alert('Đã cập nhật blog thành công'); 
            },
            error: function(xhr, status, error) {
                console.error('Error updating blog:', error); // In ra console nếu có lỗi xảy ra
                alert('Có lỗi khi cập nhật blog. Hãy thử lại sau');
            }
        });
    });
});
