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
                    <tr>
                        <td>PTK001</td>
                        <td>Nguyễn Văn A</td>
                        <td><span class="money">100000000 đ</span></td>
                        <td>6 tháng</td>
                        <td>5.0%</td>
                        <td>15/12/2024</td>
                        <td>15/06/2025</td>
                        <td><span class="status active">Đang hoạt động</span></td>
                        <td>
                            <button class="btn-icon" title="Chi tiết" onclick="window.location.href = 'saving-detail';"><i class="fas fa-eye"></i></button>
                        </td>
                    </tr>
                    <tr>
                        <td>PTK002</td>
                        <td>Nguyễn Văn A</td>
                        <td><span class="money">100000000 đ</span></td>
                        <td>3 tháng</td>
                        <td>5.5%</td>
                        <td>15/12/2024</td>
                        <td>15/06/2025</td>
                        <td><span class="status completed">Đã tất toán</span></td>
                        <td>
                            <button class="btn-icon" title="Chi tiết" onclick="window.location.href = 'saving-detail';"><i class="fas fa-eye"></i></button>
                        </td>
                    </tr>
                    <!-- Thêm các dòng khác -->
                </tbody>
            </table>
        </div>
    </div>
</div>

<script src="../js/sidebar.js"></script>