document.addEventListener("DOMContentLoaded", function() {
    var registerForm = document.querySelector('form');
    registerForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Ngăn chặn gửi form mặc định
        var messageDiv = document.getElementById('message');
        alert("Hông có gì đâu bạn!");
    });
});
