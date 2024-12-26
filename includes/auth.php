<?php
// includes/auth.php
function checkAuth() {
    session_start();
    
    // Check if user is logged in
    if (!isset($_SESSION['isLoggedIn']) || $_SESSION['isLoggedIn'] !== true) {
        header('Location: login');
        exit();
    }
    
    // Check role and redirect if necessary
    $role = $_SESSION['userRole'] ?? '';
    $currentPage = basename($_SERVER['PHP_SELF']);
    
    if ($role === 'customer' && $currentPage !== 'index.php') {
        header('Location: user/index.php');
        exit();
    }
    
    return $role;
}

// includes/load_sidebar.php
function loadSidebar() {
    $role = $_SESSION['userRole'] ?? '';
    
    switch ($role) {
        case 'manager':
            include 'sidebar_manager.php';
            break;
        case 'employee':
            include 'sidebar_employee.php';
            break;
        default:
            // Handle error or redirect
            header('Location: login');
            exit();
    }
}
?>