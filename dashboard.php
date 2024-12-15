<?php 
$page = 'dashboard'; 
$page_title = 'Trang chủ';
?>

<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Trang chủ - Quản lý tiết kiệm</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/sidebar.css">
</head>
<body>
    <?php include 'includes/header.php'; ?>
    <?php include 'includes/sidebar.php'; ?>
    
    <div class="main-content">
        <!-- <div class="content-header">
            <h1>Tổng quan</h1>
        </div> -->
        
        <div class="dashboard-stats">
            <div class="stat-card">
                <h3>Tổng số phiếu</h3>
                <div class="value">1,234</div>
            </div>
            <div class="stat-card">
                <h3>Tổng tiền gửi</h3>
                <div class="value">2,345,678,000 đ</div>
            </div>
            <div class="stat-card">
                <h3>Số tài khoản</h3>
                <div class="value">567</div>
            </div>
            <div class="stat-card">
                <h3>Doanh thu tháng</h3>
                <div class="value">123,456,000 đ</div>
            </div>
        </div>

        <div class="card">
            <h2>Phiếu tiết kiệm gần đây</h2>
            <table>
                <thead>
                    <tr>
                        <th>Mã phiếu</th>
                        <th>Khách hàng</th>
                        <th>Số tiền</th>
                        <th>Ngày gửi</th>
                        <th>Trạng thái</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>#PTK001</td>
                        <td>Nguyễn Văn A</td>
                        <td>100,000,000 đ</td>
                        <td>15/12/2024</td>
                        <td>Đang hoạt động</td>
                    </tr>
                    <!-- Thêm các dòng khác -->
                </tbody>
            </table>
        </div>
    </div>

    <script src="js/sidebar.js"></script>
    <script src="js/main.js"></script>
    <script>

        function logout() {            
            // Redirect to login page
            window.location.href = 'login.php';
        }
    </script>
</body>
</html>