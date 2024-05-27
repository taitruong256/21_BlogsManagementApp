document.addEventListener('DOMContentLoaded', function() {
    const userId = getUrlSegments();
    const userIdDiv = document.getElementById('my-id');
    const myId = userIdDiv.getAttribute('data-my-id');
    const jwtToken = getCookie('jwt'); // Lấy JWT từ cookie
    const followButton = $('#follow-button');
    const addBlogButton = document.querySelector('a[href="/home/add-blog/"]');
    const notificationButton = document.querySelector('#notificationButton');
    let isFollowing = false;
    const profileUrl = `/home/profile/${userId}/`;
    let followingList = []; // Khởi tạo danh sách người đang theo dõi
    const postsPerPage = 4; // Số bài viết mỗi trang
    let currentPage = 1;
    let allPosts = [];

    if (myId !== userId) {
        $('#follow-button').removeClass('d-none');
        $('#editProfileButton').addClass('d-none');
    }

    // Khi click vào logo thì quay về trang chủ 
    $("#logo").click(function () {
        // Chuyển hướng người dùng đến trang chủ
        window.location.href = "/home"; // Thay đổi URL cho phù hợp với đường dẫn của trang chủ ("/home")
    });

    // Lấy user_id từ URL
    function getUrlSegments() {
        const pathSegments = window.location.pathname.split("/").filter(segment => segment !== '');
        return pathSegments[pathSegments.length - 1];
    }

    // Cập nhật trạng thái của nút "Theo dõi"
    function updateFollowButton() {
        console.log("Đã gọi cập nhật nút theo dõi");
        if (myId !== userId) {
            followButton.show();
            followButton.text(isFollowing ? 'Hủy theo dõi' : 'Theo dõi');
            followButton.data('is-following', isFollowing);
            addBlogButton.style.display = 'none';
            notificationButton.style.display = 'none';
        }
    }

    // Thêm hàm để lấy danh sách những người đang theo dõi
    function getFollowingList() {
        $.ajax({
            url: `/api/friend/following/${myId}/`,
            type: 'GET',
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer ' + jwtToken,
                'X-CSRFToken': getCSRFToken() // Thêm CSRF token nếu cần thiết
            },
            success: function(response) {
                // Lưu trữ danh sách người đang theo dõi
                followingList = response.map(item => item.user_to.user_id);
                // Kiểm tra xem userId có trong danh sách followingList hay không
                isFollowing = followingList.includes(parseInt(userId));
                console.log("Đã gọi API người theo dõi");
                console.log(isFollowing);
                followButton.text(isFollowing ? 'Hủy theo dõi' : 'Theo dõi');
                updateFollowButton();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('Error fetching following list:', textStatus, errorThrown);
            }
        });
    }
    getFollowingList();

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

    // Xử lý sự kiện Theo dõi/Hủy theo dõi
    followButton.on('click', function() {
        isFollowing = followButton.data('is-following') === true;
        const action = isFollowing ? 'unfollow' : 'follow';
        const url = isFollowing ? `/api/friend/delete/${userId}/` : `/api/friend/add/${userId}/`;
        const type = isFollowing ? 'DELETE' : 'POST';

        $.ajax({
            url: url,
            type: type,
            dataType: 'json',
            data: {
                id_user_to: userId 
            },
            headers: {
                'Authorization': 'Bearer ' + jwtToken,
                'X-CSRFToken': getCSRFToken() // Thêm CSRF token nếu cần thiết
            },
            success: function(response) {
                // Cập nhật trạng thái theo dõi và văn bản nút
                followButton.data('is-following', !isFollowing);
                followButton.text(!isFollowing ? 'Hủy theo dõi' : 'Theo dõi');
                console.log(`${action === 'follow' ? 'Đã theo dõi' : 'Đã hủy theo dõi'} thành công!`, response);
                alert(`${action === 'follow' ? 'Đã theo dõi' : 'Đã hủy theo dõi'} thành công.`);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error(`Lỗi khi ${action === 'follow' ? 'theo dõi' : 'hủy theo dõi'}:`, textStatus, errorThrown);
                alert(`Có lỗi xảy ra khi ${action === 'follow' ? 'theo dõi' : 'hủy theo dõi'} người dùng này. Vui lòng thử lại.`);
            }
        });
    });

    // Hàm để gọi api/user/user_id load thông tin người dùng 
    fetch(`/api/user/${userId}/`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('username').textContent = "NickName: " + data.username;
            document.getElementById('fullname').textContent = data.fullname;
            document.getElementById('gender').textContent = data.gender === 'male' ? 'Male' : 'Female';
            document.getElementById('birthdate').textContent = data.birthdate;
             // Cập nhật hình ảnh
            if (data.profile_picture) {
                document.getElementById('profilePicture').src = data.profile_picture;
            }
        })
        .catch(error => console.error('Error fetching profile:', error));

    // Xử lý sự kiện khi nhấn nút "Following"
    $('#followingButton').click(function() {
        $('#followingModal').modal('show');
    });

    // Xử lý sự kiện khi nhấn nút "Follower"
    $('#followerButton').click(function() {
        $('#followerModal').modal('show');
    });

    // Gọi API và hiển thị danh sách người theo dõi hoặc người đang theo dõi
    function fetchAndDisplayList(url, listElementId, displayFunction) {
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            success: function(response) {
                displayFunction(response, listElementId);
                console.log(response);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('Error fetching list:', textStatus, errorThrown);
            }
        });
    }

    // Hiển thị danh sách người trong modal
    function displayList(data, listElementId, userKey) {
        var list = $(listElementId);
        list.empty(); // Xóa danh sách cũ trước khi thêm mới

        // Thêm mỗi người vào danh sách
        data.forEach(function(user) {
            var listItem = $('<li>').text(user[userKey].username);
            list.append(listItem);
        });
    }

    // Xử lý sự kiện hiển thị modal "Following"
    $('#followingModal').on('show.bs.modal', function() {
        fetchAndDisplayList(`/api/friend/following/${userId}/`, '#followingList', function(data, listElementId) {
            displayList(data, listElementId, 'user_to');
        });
    });

    // Xử lý sự kiện hiển thị modal "Follower"
    $('#followerModal').on('show.bs.modal', function() {
        fetchAndDisplayList(`/api/friend/follower/${userId}/`, '#followerList', function(data, listElementId) {
            displayList(data, listElementId, 'user_from');
        });
    });

    // Function to update follower count
    function updateFollowCount(userKey, val) {
        $.ajax({
            url: `/api/friend/${userKey}/${userId}/`,
            type: 'GET',
            dataType: 'json',
            success: function(response) {
                $(`#${userKey}Button`).text(val + ": " + response.length);
                console.log('Follower count updated:', response.length);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('Error fetching follower count:', textStatus, errorThrown);
            }
        });
    }

    // Update follower count on page load
    updateFollowCount("following", "Đang theo dõi");
    updateFollowCount("follower", "Đã theo dõi");

    // Hàm để gọi API và hiển thị danh sách thông báo
    function loadNotifications() {
        $.ajax({
            url: '/api/notification/list/',
            type: 'GET',
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer ' + jwtToken,
                'X-CSRFToken': getCSRFToken() // Thêm CSRF token nếu cần thiết
            },
            success: function(response) {
                displayNotificationList(response);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('Error fetching notifications:', textStatus, errorThrown);
            }
        });
    }

    // Hiển thị danh sách thông báo trong modal "Notifications"
    function displayNotificationList(notifications) {
        var list = $('#notificationList');
        list.empty(); // Xóa danh sách cũ trước khi thêm mới

        // Thêm mỗi thông báo vào danh sách
        notifications.forEach(function(notification) {
            var listItem = $('<li>').text(notification.content);
            list.append(listItem);
        });
    }

    // Xử lý sự kiện khi nhấn nút "Notifications"
    $('#notificationModal').on('show.bs.modal', function() {
        loadNotifications();
    });

    // Hàm để hiển thị các bài viết trên một trang cụ thể
    function displayPosts(page) {
        const startIndex = (page - 1) * postsPerPage;
        const endIndex = page * postsPerPage;
        const postsToShow = allPosts.slice(startIndex, endIndex);

        const blogListContainer = document.getElementById('blog-list');
        blogListContainer.innerHTML = '';

        postsToShow.forEach(blogHtml => {
            blogListContainer.innerHTML += blogHtml;
        });

        // Cập nhật các nút phân trang
        updatePagination(page);
    }

    // Hàm để cập nhật các nút phân trang
    function updatePagination(page) {
        const totalPages = Math.ceil(allPosts.length / postsPerPage);
        const paginationContainer = document.getElementById('pagination');
        paginationContainer.innerHTML = '';

        // Nút Previous
        const prevItem = document.createElement('li');
        prevItem.className = `page-item ${page === 1 ? 'disabled' : ''}`;
        const prevLink = document.createElement('a');
        prevLink.className = 'page-link';
        prevLink.href = '#';
        prevLink.textContent = 'Previous';
        prevLink.addEventListener('click', function(e) {
            e.preventDefault();
            if (page > 1) {
                displayPosts(page - 1);
            }
        });
        prevItem.appendChild(prevLink);
        paginationContainer.appendChild(prevItem);

        // Các nút trang
        for (let i = 1; i <= totalPages; i++) {
            const pageItem = document.createElement('li');
            pageItem.className = `page-item ${i === page ? 'active' : ''}`;
            const pageLink = document.createElement('a');
            pageLink.className = 'page-link';
            pageLink.href = '#';
            pageLink.textContent = i;
            pageLink.addEventListener('click', function(e) {
                e.preventDefault();
                displayPosts(i);
            });
            pageItem.appendChild(pageLink);
            paginationContainer.appendChild(pageItem);
        }

        // Nút Next
        const nextItem = document.createElement('li');
        nextItem.className = `page-item ${page === totalPages ? 'disabled' : ''}`;
        const nextLink = document.createElement('a');
        nextLink.className = 'page-link';
        nextLink.href = '#';
        nextLink.textContent = 'Next';
        nextLink.addEventListener('click', function(e) {
            e.preventDefault();
            if (page < totalPages) {
                displayPosts(page + 1);
            }
        });
        nextItem.appendChild(nextLink);
        paginationContainer.appendChild(nextItem);
    }

    // Gọi API để lấy danh sách các bài viết
    fetch(`/api/blog/list/${userId}/`)
    .then(response => response.json())
    .then(data => {
        data.forEach(category => {
            category.list_blog.forEach(blog => {
                const blogHtml = `
                    <div class="post col-6">
                        <img
                            src="${blog.img}"
                            alt="Post Picture"
                            style="width: 100%; height: 100px"
                        />
                        <div class="content text-italic">
                            <p>
                                <span class="title text-bold-500">Author:</span>
                                <span class="content">${blog.author}</span>
                            </p>
                            <p>
                                <span class="title text-bold-500">Title:</span>
                                <span class="content">${blog.title}</span>
                            </p>
                            <p>
                                <span class="title text-bold-500">Category:</span>
                                <span class="content">${category.category}</span>
                            </p>
                            <p>
                                <span class="title text-bold-500">Rank:</span>
                                <span class="content">${blog.rank}</span>
                            </p>
                        </div>
                    </div>
                `;
                allPosts.push(blogHtml);
            });
        });

        // Hiển thị trang đầu tiên
        displayPosts(currentPage);
    })
    .catch(error => console.error('Error fetching data:', error));


    const spinner = document.getElementById('spinner');

    $('#editProfileButton').click(function() {
        const fullname = $('#fullname').text();
        const gender = $('#gender').text() === 'Nam' ? 'male' : 'female';
        const birthdate = $('#birthdate').text();
        
        $('#editFullname').val(fullname);
        $('#editGender').val(gender);
        $('#editBirthdate').val(birthdate);

        $('#editProfileModal').modal('show');
    });

    $('#saveProfileButton').click(function() {
        const fullname = $('#editFullname').val();
        const gender = $('#editGender').val();
        const birthdate = $('#editBirthdate').val();
        const formData = new FormData();
        formData.append('fullname', fullname);
        formData.append('gender', gender);
        formData.append('birthdate', birthdate);
        if ($('#editProfilePicture')[0].files[0]) {
            formData.append('profile_picture', $('#editProfilePicture')[0].files[0]);
        }

        if (!gender) {
            alert('Vui lòng chọn giới tính.');
            return;
        }

        console.log('Saving profile data:', ...formData);  // Log dữ liệu FormData để kiểm tra

        // Hiển thị spinner
        spinner.style.display = 'block';

        $.ajax({
            url: `/home/profile/${userId}/update/`,
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            headers: {
                'X-CSRFToken': $('input[name="csrfmiddlewaretoken"]').val()
            },
            success: function(response) {
                console.log('Profile updated successfully:', response);  // Log dữ liệu sau khi cập nhật thành công
                spinner.style.display = 'none';  // Ẩn spinner
                window.location.reload();  // Tải lại toàn bộ trang sau khi cập nhật thành công
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('Error updating profile:', textStatus, errorThrown);
                spinner.style.display = 'none';  // Ẩn spinner khi gặp lỗi
                alert('Đã xảy ra lỗi khi cập nhật thông tin. Vui lòng thử lại sau.');
            }
        });
    });

    function getUrlSegments() {
        const pathSegments = window.location.pathname.split("/").filter(segment => segment !== '');
        return pathSegments[pathSegments.length - 1];
    }
});
