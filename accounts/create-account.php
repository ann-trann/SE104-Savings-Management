<!-- create-account.php -->
<?php
$page = 'create-account';
$page_title = 'Tạo Tài Khoản Mới';

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
                        <label for="diaChi">Địa chỉ</label>
                        <textarea id="diaChi" name="diaChi" class="form-control" required></textarea>
                    </div>
                </div>

                <!-- Cột phải -->
                <div class="right-col">
                    <div class="form-group">
                        <label for="cmnd">CMND</label>
                        <input type="text" id="cmnd" name="cmnd" class="form-control" required
                            pattern="[0-9]{12}" title="CMND 12 số">
                    </div>
                    <div class="form-group">
                        <label for="ngayMoTK">Ngày mở tài khoản</label>
                        <input type="text" id="ngayMoTK" name="ngayMoTK" class="form-control"
                            disabled value="" required>
                    </div>
                    <div class="form-group">
                        <label for="soDu">Số dư ban đầu</label>
                        <input type="number" id="soDu" name="soDu" class="form-control" required min="0">
                    </div>
                    <div class="form-group">
                        <label for="matKhau">Mật khẩu</label>
                        <div class="password-input">
                            <input type="password" id="matKhau" name="matKhau" class="form-control" required
                                minlength="8" title="Mật khẩu phải có ít nhất 8 ký tự">
                            <i class="fas fa-eye-slash toggle-password"></i>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="xacNhanMatKhau">Xác nhận mật khẩu</label>
                        <div class="password-input">
                            <input type="password" id="xacNhanMatKhau" name="xacNhanMatKhau" class="form-control" required>
                            <i class="fas fa-eye-slash toggle-password"></i>
                        </div>
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

<script src="../js/create-account.js"></script>
