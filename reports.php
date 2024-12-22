<?php
$page = 'reports';
$page_title = 'Báo cáo';

require "includes/global.php";
?>


<?php include 'includes/header.php'; ?>
<?php include 'includes/sidebar.php'; ?>

<div class="main-content">
    <!-- <div class="content-header">
            <h1>Báo cáo doanh số</h1>
        </div> -->

    <div class="report-filters">
        <select class="form-control">
            <option value="day">Theo ngày</option>
            <option value="month">Theo tháng</option>
            <option value="year">Theo năm</option>
        </select>
        <input type="month" class="form-control" value="2024-12">
        <button class="btn btn-primary">Xem báo cáo</button>
    </div>

    <div class="report-summary">
        <div class="stat-card">
            <h3>Tổng phiếu mở mới</h3>
            <div class="value">45</div>
        </div>
        <div class="stat-card">
            <h3>Tổng tiền gửi vào</h3>
            <div class="value">1,234,567,000 đ</div>
        </div>
        <div class="stat-card">
            <h3>Tổng phiếu tất toán</h3>
            <div class="value">32</div>
        </div>
        <div class="stat-card">
            <h3>Tổng tiền chi trả</h3>
            <div class="value">987,654,000 đ</div>
        </div>
    </div>

    <div class="report-charts">
        <div class="card chart-card">
            <h2>Biểu đồ doanh số</h2>
            <canvas id="revenueChart"></canvas>
        </div>

        <div class="card chart-card">
            <h2>Phân bổ kỳ hạn</h2>
            <canvas id="termDistributionChart"></canvas>
        </div>
    </div>

    <div class="card">
        <h2>Chi tiết giao dịch</h2>
        <table>
            <thead>
                <tr>
                    <th>Ngày</th>
                    <th>Loại giao dịch</th>
                    <th>Số lượng phiếu</th>
                    <th>Tổng tiền</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>15/12/2024</td>
                    <td>Mở mới</td>
                    <td>5</td>
                    <td>500,000,000 đ</td>
                </tr>
                <!-- Thêm các dòng khác -->
            </tbody>
        </table>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="js/sidebar.js"></script>
<script src="js/main.js"></script>