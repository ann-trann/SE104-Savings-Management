// Add to a new file: js/rules.js
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('rulesForm');
    const addButton = document.getElementById('addSavingsType');

    addButton.addEventListener('click', function() {
        const savingsTypes = document.querySelector('.savings-types');
        const newType = document.createElement('div');
        newType.className = 'savings-type';
        newType.innerHTML = `
            <div class="saving-types__form-group">
                <label>Kỳ hạn:</label>
                <input type="text" class="form-control" placeholder="Nhập kỳ hạn">
            </div>
            <div class="saving-types__form-group">
                <label>Số ngày:</label>
                <input type="number" class="form-control" min="1" placeholder="Nhập số ngày">
            </div>
            <div class="saving-types__form-group">
                <label>Lãi suất (%):</label>
                <input type="number" class="form-control" step="0.1" placeholder="Nhập lãi suất">
            </div>
            <button type="button" class="btn-icon delete-type" title="Xóa">
                <i class="fas fa-trash"></i>
            </button>
        `;
        savingsTypes.appendChild(newType);
    });

    document.addEventListener('click', function(e) {
        if (e.target.closest('.delete-type')) {
            const typeElement = e.target.closest('.savings-type');
            typeElement.remove();
        }
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        // Add your save logic here
        alert('Đã lưu thay đổi thành công!');
    });
});

function resetForm() {
    if (confirm('Bạn có chắc chắn muốn đặt lại tất cả các thay đổi?')) {
        document.getElementById('rulesForm').reset();
    }
}