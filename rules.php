<?php
$page = 'rules';
$page_title = 'Thay đổi quy định';

require "includes/global.php";
require_once "includes/auth.php";
$userRole = checkAuth();

include 'includes/header.php';

// Load sidebar dựa theo role
loadSidebar();
?>

<div class="main-content">
    <div class="card" id="rules-card">
        <h2 class="card-header">Thay đổi quy định</h2>

        <form id="rulesForm" class="rules-form">
            <div class="rules-section">
                <h3>Quy định về số tiền</h3>
                <div class="form-group">
                    <label for="minDeposit">Số tiền gửi tối thiểu:</label>
                    <div class="input-group">
                        <input type="number" id="minDeposit" class="form-control" value="1000000">
                        <span class="input-group-text">VNĐ</span>
                    </div>
                </div>
            </div>

            <div class="rules-section">
                <h3>Quản lý loại tiết kiệm</h3>
                <div class="savings-types">
                    <div class="savings-type">
                        <div class="saving-types__form-group">
                            <label>Kỳ hạn:</label>
                            <input type="text" class="form-control" value="3 tháng" readonly>
                        </div>
                        <div class="saving-types__form-group">
                            <label>Số ngày:</label>
                            <input type="number" class="form-control" value="90" min="1">
                        </div>
                        <div class="saving-types__form-group">
                            <label>Lãi suất (%):</label>
                            <input type="number" class="form-control" value="5.5" step="0.1">
                        </div>
                        <button type="button" class="btn-icon delete-type" title="Xóa">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>

                    <div class="savings-type">
                        <div class="saving-types__form-group">
                            <label>Kỳ hạn:</label>
                            <input type="text" class="form-control" value="6 tháng" readonly>
                        </div>
                        <div class="saving-types__form-group">
                            <label>Số ngày:</label>
                            <input type="number" class="form-control" value="180" min="1">
                        </div>
                        <div class="saving-types__form-group">
                            <label>Lãi suất (%):</label>
                            <input type="number" class="form-control" value="6.0" step="0.1">
                        </div>
                        <button type="button" class="btn-icon delete-type" title="Xóa">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>

                <button type="button" class="btn btn-secondary" id="addSavingsType">
                    <i class="fas fa-plus"></i> Thêm loại tiết kiệm
                </button>
            </div>

            <div class="rules-section">
                <h3>Hình thức gia hạn</h3>
                <div class="form-group">
                    <div class="checkbox-group">
                        <div class="checkbox-option">
                            <input type="checkbox" id="renewPrincipal" name="renewalTypes" value="principal">
                            <label for="renewPrincipal">Tự động gia hạn gốc</label>
                        </div>
                        <div class="checkbox-option">
                            <input type="checkbox" id="renewPrincipalAndInterest" name="renewalTypes" value="principalAndInterest">
                            <label for="renewPrincipalAndInterest">Tự động gia hạn gốc và lãi</label>
                        </div>
                        <div class="checkbox-option">
                            <input type="checkbox" id="closeOnMaturity" name="renewalTypes" value="close">
                            <label for="closeOnMaturity">Tất toán khi đến hạn</label>
                        </div>
                    </div>
                </div>
            </div>

            <div class="form-actions">
                <button type="submit" class="btn btn-primary">Lưu thay đổi</button>
                <button type="button" class="btn btn-secondary" onclick="resetForm()">Đặt lại</button>
            </div>
        </form>
    </div>
</div>


<!-- Add at the bottom of rules.php -->
<script src="./js/rules.js"></script>