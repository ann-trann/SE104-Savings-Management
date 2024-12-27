<?php
$page = 'saving-detail';
$page_title = 'Chi Tiết Phiếu Tiết Kiệm';

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


    <div class="saving-detail__card">
        <div class="saving-detail__card-header-container">
            <h2 class="card-header">Chi Tiết Phiếu Tiết Kiệm</h2>
            <div class="card-actions">
                <button class="btn btn-warning" onclick="showWithdrawModal()">
                    <i class="fas fa-money-bill-wave"></i> Rút tiền
                </button>
                <button class="btn btn-danger" onclick="showSettlementModal()">
                    <i class="fas fa-check-circle"></i> Tất toán
                </button>
            </div>
        </div>

        <!-- Modal Rút tiền -->
        <div id="withdrawModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Rút tiền tiết kiệm</h3>
                    <span class="close">&times;</span>
                </div>
                <form id="withdrawForm" onsubmit="return handleWithdraw(event)">
                    <div class="form-group">
                        <label for="savingId">Mã sổ tiết kiệm:</label>
                        <input type="text" id="savingId" class="form-control" value="#PTK001" readonly>
                    </div>
                    <div class="form-group">
                        <label for="withdrawDate">Ngày rút tiền:</label>
                        <input type="date" id="withdrawDate" name="withdrawDate" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="withdrawAmount">Số tiền rút:</label>
                        <input type="number" id="withdrawAmount" name="withdrawAmount" class="form-control" required>
                    </div>
                    <div class="modal-actions">
                        <button type="submit" class="btn btn-primary">Xác nhận</button>
                        <button type="button" class="btn btn-secondary" onclick="closeWithdrawModal()">Hủy</button>
                    </div>
                </form>
            </div>
        </div>

        <!-- Modal Tất toán -->
        <div id="settlementModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Tất toán sổ tiết kiệm</h3>
                    <span class="close">&times;</span>
                </div>
                <div class="form-group">
                    <label for="savingIdSettlement">Mã sổ tiết kiệm:</label>
                    <input type="text" id="savingIdSettlement" class="form-control" value="#PTK001" readonly>
                </div>
                <div class="form-group">
                    <label for="settlementDate">Ngày tất toán:</label>
                    <input type="date" id="settlementDate" name="settlementDate" class="form-control" required>
                </div>
                <div class="settlement-info">
                    <div class="info-row">
                        <label>Số tiền gốc:</label>
                        <span class="money">100000000 đ</span>
                    </div>
                    <div class="info-row">
                        <label>Tiền lãi:</label>
                        <span class="money interest">3400000 đ</span>
                    </div>
                    <div class="info-row total">
                        <label>Tổng tiền:</label>
                        <span class="money">103400000 đ</span>
                    </div>
                </div>
                <form id="settlementForm" onsubmit="return handleSettlement(event)">
                    <div class="modal-actions">
                        <button type="submit" class="btn btn-primary">Xác nhận tất toán</button>
                        <button type="button" class="btn btn-secondary" onclick="closeSettlementModal()">Hủy</button>
                    </div>
                </form>
            </div>
        </div>

        <!-- Phần detail-content -->
        <div class="detail-content">
            <!-- Thông tin chi tiết -->
            <div class="detail-section">
                <div class="detail-row">
                    <div class="detail-group">
                        <label>Mã phiếu:</label>
                        <span>#PTK001</span>
                    </div>
                    <div class="detail-group">
                        <label>Số tài khoản:</label>
                        <span>1234567890</span>
                    </div>
                </div>

                <div class="detail-row">
                    <div class="detail-group">
                        <label>Tên khách hàng:</label>
                        <span>Nguyễn Văn A</span>
                    </div>
                    <div class="detail-group">
                        <label>Số tiền tiết kiệm:</label>
                        <span class="money">100000000 đ</span>
                    </div>
                </div>

                <div class="detail-row">
                    <div class="detail-group">
                        <label>Kỳ hạn:</label>
                        <span>6 tháng</span>
                    </div>
                    <div class="detail-group">
                        <label>Lãi suất:</label>
                        <span class="interest-rate">6.8%</span>
                    </div>
                </div>

                <div class="detail-row">
                    <div class="detail-group">
                        <label>Ngày gửi:</label>
                        <span>15/12/2024</span>
                    </div>
                    <div class="detail-group">
                        <label>Ngày tất toán:</label>
                        <span>15/06/2025</span>
                    </div>
                </div>

                <div class="detail-row">
                    <div class="detail-group">
                        <label>Trạng thái:</label>
                        <span class="status active">Đang hoạt động</span>
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
                            <th>Ghi chú</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>15/12/2024</td>
                            <td>Gửi tiền</td>
                            <td class="money">+100000000 đ</td>
                            <td class="money">100000000 đ</td>
                            <td>Gửi tiền lần đầu</td>
                        </tr>

                        <!-- Thêm các giao dịch khác nếu có -->
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>


<script>
    // Xử lý modal rút tiền
    function showWithdrawModal() {
        document.getElementById('withdrawModal').style.display = 'block';
    }

    function closeWithdrawModal() {
        document.getElementById('withdrawModal').style.display = 'none';
    }

    // Xử lý modal tất toán
    function showSettlementModal() {
        document.getElementById('settlementModal').style.display = 'block';
    }

    function closeSettlementModal() {
        document.getElementById('settlementModal').style.display = 'none';
    }

    // Đóng modal khi click nút X
    document.querySelectorAll('.close').forEach(function(element) {
        element.onclick = function() {
            this.closest('.modal').style.display = 'none';
        }
    });

    // Đóng modal khi click bên ngoài
    window.onclick = function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    }

    function handleWithdraw(event) {
        event.preventDefault();
        // Xử lý logic rút tiền ở đây
        closeWithdrawModal();
        return false;
    }

    function handleSettlement(event) {
        event.preventDefault();
        // Xử lý logic tất toán ở đây
        closeSettlementModal();
        return false;
    }
</script>