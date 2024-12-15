<!DOCTYPE html>
<html lang="vi">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $page_title; ?> - Quản lý tiết kiệm</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <link rel="stylesheet" href="css/sidebar.css">
    <link rel="stylesheet" href="css/header.css">
</head>

<body>
    <div id="sidebar-container"></div>

    <div class="header-main-content">
        <div class="content-header">
            <div class="header-title">
                <h1><?php echo $page_title; ?></h1> <!-- Tên trang -->
            </div>
            <div class="header-profile">
                <img src="assets/user.png" alt="Profile" class="profile-pic" onclick="window.location.href='profile.php'">
                <div class="header-user-info">
                    <div class="header-username" id="headerUsername">Trần Thúy An</div>
                    <div class="header-role" id="headerRole">Quản lý</div>
                </div>
            </div>
        </div>
    </div>

    <script src="js/sidebar.js"></script>
</body>

</html>