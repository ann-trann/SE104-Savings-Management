// login.js

// Function to capitalize first letter
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Function to display role when page loads
function displayRole() {
    const selectedRole = localStorage.getItem('selectedRole');
    const loginRoleDisplay = document.getElementById('loginRoleDisplay');
    
    if (selectedRole) {
        // Convert role to Vietnamese
        let roleInVietnamese;
        switch(selectedRole) {
            case 'manager':
                roleInVietnamese = 'Quản lý';
                break;
            case 'employee':
                roleInVietnamese = 'Nhân viên';
                break;
            case 'customer':
                roleInVietnamese = 'Khách hàng';
                break;
            default:
                roleInVietnamese = '';
        }
        
        loginRoleDisplay.textContent = `Đăng nhập với vai trò: ${roleInVietnamese}`;
    } else {
        // Redirect to role selection if no role is selected
        window.location.href = 'index';
    }
}

// Call displayRole when page loads
document.addEventListener('DOMContentLoaded', displayRole);

function login(event) {
    event.preventDefault();
    
    const phoneNumber = document.getElementById('phone-number').value.trim();
    const password = document.getElementById('password').value.trim();
    const selectedRole = localStorage.getItem('selectedRole');
    
    // Basic validation
    if (!phoneNumber || !password) {
        alert('Vui lòng nhập đầy đủ thông tin!');
        return;
    }
    
    // In a real application, you would validate credentials against a backend
    // For now, we'll simulate a successful login
    
    // Store login information
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userRole', selectedRole);
    
    // Redirect based on role
    switch (selectedRole) {
        case 'customer':
            window.location.href = 'user_account';
            break;
        case 'employee':
        case 'manager':
            window.location.href = 'dashboard';
            break;
        default:
            alert('Có lỗi xảy ra. Vui lòng thử lại!');
            break;
    }
}