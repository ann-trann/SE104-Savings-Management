<?php
$page = 'savings';
$page_title = 'Phiếu tiết kiệm';

require "../includes/global.php";
?>


<?php include '../includes/header.php'; ?>
<?php include '../includes/sidebar_customer.php'; ?>


<div class="main-content">

    <div class="content-header">
        <div class="header-actions">
            <div class="search">
                <div class="form-group">
                    <input type="text" class="form-control" placeholder="Tìm kiếm phiếu tiết kiệm...">
                    <i class="fas fa-search"></i>
                </div>
            </div>


            <div class="filter-status"> Trạng thái:
                <select class="form-control">
                    <option value="">Tất cả trạng thái</option>
                    <option value="active">Đang hoạt động</option>
                    <option value="completed">Đã tất toán</option>
                </select>
            </div>
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
                        <th>Ngày tất toán</th>
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
<script src="../js/user_saving.js"></script>