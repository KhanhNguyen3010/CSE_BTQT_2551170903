// ========================================================
// CHƯƠNG 2 — JAVASCRIPT: BÀI 20 — HIỆU ỨNG ẢNH VỚI CSS FILTER
// Xử lý sự kiện 13 nút bấm, cập nhật trạng thái hoạt động tức thì
// ========================================================

document.addEventListener('DOMContentLoaded', function () {
    const targetImage = document.getElementById('target-image');
    const controlsContainer = document.getElementById('filter-controls');
    const filterButtons = document.querySelectorAll('.btn-filter');

    // Danh sách 13 hiệu ứng hợp lệ
    const validEffects = [
        'gray', 'xray', 'invert', 'fliph', 'flipv',
        'glow', 'shadow', 'boldshadow', 'dropshadow',
        'blur', 'wave', 'mask', 'alpha'
    ];

    // Hàm áp dụng hiệu ứng lên ảnh
    function applyEffect(effectName, clickedButton) {
        if (!validEffects.includes(effectName)) return;

        // 1. Cập nhật giao diện thanh nút bấm: tô nổi bật nút đang chọn (#0d6efd)
        filterButtons.forEach(btn => btn.classList.remove('active'));
        if (clickedButton) {
            clickedButton.classList.add('active');
        }

        // 2. Xóa bỏ tất cả các class filter cũ trên ảnh
        validEffects.forEach(eff => {
            targetImage.classList.remove(`filter-${eff}`);
        });

        // 3. Thêm class hiệu ứng mới cho ảnh
        targetImage.classList.add(`filter-${effectName}`);
    }

    // 4. Kỹ thuật Event Delegation (Uỷ quyền sự kiện trên thanh điều khiển)
    if (controlsContainer) {
        controlsContainer.addEventListener('click', function (e) {
            const btn = e.target.closest('.btn-filter');
            if (!btn) return;

            const effect = btn.dataset.effect;
            applyEffect(effect, btn);
        });
    }
});
