<?php 
$page = 'accounts'; 
$page_title = 'Danh sách Tài khoản';
?>

<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quản lý tài khoản - Quản lý tiết kiệm</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/sidebar.css">
</head>
<body>
    <?php include 'includes/header.php'; ?>
    <?php include 'includes/sidebar.php'; ?>
    
    <div class="main-content">
        <div class="content-header">
            <div class="header-actions">
                <!-- <h1>Quản lý tài khoản</h1> -->
                <button class="btn btn-primary" onclick="showAddAccountForm()">
                    <i class="fas fa-plus"></i> Tạo tài khoản
                </button>
            </div>
        </div>

        <div class="search-filters">
            <div class="form-group">
                <input type="text" class="form-control" placeholder="Tìm kiếm tài khoản...">
            </div>
        </div>

        <div class="card">
            <table>
                <thead>
                    <tr>
                        <th>Mã KH</th>
                        <th>Họ và tên</th>
                        <th>CCCD/CMND</th>
                        <th>Số điện thoại</th>
                        <th>Email</th>
                        <th>Địa chỉ</th>
                        <th>Số phiếu</th>
                        <th>Tổng tiền gửi</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>#KH001</td>
                        <td>Nguyễn Văn A</td>
                        <td>001301123456</td>
                        <td>0901234567</td>
                        <td>nguyenvana@email.com</td>
                        <td>Hà Nội</td>
                        <td>3</td>
                        <td>300,000,000 đ</td>
                        <td>
                            <button class="btn-icon" title="Chi tiết"><i class="fas fa-eye"></i></button>
                            <button class="btn-icon" title="Sửa"><i class="fas fa-edit"></i></button>
                            <button class="btn-icon" title="Xóa"><i class="fas fa-trash"></i></button>
                        </td>
                    </tr>
                    <tr>
                        <td>#KH002</td>
                        <td>Trần Văn B</td>
                        <td>001301123434</td>
                        <td>0901234541</td>
                        <td>tranvanb@email.com</td>
                        <td>Hồ Chí Minh</td>
                        <td>2</td>
                        <td>250,000,000 đ</td>
                        <td>
                            <button class="btn-icon" title="Chi tiết"><i class="fas fa-eye"></i></button>
                            <button class="btn-icon" title="Sửa"><i class="fas fa-edit"></i></button>
                            <button class="btn-icon" title="Xóa"><i class="fas fa-trash"></i></button>
                        </td>
                    </tr>
                    <!-- Thêm các dòng khác -->
                </tbody>
            </table>
        </div>
    </div>

    <script src="js/sidebar.js"></script>
    <script src="js/main.js"></script>
</body>
</html>

