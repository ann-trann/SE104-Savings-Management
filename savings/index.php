<?php
$page = 'savings';
$page_title = 'Phiếu tiết kiệm';

require "../includes/global.php";
require_once "../includes/auth.php";
$userRole = checkAuth();

include '../includes/header.php';

// Load sidebar dựa theo role
loadSidebar2();
?>


<div class="main-content">

    <div class="content-header">
        <div class="header-actions">
            <div class="create-btn">
                <button class="btn btn-primary" onclick="window.location.href = 'create-saving';">
                    <i class="fas fa-plus"></i> Thêm phiếu mới
                </button>
            </div>
            <div class="search">
                <div class="form-group">
                    <input type="text" class="form-control" placeholder="Tìm kiếm phiếu tiết kiệm...">
                    <i class="fas fa-search"></i>
                </div>
            </div>
        </div>
    </div>

    <div class="filter">
        <div class="filter-status"> Trạng thái:
            <select class="form-control">
                <option value="">Tất cả trạng thái</option>
                <option value="active">Đang hoạt động</option>
                <option value="completed">Đã tất toán</option>
            </select>
        </div>
        <div class="filter-date">
            <div class="filter-date-inputs">
                <div class="date-input">
                    <label for="from-date">Từ ngày:</label>
                    <input type="date" id="from-date" class="form-control">
                </div>
                <div class="date-input">
                    <label for="to-date">Đến ngày:</label>
                    <input type="date" id="to-date" class="form-control">
                </div>
            </div>
            <button id="reset-date" class="btn btn-secondary">
                <i class="fas fa-undo"></i> Đặt lại
            </button>
        </div>
    </div>

    <div class="card">
        <h2 class="card-header">Danh sách phiếu tiết kiệm</h2>
        <div class="table-wrapper">
            <table>
                <thead>
                    <tr>
                        <th>Mã phiếu</th>
                        <th>Khách hàng</th>
                        <th>Số tiền gửi</th>
                        <th>Kỳ hạn</th>
                        <th>Lãi suất</th>
                        <th>Ngày gửi</th>
                        <th>Ngày đáo hạn</th>
                        <th>Trạng thái</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Thêm các dòng khác -->
                </tbody>
            </table>
        </div>
    </div>
</div>

<script src="../js/sidebar.js"></script>
<script src="../js/saving.js"></script>