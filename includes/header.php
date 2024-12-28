<div class="header__header">
    <div class="header__content-header">
        <div class="header__header-title">
            <h1><?php echo $page_title; ?></h1>
        </div>
        <div class="header__header-profile">
            <img src="/SE104-Savings-Management/assets/user.png" alt="Profile" class="header__profile-pic">
            <div class="header__header-user-info">
                <div class="header__header-username" id="headerUsername"></div>
                <div class="header__header-role" id="headerRole"></div>
            </div>
        </div>
    </div>
</div>

<script>
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    function displayUserInfo() {
        const headerUsername = document.getElementById('headerUsername');
        const headerRole = document.getElementById('headerRole');
        
        // Get and decode username from cookie
        const userName = decodeURIComponent(getCookie('userName'));
        const userRole = getCookie('userRole');
        
        // Set username
        if (userName) {
            headerUsername.textContent = userName;
        }
        
        // Convert role to Vietnamese and set it
        if (userRole) {
            let roleInVietnamese;
            switch (userRole.toLowerCase()) {
                case 'manager':
                    roleInVietnamese = 'Quản lý';
                    break;
                case 'employee':
                    roleInVietnamese = 'Nhân viên';
                    break;
                default:
                    roleInVietnamese = 'Khách hàng';
            }
            headerRole.textContent = roleInVietnamese;
        }
    }

    // Call function when page loads
    window.onload = displayUserInfo;
</script>