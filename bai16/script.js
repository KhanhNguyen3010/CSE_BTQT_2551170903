// ========================================================
// CHƯƠNG 2 — JAVASCRIPT: BÀI 16 — DANH SÁCH VIỆC CẦN LÀM
// Thao tác DOM: Thêm, Xoá, Đổi trạng thái, Cập nhật số đếm
// ========================================================

document.addEventListener('DOMContentLoaded', function () {
    // 1. Tham chiếu các phần tử DOM
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    const remainingCountEl = document.getElementById('remaining-count');

    // 2. Dữ liệu mẫu ban đầu (khớp 100% hình minh họa trong đề bài)
    const DEFAULT_TODOS = [
        { id: 1, text: 'Đọc chương HTML5 cơ bản', completed: true },
        { id: 2, text: 'Làm bài tập CSS Grid', completed: false },
        { id: 3, text: 'Quay video OBS nộp bài', completed: false }
    ];

    // Khởi tạo mảng công việc từ localStorage hoặc lấy dữ liệu mặc định
    let todos = loadTodos();

    function loadTodos() {
        const saved = localStorage.getItem('bai16_todos');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                return DEFAULT_TODOS;
            }
        }
        return DEFAULT_TODOS;
    }

    // Hàm lưu dữ liệu vào localStorage
    function saveTodos() {
        localStorage.setItem('bai16_todos', JSON.stringify(todos));
    }

    // 3. Hàm chuẩn hóa tránh tấn công XSS (Bảo mật đầu vào)
    function escapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    // 4. Hàm cập nhật số việc còn lại chưa hoàn thành
    function updateRemainingCount() {
        const remaining = todos.filter(todo => !todo.completed).length;
        remainingCountEl.textContent = `Còn ${remaining} việc chưa hoàn thành`;
    }

    // 5. Hàm hiển thị (Render) toàn bộ danh sách việc ra giao diện DOM
    function renderTodos() {
        todoList.innerHTML = '';

        if (todos.length === 0) {
            const emptyLi = document.createElement('li');
            emptyLi.className = 'empty-state';
            emptyLi.textContent = 'Chưa có công việc nào. Hãy thêm việc mới bên trên!';
            todoList.appendChild(emptyLi);
            updateRemainingCount();
            return;
        }

        todos.forEach(todo => {
            const li = document.createElement('li');
            li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
            li.dataset.id = todo.id;

            li.innerHTML = `
                <div class="todo-item-left" data-action="toggle">
                    <div class="custom-checkbox">
                        <svg viewBox="0 0 24 24">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                    </div>
                    <span class="todo-text">${escapeHtml(todo.text)}</span>
                </div>
                <button type="button" class="btn-delete" data-action="delete">Xoá</button>
            `;

            todoList.appendChild(li);
        });

        updateRemainingCount();
    }

    // 6. Hàm thêm việc mới
    function addTodo(text) {
        const trimmedText = text.trim();
        if (!trimmedText) {
            todoInput.focus();
            return;
        }

        const newTodo = {
            id: Date.now(), // Tạo ID duy nhất theo dấu thời gian
            text: trimmedText,
            completed: false
        };

        todos.push(newTodo);
        saveTodos();
        renderTodos();

        todoInput.value = '';
        todoInput.focus();
    }

    // 7. Hàm đổi trạng thái hoàn thành (Toggle)
    function toggleTodo(id) {
        todos = todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, completed: !todo.completed };
            }
            return todo;
        });

        saveTodos();
        renderTodos();
    }

    // 8. Hàm xoá việc khỏi danh sách
    function deleteTodo(id) {
        todos = todos.filter(todo => todo.id !== id);
        saveTodos();
        renderTodos();
    }

    // 9. Lắng nghe sự kiện gửi Form (Thêm việc bằng nút Thêm hoặc phím Enter)
    todoForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Ngăn trình duyệt tải lại trang (Không tải lại trang theo yêu cầu)
        addTodo(todoInput.value);
    });

    // 10. Kỹ thuật Event Delegation (Uỷ quyền sự kiện trên thẻ ul#todo-list)
    todoList.addEventListener('click', function (e) {
        // Tìm thẻ li cha gần nhất chứa id của công việc
        const todoItem = e.target.closest('.todo-item');
        if (!todoItem) return;

        const todoId = Number(todoItem.dataset.id);

        // Bấm nút Xoá
        if (e.target.closest('[data-action="delete"]')) {
            deleteTodo(todoId);
            return;
        }

        // Bấm vào khu vực việc (checkbox hoặc text) để đánh dấu hoàn thành
        if (e.target.closest('[data-action="toggle"]')) {
            toggleTodo(todoId);
        }
    });

    // Render danh sách việc lần đầu khi tải trang
    renderTodos();
});
