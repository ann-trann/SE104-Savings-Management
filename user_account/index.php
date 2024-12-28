<?php
$page = 'account-detail';
$page_title = 'Chi Tiết Tài Khoản';

require "../includes/global.php";
?>

<?php include '../includes/header.php'; ?>
<?php include '../includes/sidebar_customer.php'; ?>

<div class="main-content">
    <div class="account-overview">
        <div class="account-info-card">
            <div class="account-header">
                <div class="account-title">
                    <h2>Thông tin tài khoản</h2>
                    <span class="account-number">Số tài khoản: </span>
                </div>
                <div class="account-balance">
                    <label>Số dư hiện tại</label>
                    <span class="balance-amount"><span class="money"><span class="money"></span>
                </div>
            </div>
            <div class="account-details">
                <div class="detail-item">
                    <label>Chủ tài khoản:</label>
                    <span></span>
                </div>
                <div class="detail-item">
                    <label>CMND:</label>
                    <span></span>
                </div>
                <div class="detail-item">
                    <label>Số điện thoại:</label>
                    <span></span>
                </div>
                <div class="detail-item">
                    <label>Địa chỉ:</label>
                    <span></span>
                </div>
            </div>
        </div>
    </div>

    
    <div class="card transaction-card">
        <div class="card-header-container">
            <h2 class="card-header">Lịch sử giao dịch</h2>
            <div class="transaction-filter">
                <div class="form-group">
                    <label>Từ ngày:</label>
                    <input type="date" class="form-control" id="fromDate">
                </div>
                <div class="form-group">
                    <label>Đến ngày:</label>
                    <input type="date" class="form-control" id="toDate">
                </div>
                <div class="form-group">
                    <label>Loại giao dịch:</label>
                    <select class="form-control" id="transactionType">
                        <option value="">Tất cả</option>
                        <option value="deposit">Gửi tiền</option>
                        <option value="withdraw">Rút tiền</option>
                        <option value="interest">Tất toán</option>
                    </select>
                </div>
                <button class="btn btn-primary" onclick="filterTransactions()">
                    <i class="fas fa-filter"></i> Lọc
                </button>
            </div>
        </div>

        <div class="transaction-list">
            <div class="table-wrapper" id="transactionsList">
                <table>
                    <thead>
                        <tr>
                            <th>Ngày giao dịch</th>
                            <th>Loại giao dịch</th>
                            <th>Số tiền</th>
                            <th>Số dư sau GD</th>
                            <th>Nội dung</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>


<script src="../js/user_account-detail.js"></script>