<!-- includes/sidebar.php -->
<div class="sidebar">
    <div class="logo">
        <h2>Quản Lý Tiết Kiệm</h2>
    </div>
    <nav class="nav-menu">
        <ul>
            <li class="<?php echo $page == 'home' ? 'active' : ''; ?>">
                <a href="dashboard.php" class="full-link">
                    <i class="fas fa-home"></i>
                    <span>Trang chủ</span>
                </a>
            </li>
            <li class="<?php echo $page == 'accounts' ? 'active' : ''; ?>">
                <a href="accounts.php" class="full-link">
                    <i class="fas fa-users"></i>
                    <span>Tài khoản</span>
                </a>
            </li>
            <li class="<?php echo $page == 'savings' ? 'active' : ''; ?>">
                <a href="savings.php" class="full-link">
                    <i class="fas fa-piggy-bank"></i>
                    <span>Phiếu tiết kiệm</span>
                </a>
            </li>
            <li class="<?php echo $page == 'reports' ? 'active' : ''; ?>">
                <a href="reports.php" class="full-link">
                    <i class="fas fa-chart-line"></i>
                    <span>Báo cáo doanh số</span>
                </a>
            </li>
        </ul>



    </nav>

    <div class="nav-menu" id="logout">
        <ul>
            <li>
                <a href="login.php" class="full-link">
                    <i class="fas fa-sign-out-alt"></i>
                    <span>Đăng xuất</span>
                </a>
            </li>
        </ul>
    </div>
</div>