document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('rulesForm');
    const addButton = document.getElementById('addSavingsType');
    const savingsTypes = document.querySelector('.savings-types');
    let isAdding = false;

    // Store initial values when page loads
    const initialState = {
        minDeposit: document.getElementById('minDeposit').value,
        savingsTypes: Array.from(document.querySelectorAll('.savings-type')).map(type => ({
            term: type.querySelector('input[type="text"]').value,
            days: type.querySelector('input[type="number"]:not([step="0.1"])')?.value,
            interestRate: type.querySelector('input[step="0.1"]').value
        }))
    };

    // Function to get current form state
    function getCurrentState() {
        return {
            minDeposit: document.getElementById('minDeposit').value,
            savingsTypes: Array.from(document.querySelectorAll('.savings-type')).map(type => ({
                term: type.querySelector('input[type="text"]').value,
                days: type.querySelector('input[type="number"]:not([step="0.1"])')?.value,
                interestRate: type.querySelector('input[step="0.1"]').value
            }))
        };
    }

    // Function to detect changes
    function detectChanges() {
        const currentState = getCurrentState();
        const changes = {
            minDeposit: [],
            savingsTypes: [],
            hasChanges: false
        };

        // Check minimum deposit changes
        if (currentState.minDeposit !== initialState.minDeposit) {
            changes.minDeposit.push({
                type: 'changed',
                old: formatCurrency(initialState.minDeposit),
                new: formatCurrency(currentState.minDeposit)
            });
            changes.hasChanges = true;
        }

        // Check savings types changes
        const initialTerms = initialState.savingsTypes.map(t => t.term);
        const currentTerms = currentState.savingsTypes.map(t => t.term);

        // Find removed types
        initialState.savingsTypes.forEach(type => {
            if (!currentTerms.includes(type.term)) {
                changes.savingsTypes.push({
                    type: 'removed',
                    term: type.term
                });
                changes.hasChanges = true;
            }
        });

        // Find added and modified types
        currentState.savingsTypes.forEach(currentType => {
            const initialType = initialState.savingsTypes.find(t => t.term === currentType.term);
            
            if (!initialType) {
                changes.savingsTypes.push({
                    type: 'added',
                    term: currentType.term,
                    days: currentType.days,
                    interestRate: currentType.interestRate
                });
                changes.hasChanges = true;
            } else if (
                currentType.days !== initialType.days ||
                currentType.interestRate !== initialType.interestRate
            ) {
                changes.savingsTypes.push({
                    type: 'modified',
                    term: currentType.term,
                    days: {
                        old: initialType.days,
                        new: currentType.days
                    },
                    interestRate: {
                        old: initialType.interestRate,
                        new: currentType.interestRate
                    }
                });
                changes.hasChanges = true;
            }
        });

        return changes;
    }

    // Add new savings type handler
    addButton.addEventListener('click', function() {
        if (isAdding) {
            alert('Vui lòng điền đầy đủ thông tin cho loại tiết kiệm hiện tại trước khi thêm mới!');
            return;
        }

        isAdding = true;
        const newType = document.createElement('div');
        newType.className = 'savings-type new-type';
        newType.innerHTML = `
            <div class="saving-types__form-group">
                <label>Kỳ hạn:</label>
                <input type="text" class="form-control term-name" required placeholder="Nhập kỳ hạn">
            </div>
            <div class="saving-types__form-group">
                <label>Số ngày:</label>
                <input type="number" class="form-control days" required min="1" placeholder="Nhập số ngày">
            </div>
            <div class="saving-types__form-group">
                <label>Lãi suất (%):</label>
                <input type="number" class="form-control interest-rate" required step="0.1" min="0" placeholder="Nhập lãi suất">
            </div>
            <div class="saving-type-actions">
                <button type="button" class="btn btn-success confirm-type" title="Xác nhận">
                    <i class="fas fa-check"></i>
                </button>
                <button type="button" class="btn btn-danger cancel-type" title="Hủy">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        savingsTypes.appendChild(newType);

        setupNewTypeHandlers(newType);
    });

    // Setup handlers for new savings type
    function setupNewTypeHandlers(newType) {
        const confirmBtn = newType.querySelector('.confirm-type');
        const cancelBtn = newType.querySelector('.cancel-type');
        const inputs = newType.querySelectorAll('input');

        confirmBtn.addEventListener('click', function() {
            let isValid = true;
            let values = {};

            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                }
                values[input.className.split(' ')[1]] = input.value;
            });

            if (!isValid) {
                alert('Vui lòng điền đầy đủ thông tin!');
                return;
            }

            convertToRegularType(newType, values);
            isAdding = false;
        });

        cancelBtn.addEventListener('click', function() {
            newType.remove();
            isAdding = false;
        });
    }

    // Convert new type to regular type
    function convertToRegularType(newType, values) {
        newType.className = 'savings-type';
        newType.innerHTML = `
            <div class="saving-types__form-group">
                <label>Kỳ hạn:</label>
                <input type="text" class="form-control" value="${values['term-name']}" readonly>
            </div>
            <div class="saving-types__form-group">
                <label>Số ngày:</label>
                <input type="number" class="form-control" value="${values['days']}" min="1">
            </div>
            <div class="saving-types__form-group">
                <label>Lãi suất (%):</label>
                <input type="number" class="form-control" value="${values['interest-rate']}" step="0.1" min="0">
            </div>
            <button type="button" class="btn-icon delete-type" title="Xóa">
                <i class="fas fa-trash"></i>
            </button>
        `;
    }

    // Delete savings type handler
    document.addEventListener('click', function(e) {
        if (e.target.closest('.delete-type')) {
            const typeElement = e.target.closest('.savings-type');
            if (!typeElement.classList.contains('non-term')) {
                typeElement.remove();
            } else {
                alert('Không thể xóa loại tiết kiệm không kỳ hạn!');
            }
        }
    });

    // Form submit handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (isAdding) {
            alert('Vui lòng hoàn thành thêm loại tiết kiệm hiện tại trước khi lưu!');
            return;
        }

        const changes = detectChanges();
        displayChanges(changes);
        document.getElementById('changesModal').style.display = 'block';
    });

    // Modal event handlers
    setupModalHandlers();
});

// Format currency function
function formatCurrency(value) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(value);
}

// Display changes in modal
function displayChanges(changes) {
    const changesList = document.getElementById('changesList');
    changesList.innerHTML = '';

    if (!changes.hasChanges) {
        changesList.innerHTML = '<p class="no-changes">Không có thay đổi nào được thực hiện.</p>';
        return;
    }

    // Display minimum deposit changes
    if (changes.minDeposit.length > 0) {
        displayMinDepositChanges(changesList, changes.minDeposit);
    }

    // Display savings types changes
    if (changes.savingsTypes.length > 0) {
        displaySavingsTypesChanges(changesList, changes.savingsTypes);
    }
}

function displayMinDepositChanges(changesList, minDepositChanges) {
    const minDepositGroup = document.createElement('div');
    minDepositGroup.className = 'changes-group';
    minDepositGroup.innerHTML = `
        <h4>Số tiền gửi tối thiểu</h4>
        <div class="change-item">
            Thay đổi từ ${minDepositChanges[0].old} thành ${minDepositChanges[0].new}
        </div>
    `;
    changesList.appendChild(minDepositGroup);
}

function displaySavingsTypesChanges(changesList, savingsTypesChanges) {
    const typesGroup = document.createElement('div');
    typesGroup.className = 'changes-group';
    typesGroup.innerHTML = '<h4>Loại tiết kiệm</h4>';

    savingsTypesChanges.forEach(change => {
        const changeItem = document.createElement('div');
        changeItem.className = 'change-item';
        changeItem.innerHTML = formatChangeMessage(change);
        typesGroup.appendChild(changeItem);
    });

    changesList.appendChild(typesGroup);
}

function formatChangeMessage(change) {
    switch (change.type) {
        case 'added':
            return `
                Thêm mới: ${change.term}
                ${change.days ? `(${change.days} ngày, ` : '('}${change.interestRate}%)
            `;
        case 'removed':
            return `Đã xóa: ${change.term}`;
        case 'modified':
            let modifications = [];
            if (change.days?.old !== change.days?.new) {
                modifications.push(`số ngày từ ${change.days.old} thành ${change.days.new}`);
            }
            if (change.interestRate.old !== change.interestRate.new) {
                modifications.push(`lãi suất từ ${change.interestRate.old}% thành ${change.interestRate.new}%`);
            }
            return `${change.term}: Thay đổi ${modifications.join(' và ')}`;
        default:
            return '';
    }
}

function setupModalHandlers() {
    document.querySelector('.close-modal').addEventListener('click', closeModal);
    document.getElementById('cancelChanges').addEventListener('click', closeModal);
    document.getElementById('confirmChanges').addEventListener('click', handleConfirmChanges);
    
    window.addEventListener('click', function(e) {
        if (e.target === document.getElementById('changesModal')) {
            closeModal();
        }
    });
}

function closeModal() {
    document.getElementById('changesModal').style.display = 'none';
}

function handleConfirmChanges() {
    // Add your save logic here
    alert('Đã lưu thay đổi thành công!');
    closeModal();
    
    // Update initial state after saving
    initialState.minDeposit = document.getElementById('minDeposit').value;
    initialState.savingsTypes = Array.from(document.querySelectorAll('.savings-type')).map(type => ({
        term: type.querySelector('input[type="text"]').value,
        days: type.querySelector('input[type="number"]:not([step="0.1"])')?.value,
        interestRate: type.querySelector('input[step="0.1"]').value
    }));
}

function resetForm() {
    if (confirm('Bạn có chắc chắn muốn đặt lại tất cả các thay đổi?')) {
        document.getElementById('rulesForm').reset();
    }
}