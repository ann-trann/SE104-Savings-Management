// Add to your existing JavaScript
document.querySelectorAll('.toggle-password').forEach(icon => {
    icon.addEventListener('click', function() {
        const input = this.previousElementSibling;
        if (input.type === 'password') {
            input.type = 'text';
            this.classList.remove('fa-eye-slash');
            this.classList.add('fa-eye');
        } else {
            input.type = 'password';
            this.classList.remove('fa-eye');
            this.classList.add('fa-eye-slash');
        }
    });
});

// Add to your handleSubmit function
function handleSubmit(event) {
    event.preventDefault();
    
    const password = document.getElementById('matKhau').value;
    const confirmPassword = document.getElementById('xacNhanMatKhau').value;
    
    if (password !== confirmPassword) {
        alert('Mật khẩu xác nhận không khớp!');
        return false;
    }
    
    // Continue with your existing form submission logic
}