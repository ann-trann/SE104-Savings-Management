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


//-------------------------------------------------------------//

// Tách hàm format tiền tệ ra riêng để có thể tái sử dụng
function formatMoney() {
    var moneyElements = document.querySelectorAll('.money');
    moneyElements.forEach(function(element) {
        var value = element.textContent;
        // Chỉ lấy số từ chuỗi và bỏ qua các ký tự khác
        var number = parseInt(value.replace(/[^\d]/g, ''));
        // Format số theo định dạng tiền tệ Việt Nam
        var formattedValue = new Intl.NumberFormat('vi-VN').format(number);
        // Thêm đơn vị tiền tệ vào sau số đã format
        element.textContent = formattedValue + ' đ';
    });
}

// Chạy khi trang được tải
document.addEventListener("DOMContentLoaded", function() {
    formatMoney();
});

// Thêm vào cuối file để có thể gọi từ các trang khác
window.formatMoney = formatMoney;



//-------------------------------------------------------------//

document.addEventListener("DOMContentLoaded", function() {
    const moneyInputs = document.querySelectorAll('input[type="money"]');
    
    moneyInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            // Lưu vị trí con trỏ
            const cursorPosition = this.selectionStart;
            
            // Lấy chỉ số từ input, loại bỏ tất cả ký tự không phải số
            let value = this.value.replace(/[^\d]/g, '');
            
            if (!value) {
                this.value = '';
                return;
            }

            // Chuyển thành số và format
            value = parseInt(value);
            const formattedValue = new Intl.NumberFormat('vi-VN').format(value);
            
            // Tính toán vị trí con trỏ mới
            const addedSeparators = formattedValue.length - value.toString().length;
            const newPosition = cursorPosition + addedSeparators;
            
            // Cập nhật giá trị và vị trí con trỏ
            this.value = formattedValue;
            
            // Đặt lại vị trí con trỏ
            if (cursorPosition <= this.value.length) {
                this.setSelectionRange(newPosition, newPosition);
            }
        });
    });

    // Xử lý cho input type="number"
    const numberInputs = document.querySelectorAll('input[type="number"][id*="soTien"], input[type="number"][id*="amount"], input[type="number"][id*="soDu"], input[type="number"][id*="withdrawAmount"], input[type="number"][id*="minDeposit"]');
    
    numberInputs.forEach(input => {
        const formattedSpan = document.createElement('span');
        formattedSpan.className = 'formatted-currency';
        formattedSpan.style.marginLeft = '10px';
        formattedSpan.style.color = '#666';
        input.parentNode.insertBefore(formattedSpan, input.nextSibling);

        input.addEventListener('input', function() {
            const value = this.value ? parseInt(this.value) : 0;
            formattedSpan.textContent = value ? `(${new Intl.NumberFormat('vi-VN').format(value)} đ)` : '';
        });
    });
});



//-------------------------------------------------------------//

