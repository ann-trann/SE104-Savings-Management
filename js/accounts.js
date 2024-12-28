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
const setupSearch = () => {
    let searchTimeout;
    const searchInput = document.querySelector('.search input');
    
    searchInput.addEventListener('input', async (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        // Clear existing timeout
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }
        
        // Set new timeout for API call
        searchTimeout = setTimeout(async () => {
            try {
                const response = await fetch('http://localhost:81/saving/account/accounts');
                if (!response.ok) {
                    throw new Error('Failed to fetch account data');
                }
                
                const data = await response.json();
                
                if (data.code === 0 && Array.isArray(data.result)) {
                    const filteredAccounts = data.result.filter(account => 
                        account.customerName.toLowerCase().includes(searchTerm) ||
                        account.id.toString().includes(searchTerm) ||
                        account.cccd.includes(searchTerm) ||
                        account.sdt.includes(searchTerm)
                    );
                    
                    displayAccounts(filteredAccounts);
                }
            } catch (error) {
                console.error('Error during search:', error);
            }
        }, 300); // Debounce time of 300ms
    });
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('Account management loaded');
    loadAccounts();
    setupSearch();
});