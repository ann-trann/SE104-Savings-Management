<?php
$page = 'saving-detail';
$page_title = 'Chi Tiết Phiếu Tiết Kiệm';

require "../includes/global.php";
?>


<?php include '../includes/header.php'; ?>
<?php include '../includes/sidebar_customer.php'; ?>


<div class="main-content">
    <div class="content-header">
        <div class="header-actions">
            <button class="btn btn-secondary" onclick="window.location.href='/SE104-Savings-Management/user_saving'">
                <i class="fas fa-arrow-left"></i> Quay lại
            </button>
        </div>
    </div>


    <div class="saving-detail__card">
        <div class="saving-detail__card-header-container">
            <h2 class="card-header">Chi Tiết Phiếu Tiết Kiệm</h2>
        </div>

        <!-- Phần detail-content -->
        <div class="detail-content">
            <!-- Thông tin chi tiết -->
            <div class="detail-section">
                <div class="detail-row">
                    <div class="detail-group">
                        <label>Mã phiếu:</label>
                        <span></span>
                    </div>
                    <div class="detail-group">
                        <label>Số tài khoản:</label>
                        <span></span>
                    </div>
                </div>

                <div class="detail-row">
                    <div class="detail-group">
                        <label>Tên khách hàng:</label>
                        <span></span>
                    </div>
                    <div class="detail-group">
                        <label>Tiền gửi tiết kiệm:</label>
                        <span class="money"></span>
                    </div>
                </div>

                <div class="detail-row">
                    <div class="detail-group">
                        <label>Kỳ hạn:</label>
                        <span></span>
                    </div>
                    <div class="detail-group">
                        <label>Số tiền hiện tại:</label>
                        <span class="money"></span>
                    </div>
                </div>

                <div class="detail-row">
                    <div class="detail-group">
                        <label>Ngày gửi:</label>
                        <span></span>
                    </div>
                    <div class="detail-group">
                        <label>Lãi suất:</label>
                        <span class="interest-rate"></span>
                    </div>
                </div>

                <div class="detail-row">
                    <div class="detail-group">
                        <label>Trạng thái:</label>
                        <span class="status active">Đang hoạt động</span>
                    </div>
                    <div class="detail-group">
                        <label>Ngày đáo hạn:</label>
                        <span></span>
                    </div>
                </div>


                <div class="detail-row">
                    <div class="detail-group">
                        <label>Hình thức gia hạn:</label>
                        <span class="expend-type"></span>
                    </div>
                </div>
            </div>

            <!-- Lịch sử giao dịch -->
            <div class="transaction-section">
                <h3>Lịch sử giao dịch</h3>
                <table class="transaction-table">
                    <thead>
                        <tr>
                            <th>Ngày giao dịch</th>
                            <th>Loại giao dịch</th>
                            <th>Số tiền</th>
                            <th>Số dư sau GD</th>
                        </tr>
                    </thead>
                    <tbody>

                        <!-- Thêm các giao dịch khác nếu có -->
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>

<script src="../js/user_saving-detail.js"></script>