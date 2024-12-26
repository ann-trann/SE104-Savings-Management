<?php
$page = 'account-detail';
$page_title = 'Chi Tiết Tài Khoản';

require "../includes/global.php";

// Lấy mã tài khoản từ URL parameter
$accountId = isset($_GET['id']) ? $_GET['id'] : '';

// TODO: Thực hiện query để lấy thông tin tài khoản và lịch sử giao dịch
?>

<?php include '../includes/header.php'; ?>
<?php include '../includes/sidebar_customer.php'; ?>

<div class="main-content">
    <div class="content-header">
        <div class="header-actions">
            <button class="btn btn-secondary" onclick="window.location.href='/SE104-Savings-Management/accounts'">
                <i class="fas fa-arrow-left"></i> Quay lại
            </button>
        </div>
    </div>

    <div class="account-overview">
        <div class="account-info-card">
            <div class="account-header">
                <div class="account-title">
                    <h2>Thông tin tài khoản #KH001</h2>
                    <span class="account-number">Số tài khoản: 1234567890</span>
                </div>
                <div class="account-balance">
                    <label>Số dư hiện tại</label>
                    <span class="balance-amount"><span class="money">50000000 đ<span class="money"></span>
                </div>
            </div>
            <div class="account-details">
                <div class="detail-item">
                    <label>Chủ tài khoản:</label>
                    <span>Nguyễn Văn A</span>
                </div>
                <div class="detail-item">
                    <label>CCCD/CMND:</label>
                    <span>001301123456</span>
                </div>
                <div class="detail-item">
                    <label>Số điện thoại:</label>
                    <span>0901234567</span>
                </div>
                <div class="detail-item">
                    <label>Email:</label>
                    <span>nguyenvana@email.com</span>
                </div>
                <div class="detail-item">
                    <label>Địa chỉ:</label>
                    <span>Hà Nội</span>
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
                        <option value="interest">Nhận lãi</option>
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
                        <tr>
                            <td>20/12/2024</td>
                            <td><span class="transaction-type deposit">Gửi tiền</span></td>
                            <td class="amount positive">+20,000,000 đ</td>
                            <td class="balance">50,000,000 đ</td>
                            <td>Nộp tiền mặt</td>
                        </tr>
                        <tr>
                            <td>19/12/2024</td>
                            <td><span class="transaction-type interest">Nhận lãi</span></td>
                            <td class="amount positive">+500,000 đ</td>
                            <td class="balance">30,000,000 đ</td>
                            <td>Lãi từ STK #PTK001</td>
                        </tr>
                        <tr>
                            <td>18/12/2024</td>
                            <td><span class="transaction-type withdraw">Rút tiền</span></td>
                            <td class="amount negative">-5,000,000 đ</td>
                            <td class="balance">29,500,000 đ</td>
                            <td>Rút tiền mặt</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>

<script>
    function filterTransactions() {
        const fromDate = document.getElementById('fromDate').value;
        const toDate = document.getElementById('toDate').value;
        const transactionType = document.getElementById('transactionType').value;

        // TODO: Implement filtering logic
        console.log('Filtering transactions:', {
            fromDate,
            toDate,
            transactionType
        });
    }
</script>