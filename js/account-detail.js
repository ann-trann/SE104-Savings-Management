//=======================================================
// Edit account info

function showEditModal() {
    document.getElementById('editModal').style.display = 'block';
}

function closeEditModal() {
    document.getElementById('editModal').style.display = 'none';
}

function handleEdit(event) {
    event.preventDefault();
    // TODO: Thêm logic xử lý cập nhật thông tin
    console.log('Updating account info...');
    closeEditModal();
}

// Đóng modal khi click bên ngoài
window.onclick = function(event) {
    const modal = document.getElementById('editModal');
    if (event.target == modal) {
        closeEditModal();
    }
}


//=======================================================

function filterTransactions() {
    const fromDate = document.getElementById('fromDate').value;
    const toDate = document.getElementById('toDate').value;
    const transactionType = document.getElementById('transactionType').value;

    // TODO: Implement filtering logic
    console.log('Filtering transactions:', {
        fromDate,
        toDate,
        transactionType
    });
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
    // Update account header information
    document.querySelector('.account-title h2').textContent = `Thông tin tài khoản ${accountData.id}`;
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
};

// Update savings books table
const updateSavingsBooksList = (savingsBooks) => {
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