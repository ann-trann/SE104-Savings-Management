<?php
$page = 'savings';
$page_title = 'Phiếu tiết kiệm';

require "includes/global.php";
?>


<?php include 'includes/header.php'; ?>
<?php include 'includes/sidebar.php'; ?>

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
            <div class="date-input">
                <label for="from-date">Từ ngày:</label>
                <input type="date" id="from-date" class="form-control">
            </div>
            <div class="date-input">
                <label for="to-date">Đến ngày:</label>
                <input type="date" id="to-date" class="form-control">
            </div>
        </div>

    </div>

    <div class="card">
        <h2 class="card-header">Danh sách phiếu tiết kiệm</h2>
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
                <tr>
                    <td>#PTK001</td>
                    <td>Nguyễn Văn A</td>
                    <td>100,000,000 đ</td>
                    <td>6 tháng</td>
                    <td>6.8%</td>
                    <td>15/12/2024</td>
                    <td>15/06/2025</td>
                    <td><span class="status active">Đang hoạt động</span></td>
                    <td>
                        <button class="btn-icon" title="Chi tiết"><i class="fas fa-eye"></i></button>
                        <button class="btn-icon" title="Sửa"><i class="fas fa-edit"></i></button>
                        <button class="btn-icon" title="Tất toán"><i class="fas fa-check-circle"></i></button>
                    </td>
                </tr>
                <!-- Thêm các dòng khác -->
            </tbody>
        </table>
    </div>
</div>

<script src="js/sidebar.js"></script>
<script src="js/main.js"></script>