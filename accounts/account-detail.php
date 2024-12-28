<?php
$page = 'account-detail';
$page_title = 'Chi Tiết Tài Khoản';

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

    <div class="account-overview">
        <div class="account-info-card">
            <div class="account-header">
                <div class="account-title">
                    <h2>Thông tin tài khoản</h2>
                    <span class="account-number">Số tài khoản:</span>
                </div>

                <div class="account-balance">
                    <label>Số dư hiện tại</label>
                    <span class="balance-amount"><span class="money"></span></span>
                </div>
            </div>
            <div class="account-actions">
                <button class="btn btn-primary" onclick="showEditModal()">
                    <i class="fas fa-edit"></i> Chỉnh sửa thông tin
                </button>
            </div>
            <div class="account-details">
            </div>

            <!-- Modal Chỉnh sửa thông tin -->
            <div id="editModal" class="modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Chỉnh sửa thông tin tài khoản</h3>
                        <span class="close" onclick="closeEditModal()">&times;</span>
                    </div>
                    <form id="editAccountForm" onsubmit="return handleEdit(event)">
                        <div class="form-group">
                            <label for="accountName">Họ và tên:</label>
                            <input type="text" id="accountName" class="form-control" value="" required>
                        </div>
                        <div class="form-group">
                            <label for="accountPhone">Số điện thoại:</label>
                            <input type="tel" id="accountPhone" class="form-control" value="" required>
                        </div>
                        <div class="form-group">
                            <label for="accountAddress">Địa chỉ:</label>
                            <input type="text" id="accountAddress" class="form-control" value="" required>
                        </div>
                        <div class="modal-actions">
                            <button type="submit" class="btn btn-primary">Cập nhật</button>
                            <button type="button" class="btn btn-secondary" onclick="closeEditModal()">Hủy</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    </div>

    <div class="card savings-card">
        <div class="card-header-container">
            <h2 class="card-header">Danh sách phiếu tiết kiệm</h2>
            <div class="savings-filter">
                <label>Trạng thái:</label>
                <div class="form-group">
                    <select class="form-control" id="savingStatus">
                        <option value="">Tất cả</option>
                        <option value="active">Đang hoạt động</option>
                        <option value="completed">Đã tất toán</option>
                    </select>
                    <button class="btn btn-primary" onclick="filterSavings()">
                        <i class="fas fa-filter"></i> Lọc
                    </button>
                </div>
            </div>
        </div>

        <div class="savings-list">
            <div class="table-wrapper" id="savingsList">
                <table>
                    <thead>
                        <tr>
                            <th>Mã phiếu</th>
                            <th>Số tiền gửi</th>
                            <th>Kỳ hạn</th>
                            <th>Lãi suất</th>
                            <th>Ngày mở</th>
                            <th>Ngày đến hạn</th>
                            <th>Trạng thái</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
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


<script src="../js/account-detail.js"></script>