//=======================================================
// Edit account info

function showEditModal() {
    // Get current account details from the page
    const customerName = document.querySelector('.account-details .detail-item:nth-child(1) span').textContent;
    const phone = document.querySelector('.account-details .detail-item:nth-child(3) span').textContent;
    const address = document.querySelector('.account-details .detail-item:nth-child(4) span').textContent;

    // Populate form fields
    document.getElementById('accountName').value = customerName;
    document.getElementById('accountPhone').value = phone === 'Chưa cập nhật' ? '' : phone;
    document.getElementById('accountAddress').value = address === 'Chưa cập nhật' ? '' : address;

    // Show modal
    document.getElementById('editModal').style.display = 'block';
}

function closeEditModal() {
    document.getElementById('editModal').style.display = 'none';
}


// Update handleEdit function to send update request
async function handleEdit(event) {
    event.preventDefault();
    
    // Get account ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const accountId = urlParams.get('id');
    
    // Get form values
    const name = document.getElementById('accountName').value;
    const phone = document.getElementById('accountPhone').value;
    const address = document.getElementById('accountAddress').value;
    
    try {
        const response = await fetch(`http://localhost:81/saving/account/update?id=${accountId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sdt: phone,
                name: name,
                address: address
            })
        });

        const data = await response.json();
        
        if (data.code === 0) {
            // Update was successful
            // Reload account details to show updated information
            loadAccountDetails(accountId);
            closeEditModal();
        } else {
            // Handle specific error codes
            if (data.code === 'USER_EXISTED') {
                alert('Số điện thoại đã được sử dụng cho tài khoản khác');
            } else {
                throw new Error(data.message || 'Cập nhật thông tin thất bại');
            }
        }
    } catch (error) {
        console.error('Error updating account:', error);
        alert('Có lỗi xảy ra khi cập nhật thông tin. Vui lòng thử lại sau.');
    }
}

// Đóng modal khi click bên ngoài
window.onclick = function(event) {
    const modal = document.getElementById('editModal');
    if (event.target == modal) {
        closeEditModal();
    }
}


//=======================================================

// Global variables to store the original data
let originalSavingsBooks = [];
let originalTransactions = [];



// Function to filter savings books
function filterSavings() {
    const status = document.getElementById('savingStatus').value;
    
    let filteredBooks = [...originalSavingsBooks];
    
    if (status) {
        filteredBooks = filteredBooks.filter(book => {
            if (status === 'active') {
                return book.remainingAmount > 0;
            } else if (status === 'completed') {
                return book.remainingAmount <= 0;
            }
            return true;
        });
    }
    
    // Reuse existing table update logic
    const tbody = document.querySelector('#savingsList tbody');
    if (!filteredBooks || filteredBooks.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="8" class="text-center">Không có phiếu tiết kiệm nào</td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = filteredBooks.map(book => `
        <tr>
            <td>${book.id}</td>
            <td class="amount"><span class="money">${formatCurrency(book.initialBalance)}</span></td>
            <td>${book.term} tháng</td>
            <td>${book.interestRate}%</td>
            <td>${formatDate(book.openDate)}</td>
            <td>${formatDate(book.dueDate)}</td>
            <td>
                <span class="status-badge ${book.remainingAmount > 0 ? 'active' : 'completed'}">
                    ${book.remainingAmount > 0 ? 'Đang hoạt động' : 'Đã tất toán'}
                </span>
            </td>
            <td>
                <button class="btn-icon" title="Chi tiết" onclick="window.location.href='saving-detail?id=${book.id}'">
                    <i class="fas fa-eye"></i>
                </button>
            </td>
        </tr>
    `).join('');
}


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
        filteredTransactions = filteredTransactions.filter(transaction => 
            new Date(transaction.transactionDate) <= new Date(toDate)
        );
    }
    
    // Filter by transaction type
    if (transactionType) {
        filteredTransactions = filteredTransactions.filter(transaction => 
            transaction.type === {
                'deposit': 'Gửi tiền',
                'withdraw': 'Rút tiền',
                'interest': 'Tất toán'
            }[transactionType]
        );
    }
    
    // Reuse existing table update logic
    const tbody = document.querySelector('#transactionsList tbody');
    if (!filteredTransactions || filteredTransactions.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5" class="text-center">Không có giao dịch nào</td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = filteredTransactions.map(transaction => {
        const isDeposit = transaction.type === 'Gửi tiền' || transaction.type === 'Nhận lãi';
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
}


//=======================================================

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

// Load and display account details from API
const loadAccountDetails = async (accountId) => {
    try {
        const response = await fetch(`http://localhost:81/saving/account/account-detail?id=${accountId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch account details');
        }
        const data = await response.json();
        
        if (data.code === 0 && data.result) {
            console.log('Account details:', data.result);
            updateAccountDetails(data.result);
        } else {
            throw new Error(data.message || 'Failed to load account details');
        }
    } catch (error) {
        console.error('Error loading account details:', error);
        // Show error message to user
        displayErrorMessage('Không thể tải thông tin tài khoản. Vui lòng thử lại sau.');
    }
};

// Update account details in the UI
const updateAccountDetails = (accountData) => {
    // Existing code for account header and details...
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

    // Update savings books list
    updateSavingsBooksList(accountData.savingBookResponseList);
    
    // Update transactions list
    updateTransactionsList(accountData.transactionResponseList);
};

// Update transactions table
const updateTransactionsList = (transactions) => {
    originalTransactions = transactions || []; // Store original data
    filterTransactions(); // Apply any existing filters


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
        // Determine amount class based on transaction type
        const isDeposit = transaction.type === 'Gửi tiền';
        const amountClass = isDeposit ? 'positive' : 'negative';
        const amountPrefix = isDeposit ? '+' : '-';

        // Get transaction type class
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

        console.log('Transaction:', transaction);

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

// Update savings books table
const updateSavingsBooksList = (savingsBooks) => {
    originalSavingsBooks = savingsBooks || []; // Store original data
    filterSavings(); // Apply any existing filters

    const tbody = document.querySelector('#savingsList tbody');
    if (!savingsBooks || savingsBooks.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="8" class="text-center">Không có phiếu tiết kiệm nào</td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = savingsBooks.map(book => `
        <tr>
            <td>${book.id}</td>
            <td class="amount"><span class="money">${formatCurrency(book.initialBalance)}</span></td>
            <td>${book.term} tháng</td>
            <td>${book.interestRate}%</td>
            <td>${formatDate(book.openDate)}</td>
            <td>${formatDate(book.dueDate)}</td>
            <td>
                <span class="status-badge ${book.remainingAmount > 0 ? 'active' : 'completed'}">
                    ${book.remainingAmount > 0 ? 'Đang hoạt động' : 'Đã tất toán'}
                </span>
            </td>
            <td>
                <button class="btn-icon" title="Chi tiết" onclick="window.location.href='saving-detail?id=${book.id}'">
                    <i class="fas fa-eye"></i>
                </button>
            </td>
        </tr>
    `).join('');
};

// Display error message
const displayErrorMessage = (message) => {
    // You can implement your preferred error display method here
    alert(message);
};

// Initialize account details page
const initAccountDetail = () => {
    // Extract account ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const accountId = urlParams.get('id');
    
    if (accountId) {
        loadAccountDetails(accountId);
    } else {
        displayErrorMessage('Không tìm thấy mã tài khoản');
    }
};

// Event listeners
document.addEventListener('DOMContentLoaded', initAccountDetail);