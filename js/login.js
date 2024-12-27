// login.js

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

// Function to get API endpoint based on role
function getLoginEndpoint(role) {
    const baseUrl = 'http://localhost:81/saving/login';
    switch(role) {
        case 'manager':
            return `${baseUrl}/admin`;
        case 'employee':
            return `${baseUrl}/staff`;
        case 'customer':
            return `${baseUrl}/customer`;
        default:
            return null;
    }
}

// Login function with API integration
async function login(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const selectedRole = localStorage.getItem('selectedRole');
    
    // Basic validation
    if (!username || !password) {
        alert('Vui lòng nhập đầy đủ thông tin!');
        return;
    }

    const endpoint = getLoginEndpoint(selectedRole);
    if (!endpoint) {
        alert('Có lỗi xảy ra. Vui lòng thử lại!');
        return;
    }

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        });

        const data = await response.json();

        if (data.result === true) {
            // Login successful
            document.cookie = `isLoggedIn=true; path=/`;
            document.cookie = `userRole=${selectedRole}; path=/`;
            
            // Redirect based on role
            switch (selectedRole) {
                case 'customer':
                    window.location.href = 'user_account';
                    break;
                case 'employee':
                case 'manager':
                    window.location.href = 'dashboard';
                    break;
            }
        } else {
            // Show error message
            alert(data.message || 'Đăng nhập không thành công. Vui lòng thử lại!');
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('Có lỗi xảy ra khi đăng nhập. Vui lòng thử lại!');
    }
}