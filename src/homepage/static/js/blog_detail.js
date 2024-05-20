$(document).ready(function() {
    // Lấy blog_id từ URL
    var blogId = window.location.pathname.split("/").filter(function(segment) {
        return segment !== '';
    }).pop();
  
    // Gọi API để lấy dữ liệu chi tiết của blog
    var apiUrl = `http://127.0.0.1:8000/api/blog/${blogId}/`;


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
    var csrftoken = getCSRFToken();


    // Sử dụng phương thức GET để lấy dữ liệu của blog
    $.ajax({
        url: apiUrl,
        type: 'GET',
        success: function(data) {
            // Tăng trường views lên 1
            data.views += 1;

            // Gửi yêu cầu AJAX POST với CSRF token
            $.ajax({
                url: `/api/update-blog/${blogId}/`,
                type: 'PUT',
                data: data,
                headers: {
                    'X-CSRFToken': csrftoken  // Thêm CSRF token vào header của yêu cầu
                },
                success: function(response) {
                    console.log(response); // In ra console để kiểm tra
                    console.log(data);
                },
                error: function(xhr, status, error) {
                    console.log(data);
                    console.error('Error updating views:', error); // In ra console nếu có lỗi xảy ra
                }
            });
        },
        error: function(xhr, status, error) {
            console.error('Error loading blog details:', error); // In ra console nếu có lỗi xảy ra
        }
    });

  
    $.get(apiUrl, function(data) {
      // Xử lý dữ liệu sau khi nhận được
      console.log(data);
      
      // Tạo HTML để hiển thị chi tiết blog
      var blogDetailHtml = `
        <h1>${data.title}</h1>
        <img src="${data.img}" style="width: 100%; height: auto;">
        <p><b>Tác giả: </b>${data.user.fullname}</p>
        <p><b>Mô tả: </b>${data.description}</p>
        <p><b>Lượt xem: </b>${data.votes}</p>
      `;
  
      // Hiển thị chi tiết blog lên giao diện
      $("#blog-detail-container").html(blogDetailHtml);
    }).fail(function() {
      // Xử lý khi API thất bại
      $("#blog-detail-container").html("<p>Error loading blog details.</p>");
    });


  });
  