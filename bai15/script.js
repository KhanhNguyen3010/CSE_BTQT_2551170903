// ========================================================
// CHƯƠNG 2 — JAVASCRIPT: BÀI 15 — MÁY TÍNH ĐƠN GIẢN
// ========================================================

document.addEventListener('DOMContentLoaded', function () {
    const expressionEl = document.getElementById('calc-expression');
    const resultEl = document.getElementById('calc-result');

    // Trạng thái máy tính (Khởi tạo mặc định khớp 100% với ảnh đề bài: 12 + 8 × 3 = 36)
    let currentExpression = '12 + 8 × 3';
    let currentResult = '36';
    let isResultEvaluated = true; // Cờ kiểm tra trạng thái vừa tính xong

    // 1. Hàm cập nhật nội dung hiển thị trên màn hình
    function updateDisplay() {
        expressionEl.textContent = currentExpression || '';
        resultEl.textContent = currentResult || '0';
    }

    // 2. Hàm xoá toàn bộ (Nút C)
    function clearAll() {
        currentExpression = '';
        currentResult = '0';
        isResultEvaluated = false;
        updateDisplay();
    }

    // 3. Hàm nhập ký tự (Số, dấu chấm, phép toán +, -, ×, ÷, %)
    function appendInput(char) {
        const operators = ['+', '-', '×', '÷', '%'];

        // Nếu vừa tính xong kết quả:
        if (isResultEvaluated) {
            if (!operators.includes(char)) {
                // Nếu bấm số mới -> tạo phép tính mới hoàn toàn
                currentExpression = '';
                currentResult = '';
            } else {
                // Nếu bấm phép toán -> lấy kết quả cũ để tính tiếp
                currentExpression = currentResult;
            }
            isResultEvaluated = false;
        }

        const lastChar = currentExpression.trim().slice(-1);

        if (operators.includes(char)) {
            // Không cho phép nhập toán tử đầu tiên (trừ dấu âm)
            if (currentExpression === '' && char !== '-') {
                return;
            }
            // Tránh 2 dấu phép toán liền kề nhau: ghi đè toán tử mới
            if (operators.includes(lastChar)) {
                currentExpression = currentExpression.trim().slice(0, -1) + ' ' + char + ' ';
                updateDisplay();
                return;
            }
            currentExpression += ' ' + char + ' ';
        } else {
            // Kiểm tra dấu thập phân: Mỗi số chỉ được có 1 dấu chấm
            if (char === '.') {
                const parts = currentExpression.split(/[\+\-×÷%]/);
                const currentNumber = parts[parts.length - 1];
                if (currentNumber.includes('.')) return;
            }
            currentExpression += char;
        }

        currentResult = currentExpression;
        updateDisplay();
    }

    // 4. Hàm đóng / mở ngoặc thông minh: ( )
    function toggleParentheses() {
        if (isResultEvaluated) {
            currentExpression = '';
            isResultEvaluated = false;
        }

        const openCount = (currentExpression.match(/\(/g) || []).length;
        const closeCount = (currentExpression.match(/\)/g) || []).length;
        const lastChar = currentExpression.trim().slice(-1);
        const operators = ['+', '-', '×', '÷', '%', '('];

        // Nếu số ngoặc mở > số ngoặc đóng và ký tự trước đó là số -> đóng ngoặc
        if (openCount > closeCount && !operators.includes(lastChar) && lastChar !== '') {
            currentExpression += ' )';
        } else {
            // Ngược lại -> mở ngoặc
            if (operators.includes(lastChar) || currentExpression === '') {
                currentExpression += ' (';
            } else {
                currentExpression += ' × (';
            }
        }
        currentResult = currentExpression;
        updateDisplay();
    }

    // 5. Hàm tính toán biểu thức (Nút =)
    function evaluateExpression() {
        if (!currentExpression) return;

        try {
            // Chuyển ký hiệu giao diện sang toán tử chuẩn JavaScript:
            // '×' -> '*', '÷' -> '/', '%' -> '/100'
            let formattedExpr = currentExpression
                .replace(/×/g, '*')
                .replace(/÷/g, '/')
                .replace(/%/g, '/100');

            // Tính toán giá trị an toàn bằng Function constructor
            const evaluatedValue = new Function(`'use strict'; return (${formattedExpr})`)();

            if (evaluatedValue === Infinity || evaluatedValue === -Infinity || isNaN(evaluatedValue)) {
                currentResult = 'Lỗi chia 0';
            } else {
                // Làm tròn tránh lỗi dấu phẩy động của JS (vd: 0.1 + 0.2)
                currentResult = String(Math.round(evaluatedValue * 100000000) / 100000000);
            }
            isResultEvaluated = true;
        } catch (error) {
            currentResult = 'Lỗi cú pháp';
            isResultEvaluated = true;
        }

        updateDisplay();
    }

    // 6. Bắt sự kiện click chuột trên bàn phím bằng Kỹ thuật Event Delegation (Uỷ quyền sự kiện)
    const keypad = document.querySelector('.calculator-keypad');
    if (keypad) {
        keypad.addEventListener('click', function (e) {
            const btn = e.target.closest('.btn');
            if (!btn) return;

            const action = btn.dataset.action;
            const char = btn.dataset.char;

            if (action === 'clear') {
                clearAll();
            } else if (action === 'calculate') {
                evaluateExpression();
            } else if (action === 'parentheses') {
                toggleParentheses();
            } else if (char) {
                appendInput(char);
            }
        });
    }

    // 7. Hỗ trợ gõ trực tiếp từ bàn phím máy tính (Keyboard Shortcuts)
    document.addEventListener('keydown', function (e) {
        if ((e.key >= '0' && e.key <= '9') || e.key === '.') {
            appendInput(e.key);
        } else if (e.key === '+') {
            appendInput('+');
        } else if (e.key === '-') {
            appendInput('-');
        } else if (e.key === '*') {
            appendInput('×');
        } else if (e.key === '/') {
            e.preventDefault();
            appendInput('÷');
        } else if (e.key === '%') {
            appendInput('%');
        } else if (e.key === 'Enter' || e.key === '=') {
            e.preventDefault();
            evaluateExpression();
        } else if (e.key === 'Escape' || e.key.toLowerCase() === 'c') {
            clearAll();
        } else if (e.key === 'Backspace') {
            if (currentExpression && !isResultEvaluated) {
                currentExpression = currentExpression.trim().slice(0, -1).trim();
                currentResult = currentExpression || '0';
                updateDisplay();
            }
        }
    });

    // Cập nhật màn hình lần đầu
    updateDisplay();
});
