<?php
// Đảm bảo functions.php được include
require_once "functions/functions.php";

// Kiểm tra WW_ROOT đã được định nghĩa chưa
if (!defined('WW_ROOT')) {
    // Thay đổi thành đường dẫn tương đối đến thư mục gốc của project
    define('WW_ROOT', '/SE104-Savings-Management/'); // Ví dụ: nếu project nằm trong thư mục quanlytiemkiem
}
?>

<!DOCTYPE html>
<html lang="vi">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $page_title; ?> - Quản lý tiết kiệm</title>
    <link rel="shortcut icon" href="<?= url_for('assets/favicon/savings.svg'); ?>" type="image/svg+xml">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <link rel="stylesheet" href="<?= url_for('css/master.css'); ?>">
    
    <script src="<?= url_for('js/sidebar.js'); ?>" defer></script>
</head>

<body></body>