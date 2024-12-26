<div class="header__header">
    <div class="header__content-header">
        <div class="header__header-title">
            <h1><?php echo $page_title; ?></h1>
        </div>
        <div class="header__header-profile">
            <img src="/SE104-Savings-Management/assets/user.png" alt="Profile" class="header__profile-pic">
            <div class="header__header-user-info">
                <div class="header__header-username" id="headerUsername">Trần Thúy An</div>
                <div class="header__header-role" id="headerRole">Quản lý</div>
            </div>
        </div>
    </div>
</div>

<script>
    function displayRole() {
        const selectedRole = localStorage.getItem('selectedRole');
        const headerRole = document.getElementById('headerRole');

        if (selectedRole) {
            let roleInVietnamese;
            switch (selectedRole) {
                case 'manager':
                    roleInVietnamese = 'Quản lý';
                    break;
                case 'employee':
                    roleInVietnamese = 'Nhân viên';
                    break;
                case 'customer':
                    roleInVietnamese = 'Khách hàng';
                    break;
                default:
                    roleInVietnamese = '';
            }

            headerRole.textContent = roleInVietnamese;
        } else {
            window.location.href = 'index';
        }
    }

    // Gọi hàm khi trang load
    window.onload = displayRole;
</script>