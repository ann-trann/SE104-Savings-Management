// Format currency function
function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount).replace('₫', 'đ');
}

// Function to update report data
function updateReportUI(data) {
    // Update summary stats
    document.querySelector('.stat-card:nth-child(1) .value').textContent = data.totalOfNewBook;
    document.querySelector('.stat-card:nth-child(2) .money').textContent = formatCurrency(data.totalIncome);
    document.querySelector('.stat-card:nth-child(3) .value').textContent = data.totalOfNonActiveBook;

    // Update report month display
    const reportDate = document.getElementById('reportMonth').value;
    const [year, month] = reportDate.split('-');
    document.querySelector('.report-month').textContent = `Tháng: ${month}/${year}`;

    // Update table data
    const tbody = document.querySelector('.report-table tbody');
    tbody.innerHTML = ''; // Clear existing rows

    let totalIncome = 0;
    let totalWithdrawal = 0;
    let totalDifference = 0;

    // Add detail rows
    data.detailResponseList.forEach((item, index) => {
        totalIncome += item.totalIncome;
        totalWithdrawal += item.totalWithdrawal;
        totalDifference += item.difference;

        const row = `
            <tr>
                <td>${index + 1}</td>
                <td>${item.type}</td>
                <td class="money positive">${formatCurrency(item.totalIncome)}</td>
                <td class="money negative">${formatCurrency(item.totalWithdrawal)}</td>
                <td class="money">${formatCurrency(item.difference)}</td>
            </tr>
        `;
        tbody.innerHTML += row;
    });

    // Add total row
    const totalRow = `
        <tr class="total-row">
            <td colspan="2"><strong>Tổng cộng</strong></td>
            <td class="money positive">${formatCurrency(totalIncome)}</td>
            <td class="money negative">${formatCurrency(totalWithdrawal)}</td>
            <td class="money">${formatCurrency(totalDifference)}</td>
        </tr>
    `;
    tbody.innerHTML += totalRow;
}

// Function to fetch report data
async function fetchReport(month, year) {
    try {
        const response = await fetch(`http://localhost:81/saving/reports?month=${month}&year=${year}`);
        const data = await response.json();
        
        if (data.code === 0 && data.result) {
            updateReportUI(data.result);
        } else {
            alert('Có lỗi khi tải dữ liệu báo cáo');
        }
    } catch (error) {
        console.error('Error fetching report:', error);
        alert('Có lỗi khi tải dữ liệu báo cáo');
    }
}

// Initialize when document is ready
document.addEventListener('DOMContentLoaded', () => {
    // Set up the date input
    const now = new Date();
    const reportMonth = document.getElementById('reportMonth');
    reportMonth.value = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

    // Set up update button click handler
    document.getElementById('updateReport').addEventListener('click', () => {
        const [year, month] = reportMonth.value.split('-');
        fetchReport(month, year);
    });
});