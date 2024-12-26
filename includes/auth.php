<?php
// includes/auth.php
session_start();

function checkAuth() {
    if (!isset($_SESSION['isLoggedIn']) || $_SESSION['isLoggedIn'] !== true) {
        if (isset($_COOKIE['isLoggedIn']) && $_COOKIE['isLoggedIn'] === 'true') {
            $_SESSION['isLoggedIn'] = true;
            $_SESSION['userRole'] = $_COOKIE['userRole'];
        } else {
            header('Location: login');
            exit();
        }
    }
    
    $role = $_SESSION['userRole'] ?? '';
    
    if ($role === 'customer') {
        header('Location: user_account');
        exit();
    }
    
    return $role;
}

function loadSidebar() {
    $role = $_SESSION['userRole'] ?? '';
    
    switch ($role) {
        case 'employee':
            include 'includes/sidebar_employee.php';
            break;
        case 'manager':
            include 'includes/sidebar_manager.php';
            break;
        default:
            header('Location: login');
            exit();
    }
}


function loadSidebar2() {
    $role = $_SESSION['userRole'] ?? '';
    
    switch ($role) {
        case 'employee':
            include '../includes/sidebar_employee.php';
            break;
        case 'manager':
            include '../includes/sidebar_manager.php';
            break;
        default:
            header('Location: login');
            exit();
    }
}
