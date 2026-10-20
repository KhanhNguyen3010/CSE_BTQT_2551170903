// Hàm trả về đường dẫn ảnh gif tương ứng với chữ số (0 -> 9)
function getDigitImagePath(digit) {
    return `../Anh/Bai13/0${digit}.gif`;
}

// Hàm lấy lời chào theo giờ hệ thống
function getGreeting(hour) {
    if (hour >= 5 && hour < 11) {
        return "Chào buổi sáng";
    } else if (hour >= 11 && hour < 13) {
        return "Chào buổi trưa";
    } else if (hour >= 13 && hour < 18) {
        return "Chào buổi chiều";
    } else if (hour >= 18 && hour < 22) {
        return "Chào buổi tối";
    } else {
        return "Chúc ngủ ngon";
    }
}

// Hàm cập nhật đồng hồ số và lời chào
function updateClock() {
    const now = new Date();

    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // Tách thành hàng chục và hàng đơn vị
    const h1 = Math.floor(hours / 10);
    const h2 = hours % 10;

    const m1 = Math.floor(minutes / 10);
    const m2 = minutes % 10;

    const s1 = Math.floor(seconds / 10);
    const s2 = seconds % 10;

    // Cập nhật nguồn ảnh chữ số
    document.getElementById("hour1").src = getDigitImagePath(h1);
    document.getElementById("hour2").src = getDigitImagePath(h2);

    document.getElementById("min1").src = getDigitImagePath(m1);
    document.getElementById("min2").src = getDigitImagePath(m2);

    document.getElementById("sec1").src = getDigitImagePath(s1);
    document.getElementById("sec2").src = getDigitImagePath(s2);

    // Cập nhật lời chào theo buổi
    const greetingElement = document.getElementById("greeting");
    if (greetingElement) {
        greetingElement.textContent = getGreeting(hours);
    }
}

// Khởi chạy ngay khi tải trang và lặp lại mỗi giây
document.addEventListener("DOMContentLoaded", function () {
    updateClock();
    setInterval(updateClock, 1000);
});
