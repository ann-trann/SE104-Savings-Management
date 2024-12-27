// Store the account number when it's fetched
let currentAccountNumber = null;
let isAccountCreated = false;

// Modify the existing DOMContentLoaded event handler
document.addEventListener('DOMContentLoaded', async function() {
    try {
        const response = await fetch('http://localhost:81/saving/account/fill-in-information');
        const data = await response.json();
        
        if (data.code === 0 && data.result) {
            currentAccountNumber = data.result;
            document.getElementById('soTaiKhoan').value = currentAccountNumber;
        } else {
            alert('Không thể lấy số tài khoản. Vui lòng thử lại sau.');
        }
    } catch (error) {
        console.error('Error fetching account number:', error);
        alert('Có lỗi xảy ra khi lấy số tài khoản. Vui lòng thử lại sau.');
    }

    // Set current date for account opening
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    document.getElementById('ngayMoTK').value = formattedDate;
});

// Toggle password visibility
document.querySelectorAll('.toggle-password').forEach(icon => {
    icon.addEventListener('click', function() {
        const input = this.previousElementSibling;
        if (input.type === 'password') {
            input.type = 'text';
            this.classList.remove('fa-eye-slash');
            this.classList.add('fa-eye');
        } else {
            input.type = 'password';
            this.classList.remove('fa-eye');
            this.classList.add('fa-eye-slash');
        }
    });
});

// Handle form submission
async function handleSubmit(event) {
    event.preventDefault();

    // Validate passwords match
    const password = document.getElementById('matKhau').value;
    const confirmPassword = document.getElementById('xacNhanMatKhau').value;
    
    if (password !== confirmPassword) {
        alert('Mật khẩu xác nhận không khớp!');
        return false;
    }

    // Validate all required fields are filled
    const form = document.getElementById('createAccountForm');
    if (!form.checkValidity()) {
        form.reportValidity();
        return false;
    }

    // Prepare request data
    const requestData = {
        id: parseInt(document.getElementById('soTaiKhoan').value),
        name: document.getElementById('tenKhachHang').value,
        sdt: document.getElementById('sdt').value,
        initialBalance: parseFloat(document.getElementById('soDu').value),
        sentDate: document.getElementById('ngayMoTK').value,
        cccd: document.getElementById('cmnd').value,
        address: document.getElementById('diaChi').value,
        password: password
    };

    try {
        const response = await fetch('http://localhost:81/saving/account/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });

        const data = await response.json();

        if (data.code === 0) {
            isAccountCreated = true; // Set flag on successful creation
            alert('Tạo tài khoản thành công!');
            window.location.href = '/SE104-Savings-Management/accounts';
        } else {
            if (data.code === 'USER_EXISTED') {
                alert('Số điện thoại hoặc CMND tồn tại trong hệ thống!');
            } else {
                alert('Có lỗi xảy ra khi tạo tài khoản: ' + (data.message || 'Vui lòng thử lại sau'));
            }
        }
    } catch (error) {
        console.error('Error creating account:', error);
        alert('Có lỗi xảy ra khi tạo tài khoản. Vui lòng thử lại sau.');
    }
}

// Function to attempt dropping account until success
async function dropAccountUntilSuccess() {
    if (!currentAccountNumber || isAccountCreated) {
        return true; // No need to drop if no account or already created successfully
    }

    while (true) {
        try {
            const response = await fetch(`http://localhost:81/saving/account/drop?id=${currentAccountNumber}`, {
                method: 'PATCH'
            });
            
            if (response.status === 200) {
                return true; // Success
            }
            
            // Wait 100ms before retrying
            await new Promise(resolve => setTimeout(resolve, 100));
        } catch (error) {
            console.error('Error dropping account:', error);
            // Continue retrying even on error
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    }
}

// Function to handle navigation after successful drop
async function handleNavigation(targetUrl) {
    const success = await dropAccountUntilSuccess();
    if (success) {
        window.location.href = targetUrl;
    }
}

// Handle navigation buttons
document.querySelectorAll('button[onclick*="window.location.href"]').forEach(button => {
    const originalHref = button.onclick.toString().match(/['"]([^'"]*)['"]/)[1];
    button.onclick = null; // Remove inline onclick
    button.addEventListener('click', async (e) => {
        e.preventDefault();
        await handleNavigation(originalHref);
    });
});

// Handle back button and other navigation
window.addEventListener('popstate', async function(e) {
    e.preventDefault();
    const success = await dropAccountUntilSuccess();
    if (success) {
        history.back();
    }
});

// Handle clicks on any links within the page
document.addEventListener('click', async function(e) {
    const link = e.target.closest('a');
    if (link) {
        e.preventDefault();
        await handleNavigation(link.href);
    }
});

// Handle page unload
window.addEventListener('beforeunload', function(e) {
    if (currentAccountNumber && !isAccountCreated) {
        e.preventDefault();
        e.returnValue = '';
    }
});