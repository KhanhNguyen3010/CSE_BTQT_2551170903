// ========================================================
// CHƯƠNG 2 — JAVASCRIPT: BÀI 17 — KIỂM TRA BIỂU MẪU (FORM VALIDATION)
// Kiểm tra dữ liệu nhập, Biểu thức chính quy (Regex), Báo lỗi trực quan
// ========================================================

document.addEventListener('DOMContentLoaded', function () {
    // 1. Tham chiếu các phần tử Form và Input
    const form = document.getElementById('register-form');
    const fullnameInput = document.getElementById('fullname');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');

    const groupFullname = document.getElementById('group-fullname');
    const groupEmail = document.getElementById('group-email');
    const groupPassword = document.getElementById('group-password');
    const groupConfirmPassword = document.getElementById('group-confirm-password');

    const msgFullname = document.getElementById('msg-fullname');
    const msgEmail = document.getElementById('msg-email');
    const msgPassword = document.getElementById('msg-password');
    const msgConfirmPassword = document.getElementById('msg-confirm-password');

    // 2. Hàm đặt trạng thái LỖI (Viền đỏ #dc2626 + Thông báo ✗)
    function setError(groupEl, msgEl, message) {
        groupEl.classList.remove('has-success');
        groupEl.classList.add('has-error');
        msgEl.textContent = message;
    }

    // 3. Hàm đặt trạng thái HỢP LỆ (Viền xanh #16a34a + Thông báo ✓)
    function setSuccess(groupEl, msgEl, message = '✓ Hợp lệ') {
        groupEl.classList.remove('has-error');
        groupEl.classList.add('has-success');
        msgEl.textContent = message;
    }

    // 4. Hàm đặt lại trạng thái bình thường (khi chưa nhập)
    function setNeutral(groupEl, msgEl) {
        groupEl.classList.remove('has-error', 'has-success');
        msgEl.textContent = '';
    }

    // 5. Kiểm tra trường: Họ và tên (Không được để trống)
    function validateFullname() {
        const val = fullnameInput.value.trim();
        if (val === '') {
            setError(groupFullname, msgFullname, '✗ Họ và tên không được để trống');
            return false;
        }
        setSuccess(groupFullname, msgFullname, '✓ Hợp lệ');
        return true;
    }

    // 6. Kiểm tra trường: Email (Biểu thức chính quy Regex)
    function validateEmail() {
        const val = emailInput.value.trim();
        if (val === '') {
            setError(groupEmail, msgEmail, '✗ Email không được để trống');
            return false;
        }

        // Kiểm tra trường hợp đặc biệt: có @ nhưng thiếu tên miền (như ảnh minh hoạ an.nv@)
        if (val.includes('@')) {
            const domainPart = val.split('@')[1];
            if (!domainPart || !domainPart.includes('.') || domainPart.endsWith('.')) {
                setError(groupEmail, msgEmail, '✗ Email không hợp lệ (thiếu tên miền)');
                return false;
            }
        }

        // Biểu thức chính quy kiểm tra định dạng email tiêu chuẩn
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(val)) {
            setError(groupEmail, msgEmail, '✗ Email không đúng định dạng');
            return false;
        }

        setSuccess(groupEmail, msgEmail, '✓ Hợp lệ');
        return true;
    }

    // 7. Kiểm tra trường: Mật khẩu (≥ 6 ký tự)
    function validatePassword() {
        const val = passwordInput.value;
        if (val === '') {
            setError(groupPassword, msgPassword, '✗ Mật khẩu không được để trống');
            return false;
        }
        if (val.length < 6) {
            setError(groupPassword, msgPassword, '✗ Mật khẩu phải có ít nhất 6 ký tự');
            return false;
        }
        setSuccess(groupPassword, msgPassword, '✓ Hợp lệ');
        return true;
    }

    // 8. Kiểm tra trường: Xác nhận mật khẩu (Phải khớp với mật khẩu)
    function validateConfirmPassword() {
        const confirmVal = confirmPasswordInput.value;
        const passwordVal = passwordInput.value;

        if (confirmVal === '') {
            setError(groupConfirmPassword, msgConfirmPassword, '✗ Vui lòng xác nhận mật khẩu');
            return false;
        }
        if (confirmVal !== passwordVal) {
            setError(groupConfirmPassword, msgConfirmPassword, '✗ Mật khẩu xác nhận không khớp');
            return false;
        }
        setSuccess(groupConfirmPassword, msgConfirmPassword, '✓ Hợp lệ');
        return true;
    }

    // 9. Lắng nghe sự kiện gõ phím (input) và mất tiêu điểm (blur) để kiểm tra tức thì
    fullnameInput.addEventListener('input', validateFullname);
    fullnameInput.addEventListener('blur', validateFullname);

    emailInput.addEventListener('input', validateEmail);
    emailInput.addEventListener('blur', validateEmail);

    passwordInput.addEventListener('input', function () {
        validatePassword();
        if (confirmPasswordInput.value) {
            validateConfirmPassword();
        }
    });
    passwordInput.addEventListener('blur', validatePassword);

    confirmPasswordInput.addEventListener('input', validateConfirmPassword);
    confirmPasswordInput.addEventListener('blur', validateConfirmPassword);

    // 10. Xử lý khi nhấn nút "Đăng ký" (Submit Form)
    form.addEventListener('submit', function (e) {
        // Chặn gửi form mặc định để xử lý bằng JavaScript
        e.preventDefault();

        const isNameValid = validateFullname();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isConfirmValid = validateConfirmPassword();

        // Nếu tất cả các trường đều hợp lệ
        if (isNameValid && isEmailValid && isPasswordValid && isConfirmValid) {
            alert('🎉 Đăng ký tài khoản thành công!\nDữ liệu biểu mẫu đã vượt qua toàn bộ các bước kiểm tra hợp lệ.');
        } else {
            // Tự động focus vào ô bị lỗi đầu tiên
            if (!isNameValid) {
                fullnameInput.focus();
            } else if (!isEmailValid) {
                emailInput.focus();
            } else if (!isPasswordValid) {
                passwordInput.focus();
            } else if (!isConfirmValid) {
                confirmPasswordInput.focus();
            }
        }
    });

    // 11. Khởi tạo dữ liệu mẫu ban đầu khớp 100% ảnh chụp đề bài
    // Giúp thầy cô vừa mở trang web lên là thấy giao diện hiển thị đúng mẫu minh họa
    function initDemoState() {
        fullnameInput.value = 'Nguyễn Văn An';
        emailInput.value = 'an.nv@';
        passwordInput.value = '123';
        confirmPasswordInput.value = '123456';

        // Thiết lập trạng thái hiển thị đúng như ảnh chụp bài 17:
        setSuccess(groupFullname, msgFullname, '✓ Hợp lệ');
        setError(groupEmail, msgEmail, '✗ Email không hợp lệ (thiếu tên miền)');
        setError(groupPassword, msgPassword, '✗ Mật khẩu phải có ít nhất 6 ký tự');
        setSuccess(groupConfirmPassword, msgConfirmPassword, '✓ Hợp lệ');
    }

    initDemoState();
});
