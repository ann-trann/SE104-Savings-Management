// Xử lý modal rút tiền
function showWithdrawModal() {
  document.getElementById("withdrawModal").style.display = "block";
}

function closeWithdrawModal() {
  document.getElementById("withdrawModal").style.display = "none";
}

// Xử lý modal tất toán
function showSettlementModal() {
  document.getElementById("settlementModal").style.display = "block";
}

function closeSettlementModal() {
  document.getElementById("settlementModal").style.display = "none";
}

// Đóng modal khi click nút X
document.querySelectorAll(".close").forEach(function (element) {
  element.onclick = function () {
    this.closest(".modal").style.display = "none";
  };
});

// Đóng modal khi click bên ngoài
window.onclick = function (event) {
  if (event.target.classList.contains("modal")) {
    event.target.style.display = "none";
  }
};



//=====================================================================

// Update the existing handleWithdraw function
async function handleWithdraw(event) {
  event.preventDefault();
  
  const savingId = document.getElementById('savingId').value;
  const withdrawAmount = parseFloat(document.getElementById('withdrawAmount').value);
  const currentAmount = parseFloat(document.getElementById('savingMoney').value);
  
  if (withdrawAmount <= 0) {
      alert('Số tiền rút phải lớn hơn 0');
      return false;
  }
  
  if (withdrawAmount > currentAmount) {
      alert('Số tiền rút không được lớn hơn số dư hiện có');
      return false;
  }
  
  try {
      const response = await fetch(`http://localhost:81/saving/savings/withdraw?id=${savingId}&money=${withdrawAmount}`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          }
      });
      
      if (!response.ok) {
          throw new Error('Lỗi khi thực hiện giao dịch');
      }
      
      const data = await response.json();
      
      if (data.code === 0) {
          alert('Rút tiền thành công');
          closeWithdrawModal();
          loadSavingDetails(); // Reload the page data
      } else {
          alert(data.message || 'Rút tiền thất bại');
      }
  } catch (error) {
      console.error('Error during withdrawal:', error);
      alert('Không thể thực hiện giao dịch. Vui lòng thử lại sau.');
  }
  
  return false;
}

// Update the existing handleSettlement function
async function handleSettlement(event) {
  event.preventDefault();
  
  if (!confirm('Bạn có chắc chắn muốn tất toán sổ tiết kiệm này?')) {
      return false;
  }
  
  const savingId = document.getElementById('savingIdSettlement').value.replace('#', '');
  
  try {
      const response = await fetch(`http://localhost:81/saving/savings/settlement?id=${savingId}`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          }
      });
      
      if (!response.ok) {
          throw new Error('Lỗi khi thực hiện tất toán');
      }
      
      const data = await response.json();
      
      if (data.code === 0) {
          alert('Tất toán thành công');
          closeSettlementModal();
          loadSavingDetails(); // Reload the page data
      } else {
          alert(data.message || 'Tất toán thất bại');
      }
  } catch (error) {
      console.error('Error during settlement:', error);
      alert('Không thể thực hiện tất toán. Vui lòng thử lại sau.');
  }
  
  return false;
}

// Add date validation helper
function validateWithdrawDate() {
  const withdrawDate = document.getElementById('withdrawDate');
  const today = new Date().toISOString().split('T')[0];
  withdrawDate.min = today;
  withdrawDate.value = today;
}

// Add date validation helper for settlement
function validateSettlementDate() {
  const settlementDate = document.getElementById('settlementDate');
  const today = new Date().toISOString().split('T')[0];
  settlementDate.min = today;
  settlementDate.value = today;
}

// Initialize date validations when opening modals
document.querySelector('.btn-warning').addEventListener('click', validateWithdrawDate);
document.querySelector('.btn-danger').addEventListener('click', validateSettlementDate);


//=====================================================================

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

// Update saving details on the page
const updateSavingDetails = (data) => {
    // Update basic information
    document.querySelector('.detail-row:nth-child(1) .detail-group:nth-child(1) span').textContent = `${data.id}`;
    document.querySelector('.detail-row:nth-child(1) .detail-group:nth-child(2) span').textContent = data.accountId;
    
    document.querySelector('.detail-row:nth-child(2) .detail-group:nth-child(1) span').textContent = data.customerName;
    document.querySelector('.detail-row:nth-child(2) .detail-group:nth-child(2) span').textContent = formatCurrency(data.amount);
    
    document.querySelector('.detail-row:nth-child(3) .detail-group:nth-child(1) span').textContent = getTermDisplay(data.term);
    document.querySelector('.detail-row:nth-child(3) .detail-group:nth-child(2) span').textContent = formatCurrency(data.currentAmount);
    
    document.querySelector('.detail-row:nth-child(4) .detail-group:nth-child(1) span').textContent = formatDate(data.sendDate);
    document.querySelector('.detail-row:nth-child(4) .detail-group:nth-child(2) span').textContent = `${(data.interestRate * 100).toFixed(1)}%`;

    
    document.querySelector('.detail-row:nth-child(5) .detail-group:nth-child(2) span').textContent = formatDate(data.settlementDate);
    
    // Update status
    const statusElement = document.querySelector('.detail-row:nth-child(5) .detail-group span');
    statusElement.textContent = data.status ? 'Đã tất toán' : 'Đang hoạt động';
    statusElement.className = `status ${data.status ? 'completed' : 'active'}`;

    // Show appropriate buttons based on term
    const withdrawButton = document.querySelector('.btn-warning');
    const settlementButton = document.querySelector('.btn-danger');
    
    if (data.term === 0) {
        withdrawButton.removeAttribute('hidden');
        settlementButton.setAttribute('hidden', '');
    } else {
        withdrawButton.setAttribute('hidden', '');
        settlementButton.removeAttribute('hidden');
    }

    // Disable buttons if saving is already settled
    if (data.status) {
        withdrawButton.disabled = true;
        settlementButton.disabled = true;
    }

    // Update transaction history
    const transactionTableBody = document.querySelector('.transaction-table tbody');
    transactionTableBody.innerHTML = data.transactionResponseList.map(transaction => `
        <tr>
            <td>${formatDate(transaction.transactionDate)}</td>
            <td>${transaction.type}</td>
            <td class="money">${transaction.type === 'Gửi tiền' ? '+' : '-'}${formatCurrency(transaction.amount)}</td>
            <td class="money">${formatCurrency(transaction.balanceAfterTransaction)}</td>
        </tr>
    `).join('');

    // Update withdraw modal
    document.getElementById('savingId').value = `${data.id}`;
    document.getElementById('savingMoney').value = `${data.currentAmount}`;
    document.getElementById('savingIdSettlement').value = `${data.id}`;

    // Update settlement modal amounts
    const settlementModal = document.getElementById('settlementModal');
    
    // Original deposit amount
    const originalAmount = settlementModal.querySelector('.settlement-info .info-row:nth-child(1) .money');
    originalAmount.textContent = formatCurrency(data.amount);
    
    // Calculate interest (current amount - original amount)
    const interest = data.currentAmount - data.amount;
    const interestElement = settlementModal.querySelector('.settlement-info .info-row:nth-child(2) .money');
    interestElement.textContent = formatCurrency(interest);
    
    // Total amount (current amount)
    const totalAmount = settlementModal.querySelector('.settlement-info .info-row.total .money');
    totalAmount.textContent = formatCurrency(data.currentAmount);

    // Disable buttons if saving is already settled
    if (data.status) {
        document.querySelector('.btn-warning').disabled = true;
        document.querySelector('.btn-danger').disabled = true;
    }
};


// Fetch and load saving details
const loadSavingDetails = async () => {
    try {
        // Get saving ID from URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const savingId = urlParams.get('id');

        if (!savingId) {
            throw new Error('No saving ID provided');
        }

        const response = await fetch(`http://localhost:81/saving/savings/detail?id=${savingId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch saving details');
        }

        const data = await response.json();
        
            console.log('Saving details:', data.result);
        if (data.code === 0 && data.result) {
            updateSavingDetails(data.result);
        } else {
            throw new Error(data.message || 'Failed to load saving details');
        }
    } catch (error) {
        console.error('Error loading saving details:', error);
        // Show error message to user
        alert('Không thể tải thông tin phiếu tiết kiệm. Vui lòng thử lại sau.');
    }
};

// Initialize when page loads
document.addEventListener('DOMContentLoaded', loadSavingDetails);
