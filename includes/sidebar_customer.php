<!-- includes/sidebar_customer.php -->
<div class="sidebar__sidebar">
    <div class="sidebar__logo">
        <h2>Quản Lý Tiết Kiệm</h2>
    </div>
    <nav class="sidebar__nav-menu">
        <ul>
            <li class="<?php echo $page == 'home' ? 'sidebar__active' : ''; ?>">
                <a href="/SE104-Savings-Management/user_account/" class="sidebar__full-link">
                    <i class="fas fa-home"></i>
                    <span>Tài khoản</span>
                </a>
            </li>

            <li class="<?php echo in_array($page, ['user-saving', 'saving-detail']) ? 'sidebar__active' : ''; ?>">
                <a href="/SE104-Savings-Management/user_saving" class="sidebar__full-link">
                    <i class="fas fa-users"></i>
                    <span>Sổ tiết kiệm</span>
                </a>
            </li>
        </ul>
    </nav>

    <div class="sidebar__nav-menu" id="logout">
        <ul>
            <li>
                <a href="/SE104-Savings-Management/index" class="sidebar__full-link">
                    <i class="fas fa-sign-out-alt"></i>
                    <span>Đăng xuất</span>
                </a>
            </li>
        </ul>
    </div>
</div>
