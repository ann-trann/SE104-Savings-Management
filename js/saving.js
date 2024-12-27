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
    return months === null ? 'Không thời hạn' : `${months} tháng`;
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