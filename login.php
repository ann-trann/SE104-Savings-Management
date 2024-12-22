<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Đăng nhập</title>
    <link rel="stylesheet" href="css/login.css">
</head>
<body>
    <div class="container">
        <div class="card">
            <div class="card-header">
                <img src="assets/index/logo.png" alt="Logo">
                <div class="login-role" id="loginRoleDisplay">Đăng nhập với vai trò: Quản lý</div>
            </div>
            <div class="login-form">
                <input type="text" id="phone-number" placeholder="Số điện thoại">
                <input type="password" id="password" placeholder="Mật khẩu">
            </div>
            <button class="login-btn" onclick="login(event)">Đăng nhập</button>
        </div>
    </div>

    <footer>
        SAVING MANAGEMENT PLATFORM
    </footer>

    <script>

        function login(event) {
            event.preventDefault(); // Prevent the form from submitting

            // const username = document.getElementById('username').value.trim();
            // const selectedRole = localStorage.getItem('selectedRole'); // Retrieve selectedRole here

            // Immediate redirect
            window.location.href = 'dashboard';
        }
    </script>
</body>
</html>
