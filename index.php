<!DOCTYPE html>
<html lang="vi">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Choose Role</title>
    <link rel="stylesheet" href="css/index.css">
</head>

<body>
    <div class="container">
        <div class="card">
            <div class="card-header">
                <img src="assets/index/logo.png" alt="Logo">
                <h2>CHÀO MỪNG TRỞ LẠI</h2>
                <p>Bạn đăng nhập với vai trò là</p>
            </div>

            <div class="role-selection">
                <div class="role" onclick="selectRole('customer')" style="color: #025D9D;">
                    <img src="assets/index/customer.png" alt="Khách hàng">
                    <p>Khách hàng</p>
                </div>
                <div class="role" onclick="selectRole('employee')" style="color: #CB6809;">
                    <img src="assets/index/employee.png" alt="Nhân viên">
                    <p>Nhân viên</p>
                </div>
                <div class="role" onclick="selectRole('manager')" style="color: #0D6508;">
                    <img src="assets/index/manager.png" alt="Quản lý">
                    <p>Quản lý</p>
                </div>
            </div>
        </div>
    </div>

    <footer>
        SAVING MANAGEMENT PLATFORM
    </footer>

    <script>
        function selectRole(role) {
            localStorage.clear();
            localStorage.setItem('selectedRole', role);
            window.location.href = 'login';
        }
    </script>
</body>

</html>