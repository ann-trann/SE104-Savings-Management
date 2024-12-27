<?php
$page = 'create-saving';
$page_title = 'Tạo Phiếu Tiết Kiệm';

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
            <button class="btn btn-secondary" onclick="window.location.href='/SE104-Savings-Management/savings'">
                <i class="fas fa-arrow-left"></i> Quay lại
            </button>
        </div>
    </div>

    <div class="card">
        <h2 class="card-header">Tạo Phiếu Tiết Kiệm Mới</h2>
        <form id="createSavingForm" onsubmit="return handleSubmit(event)">
            <div class="form-row">
                <div class="left-col">
                    <div class="form-group">
                        <label for="maTietKiem">Mã tiết kiệm</label>
                        <input type="text" id="maTietKiem" name="maTietKiem" class="form-control" 
                               disabled value="TK<?php echo time(); ?>" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="soTaiKhoan">Tìm kiếm tài khoản</label>
                        <div class="search-account">
                            <input type="text" id="searchAccount" class="form-control" 
                                   placeholder="Nhập số tài khoản cần tìm...">
                            <button type="button" class="btn btn-primary" onclick="searchAccount()">
                                <i class="fas fa-search"></i>
                            </button>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="tenKhachHang">Tên khách hàng</label>
                        <input type="text" id="tenKhachHang" class="form-control" disabled>
                    </div>

                    <div class="form-group">
                        <label for="soTienGoi">Số tiền gởi</label>
                        <input type="number" id="soTienGoi" name="soTienGoi" class="form-control" 
                               required min="1000000">
                    </div>
                </div>

                <div class="right-col">
                    <div class="form-group">
                        <label for="ngayGoi">Ngày gởi</label>
                        <input type="text" id="ngayGoi" name="ngayGoi" class="form-control" 
                               disabled value="<?php echo date('d/m/Y'); ?>" required>
                    </div>

                    <div class="form-group">
                        <label for="loaiTietKiem">Loại tiết kiệm</label>
                        <select id="loaiTietKiem" name="loaiTietKiem" class="form-control" required>
                            <option value="">Chọn loại tiết kiệm</option>
                            <option value="1">3 tháng</option>
                            <option value="2">6 tháng</option>
                            <option value="3">Không kỳ hạn</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="laiSuat">Lãi suất (%/năm)</label>
                        <input type="text" id="laiSuat" name="laiSuat" class="form-control" disabled>
                    </div>

                    <div class="form-group">
                        <label for="hinhThucGiaHan">Hình thức gia hạn</label>
                        <select id="hinhThucGiaHan" name="hinhThucGiaHan" class="form-control" required>
                            <option value="">Chọn hình thức gia hạn</option>
                            <option value="1">Tự động gia hạn gốc và lãi</option>
                            <option value="2">Tự động gia hạn gốc</option>
                            <option value="3">Không gia hạn</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="form-actions">
                <button type="submit" class="btn btn-primary">
                    <i class="fas fa-save"></i> Tạo phiếu tiết kiệm
                </button>
                <button type="button" class="btn btn-secondary" onclick="window.location.href='/SE104-Savings-Management/savings'">
                    Hủy
                </button>
            </div>
        </form>
    </div>
</div>

<script>
const interestRates = {
    1: 5,  // 3 tháng
    2: 5.5,  // 6 tháng
    3: 0.5   // 12 tháng
};

document.getElementById('loaiTietKiem').addEventListener('change', function() {
    const laiSuatInput = document.getElementById('laiSuat');
    laiSuatInput.value = interestRates[this.value] || '';
});

function searchAccount() {
    const searchTerm = document.getElementById('searchAccount').value;
    // Thực hiện AJAX call để tìm kiếm tài khoản
    fetch(`api/search-account.php?account=${searchTerm}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                document.getElementById('tenKhachHang').value = data.customerName;
            } else {
                alert('Không tìm thấy tài khoản!');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Có lỗi xảy ra khi tìm kiếm tài khoản!');
        });
}

function handleSubmit(event) {
    event.preventDefault();
    // Validation và xử lý submit form
    const formData = new FormData(document.getElementById('createSavingForm'));
    
    fetch('api/create-saving.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Tạo phiếu tiết kiệm thành công!');
            window.location.href = 'savings';
        } else {
            alert(data.message || 'Có lỗi xảy ra!');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Có lỗi xảy ra khi tạo phiếu tiết kiệm!');
    });
    
    return false;
}
</script>