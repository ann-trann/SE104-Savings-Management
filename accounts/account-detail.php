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
                    <h2>Thông tin tài khoản #KH001</h2>
                    <span class="account-number">Số tài khoản: 1234567890</span>
                </div>

                <div class="account-balance">
                    <label>Số dư hiện tại</label>
                    <span class="balance-amount"><span class="money">50000000 đ</span></span>
                </div>
            </div>
            <div class="account-actions">
                <button class="btn btn-primary" onclick="showEditModal()">
                    <i class="fas fa-edit"></i> Chỉnh sửa thông tin
                </button>
            </div>
            <div class="account-details">
                <!-- <div class="detail-item">
                    <label>Chủ tài khoản:</label>
                    <span>Nguyễn Văn A</span>
                </div>
                <div class="detail-item">
                    <label>CMND:</label>
                    <span>001301123456</span>
                </div>
                <div class="detail-item">
                    <label>Số điện thoại:</label>
                    <span>0901234567</span>
                </div>
                <div class="detail-item">
                    <label>Địa chỉ:</label>
                    <span>Hà Nội</span>
                </div> -->
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
                            <input type="text" id="accountName" class="form-control" value="Nguyễn Văn A" required>
                        </div>
                        <div class="form-group">
                            <label for="accountPhone">Số điện thoại:</label>
                            <input type="tel" id="accountPhone" class="form-control" value="0901234567" required>
                        </div>
                        <div class="form-group">
                            <label for="accountId">CCCD/CMND:</label>
                            <input type="text" id="accountId" class="form-control" value="001301123456" required>
                        </div>
                        <div class="form-group">
                            <label for="accountAddress">Địa chỉ:</label>
                            <input type="text" id="accountAddress" class="form-control" value="Hà Nội" required>
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
                        <tr>
                            <td>#PTK001</td>
                            <td class="amount"><span class="money">50000000 đ</span></td>
                            <td>6 tháng</td>
                            <td>6.8%</td>
                            <td>15/12/2024</td>
                            <td>15/06/2025</td>
                            <td><span class="status-badge active">Đang hoạt động</span></td>
                            <td>
                                <button class="btn-icon" title="Chi tiết" onclick="window.location.href='saving-detail?id=PTK001'">
                                    <i class="fas fa-eye"></i>
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>#PTK002</td>
                            <td class="amount"><span class="money">30000000 đ</span></td>
                            <td>3 tháng</td>
                            <td>6.0%</td>
                            <td>10/11/2024</td>
                            <td>10/02/2025</td>
                            <td><span class="status-badge completed">Đã tất toán</span></td>
                            <td>
                                <button class="btn-icon" title="Chi tiết" onclick="window.location.href='saving-detail?id=PTK002'">
                                    <i class="fas fa-eye"></i>
                                </button>
                            </td>
                        </tr>
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
                        <!-- <tr>
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
                        </tr> -->
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>


<script src="../js/account-detail.js"></script>