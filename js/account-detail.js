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