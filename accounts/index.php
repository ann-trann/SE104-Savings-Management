<?php
$page = 'accounts';
$page_title = 'Tài khoản';

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
                <button class="btn btn-primary" onclick="window.location.replace('create-account');">
                    <i class="fas fa-plus"></i> Tạo tài khoản
                </button>
            </div>
            <div class="search">
                <div class="form-group">
                    <input type="text" class="form-control" placeholder="Tìm kiếm tài khoản...">
                    <i class="fas fa-search"></i>
                </div>
            </div>
        </div>
    </div>

    <div class="card" id="accounts-card">
        <h2 class="card-header">Danh sách tài khoản</h2>
        <div class="table-wrapper">
            <table>
                <thead>
                    <tr>
                        <th>Mã tài khoản</th>
                        <th>Họ và tên</th>
                        <th>CCCD/CMND</th>
                        <th>Số điện thoại</th>
                        <th>Email</th>
                        <th>Địa chỉ</th>
                        <th>Số phiếu</th>
                        <th>Tổng tiền gửi</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>#KH001</td>
                        <td>Nguyễn Văn A</td>
                        <td>001301123456</td>
                        <td>0901234567</td>
                        <td>nguyenvana@email.com</td>
                        <td>Hà Nội</td>
                        <td>3</td>
                        <td><span class="money">300000000 đ</span></td>
                        <td>
                            <button class="btn-icon" title="Chi tiết" onclick="window.location.href = 'account-detail';"><i class="fas fa-eye"></i></button>
                        </td>
                    </tr>
                    <tr>
                        <td>#KH002</td>
                        <td>Trần Văn B</td>
                        <td>001301123434</td>
                        <td>0901234541</td>
                        <td>tranvanb@email.com</td>
                        <td>Hồ Chí Minh</td>
                        <td>2</td>
                        <td><span class="money">250000000 đ</span></td>
                        <td>
                            <button class="btn-icon" title="Chi tiết" onclick="window.location.href = 'account-detail';"><i class="fas fa-eye"></i></button>
                        </td>
                    </tr>
                    <!-- Thêm các dòng khác -->
                </tbody>
            </table>
        </div>
    </div>
</div>

<script src="../js/sidebar.js"></script>
<script src="../js/accounts.js"></script>