// Format currency to VND
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount);
};

// Format date to local string
const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
};

// Load and display accounts from API
const loadAccounts = async () => {
    try {
        const response = await fetch('http://localhost:81/saving/account/accounts');
        if (!response.ok) {
            throw new Error('Failed to fetch account data');
        }
        const data = await response.json();
        
        if (data.code === 0 && Array.isArray(data.result)) {
            displayAccounts(data.result);
        } else {
            throw new Error(data.message || 'Failed to load account data');
        }
    } catch (error) {
        console.error('Error loading accounts:', error);
        document.querySelector('tbody').innerHTML = `
            <tr>
                <td colspan="9" class="text-center">Error loading account data</td>
            </tr>
        `;
    }
};

// Display accounts in table
const displayAccounts = (accounts) => {
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = accounts.map(account => `
        <tr>
            <td>${account.id}</td>
            <td>${account.customerName}</td>
            <td>${account.cmnd}</td>
            <td>${account.sdt}</td>
            <td>${account.address}</td>
            <td>${account.numberOfBook}</td>
            <td><span class="money">${formatCurrency(account.depositTotal)}</span></td>
            <td>
                <button class="btn-icon" title="Chi tiết" 
                    onclick="window.location.href = 'account-detail?id=${account.id}';">
                    <i class="fas fa-eye"></i>
                </button>
            </td>
        </tr>
    `).join('');
};

// Search functionality
// Cập nhật hàm setupSearch để hỗ trợ tìm kiếm theo nhiều trường
const setupSearch = () => {
    let searchTimeout;
    const searchInput = document.querySelector('.search input');
    const searchIcon = document.querySelector('.search .fa-search');
    
    const performSearch = async (searchTerm) => {
        try {
            const response = await fetch('http://localhost:81/saving/account/accounts');
            if (!response.ok) {
                throw new Error('Failed to fetch account data');
            }
            
            const data = await response.json();
            
            if (data.code === 0 && Array.isArray(data.result)) {
                // Tìm kiếm case-insensitive
                searchTerm = searchTerm.toLowerCase().trim();
                
                const filteredAccounts = data.result.filter(account => {
                    return (
                        account.customerName.toLowerCase().includes(searchTerm) ||
                        account.id.toString().toLowerCase().includes(searchTerm) ||
                        (account.cmnd && account.cmnd.toLowerCase().includes(searchTerm)) ||
                        (account.sdt && account.sdt.toLowerCase().includes(searchTerm)) ||
                        (account.address && account.address.toLowerCase().includes(searchTerm))
                    );
                });
                
                // Hiển thị kết quả
                if (filteredAccounts.length > 0) {
                    displayAccounts(filteredAccounts);
                } else {
                    // Hiển thị thông báo không tìm thấy
                    document.querySelector('tbody').innerHTML = `
                        <tr>
                            <td colspan="8" class="text-center" style="padding: 20px;">
                                Không tìm thấy tài khoản phù hợp
                            </td>
                        </tr>
                    `;
                }
            }
        } catch (error) {
            console.error('Error during search:', error);
            document.querySelector('tbody').innerHTML = `
                <tr>
                    <td colspan="8" class="text-center" style="padding: 20px;">
                        Đã xảy ra lỗi khi tìm kiếm. Vui lòng thử lại sau.
                    </td>
                </tr>
            `;
        }
    };

    // Xử lý sự kiện khi nhập
    searchInput.addEventListener('input', (e) => {
        // Clear timeout cũ
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }
        
        const searchTerm = e.target.value;
        
        // Đặt timeout mới để debounce
        searchTimeout = setTimeout(() => {
            performSearch(searchTerm);
        }, 300);
    });

    // Xử lý sự kiện khi nhấn Enter
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            performSearch(e.target.value);
        }
    });

    // Xử lý sự kiện khi click vào icon search
    searchIcon.addEventListener('click', () => {
        performSearch(searchInput.value);
    });
};

// Khởi tạo search khi trang được load
document.addEventListener('DOMContentLoaded', () => {
    console.log('Account management loaded');
    loadAccounts();
    setupSearch();
});