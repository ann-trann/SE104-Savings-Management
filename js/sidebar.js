// js/sidebar.js
document.addEventListener('DOMContentLoaded', function() {
    // Xử lý active menu
    const currentLocation = window.location.href;
    const menuItems = document.querySelectorAll('.sidebar__nav-menu li');
    
    menuItems.forEach(item => {
        const link = item.querySelector('a').href;
        if (currentLocation.includes(link)) {
            item.classList.add('active');
        }
    });
});


document.addEventListener("DOMContentLoaded", function() {
    var moneyElements = document.querySelectorAll('.money');
    moneyElements.forEach(function(element) {
        var value = element.textContent;
        var formattedValue = new Intl.NumberFormat('vi-VN').format(value.replace(/[^\d]/g, ''));
        element.textContent = value.replace(/\d+/, formattedValue);
    });
});