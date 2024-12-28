// Load and display rules from API
async function loadRules() {
    try {
        const response = await fetch('http://localhost:81/saving/privacy');
        const data = await response.json();
        
        if (data.code === 0 && data.result) {
            // Set minimum deposit
            document.getElementById('minDeposit').value = data.result.minIncome;
            
            // Clear existing savings types
            const savingsTypesContainer = document.querySelector('.savings-types');
            savingsTypesContainer.innerHTML = '';
            
            // Add savings types from API
            data.result.savingTypeResponseList.forEach(type => {
                const savingsType = document.createElement('div');
                savingsType.className = 'savings-type';
                savingsType.dataset.savingId = type.savingId;
                
                if (type.term === 0) {
                    savingsType.classList.add('non-term'); // Add class for no-term type
                    savingsType.innerHTML = `
                        <div class="saving-types__form-group">
                            <label>Kỳ hạn:</label>
                            <input type="text" class="form-control" value="Không kỳ hạn" readonly>
                        </div>
                        <div class="saving-types__form-group">
                            <label>Lãi suất (%):</label>
                            <input type="number" class="form-control" value="${type.interestRate * 100}" step="0.01" min="0">
                        </div>
                    `;
                } else {
                    savingsType.innerHTML = `
                        <div class="saving-types__form-group">
                            <label>Kỳ hạn:</label>
                            <div class="input-group">
                                <input type="number" class="form-control term-input" value="${type.term}" readonly>
                                <span class="input-group-text">tháng</span>
                            </div>
                        </div>
                        <div class="saving-types__form-group">
                            <label>Số ngày:</label>
                            <input type="number" class="form-control days-display" value="${type.date}" readonly>
                        </div>
                        <div class="saving-types__form-group">
                            <label>Lãi suất (%):</label>
                            <input type="number" class="form-control" value="${type.interestRate * 100}" step="0.01" min="0">
                        </div>
                    `;
                }
                
                savingsTypesContainer.appendChild(savingsType);
            });
        }
    } catch (error) {
        console.error('Error loading rules:', error);
        alert('Không thể tải quy định. Vui lòng thử lại sau!');
    }
}

// Định nghĩa initialState như một biến global
let initialState = {
    minDeposit: '',
    savingsTypes: []
};

// Single DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
    loadRules();
    
    const form = document.getElementById('rulesForm');
    const addButton = document.getElementById('addSavingsType');
    const savingsTypes = document.querySelector('.savings-types');
    
    // Định nghĩa isAdding như một biến global
    window.isAdding = false;

    // Store initial values when page loads
    setTimeout(() => {
        initialState = {
            minDeposit: document.getElementById('minDeposit').value,
            savingsTypes: Array.from(document.querySelectorAll('.savings-type')).map(type => ({
                term: type.querySelector('input[type="text"], .term-input')?.value || '',
                interestRate: type.querySelector('input[step="0.01"]').value
            }))
        };
    }, 1000); // Đợi loadRules() hoàn thành

    // Add new savings type handler
    addButton.addEventListener('click', function() {
        if (window.isAdding) {
            alert('Vui lòng điền đầy đủ thông tin cho loại tiết kiệm hiện tại trước khi thêm mới!');
            return;
        }

        window.isAdding = true;
        const newType = document.createElement('div');
        newType.className = 'savings-type new-type';
        newType.innerHTML = `
            <div class="saving-types__form-group">
                <label>Kỳ hạn:</label>
                <div class="input-group">
                    <input type="number" class="form-control term-name" required min="1" 
                           placeholder="Nhập số tháng" oninput="updateDays(this)">
                    <span class="input-group-text">tháng</span>
                </div>
            </div>
            <div class="saving-types__form-group">
                <label>Số ngày:</label>
                <input type="number" class="form-control days-display" readonly>
            </div>
            <div class="saving-types__form-group">
                <label>Lãi suất (%):</label>
                <input type="number" class="form-control interest-rate" required step="0.01" min="0" 
                       placeholder="Nhập lãi suất">
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
        
        if (window.isAdding) {
            alert('Vui lòng hoàn thành thêm loại tiết kiệm hiện tại trước khi lưu!');
            return;
        }

        const changes = detectChanges();
        displayChanges(changes);
        document.getElementById('changesModal').style.display = 'block';
    });

    // Setup modal handlers
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

    // Update the formatChangeMessage function to remove days references
    function formatChangeMessage(change) {
        switch (change.type) {
            case 'added':
                return `
                    ${change.term} tháng
                    (${change.interestRate}%)
                `;
            case 'removed':
                return `Đã xóa: ${change.term} tháng`;
            case 'modified':
                return `${change.term} tháng: Thay đổi lãi suất từ ${change.interestRate.old}% thành ${change.interestRate.new}%`;
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

// Function to update cookie
function updateCookie(name, value, days = 1) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value}; ${expires}; path=/`;
}

// Updated handleConfirmChanges function
async function handleConfirmChanges() {
    try {
        const currentState = {
            soTienToiThieu: parseInt(document.getElementById('minDeposit').value),
            savingTypeRequests: Array.from(document.querySelectorAll('.savings-type')).map(type => {
                const termInput = type.querySelector('.term-input, input[type="text"]');
                const term = termInput ? (termInput.value === 'Không kỳ hạn' ? 0 : parseInt(termInput.value)) : 0;
                const interestRate = parseFloat(type.querySelector('input[step="0.01"]').value) / 100;
                
                return {
                    kyHan: term,
                    laiSuat: interestRate,
                    soNgayToiThieuRutTien: term * 30
                };
            })
        };

        const response = await fetch('http://localhost:81/saving/privacy/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(currentState)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        
        if (data.code === 0) {
            // Update minIncome cookie with new minimum deposit amount
            updateCookie('minIncome', currentState.soTienToiThieu);
            
            alert('Đã lưu thay đổi thành công!');
            closeModal();
            loadRules(); // Reload rules after saving
        } else {
            throw new Error(data.message || 'Lỗi khi cập nhật quy định');
        }
    } catch (error) {
        console.error('Error saving rules:', error);
        alert('Không thể lưu thay đổi. Vui lòng thử lại sau!');
    }
}



function updateDays(input) {
    const months = parseInt(input.value) || 0;
    const daysDisplay = input.closest('.savings-type').querySelector('.days-display');
    daysDisplay.value = months * 30;
}

function setupNewTypeHandlers(newType) {
    const confirmBtn = newType.querySelector('.confirm-type');
    const cancelBtn = newType.querySelector('.cancel-type');
    const termInput = newType.querySelector('.term-name');
    const interestInput = newType.querySelector('.interest-rate');

    confirmBtn.addEventListener('click', function() {
        if (!termInput.value || !interestInput.value) {
            alert('Vui lòng điền đầy đủ thông tin!');
            return;
        }

        const termValue = termInput.value;
        const interestValue = interestInput.value;
        
        // Xóa class new-type và cập nhật HTML
        newType.classList.remove('new-type');
        newType.innerHTML = `
            <div class="saving-types__form-group">
                <label>Kỳ hạn:</label>
                <div class="input-group">
                    <input type="number" class="form-control term-input" value="${termValue}" readonly>
                    <span class="input-group-text">tháng</span>
                </div>
            </div>
            <div class="saving-types__form-group">
                <label>Số ngày:</label>
                <input type="number" class="form-control days-display" value="${termValue * 30}" readonly>
            </div>
            <div class="saving-types__form-group">
                <label>Lãi suất (%):</label>
                <input type="number" class="form-control" value="${interestValue}" step="0.01" min="0">
            </div>
            <button type="button" class="btn-icon delete-type" title="Xóa">
                <i class="fas fa-trash"></i>
            </button>
        `;

        // Reset trạng thái isAdding
        window.isAdding = false;
    });

    cancelBtn.addEventListener('click', function() {
        newType.remove();
        window.isAdding = false;
    });
}

// Thêm function detectChanges
function detectChanges() {
    const changes = {
        hasChanges: false,
        minDeposit: [],
        savingsTypes: []
    };

    // Kiểm tra thay đổi số tiền gửi tối thiểu
    const currentMinDeposit = document.getElementById('minDeposit').value;
    if (initialState.minDeposit !== currentMinDeposit) {
        changes.hasChanges = true;
        changes.minDeposit.push({
            old: formatCurrency(initialState.minDeposit),
            new: formatCurrency(currentMinDeposit)
        });
    }

    // Kiểm tra thay đổi các loại tiết kiệm
    const currentTypes = Array.from(document.querySelectorAll('.savings-type')).map(type => {
        const termInput = type.querySelector('.term-input') || type.querySelector('input[type="text"]');
        const term = termInput ? termInput.value : '';
        const interestRate = type.querySelector('input[step="0.01"]').value;
        return { term, interestRate };
    });

    // So sánh với trạng thái ban đầu
    const initialTypes = initialState.savingsTypes;
    
    // Kiểm tra các loại tiết kiệm đã xóa
    initialTypes.forEach(initial => {
        if (!currentTypes.find(current => current.term === initial.term)) {
            changes.hasChanges = true;
            changes.savingsTypes.push({
                type: 'removed',
                term: initial.term
            });
        }
    });

    // Kiểm tra các loại tiết kiệm mới và thay đổi
    currentTypes.forEach(current => {
        const initial = initialTypes.find(type => type.term === current.term);
        if (!initial) {
            // Loại tiết kiệm mới
            changes.hasChanges = true;
            changes.savingsTypes.push({
                type: 'added',
                term: current.term,
                interestRate: current.interestRate
            });
        } else if (initial.interestRate !== current.interestRate) {
            // Thay đổi lãi suất
            changes.hasChanges = true;
            changes.savingsTypes.push({
                type: 'modified',
                term: current.term,
                interestRate: {
                    old: initial.interestRate,
                    new: current.interestRate
                }
            });
        }
    });

    return changes;
}
