// Function to get account ID from cookie
function getAccountIdFromCookie() {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'id') { // Changed from 'accountId' to 'id' to match your cookie
            return value;
        }
    }
    return null;
}

// Format currency to VND
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount);
};

// Format date to Vietnamese format
const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
};

// Global variables to store the original data
let originalTransactions = [];

// Load and display account details from API
const loadAccountDetails = async () => {
    try {
        const accountId = getAccountIdFromCookie();
        if (!accountId) {
            throw new Error('Không tìm thấy mã tài khoản');
        }

        const response = await fetch(`http://localhost:81/saving/account/account-detail?id=${accountId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch account details');
        }
        
        const data = await response.json();
        
        if (data.code === 0 && data.result) {
            updateAccountDetails(data.result);
        } else {
            throw new Error(data.message || 'Failed to load account details');
        }
    } catch (error) {
        console.error('Error loading account details:', error);
        alert('Không thể tải thông tin tài khoản. Vui lòng thử lại sau.');
    }
};

// Update account details in the UI
const updateAccountDetails = (accountData) => {
    // Update account header
    document.querySelector('.account-number').textContent = `Số tài khoản: ${accountData.id}`;
    document.querySelector('.balance-amount .money').textContent = formatCurrency(accountData.currentBalance);

    // Update account details
    const details = document.querySelector('.account-details');
    details.innerHTML = `
        <div class="detail-item">
            <label>Chủ tài khoản:</label>
            <span>${accountData.customerName}</span>
        </div>
        <div class="detail-item">
            <label>CMND:</label>
            <span>${accountData.cmnd || 'Chưa cập nhật'}</span>
        </div>
        <div class="detail-item">
            <label>Số điện thoại:</label>
            <span>${accountData.sdt || 'Chưa cập nhật'}</span>
        </div>
        <div class="detail-item">
            <label>Địa chỉ:</label>
            <span>${accountData.address || 'Chưa cập nhật'}</span>
        </div>
    `;

    // Store original transactions and update the list
    originalTransactions = accountData.transactionResponseList || [];
    filterTransactions();
};

// Function to filter transactions
function filterTransactions() {
    const fromDate = document.getElementById('fromDate').value;
    const toDate = document.getElementById('toDate').value;
    const transactionType = document.getElementById('transactionType').value;
    
    let filteredTransactions = [...originalTransactions];
    
    // Filter by date range
    if (fromDate) {
        filteredTransactions = filteredTransactions.filter(transaction => 
            new Date(transaction.transactionDate) >= new Date(fromDate)
        );
    }
    
    if (toDate) {
        const toDateEnd = new Date(toDate);
        toDateEnd.setHours(23, 59, 59, 999);
        filteredTransactions = filteredTransactions.filter(transaction => 
            new Date(transaction.transactionDate) <= toDateEnd
        );
    }
    
    // Filter by transaction type
    if (transactionType) {
        const typeMapping = {
            'deposit': 'Gửi tiền',
            'withdraw': 'Rút tiền',
            'interest': 'Tất toán'
        };
        filteredTransactions = filteredTransactions.filter(transaction => 
            transaction.type === typeMapping[transactionType]
        );
    }
    
    updateTransactionsList(filteredTransactions);
}

// Update transactions table
const updateTransactionsList = (transactions) => {
    const tbody = document.querySelector('#transactionsList tbody');
    if (!transactions || transactions.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5" class="text-center">Không có giao dịch nào</td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = transactions.map(transaction => {
        const isDeposit = transaction.type === 'Gửi tiền' || transaction.type === 'Tất toán';
        const amountClass = isDeposit ? 'positive' : 'negative';
        const amountPrefix = isDeposit ? '+' : '-';

        const getTypeClass = (type) => {
            switch (type) {
                case 'Gửi tiền':
                    return 'deposit';
                case 'Rút tiền':
                    return 'withdraw';
                case 'Tất toán':
                    return 'interest';
                default:
                    return '';
            }
        };

        return `
            <tr>
                <td>${formatDate(transaction.transactionDate)}</td>
                <td><span class="transaction-type ${getTypeClass(transaction.type)}">${transaction.type}</span></td>
                <td class="amount ${amountClass}">${amountPrefix}${formatCurrency(Math.abs(transaction.amount))}</td>
                <td class="balance">${formatCurrency(transaction.balanceAfterTransaction)}</td>
                <td>${transaction.description || ''}</td>
            </tr>
        `;
    }).join('');
};

// Initialize account details page
document.addEventListener('DOMContentLoaded', loadAccountDetails);