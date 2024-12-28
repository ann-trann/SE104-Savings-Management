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
                        <input type="number" id="minDeposit" class="form-control" value="0">
                        <span class="input-group-text">VNĐ</span>
                    </div>
                </div>
            </div>

            <div class="rules-section">
                <h3>Quản lý loại tiết kiệm</h3>
                <div class="savings-types">
                    <!-- Savings types will be listed here -->
                </div>

                <button type="button" class="btn btn-secondary" id="addSavingsType">
                    <i class="fas fa-plus"></i> Thêm loại tiết kiệm
                </button>
            </div>

            <div class="form-actions">
                <button type="submit" class="btn btn-primary">Lưu thay đổi</button>
                <button type="button" class="btn btn-secondary" onclick="resetForm()">Đặt lại</button>
            </div>
        </form>
    </div>
</div>

<!-- Modal for changes confirmation -->
<div id="changesModal" class="modal">
    <div class="rule-modal-content">
        <div class="modal-header">
            <h3>Xác nhận thay đổi</h3>
            <button type="button" class="close-modal">&times;</button>
        </div>
        <div class="modal-body">
            <div id="changesList">
                <!-- Changes will be listed here -->
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-primary" id="confirmChanges">Xác nhận</button>
            <button type="button" class="btn btn-secondary" id="cancelChanges">Hủy</button>
        </div>
    </div>
</div>

<!-- Add at the bottom of rules.php -->
<script src="./js/rules.js"></script>