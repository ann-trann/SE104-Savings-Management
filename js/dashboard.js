document.addEventListener('DOMContentLoaded', function() {
    // Format number as Vietnamese currency
    function formatCurrency(number) {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(number).replace('₫', 'đ');
    }

    // Format date to Vietnamese format
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN');
    }

    // Get saving status based on balance
    function getSavingStatus(balance) {
        if (balance === 0) {
            return {
                className: 'completed',
                text: 'Đã tất toán'
            };
        }
        return {
            className: 'active',
            text: 'Đang hoạt động'
        };
    }

    // Update dashboard stats
    async function updateDashboardStats() {
        try {
            const response = await fetch('http://localhost:81/saving/dashboard/main-page');
            const data = await response.json();
            
            if (data.code === 0 && data.result) {
                const stats = data.result;
                document.querySelector('.stat-card:nth-child(1) .value').textContent = 
                    stats.numberOfSavingBook.toLocaleString('vi-VN');
                document.querySelector('.stat-card:nth-child(2) .value .money').textContent = 
                    formatCurrency(stats.depositTotal);
                document.querySelector('.stat-card:nth-child(3) .value').textContent = 
                    stats.numberOfAccount.toLocaleString('vi-VN');
                document.querySelector('.stat-card:nth-child(4) .value').textContent = 
                    stats.numberOfActiveBook.toLocaleString('vi-VN');
            }
        } catch (error) {
            console.error('Error fetching dashboard stats:', error);
        }
    }

    // Update recent saving books
    async function updateRecentBooks() {
        try {
            const response = await fetch('http://localhost:81/saving/dashboard/recently-book');
            const data = await response.json();
            
            if (data.code === 0 && data.result) {
                const tbody = document.querySelector('.table-wrapper tbody');
                tbody.innerHTML = ''; // Clear existing rows
                
                data.result.forEach(book => {
                    const status = getSavingStatus(book.remainingAmount);
                    const row = `
                        <tr>
                            <td>${book.id}</td>
                            <td>${book.customerName}</td>
                            <td><span class="money">${formatCurrency(book.deposit)}</span></td>
                            <td>${formatDate(book.sentDate)}</td>
                            <td><span class="status ${status.className}">${status.text}</span></td>
                        </tr>
                    `;
                    tbody.insertAdjacentHTML('beforeend', row);
                });
            }
        } catch (error) {
            console.error('Error fetching recent books:', error);
        }
    }

    // Initial update
    updateDashboardStats();
    updateRecentBooks();

    // Optional: Set up periodic updates (e.g., every 5 minutes)
    setInterval(() => {
        updateDashboardStats();
        updateRecentBooks();
    }, 5 * 60 * 1000);
});