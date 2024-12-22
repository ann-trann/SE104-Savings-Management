<!-- create-account.php -->
<?php
$page = 'create-account';
$page_title = 'Tạo Tài Khoản Mới';

require "../includes/global.php";

include '../includes/header.php';
include '../includes/sidebar.php';
?>

<div class="main-content">
    <div class="content-header">
        <div class="header-actions">
            <button class="btn btn-secondary" onclick="window.location.href='/SE104-Savings-Management/accounts'">
                <i class="fas fa-arrow-left"></i> Quay lại
            </button>
        </div>
    </div>
    <div class="card">
        <h2 class="card-header">Tạo Tài Khoản Mới</h2>
        <form id="createAccountForm" onsubmit="return handleSubmit(event)">
            <div class="form-row">
                <!-- Cột trái -->
                <div class="left-col">
                    <div class="form-group">
                        <label for="soTaiKhoan">Số tài khoản</label>
                        <input type="text" id="soTaiKhoan" name="soTaiKhoan" class="form-control" 
                               disabled value="" required>
                    </div>
                    <div class="form-group">
                        <label for="tenKhachHang">Họ và tên</label>
                        <input type="text" id="tenKhachHang" name="tenKhachHang" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="sdt">Số điện thoại</label>
                        <input type="tel" id="sdt" name="sdt" class="form-control" required
                               pattern="[0-9]{10}" title="Số điện thoại 10 số">
                    </div>
                    <div class="form-group">
                        <label for="soDu">Số dư ban đầu</label>
                        <input type="money" id="soDu" name="soDu" class="form-control" required min="0">
                    </div>
                </div>
                
                <!-- Cột phải -->
                <div class="right-col">
                    <div class="form-group">
                        <label for="ngayMoTK">Ngày mở tài khoản</label>
                        <input type="text" id="ngayMoTK" name="ngayMoTK" class="form-control" 
                               disabled value="" required>
                    </div>
                    <div class="form-group">
                        <label for="cmnd">CCCD/CMND</label>
                        <input type="text" id="cmnd" name="cmnd" class="form-control" required
                               pattern="[0-9]{9}|[0-9]{12}" title="CMND 9 số hoặc CCCD 12 số">
                    </div>
                    <div class="form-group">
                        <label for="diaChi">Địa chỉ</label>
                        <textarea id="diaChi" name="diaChi" class="form-control" required></textarea>
                    </div>
                </div>
            </div>
            
            <div class="form-actions">
                <button type="submit" class="btn btn-primary">
                    <i class="fas fa-save"></i> Tạo tài khoản
                </button>
                <button type="button" class="btn btn-secondary" onclick="window.location.href='/SE104-Savings-Management/accounts'">
                    Hủy
                </button>
            </div>
        </form>
    </div>
</div>

<script>
    // create-account.js
</script>