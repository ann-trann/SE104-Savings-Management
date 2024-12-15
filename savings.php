<?php 
$page = 'savings'; 
$page_title = 'Danh sách Phiếu tiết kiệm';
?>

<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Phiếu tiết kiệm - Quản lý tiết kiệm</title>
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
                <!-- <h1>Quản lý phiếu tiết kiệm</h1> -->
                <button class="btn btn-primary" onclick="showAddSavingForm()">
                    <i class="fas fa-plus"></i> Thêm phiếu mới
                </button>
            </div>
        </div>

        <div class="search-filters">
            <div class="form-group">
                <input type="text" class="form-control" placeholder="Tìm kiếm phiếu tiết kiệm...">
            </div>
            <div class="filter-group">
                <select class="form-control">
                    <option value="">Tất cả trạng thái</option>
                    <option value="active">Đang hoạt động</option>
                    <option value="completed">Đã tất toán</option>
                </select>
                <input type="date" class="form-control" placeholder="Từ ngày">
                <input type="date" class="form-control" placeholder="Đến ngày">
            </div>
        </div>

        <div class="card">
            <table>
                <thead>
                    <tr>
                        <th>Mã phiếu</th>
                        <th>Khách hàng</th>
                        <th>Số tiền gửi</th>
                        <th>Kỳ hạn</th>
                        <th>Lãi suất</th>
                        <th>Ngày gửi</th>
                        <th>Ngày đáo hạn</th>
                        <th>Trạng thái</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>#PTK001</td>
                        <td>Nguyễn Văn A</td>
                        <td>100,000,000 đ</td>
                        <td>6 tháng</td>
                        <td>6.8%</td>
                        <td>15/12/2024</td>
                        <td>15/06/2025</td>
                        <td><span class="status active">Đang hoạt động</span></td>
                        <td>
                            <button class="btn-icon" title="Chi tiết"><i class="fas fa-eye"></i></button>
                            <button class="btn-icon" title="Sửa"><i class="fas fa-edit"></i></button>
                            <button class="btn-icon" title="Tất toán"><i class="fas fa-check-circle"></i></button>
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