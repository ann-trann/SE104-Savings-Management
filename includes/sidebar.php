<!-- includes/sidebar.php -->
<div class="sidebar__sidebar">
    <div class="sidebar__logo">
        <h2>Quản Lý Tiết Kiệm</h2>
    </div>
    <nav class="sidebar__nav-menu">
        <ul>
            <li class="<?php echo $page == 'home' ? 'sidebar__active' : ''; ?>">
                <a href="dashboard" class="sidebar__full-link">
                    <i class="fas fa-home"></i>
                    <span>Trang chủ</span>
                </a>
            </li>
            <li class="<?php echo $page == 'accounts' ? 'sidebar__active' : ''; ?>">
                <a href="accounts" class="sidebar__full-link">
                    <i class="fas fa-users"></i>
                    <span>Tài khoản</span>
                </a>
            </li>
            <li class="<?php echo $page == 'savings' ? 'sidebar__active' : ''; ?>">
                <a href="savings" class="sidebar__full-link">
                    <i class="fas fa-piggy-bank"></i>
                    <span>Phiếu tiết kiệm</span>
                </a>
            </li>
            <li class="<?php echo $page == 'reports' ? 'sidebar__active' : ''; ?>">
                <a href="reports" class="sidebar__full-link">
                    <i class="fas fa-chart-line"></i>
                    <span>Báo cáo doanh số</span>
                </a>
            </li>
        </ul>
    </nav>

    <div class="sidebar__nav-menu" id="logout">
        <ul>
            <li>
                <a href="login" class="sidebar__full-link">
                    <i class="fas fa-sign-out-alt"></i>
                    <span>Đăng xuất</span>
                </a>
            </li>
        </ul>
    </div>
</div>
