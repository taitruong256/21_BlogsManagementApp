document.addEventListener('DOMContentLoaded', function() {
    const userId = getUrlSegments();
    const userIdDiv = document.getElementById('my-id');
    const myId = userIdDiv.getAttribute('data-my-id');
    


    // Lấy user_id từ URL
    function getUrlSegments() {
        const pathSegments = window.location.pathname.split("/").filter(segment => segment !== '');
        return  pathSegments[pathSegments.length - 1]
    }


    // Kiểm tra nếu myId khác userId, thêm nút "Theo dõi"
    if (myId !== userId) {
        const followButton = document.createElement('button');
        followButton.textContent = 'Theo dõi';
        followButton.addEventListener('click', () => {
            // Code xử lý khi click vào nút "Theo dõi" ở đây
            console.log('Clicked on Follow button');
        });
        document.body.appendChild(followButton);
    }


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
});