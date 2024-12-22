<?php 
    function url_for($script){
        $script = ltrim($script, '/');
        $url = WW_ROOT . $script;
        // Debug: In ra URL được tạo
        error_log("Generated URL: " . $url);
        return $url;
    }
?>