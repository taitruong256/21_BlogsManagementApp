document.addEventListener('DOMContentLoaded', function() {
    const userId = getUrlSegments();
    const userIdDiv = document.getElementById('my-id');
    const myId = userIdDiv.getAttribute('data-my-id');
    const jwtToken = getCookie('jwt'); // Lấy JWT từ cookie
    const followButton = $('#follow-button');
    let isFollowing = false;
    let followingList = []; // Khởi tạo danh sách người đang theo dõi
    


    // Lấy user_id từ URL
    function getUrlSegments() {
        const pathSegments = window.location.pathname.split("/").filter(segment => segment !== '');
        return  pathSegments[pathSegments.length - 1]
    }


    // Cập nhật trạng thái của nút "Theo dõi"
    function updateFollowButton() {
        if (myId !== userId) {
            followButton.show();
            followButton.text(isFollowing ? 'Hủy theo dõi' : 'Theo dõi');
            followButton.data('is-following', isFollowing);
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
                followButton.text(isFollowing ? 'Hủy theo dõi' : 'Theo dõi');
                updateFollowButton();

                console.log(followingList);
                console.log(isFollowing);
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
            document.getElementById('username').textContent = data.username;
            document.getElementById('fullname').textContent = data.fullname;
            document.getElementById('email').textContent = data.email;
            document.getElementById('gender').textContent = data.gender === 'male' ? 'Male' : 'Female';
            document.getElementById('birthdate').textContent = data.birthdate;
        })
        .catch(error => console.error('Error fetching profile:', error));


    // Xử lý sự kiện khi nhấn nút "Following"
    $('#followingModal').on('show.bs.modal', function() {
        console.log("Đã click following");
        // Gọi API để lấy danh sách người đang theo dõi
        $.ajax({
            url: `/api/friend/following/${userId}`,
            type: 'GET',
            dataType: 'json',
            success: function(response) {
                // Hiển thị danh sách trong modal
                displayFollowingList(response);
                console.log(response);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('Error fetching following list:', textStatus, errorThrown);
            }
        });
    });

    // Xử lý sự kiện khi nhấn nút "Follower"
    $('#followerModal').on('show.bs.modal', function() {
        console.log("Đã click follower");
        // Gọi API để lấy danh sách người theo dõi
        $.ajax({
            url: `/api/friend/follower/${userId}/`,
            type: 'GET',
            dataType: 'json',
            success: function(response) {
                // Hiển thị danh sách trong modal
                displayFollowerList(response);
                console.log(response);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('Error fetching follower list:', textStatus, errorThrown);
            }
        });
    });

    // Hiển thị danh sách người đang theo dõi trong modal "Following"
    function displayFollowingList(data) {
        var list = $('#followingList');
        list.empty(); // Xóa danh sách cũ trước khi thêm mới

        // Thêm mỗi người theo dõi vào danh sách
        data.forEach(function(user) {
            var listItem = $('<li>').text(user.userfrom);
            list.append(listItem);
        });
    }

    // Hiển thị danh sách người theo dõi trong modal "Follower"
    function displayFollowerList(data) {
        var list = $('#followerList');
        list.empty(); // Xóa danh sách cũ trước khi thêm mới

        // Thêm mỗi người theo dõi vào danh sách
        data.forEach(function(user) {
            var listItem = $('<li>').text(user.userfrom);
            list.append(listItem);
        });
    }

    $('#followingModal').on('show.bs.modal', function() {
        // Fetch following list from API
        const userId = $('#my-id').data('my-id');
        $.ajax({
            url: `/api/friend/following/${userId}/`,
            type: 'GET',
            dataType: 'json',
            success: function(response) {
                // Display following list in modal
                displayFollowingList(response);
                console.log(response);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('Error fetching following list:', textStatus, errorThrown);
            }
        });
    });
    
    // Function to display following list in modal
    function displayFollowingList(data) {
        var list = $('#followingList');
        list.empty(); // Clear previous list items
    
        // Append each following user to the list
        data.forEach(function(user) {
            var listItem = $('<li>').text(user.user_to.username);
            list.append(listItem);
        });
    }

    // Xử lý sự kiện khi nhấn nút "Follower"
    $('#followerModal').on('show.bs.modal', function() {
        // Fetch follower list from API
        const userId = $('#my-id').data('my-id');
        $.ajax({
            url: `/api/friend/follower/${userId}/`,
            type: 'GET',
            dataType: 'json',
            success: function(response) {
                // Display follower list in modal
                displayFollowerList(response);
                console.log(response);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('Error fetching follower list:', textStatus, errorThrown);
            }
        });
    });

    // Function to display follower list in modal
    function displayFollowerList(data) {
        var list = $('#followerList');
        list.empty(); // Clear previous list items

        // Append each follower to the list
        data.forEach(function(user) {
            var listItem = $('<li>').text(user.user_from.username);
            list.append(listItem);
        });
    }

    $('#followingButton').click(function() {
        $('#followingModal').modal('show');
    });
});