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

// Get term type display
const getTermType = (months) => {
    return months === 0 ? 'Không thời hạn' : `${months} tháng`;
};

// Determine saving status
const getSavingStatus = (saving) => {
    const now = new Date();
    const maturityDate = new Date(saving.dueDate);
    
    // Check if balance is 0 or maturity date has passed
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
        const response = await fetch('http://localhost:81/saving/savings/');
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        
        if (data.code === 0 && Array.isArray(data.result)) {
            displaySavings(data.result);
            setupFilters(data.result);
        } else {
            throw new Error(data.message || 'Failed to load savings data');
        }
    } catch (error) {
        console.error('Error loading data:', error);
        document.querySelector('tbody').innerHTML = `
            <tr>
                <td colspan="9" class="text-center">Error loading savings data</td>
            </tr>
        `;
    }
};

// Display savings in table
const displaySavings = (savings) => {
    const tbody = document.querySelector('tbody');
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
    const fromDate = document.querySelector('#from-date');
    const toDate = document.querySelector('#to-date');
    const searchInput = document.querySelector('.search input');
    const resetDateBtn = document.querySelector('#reset-date');

    const applyFilters = () => {
        let filteredSavings = [...originalSavings];

        // Status filter
        if (statusSelect.value) {
            filteredSavings = filteredSavings.filter(saving => {
                const savingStatus = getSavingStatus(saving);
                return statusSelect.value === savingStatus.status;
            });
        }

        // Date range filter
        if (fromDate.value) {
            const fromDateTime = new Date(fromDate.value).getTime();
            filteredSavings = filteredSavings.filter(saving => 
                new Date(saving.openDate).getTime() >= fromDateTime
            );
        }
        if (toDate.value) {
            const toDateTime = new Date(toDate.value).getTime();
            filteredSavings = filteredSavings.filter(saving => 
                new Date(saving.openDate).getTime() <= toDateTime
            );
        }

        // Search filter
        const searchTerm = searchInput.value.toLowerCase();
        if (searchTerm) {
            filteredSavings = filteredSavings.filter(saving => 
                saving.customerName.toLowerCase().includes(searchTerm) ||
                saving.id.toString().includes(searchTerm)
            );
        }

        displaySavings(filteredSavings);
    };

    // Reset date function
    const resetDates = () => {
        fromDate.value = '';
        toDate.value = '';
        applyFilters();
    };

    // Add event listeners
    statusSelect.addEventListener('change', applyFilters);
    fromDate.addEventListener('change', applyFilters);
    toDate.addEventListener('change', applyFilters);
    searchInput.addEventListener('input', applyFilters);
    resetDateBtn.addEventListener('click', resetDates);
};

// Initialize
document.addEventListener('DOMContentLoaded', loadSavings);     







// Thêm vào file saving.js

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search .form-control');
    const tableBody = document.querySelector('table tbody');
    
    // Hàm tìm kiếm
    function performSearch(searchTerm) {
        // Lấy tất cả các hàng trong bảng
        const rows = tableBody.querySelectorAll('tr');
        
        searchTerm = searchTerm.toLowerCase().trim();
        
        rows.forEach(row => {
            // Lấy cột tên khách hàng (cột thứ 2)
            const customerName = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
            
            // Kiểm tra nếu tên khách hàng chứa từ khóa tìm kiếm
            if (customerName.includes(searchTerm)) {
                row.style.display = ''; // Hiển thị hàng
            } else {
                row.style.display = 'none'; // Ẩn hàng
            }
        });
    }
    
    // Xử lý sự kiện khi nhấn Enter
    searchInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            performSearch(this.value);
        }
    });
    
    // Thêm xử lý khi click vào icon search
    const searchIcon = document.querySelector('.search .fas.fa-search');
    searchIcon.addEventListener('click', function() {
        performSearch(searchInput.value);
    });
    
    // Thêm placeholder nếu không có kết quả
    function updateNoResultsMessage() {
        const visibleRows = tableBody.querySelectorAll('tr[style="display: "]').length;
        let noResultsRow = tableBody.querySelector('.no-results');
        
        if (visibleRows === 0) {
            if (!noResultsRow) {
                noResultsRow = document.createElement('tr');
                noResultsRow.className = 'no-results';
                noResultsRow.innerHTML = `
                    <td colspan="9" style="text-align: center; padding: 20px;">
                        Không tìm thấy kết quả phù hợp
                    </td>
                `;
                tableBody.appendChild(noResultsRow);
            }
        } else if (noResultsRow) {
            noResultsRow.remove();
        }
    }
    
    // Cập nhật hàm performSearch để thêm thông báo
    const originalPerformSearch = performSearch;
    performSearch = function(searchTerm) {
        originalPerformSearch(searchTerm);
        updateNoResultsMessage();
    };
});