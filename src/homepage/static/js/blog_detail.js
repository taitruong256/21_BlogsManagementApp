$(document).ready(function() {
    const { userId, blogId } = getUrlSegments();
    const userIdDiv = document.getElementById('my-id');
    const myId = userIdDiv.getAttribute('data-my-id');
    const jwtToken = getCookie('jwt'); // Lấy JWT từ cookie
    let commentCount = 0;


    document.getElementById('logout').addEventListener('click', function() {
        window.location.href = '/logout';  // Thay '/logout' bằng URL logout của bạn
    });


    $('#heart-btn').click(() => {
        if ($('#heart-btn').attr('class') == 'bi bi-heart-fill') {
            $('#heart-btn').attr('class', 'bi bi-heart');
        } else {
            $('#heart-btn').attr('class', 'bi bi-heart-fill');
        }
    })

    
    $("#cmt").click(function () {
        
    })


    $("#logo").click(function () {
        // Chuyển hướng người dùng đến trang chủ
        window.location.href = "/home"; // Thay đổi URL cho phù hợp với đường dẫn của trang chủ ("/home")
    });


    // Xử lý sự kiện khi click nút Update thì 
    document.getElementById('update-blog-button').addEventListener('click', function() {
        window.location.href = `/home/update-blog/${userId}/${blogId}/`;
    });


    // Lấy user_id và blog_id từ URL
    function getUrlSegments() {
        const pathSegments = window.location.pathname.split("/").filter(segment => segment !== '');
        return {
            userId: pathSegments[pathSegments.length - 2], // Giả sử user_id nằm trước blog_id
            blogId: pathSegments[pathSegments.length - 1]
        };
    }


    // Kiểm tra nếu myId bằng với userId và hiển thị nút Delete Blog nếu đúng
    if (myId === userId) {
        document.getElementById('update-blog-button').style.display = 'block';
        document.getElementById('delete-blog-button').style.display = 'block';
    } else {
        document.getElementById('update-blog-button').style.display = 'none';
        document.getElementById('delete-blog-button').style.display = 'none';
    }
  

    // Gọi API để lấy dữ liệu chi tiết của blog
    var apiUrl = `http://127.0.0.1:8000/api/blog/detail/${userId}/${blogId}/`;


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


    // Sử dụng phương thức GET để lấy dữ liệu của blog
    $.ajax({
        url: apiUrl,
        type: 'GET',
        success: function(data) {
            commentCount = data.comment_count;
            // Tăng trường views lên 1
            data.views += 1;
            // Lưu trữ URL của hình ảnh
            var imgUrl = data.img;
            // Xóa trường img khỏi dữ liệu trước khi gửi yêu cầu PUT
            delete data.img;

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
                    console.log(data);
                    console.log(response); // In ra console để kiểm tra
                },
                error: function(xhr, status, error) {
                    console.log(data);
                    console.error('Error updating blog:', error); // In ra console nếu có lỗi xảy ra
                }
            });

            // Hiển thị chi tiết blog
            var blogDetailHtml = `
                <p class="bi bi-person-circle"><b>Tác giả: </b><a href="/home/profile/${data.user.user_id}/">${data.user.fullname}</a></p></p>
                <h2>${data.title}</h2>
                ${data.markdown}
                <p><b>Lượt xem: </b>${data.views}</p>
            `;
            $("#blog-detail-container").html(blogDetailHtml);

            // Hiển thị lượt yêu thích, lượt comment
            var interactionHtml = `
                <div id="div-heart">
                    <i class="bi bi-heart-fill" id="heart-btn"></i> ${data.votes} hearts 
                </div>
                <div style="width:10px;"></div>
                <div
                    id="div-cmt" data-bs-toggle="collapse" data-bs-target="#collapseCmt" aria-expanded="false" aria-controls="collapseCmt">
                </div>
                <div id='cmt'>
                    <i class="bi bi-chat-dots"></i> ${data.comment_count} comments
                </div>
            `;
            $("#interaction-container").html(interactionHtml);
        },
        error: function(xhr, status, error) {
            console.error('Error loading blog details:', error); // In ra console nếu có lỗi xảy ra
        }
    });

    
    // Tạo định dạng ngày tháng hh:mm dd-MM-yyyy 
    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
    
        return `${hours}:${minutes} ${day}-${month}-${year}`;
    }

    // Hàm để tính toán thời gian tương đối
    function formatRelativeTime(dateString) {
        const now = new Date();
        const date = new Date(dateString);
        const diff = now - date;

        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) {
            return `${days} ngày trước`;
        } else if (hours > 0) {
            return `${hours} giờ trước`;
        } else if (minutes > 0) {
            return `${minutes} phút trước`;
        } else {
            return `${seconds} giây trước`;
        }
    }


    // Function để tạo một phần tử HTML cho comment
    function createCommentElement(comment) {
        const commentElement = document.createElement('li');
        commentElement.classList.add('comment');

        const commentContent = `
            <div class="row">
                <div class="col">
                    <div class="card">
                        <div class="card-body">
                            <div class="d-flex">
                            <div class="flex-shrink-0">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5S8QYOnHsZ-tg7_hpRQu7KV3VtLWmxd1EIO2X0AmvqQ&s" class="rounded-circle me-2" width="32" height="32"/>
                            </div>
                                <div class="flex-grow-1">
                                    <div class="fw-bold"><a href="/home/profile/${comment.user.user_id}/">${comment.user.fullname}</a></div>
                                    <div class="text-muted">${formatRelativeTime(comment.date_created)}</div>
                                    <div>${comment.content}</div>
                                </div>
                            </div>
                            <div class="mt-2">
                                <button class="btn btn-link reply-btn" data-comment-id="${comment.comment_id}">Phản hồi</button>
                                ${userId === myId ? `<button class="btn btn-link delete-btn" data-comment-id="${comment.comment_id}">Xóa</button>` : ''}
                            </div>
                            <ul class="comments-list ms-3"></ul>
                        </div>
                    </div>
                </div>
            </div>
        `;

        commentElement.innerHTML = commentContent;

        return commentElement;
    }
    


    // Function để tạo cây comment
    function createCommentTree(comments, parentElement) {
        comments.forEach(commentData => {
            const commentElement = createCommentElement(commentData);
            parentElement.appendChild(commentElement);

            // Check xem comment có replies không
            if (commentData.replies && commentData.replies.length > 0) {
                const repliesContainer = commentElement.querySelector('ul.comments-list');
                createCommentTree(commentData.replies, repliesContainer);
            }
        });
    }


    // Hàm để fetch comments từ API khi trang load
    async function fetchComments() {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/comment/tree/${userId}/${blogId}/`);
            const comments = await response.json();
            const commentsList = document.getElementById('commentsList');
            createCommentTree(comments, commentsList);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    }

    // Fetch comments khi trang load
    fetchComments();


    // Xử lý sự kiện khi người dùng click vào nút Reply
    let replyForm = null;
    commentsList.addEventListener('click', function(event) {
        if (event.target.classList.contains('reply-btn')) {
            const parentComment = event.target.closest('.comment');
            const commentId = event.target.dataset.commentId; // Lấy ID của comment từ thuộc tính data của comment

            // Kiểm tra xem có form reply hiện tại không
            if (replyForm) {
                replyForm.remove(); // Xóa form reply hiện tại
            }

            // Tạo form reply mới
            replyForm = document.createElement('div');
            replyForm.classList.add('reply-form');
            replyForm.innerHTML = `
                <form class="reply-form" data-comment-id="${commentId}">
                    <input placeholder="Your Reply" name="reply-comment" required></input>
                    <button type="submit">Submit</button>
                </form>
            `;
            parentComment.appendChild(replyForm);

            // Tự động focus vào ô văn bản
            const textarea = replyForm.querySelector('input');
            textarea.focus();
        }
    });


    // Xử lý sự kiện khi người dùng submit Form reply (gửi phản hồi)
    commentsList.addEventListener('submit', async function(event) {
        event.preventDefault();
        const form = event.target; // Lấy ra form mà người dùng đã gửi
        console.log("đã click");
        // Kiểm tra xem người dùng đã gửi form reply hay không
        if (form.classList.contains('reply-form')) {
            console.log("đã click vào form");
            const content = form.querySelector('input').value;
            const parentCommentId = form.dataset.commentId; // Lấy ID của comment từ thuộc tính data của form
            console.log(parentCommentId)
            try {
                const response = await fetch(`/api/comment/add-reply/${userId}/${blogId}/${parentCommentId}/`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${jwtToken}`,
                        'Content-Type': 'application/json',
                        'X-CSRFToken': getCSRFToken()
                    },
                    body: JSON.stringify({
                        blog: blogId,
                        content: content,
                        parent_id: parentCommentId
                    })
                });

                if (response.ok) {
                    // Nếu gửi reply thành công, thêm reply vào dưới parent comment
                    const replyData = await response.json();
                    // Dùng hàm createCommentElement để tạo comment phản hồi 
                    const replyItem = createCommentElement(replyData);

                    // Tìm hoặc tạo container cho các replies
                    let parentComment = form.closest('.comment');
                    let repliesContainer = parentComment.querySelector('ul.comments-list');
                    if (!repliesContainer) {
                        repliesContainer = document.createElement('ul');
                        repliesContainer.classList.add('comments-list');
                        repliesContainer.style.marginLeft = '10px'; // Thụt replies
                        parentComment.appendChild(repliesContainer);
                    }

                    repliesContainer.appendChild(replyItem);
                    form.remove(); // Xóa form sau khi gửi thành công
                    replyForm = null;
                } else {
                    console.error('Thêm phản hồi thất bại:', response.statusText);
                }
            } catch (error) {
                console.error('Error adding reply:', error);
            }
        }
    });

    
    // Xử lý sự kiện khi người dùng thêm bình luận mới 
    let commentForm = document.getElementById("commentForm");
    commentForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const content = document.getElementById('content').value;
        console.log(userId)
        console.log(blogId)

        const formData = new FormData();
        formData.append('blog', blogId);
        formData.append('content', content);

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/comment/add/${userId}/${blogId}/`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${jwtToken}`,
                    'X-CSRFToken': getCSRFToken()
                }
            });

            if (response.ok) {
                const commentData = await response.json();
                document.getElementById('content').value = '';
    
                // Tạo phần tử bình luận mới
                const newCommentElement = createCommentElement(commentData);
    
                // Thêm bình luận mới vào danh sách bình luận
                const commentsList = document.getElementById('commentsList');
                commentsList.appendChild(newCommentElement);
    
                alert('Bình luận đã được thêm thành công.');
            } else {
                alert('Thêm bình luận thất bại. Xin hãy thử lại sau');
                console.error('Failed to add comment:', response.statusText);
            }
        } catch (error) {
            alert('Đã có lỗi xảy ra khi thêm bình luận. Xin hãy thử lại sau.');
            console.error('Error adding comment:', error);
        }
    });


    // Xử lý sự kiện khi người dùng nhấn vào nút xóa comment 
    commentsList.addEventListener('click', async function(event) {
        if (event.target.classList.contains('delete-btn')) {
            const confirmDelete = confirm("Bạn có thực sự muốn xóa bình luận này?"); // Hỏi người dùng xác nhận

            if (confirmDelete) {
                const commentId = event.target.dataset.commentId; // Lấy ID của comment từ thuộc tính data của nút

                try {
                    const response = await fetch(`http://127.0.0.1:8000/api/comment/delete/${commentId}/`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-CSRFToken': getCSRFToken()
                        }
                    });

                    if (response.ok) {
                        // Xóa comment khỏi giao diện người dùng
                        const parentComment = event.target.closest('.comment');
                        parentComment.remove();
                    } else {
                        alert('Xóa bình luận thất bại. Xin hãy thử lại sau.');
                    }
                } catch (error) {
                    alert('Có lỗi xảy ra trong quá trình xóa bình luận. Xin hãy thử lại sau.');
                }
            } 
        }
    });


    // Thêm sự kiện click cho nút Delete Blog
    document.getElementById('delete-blog-button').addEventListener('click', async function() {
        const confirmDelete = confirm("Bạn có thực sự muốn xóa blog này?"); // Hỏi người dùng xác nhận

        if (confirmDelete) {
            try {
                const response = await fetch(`/api/blog/delete/${blogId}/`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': getCSRFToken()
                    }
                });

                if (response.ok) {
                    alert('Blog đã được xóa thành công.');
                    window.location.href = '/home';  //Chuyển hướng đến trang chủ sau khi xóa thành công
                } else {
                    const errorData = await response.json();
                    alert('Xóa blog thất bại. Lỗi: ' + errorData.message);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Đã có lỗi khi xóa blog. Xin hãy thử lại sau.');
            }
        }
    });
});

// Đăng ký sự kiện click cho nút thả tim sau khi phần tử được tạo ra
$(document).on('click', '#heart-btn', function() {
    console.log("Đã click thả tim. ");
    if ($(this).hasClass('bi-heart-fill')) {
        $(this).removeClass('bi-heart-fill').addClass('bi-heart');
    } else {
        $(this).removeClass('bi-heart').addClass('bi-heart-fill');
    }
});