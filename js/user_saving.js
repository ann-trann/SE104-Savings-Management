// Format currency to VND
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount);
};

// Format date to Vietnamese format
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
};

// Get user name from cookie
function getUserNameFromCookie() {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'userName') {
            return decodeURIComponent(value); // Decode the URL-encoded name
        }
    }
    return null;
}

// Get term type display
const getTermType = (months) => {
    return months === 0 ? 'Không thời hạn' : `${months} tháng`;
};

// Determine saving status
const getSavingStatus = (saving) => {
    if (saving.remainingAmount === 0) {
        return {
            status: 'completed',
            text: 'Đã tất toán'
        };
    }
    
    return {
        status: 'active',
        text: 'Đang hoạt động'
    };
};

// Load and display savings accounts
const loadSavings = async () => {
    try {
        const userName = getUserNameFromCookie();
        if (!userName) {
            throw new Error('Không tìm thấy thông tin người dùng');
        }

        const response = await fetch('http://localhost:81/saving/savings/');
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        
        if (data.code === 0 && Array.isArray(data.result)) {
            // Filter savings for current user by matching customer name
            const userSavings = data.result.filter(saving => 
                saving.customerName.toLowerCase() === userName.toLowerCase()
            );
            displaySavings(userSavings);
            setupFilters(userSavings);
        } else {
            throw new Error(data.message || 'Failed to load savings data');
        }
    } catch (error) {
        console.error('Error loading data:', error);
        document.querySelector('tbody').innerHTML = `
            <tr>
                <td colspan="9" class="text-center">Không thể tải dữ liệu phiếu tiết kiệm</td>
            </tr>
        `;
    }
};

// Display savings in table
const displaySavings = (savings) => {
    const tbody = document.querySelector('tbody');
    if (!savings || savings.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="9" class="text-center">Không có phiếu tiết kiệm nào</td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = savings.map(saving => {
        const savingStatus = getSavingStatus(saving);

        return `
            <tr>
                <td>${saving.id}</td>
                <td>${saving.customerName}</td>
                <td><span class="money">${formatCurrency(saving.initialBalance)}</span></td>
                <td>${getTermType(saving.term)}</td>
                <td>${saving.interestRate}%</td>
                <td>${formatDate(saving.openDate)}</td>
                <td>${formatDate(saving.dueDate)}</td>
                <td><span class="status ${savingStatus.status}">${savingStatus.text}</span></td>
                <td>
                    <button class="btn-icon" title="Chi tiết" 
                        onclick="window.location.href = 'saving-detail?id=${saving.id}';">
                        <i class="fas fa-eye"></i>
                    </button>
                </td>
            </tr>
        `;
    }).join('');
};

// Setup filters
const setupFilters = (originalSavings) => {
    const statusSelect = document.querySelector('.filter-status select');
    const searchInput = document.querySelector('.search input');

    const applyFilters = () => {
        let filteredSavings = [...originalSavings];

        // Status filter
        if (statusSelect.value) {
            filteredSavings = filteredSavings.filter(saving => {
                const savingStatus = getSavingStatus(saving);
                return statusSelect.value === savingStatus.status;
            });
        }

        // Search filter
        const searchTerm = searchInput.value.toLowerCase().trim();
        if (searchTerm) {
            filteredSavings = filteredSavings.filter(saving => 
                saving.id.toString().includes(searchTerm)
            );
        }

        displaySavings(filteredSavings);
    };

    // Add event listeners
    statusSelect.addEventListener('change', applyFilters);
    
    // Search functionality
    searchInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            applyFilters();
        }
    });

    const searchIcon = document.querySelector('.search .fas.fa-search');
    searchIcon.addEventListener('click', applyFilters);
};

// Initialize
document.addEventListener('DOMContentLoaded', loadSavings);