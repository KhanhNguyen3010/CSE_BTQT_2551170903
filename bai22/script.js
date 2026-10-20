// ========================================================
// BÀI 22 — CHẾ ĐỘ SÁNG / TỐI (CSS VARIABLES + JS)
// Xử lý bật/tắt class .toi trên thẻ <body> bằng JavaScript
// ========================================================

document.addEventListener('DOMContentLoaded', function () {
    const themeToggle = document.getElementById('theme-toggle');
    const statusText = document.getElementById('status-text');

    function updateThemeStatus(isDark) {
        if (isDark) {
            document.body.classList.add('toi');
            if (statusText) {
                statusText.textContent = 'Đây là giao diện ở chế độ TỐI (đang bật).';
            }
        } else {
            document.body.classList.remove('toi');
            if (statusText) {
                statusText.textContent = 'Đây là giao diện ở chế độ SÁNG (đang tắt).';
            }
        }
    }

    if (themeToggle) {
        // Lắng nghe sự kiện gạt nút
        themeToggle.addEventListener('change', function () {
            updateThemeStatus(themeToggle.checked);
        });

        // Khởi tạo trạng thái ban đầu theo checkbox (mặc định bật chế độ tối như ảnh đề bài)
        updateThemeStatus(themeToggle.checked);
    }
});
