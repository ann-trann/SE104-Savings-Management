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
                <div class="login-role" id="loginRoleDisplay">Đăng nhập với vai trò: </div>
            </div>
            <div class="login-form">
                <input type="text" id="username" placeholder="Số điện thoại/Tên đăng nhập">
                <input type="password" id="password" placeholder="Mật khẩu">
                <div class="error-message" id="loginError"></div>
            </div>
            <button class="login-btn" onclick="login(event)">Đăng nhập</button>
        </div>
    </div>

    <footer>
        SAVING MANAGEMENT PLATFORM
    </footer>

    <script src="js/login.js"></script>
</body>
</html>