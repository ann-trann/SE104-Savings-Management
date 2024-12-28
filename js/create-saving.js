function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

let currentSavingNumber = null;
let savingTypes = [];
let isSavingCreated = false;

// Constants
const API_BASE_URL = 'http://localhost:81/saving';

// Initialize form on load
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/savings/fill-in-form`);
        const data = await response.json();
        
        if (data.code === 0 && data.result) {
            // Set saving number
            currentSavingNumber = data.result.bookId;
            document.getElementById('maTietKiem').value = currentSavingNumber;
            
            // Populate saving types
            savingTypes = data.result.savingTypeResponses;
            const selectElement = document.getElementById('loaiTietKiem');
            
            // Clear existing options except the first one
            while (selectElement.options.length > 1) {
                selectElement.remove(1);
            }
            
            // Add new options
            savingTypes.forEach(type => {
                const option = document.createElement('option');
                option.value = type.savingId;
                option.textContent = type.savingName;
                selectElement.appendChild(option);
            });
        }
    } catch (error) {
        console.error('Error initializing form:', error);
    }
    
    document.querySelector('.search-account button').addEventListener('click', searchAccount);
});


// Modify the DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Get minimum amount from cookie
        const minAmount = parseInt(getCookie('minIncome')) || 1000000;
        const soTienGoiInput = document.getElementById('soTienGoi');
        
        // Set minimum amount
        soTienGoiInput.min = minAmount;
        soTienGoiInput.addEventListener('input', function() {
            if (parseInt(this.value) < minAmount) {
                this.setCustomValidity(`Số tiền gởi tối thiểu là ${minAmount.toLocaleString('vi-VN')} VNĐ`);
            } else {
                this.setCustomValidity('');
            }
        });

        const response = await fetch(`${API_BASE_URL}/savings/fill-in-form`);
        const data = await response.json();
        
        // Rest of your existing initialization code...
        if (data.code === 0 && data.result) {
            currentSavingNumber = data.result.bookId;
            document.getElementById('maTietKiem').value = currentSavingNumber;
            
            savingTypes = data.result.savingTypeResponses;
            const selectElement = document.getElementById('loaiTietKiem');
            
            while (selectElement.options.length > 1) {
                selectElement.remove(1);
            }
            
            savingTypes.forEach(type => {
                const option = document.createElement('option');
                option.value = type.savingId;
                option.textContent = type.savingName;
                selectElement.appendChild(option);
            });
        }
    } catch (error) {
        console.error('Error initializing form:', error);
    }
    
    document.querySelector('.search-account button').addEventListener('click', searchAccount);
});



document.getElementById('loaiTietKiem').addEventListener('change', function() {
    const selectedType = savingTypes.find(type => type.savingId == this.value);
    const laiSuatInput = document.getElementById('laiSuat');
    const hinhThucGiaHan = document.getElementById('hinhThucGiaHan');
    
    if (selectedType) {
        laiSuatInput.value = (selectedType.interestRate * 100).toFixed(1);
    } else {
        laiSuatInput.value = '';
    }
    
    if (this.value == 3) {
        hinhThucGiaHan.value = '1';
        hinhThucGiaHan.disabled = true;
    } else {
        hinhThucGiaHan.disabled = false;
        hinhThucGiaHan.value = '';
    }
});


async function searchAccount() {
    const accountId = document.getElementById('searchAccount').value;
    if (!accountId) {
        alert('Vui lòng nhập số tài khoản!');
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/savings/customer?id=${accountId}`);
        const data = await response.json();
        
        if (data.code === 0 && data.result) {
            document.getElementById('tenKhachHang').value = data.result;
        } else {
            alert('Không tìm thấy tài khoản!');
            document.getElementById('tenKhachHang').value = '';
        }
    } catch (error) {
        console.error('Error searching account:', error);
        alert('Có lỗi xảy ra khi tìm kiếm tài khoản!');
    }
}


// Handle form submission
async function handleSubmit(event) {
    event.preventDefault();
    const form = document.getElementById('createSavingForm');
    
    if (!form.checkValidity()) {
        form.reportValidity();
        return false;
    }

    const request = {
        id: currentSavingNumber,
        accountId: parseInt(document.getElementById('searchAccount').value),
        sendDate: new Date().toISOString().split('T')[0],
        deposit: parseFloat(document.getElementById('soTienGoi').value),
        savingId: parseInt(document.getElementById('loaiTietKiem').value),
        extendId: parseInt(document.getElementById('hinhThucGiaHan').value),
        interestRate: parseFloat(document.getElementById('laiSuat').value)
    };

    try {
        const response = await fetch(`${API_BASE_URL}/savings/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        });
        
        const data = await response.json();
        if (data.code === 0) {
            isSavingCreated = true;
            alert('Tạo phiếu tiết kiệm thành công!');
            window.location.href = '/SE104-Savings-Management/savings';
        } else {
            alert(data.message || 'Có lỗi xảy ra!');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Có lỗi xảy ra khi tạo phiếu tiết kiệm!');
    }
    
    return false;
}

async function dropSavingUntilSuccess() {
    if (!currentSavingNumber || isSavingCreated) return true;

    while (true) {
        try {
            const response = await fetch(`${API_BASE_URL}/savings/drop?id=${currentSavingNumber}`, {
                method: 'PATCH'
            });
            
            if (response.status === 200) return true;
            await new Promise(resolve => setTimeout(resolve, 100));
        } catch (error) {
            console.error('Error dropping saving:', error);
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    }
}

async function handleNavigation(targetUrl) {
    const success = await dropSavingUntilSuccess();
    if (success) window.location.href = targetUrl;
}

document.querySelectorAll('button[onclick*="window.location.href"]').forEach(button => {
    const originalHref = button.onclick.toString().match(/['"]([^'"]*)['"]/)[1];
    button.onclick = null;
    button.addEventListener('click', async (e) => {
        e.preventDefault();
        await handleNavigation(originalHref);
    });
});

window.addEventListener('popstate', async function(e) {
    e.preventDefault();
    const success = await dropSavingUntilSuccess();
    if (success) history.back();
});

window.addEventListener('beforeunload', function(e) {
    if (currentSavingNumber && !isSavingCreated) {
        e.preventDefault();
        e.returnValue = '';
    }
});