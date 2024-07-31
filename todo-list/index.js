const ui = {
  addTask: document.getElementById("add-task"),
  taskInput: document.getElementById("new-task"),
  todoList: document.getElementById("todo-list"),
  filterButton: document.querySelectorAll(".filter-button"),
};

let todos = [{ id: Date.now(), task: "task1", completed: false }];
let filter = "all";
let editId = null;

ui.addTask.addEventListener("click", addTask);

function addTask() {
  const task = ui.taskInput.value.trim();

  if (task) {
    if (editId) {
      todos = todos.map((todo) =>
        todo.id === editId ? { ...todo, task } : todo
      );
      editId = null;
    } else {
      todos.push({ id: Date.now(), task, completed: false });
    }
    ui.taskInput.value = "";
    renderTasks();
  }
}

function deleteTask(id) {
  todos = todos.filter((todo) => todo.id !== id);
  renderTasks();
}

function editTask(id) {
  const taskToEdit = todos.find((todo) => todo.id === id);
  ui.taskInput.value = taskToEdit.task;
  editId = id;
  ui.taskInput.focus();
}

function toggleStatus(id) {
  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
  renderTasks();
}
function updateFilterButtons() {
  ui.filterButton.forEach((button) => {
    if (button.dataset.filter === filter) {
      button.classList.add("bg-[#8f8f8f]", "text-white");
      button.classList.remove("bg-[#fff]");
    } else {
      button.classList.remove("bg-[#8f8f8f", "text-white");
      button.classList.add("bg-[#fff]");
    }
  });
}

// Call this function after initial rendering
updateFilterButtons();

function filterTasks(status) {
  filter = status;
  renderTasks();
  updateFilterButtons();
}

function renderTasks() {
  ui.todoList.innerHTML = "";

  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") return true;
    if (filter === "pending") return !todo.completed;
    if (filter === "completed") return todo.completed;
  });

  filteredTodos.forEach((todo) => {
    const li = document.createElement("li");
    li.className = `todo-item flex items-center justify-between p-2 border-b 
    }`;
    li.innerHTML = `
      <div class="flex items-center">
        <input type="checkbox" ${
          todo.completed ? "checked" : ""
        } onclick="toggleStatus(${todo.id})" class="mr-2">
        <span class="flex-1 cursor-pointer ${
          todo.completed ? "line-through" : ""
        }">${todo.task}</span>
      </div>
      <div>
        <button onclick="editTask(${
          todo.id
        })" class="ml-2 p-1 bg-[#0e86d4] text-white rounded-md"><img src="./img/pen.svg"></button>
        <button onclick="deleteTask(${
          todo.id
        })" class="ml-2 p-1 bg-[#ff0000] text-white rounded-md"><img src="./img/frame.svg"></button>
      </div>
    `;
    ui.todoList.appendChild(li);
  });
}

renderTasks();
