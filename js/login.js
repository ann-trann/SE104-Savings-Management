// login.js

// Function to display role and set appropriate placeholder
function displayRole() {
    const selectedRole = localStorage.getItem('selectedRole');
    const loginRoleDisplay = document.getElementById('loginRoleDisplay');
    const usernameInput = document.getElementById('username');
    
    if (selectedRole) {
        // Convert role to Vietnamese and set placeholder
        let roleInVietnamese;
        switch(selectedRole) {
            case 'manager':
                roleInVietnamese = 'Quản lý';
                usernameInput.placeholder = 'Tên đăng nhập';
                break;
            case 'employee':
                roleInVietnamese = 'Nhân viên';
                usernameInput.placeholder = 'Tên đăng nhập';
                break;
            case 'customer':
                roleInVietnamese = 'Khách hàng';
                usernameInput.placeholder = 'Số điện thoại';
                break;
            default:
                roleInVietnamese = '';
                usernameInput.placeholder = 'Tên đăng nhập';
        }
        
        loginRoleDisplay.textContent = `Đăng nhập với vai trò: ${roleInVietnamese}`;
    } else {
        // Redirect to role selection if no role is selected
        window.location.href = '/SE104-Savings-Management/';
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

// Function to set cookies with user data
function setUserCookies(userData) {
    document.cookie = `isLoggedIn=true; path=/`;
    document.cookie = `userRole=${userData.role}; path=/`;
    document.cookie = `userName=${encodeURIComponent(userData.name)}; path=/`;
    document.cookie = `minIncome=${userData.minIncome}; path=/`;
}

// Updated login function
// Updated login function
async function login(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const selectedRole = localStorage.getItem('selectedRole');
    const errorElement = document.getElementById('loginError');
    
    // Clear previous error message
    errorElement.textContent = '';
    
    // Basic validation
    if (!username || !password) {
        errorElement.textContent = 'Vui lòng nhập đầy đủ thông tin!';
        return;
    }

    const endpoint = getLoginEndpoint(selectedRole);
    if (!endpoint) {
        errorElement.textContent = 'Có lỗi xảy ra. Vui lòng thử lại!';
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

        if (data.code === 0 && data.result) {
            // Convert role to appropriate value for cookie
            let role;
            switch (data.result.role.toLowerCase()) {
                case 'admin':
                    role = 'manager';
                    break;
                case 'staff':
                    role = 'employee';
                    break;
                default:
                    role = 'customer';
            }
        
            // Store user data in cookies
            setUserCookies({ ...data.result, role });
        
            // Redirect based on role
            switch (role) {
                case 'manager':
                    window.location.href = 'dashboard';
                    break;
                case 'employee':
                    window.location.href = 'dashboard';
                    break;
                default:
                    window.location.href = 'user_account';
                    break;
            }
        } else {
            // Show error message below password field
            // errorElement.textContent = data.message || 'Sai vai trò đăng nhập!';
            errorElement.textContent = 'Vai trò hoặc Tên đăng nhập/ mật khẩu không đúng!';
        }
        
    } catch (error) {
        console.error('Login error:', error);
        errorElement.textContent = 'Có lỗi xảy ra khi đăng nhập. Vui lòng thử lại!';
    }
}