<?php
$page = 'dashboard';
$page_title = 'Trang chủ';

require "includes/global.php";
require_once "includes/auth.php";
$userRole = checkAuth();

include 'includes/header.php';

// Load sidebar dựa theo role
loadSidebar();
?>

<div class="main-content">

    <div class="current-date">
        <?php
        // Thiết lập ngôn ngữ locale thành tiếng Việt
        setlocale(LC_TIME, 'vi_VN.UTF-8');

        // Hiển thị ngày tháng bằng tiếng Việt
        echo '<h3>Hôm nay là: ' . strftime('%A, %d %B %Y', strtotime('now')) . '</h3>';
        ?>
    </div>


    <div class="dashboard-stats">
        <div class="stat-card">
            <h3>Tổng số phiếu</h3>
            <div class="value"></div>
        </div>
        <div class="stat-card">
            <h3>Tổng tiền gửi</h3>
            <div class="value"><span class="money"></span></div>
        </div>
        <div class="stat-card">
            <h3>Số tài khoản</h3>
            <div class="value"></div>
        </div>
        <div class="stat-card">
            <h3>Số phiếu đang hoạt động</h3>
            <div class="value"></div>
        </div>
    </div>


    <div class="card">
        <h2 class="card-header">Phiếu tiết kiệm gần đây</h2>
        <div class="table-wrapper">
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
                    <!-- Thêm các dòng khác -->
                </tbody>
            </table>
        </div>
    </div>
</div>

<script src="js/dashboard.js"></script>