<?php
    ob_start();
    date_default_timezone_set("Asia/Ho_Chi_Minh");
    session_start();

    define("WW_ROOT","/SE104-Savings-Management/");

    // Load các functions cần thiết
    require_once __DIR__ . "/../functions/functions_login.php";
    require_once __DIR__ . "/Input.php";
    require_once __DIR__ . "/Redirect.php";
?>