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

// Get term display text
const getTermDisplay = (term) => {
    return term === 0 ? 'Không thời hạn' : `${term} tháng`;
};

// Get extension type display text
const getExtensionTypeDisplay = (expendId) => {
    switch (expendId) {
        case 1:
            return 'Gia hạn gốc lẫn lãi';
        case 2:
            return 'Gia hạn gốc';
        case 3:
            return 'Không gia hạn';
        default:
            return 'Không xác định';
    }
};

const updateSavingDetails = (data) => {
    try {
        // Basic information
        const detailRows = document.querySelectorAll('.detail-row');
        
        // Row 1: Saving ID and Account ID
        detailRows[0].querySelector('.detail-group:nth-child(1) span').textContent = data.id;
        detailRows[0].querySelector('.detail-group:nth-child(2) span').textContent = data.accountId;
        
        // Row 2: Customer Name and Amount
        detailRows[1].querySelector('.detail-group:nth-child(1) span').textContent = data.customerName;
        detailRows[1].querySelector('.detail-group:nth-child(2) span').textContent = formatCurrency(data.amount);
        
        // Row 3: Term and Current Amount
        detailRows[2].querySelector('.detail-group:nth-child(1) span').textContent = getTermDisplay(data.term);
        detailRows[2].querySelector('.detail-group:nth-child(2) span').textContent = formatCurrency(data.currentAmount);
        
        // Row 4: Send Date and Interest Rate
        detailRows[3].querySelector('.detail-group:nth-child(1) span').textContent = formatDate(data.sendDate);
        detailRows[3].querySelector('.detail-group:nth-child(2) span').textContent = `${(data.interestRate * 100).toFixed(1)}%`;
        
        // Row 5: Status and Settlement Date
        const statusElement = detailRows[4].querySelector('.detail-group:nth-child(1) span');
        statusElement.textContent = data.status ? 'Đã tất toán' : 'Đang hoạt động';
        statusElement.className = `status ${data.status ? 'completed' : 'active'}`;
        detailRows[4].querySelector('.detail-group:nth-child(2) span').textContent = formatDate(data.settlementDate);
        
        // Row 6: Extension Type
        const expendTypeElement = detailRows[5]?.querySelector('.expend-type');
        if (expendTypeElement) {
            expendTypeElement.textContent = getExtensionTypeDisplay(data.expendId);
        }

        // Transaction History
        const transactionTableBody = document.querySelector('.transaction-table tbody');
        if (transactionTableBody) {
            transactionTableBody.innerHTML = data.transactionResponseList
                .sort((a, b) => new Date(b.transactionDate) - new Date(a.transactionDate)) // Sort by date descending
                .map(transaction => `
                    <tr>
                        <td>${formatDate(transaction.transactionDate)}</td>
                        <td>${transaction.type}</td>
                        <td class="money">${transaction.type === 'Gửi tiền' ? '+' : '-'}${formatCurrency(transaction.amount)}</td>
                        <td class="money">${formatCurrency(transaction.balanceAfterTransaction)}</td>
                    </tr>
                `).join('');
        }

        // Update modal fields - Add null checks
        const savingIdInput = document.getElementById('savingId');
        if (savingIdInput) {
            savingIdInput.value = data.id;
        }

        const savingMoneyInput = document.getElementById('savingMoney');
        if (savingMoneyInput) {
            savingMoneyInput.value = data.currentAmount;
        }

        const savingIdSettlementInput = document.getElementById('savingIdSettlement');
        if (savingIdSettlementInput) {
            savingIdSettlementInput.value = data.id;
        }

        // Handle buttons visibility and state
        const withdrawButton = document.querySelector('.btn-warning');
        const settlementButton = document.querySelector('.btn-danger');
        
        if (withdrawButton && settlementButton) {
            if (data.term === 0) {
                withdrawButton.hidden = false;
                settlementButton.hidden = true;
            } else {
                withdrawButton.hidden = true;
                settlementButton.hidden = false;
            }

            // Disable buttons if saving is already settled
            if (data.status) {
                withdrawButton.disabled = true;
                settlementButton.disabled = true;
            }
        }
    } catch (error) {
        console.error('Error updating saving details:', error);
        throw error; // Rethrow to be caught by the main error handler
    }
};

// Load saving details from API
const loadSavingDetails = async () => {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const savingId = urlParams.get('id');

        if (!savingId) {
            throw new Error('Không tìm thấy mã số tiết kiệm');
        }

        const response = await fetch(`http://localhost:81/saving/savings/detail?id=${savingId}`);
        if (!response.ok) {
            throw new Error('Không thể tải thông tin phiếu tiết kiệm');
        }

        const data = await response.json();
        
        if (data.code === 0 && data.result) {
            updateSavingDetails(data.result);
        } else {
            throw new Error(data.message || 'Không thể tải thông tin phiếu tiết kiệm');
        }
    } catch (error) {
        console.error('Error loading saving details:', error);
        alert(error.message || 'Không thể tải thông tin phiếu tiết kiệm. Vui lòng thử lại sau.');
    }
};

// Initialize when page loads
document.addEventListener('DOMContentLoaded', loadSavingDetails);