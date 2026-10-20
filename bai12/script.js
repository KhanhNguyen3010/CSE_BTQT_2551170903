// ========================================================
// CHƯƠNG 2 — JAVASCRIPT: BÀI 12 — IN LỊCH
// ========================================================

// 1. Mảng ánh xạ giá trị getDay() (từ 0 đến 6) sang tên thứ tiếng Việt
const daysOfWeek = [
    'Chủ nhật', // getDay() = 0
    'Thứ hai',   // getDay() = 1
    'Thứ ba',    // getDay() = 2
    'Thứ tư',    // getDay() = 3
    'Thứ năm',   // getDay() = 4
    'Thứ sáu',   // getDay() = 5
    'Thứ bảy'    // getDay() = 6
];

// 2. Hàm xác định lời chào theo buổi dựa trên getHours()
function getGreeting() {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
        return 'Chào buổi sáng!';
    } else if (currentHour >= 12 && currentHour < 18) {
        return 'Chào buổi chiều!';
    } else {
        return 'Chào buổi tối!';
    }
}

// 3. Hàm xử lý logic in lịch khi người dùng bấm nút
function inLich() {
    const dayInput = parseInt(document.getElementById('input-day').value, 10);
    const monthInput = parseInt(document.getElementById('input-month').value, 10);
    const yearInput = parseInt(document.getElementById('input-year').value, 10);

    // Kiểm tra dữ liệu đầu vào
    if (isNaN(dayInput) || isNaN(monthInput) || isNaN(yearInput)) {
        alert('Vui lòng nhập đầy đủ Ngày, Tháng và Năm!');
        return;
    }

    if (monthInput < 1 || monthInput > 12) {
        alert('Tháng phải nằm trong khoảng từ 1 đến 12!');
        return;
    }

    if (dayInput < 1 || dayInput > 31) {
        alert('Ngày không hợp lệ!');
        return;
    }

    // Khởi tạo đối tượng Date
    // Lưu ý quan trọng: Trong JavaScript, chỉ số tháng bắt đầu từ 0 (Tháng 1 là 0, Tháng 12 là 11)
    const targetDate = new Date(yearInput, monthInput - 1, dayInput);

    // Sử dụng getDay() để lấy thứ trong tuần
    const dayOfWeekIndex = targetDate.getDay();
    const weekdayName = daysOfWeek[dayOfWeekIndex];

    // Cập nhật nội dung lên giao diện ô lịch
    document.getElementById('display-year').textContent = yearInput;
    document.getElementById('display-month').textContent = `Tháng ${monthInput}`;
    document.getElementById('display-day').textContent = dayInput;
    document.getElementById('display-weekday').textContent = weekdayName;

    // Cập nhật lời chào theo buổi bằng getHours()
    document.getElementById('display-greeting').textContent = getGreeting();
}

// 4. Lắng nghe sự kiện bằng addEventListener theo đúng yêu cầu đề bài
document.addEventListener('DOMContentLoaded', function () {
    const printBtn = document.getElementById('print-btn');
    if (printBtn) {
        printBtn.addEventListener('click', inLich);
    }

    // Hỗ trợ phím Enter khi đang nhập trong các ô input
    const inputs = document.querySelectorAll('.calendar-form input');
    inputs.forEach(input => {
        input.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                inLich();
            }
        });
    });

    // Cập nhật lời chào ban đầu theo giờ thực tế của máy tính
    const greetingEl = document.getElementById('display-greeting');
    if (greetingEl) {
        greetingEl.textContent = getGreeting();
    }
});
