<?php
$page = 'dashboard';
$page_title = 'Trang chủ';

require "includes/global.php";
?>


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
        <h2 class="card-header">Phiếu tiết kiệm gần đây</h2>
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

<script>
    function logout() {
        // Redirect to login page
        window.location.href = 'login';
    }
</script>

</html>