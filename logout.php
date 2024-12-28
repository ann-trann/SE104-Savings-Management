<!-- logout.php -->
<?php
session_start();
// Xóa tất cả session
session_destroy();
?>
<!DOCTYPE html>
<html>
<head>
    <title>Đăng xuất</title>
    <script>
        // Function xử lý đăng xuất
        function logoutHandler() {
            // Xóa cookies
            document.cookie = 'isLoggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            document.cookie = 'userRole=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            // document.cookie = 'userName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            // document.cookie = 'minIncome=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            // Xóa localStorage
            localStorage.clear();
            // Chuyển hướng về trang index
            window.location.href = '/SE104-Savings-Management/';
        }
        // Gọi function khi trang load
        window.onload = logoutHandler;
    </script>
</head>
<body>
    <p>Đang đăng xuất...</p>
</body>
</html>