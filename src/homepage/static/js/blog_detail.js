$(document).ready(function() {
    // Lấy user_id và blog_id từ URL
    function getUrlSegments() {
        const pathSegments = window.location.pathname.split("/").filter(segment => segment !== '');
        return {
            userId: pathSegments[pathSegments.length - 2], // Giả sử user_id nằm trước blog_id
            blogId: pathSegments[pathSegments.length - 1]
        };
    }

    const { userId, blogId } = getUrlSegments();
  

    // Gọi API để lấy dữ liệu chi tiết của blog
    var apiUrl = `http://127.0.0.1:8000/api/blog/${userId}/${blogId}/`;


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


    // Hàm để lấy JWT Token từ cookie 
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
    
    // Lấy JWT từ cookie
    const jwtToken = getCookie('jwt'); // 'jwt' là tên của cookie chứa JWT


    // Sử dụng phương thức GET để lấy dữ liệu của blog
    $.ajax({
        url: apiUrl,
        type: 'GET',
        success: function(data) {
            // Tăng trường views lên 1
            data.views += 1;
            // Lưu trữ URL của hình ảnh
            var imgUrl = data.img;
            // Xóa trường img khỏi dữ liệu trước khi gửi yêu cầu PUT
            delete data.img;

            // Gửi yêu cầu AJAX PUT với CSRF token và JWT token để xác thực người dùng. 
            $.ajax({
                url: `/api/update-blog/${blogId}/`,
                type: 'PUT',
                data: JSON.stringify(data),
                contentType: 'application/json',
                headers: {
                    'Authorization': 'Bearer ' + jwtToken,  // Thêm JWT token vào header của yêu cầu
                    'X-CSRFToken': csrftoken  // Thêm CSRF token vào header của yêu cầu nếu cần
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
                <h1>${data.title}</h1>
                <img src="${imgUrl}" style="width: 100%; height: auto;">
                <p><b>Tác giả: </b>${data.user.fullname}</p>
                <p><b>Mô tả: </b>${data.description}</p>
                <p><b>Lượt xem: </b>${data.views}</p>
            `;
            $("#blog-detail-container").html(blogDetailHtml);
        },
        error: function(xhr, status, error) {
            console.error('Error loading blog details:', error); // In ra console nếu có lỗi xảy ra
        }
    });


    // Function để tạo một phần tử HTML cho comment
    function createCommentElement(comment) {
        const commentElement = document.createElement('li');
        commentElement.classList.add('comment');

        const commentHeader = document.createElement('div');
        commentHeader.classList.add('comment-header');
        commentHeader.innerHTML = `
            <p><strong>${comment.user.fullname}:</strong></p>
            <button class="reply-btn" data-comment-id="${comment.comment_id}">Reply</button>
            <button class="delete-btn" data-comment-id="${comment.comment_id}">Delete</button>
        `;
        commentElement.appendChild(commentHeader);

        const commentContent = document.createElement('p');
        commentContent.classList.add('comment-content');
        commentContent.textContent = comment.content;
        commentElement.appendChild(commentContent);

        // Tạo một thẻ ul để chứa các phản hồi
        const repliesContainer = document.createElement('ul');
        repliesContainer.classList.add('comments-list');
        repliesContainer.style.marginLeft = '10px'; // Thụt replies
        commentElement.appendChild(repliesContainer);

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
            const response = await fetch(`http://127.0.0.1:8000/api/comments-tree/${userId}/${blogId}/`);
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
                    <textarea placeholder="Your Reply" name="reply-comment" required></textarea>
                    <button type="submit">Submit</button>
                </form>
            `;
            parentComment.appendChild(replyForm);

            // Tự động focus vào ô văn bản
            const textarea = replyForm.querySelector('textarea');
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
            const content = form.querySelector('textarea').value;
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
});
