<?php
$page = 'reports';
$page_title = 'Báo cáo';


require "includes/global.php";
require_once "includes/auth.php";
$userRole = checkAuth();

include 'includes/header.php';

// Load sidebar dựa theo role
loadSidebar();
?>

<div class="main-content">
    <div class="report-filters">
        <label>Kỳ báo cáo:</label>
        <div class="form-group">
            <input type="month" id="reportMonth" class="form-control">
            <button id="updateReport" class="btn btn-primary">
                <i class="fas fa-sync"></i> Cập nhật báo cáo
            </button>
        </div>
    </div>

    <div class="report-summary">
        <div class="stat-card">
            <h3>Tổng phiếu mở mới</h3>
            <div class="value">0</div>
        </div>
        <div class="stat-card">
            <h3>Tổng tiền gửi vào</h3>
            <div class="money">0 đ</div>
        </div>
        <div class="stat-card">
            <h3>Tổng phiếu tất toán</h3>
            <div class="value">0</div>
        </div>
    </div>

    <div class="monthly-report card">
        <div class="report-header">
            <h2>Báo Cáo Hoạt Động Tháng</h2>
            <div class="report-month">Tháng: 12/2024</div>
        </div>

        <table class="report-table">
            <thead>
                <tr>
                    <th>STT</th>
                    <th>Loại Tiết Kiệm</th>
                    <th>Tổng Tiền Gửi</th>
                    <th>Tổng Tiền Rút</th>
                    <th>Chênh Lệch</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Không kỳ hạn</td>
                    <td class="money positive">0 đ</td>
                    <td class="money negative">0 đ</td>
                    <td class="money">0 đ</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>3 tháng</td>
                    <td class="money positive">0 đ</td>
                    <td class="money negative">0 đ</td>
                    <td class="money">0 đ</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>6 tháng</td>
                    <td class="money positive">0 đ</td>
                    <td class="money negative">0 đ</td>
                    <td class="money">0 đ</td>
                </tr>
                <tr class="total-row">
                    <td colspan="2"><strong>Tổng cộng</strong></td>
                    <td class="money positive">0 đ</td>
                    <td class="money negative">0 đ</td>
                    <td class="money">0 đ</td>
                </tr>
            </tbody>
        </table>

    </div>
</div>



<script src="js/report.js"></script>