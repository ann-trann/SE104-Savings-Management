const interestRates = {
    1: 5,  // 3 tháng
    2: 5.5,  // 6 tháng
    3: 0.5   // Không kỳ hạn
};

document.getElementById('loaiTietKiem').addEventListener('change', function() {
    const laiSuatInput = document.getElementById('laiSuat');
    const hinhThucGiaHan = document.getElementById('hinhThucGiaHan');
    
    // Set lãi suất
    laiSuatInput.value = interestRates[this.value] || '';
    
    // Xử lý hình thức gia hạn
    if (this.value === '3') { // Không kỳ hạn
        hinhThucGiaHan.value = '1'; // Tự động chọn gia hạn gốc và lãi
        hinhThucGiaHan.disabled = true;
    } else {
        hinhThucGiaHan.disabled = false;
        // Nếu muốn giữ giá trị đã chọn trước đó, bỏ dòng dưới
        hinhThucGiaHan.value = '';
    }
});

function searchAccount() {
    const searchTerm = document.getElementById('searchAccount').value;
    fetch(`api/search-account.php?account=${searchTerm}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                document.getElementById('tenKhachHang').value = data.customerName;
            } else {
                alert('Không tìm thấy tài khoản!');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Có lỗi xảy ra khi tìm kiếm tài khoản!');
        });
}

function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(document.getElementById('createSavingForm'));
    
    fetch('api/create-saving.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Tạo phiếu tiết kiệm thành công!');
            window.location.href = 'savings';
        } else {
            alert(data.message || 'Có lỗi xảy ra!');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Có lỗi xảy ra khi tạo phiếu tiết kiệm!');
    });
    
    return false;
}