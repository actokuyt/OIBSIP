var editTaskModal = new bootstrap.Modal(
  document.getElementById("editTaskModal")
);

let idCounter = 0;

function idGenerator() {
  return `task_${Date.now()}_${idCounter++}`;
}

let tasks = [
  {
    id: "task_100",
    text: "Demo Task 1",
    isCompleted: false,
  },
  {
    id: "task_200",
    text: "Demo Task 2",
    isCompleted: false,
  },
  {
    id: "task_300",
    text: "Demo Task 3",
    isCompleted: false,
  },
  {
    id: "task_400",
    text: "Demo Task 4",
    isCompleted: true,
  },
];
let parentId;

// Function to update UI
function updateUI(id, text, isCompleted) {
  const pendingTasks = document.getElementById("pending-task-list");
  const completedTasks = document.getElementById("completed-task-list");

  const taskItem = document.createElement("li");
  taskItem.className = "task-list-items";
  taskItem.setAttribute("id", `${id}`);

  const taskText = document.createElement("span");
  taskText.textContent = text;

  const completeButton = document.createElement("button");
  if (isCompleted == true) {
    completeButton.innerHTML = "<i class='bi bi-ban'></i>";
  } else {
    completeButton.innerHTML = "<i class='bi bi-check2-circle'></i>";
  }
  completeButton.addEventListener("click", (e) => {
    parentId = e.target.parentNode.parentNode.id;

    tasks.forEach((task) => {
      if (task.id == parentId && task.isCompleted == false) {
        task.isCompleted = true;
        updateUI(task.id, task.text, task.isCompleted);
        let completedTask = pendingTasks.querySelector(`#${task.id}`);
        pendingTasks.removeChild(completedTask);
      } else if (task.id == parentId && task.isCompleted == true) {
        task.isCompleted = false;
        updateUI(task.id, task.text, task.isCompleted);
        let pendingTask = completedTasks.querySelector(`#${task.id}`);
        completedTasks.removeChild(pendingTask);
      }
    });
  });

  const editButton = document.createElement("button");
  editButton.innerHTML = "<i class='bi bi-pencil-fill'></i>";
  editButton.addEventListener("click", (e) => {
    parentId = e.target.parentNode.parentNode.id;
    editTaskModal.toggle();
  });

  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = "<i class='bi bi-trash-fill'></i>";
  deleteButton.addEventListener("click", (e) => {
    parentId = e.target.parentNode.parentNode.id;
    let taskToDelete;
    tasks.forEach((task) => {
      if (task.id == parentId) {
        taskToDelete = task;
      }
    });
    tasks = tasks.filter((task) => task !== taskToDelete);
    const pendingTasks = document.getElementById("pending-task-list");
    const completedTasks = document.getElementById("completed-task-list");
    pendingTasks.innerHTML = "";
    completedTasks.innerHTML = "";
    tasks.forEach((task) => {
      updateUI(task.id, task.text, task.isCompleted);
    });
  });

  taskItem.appendChild(taskText);
  taskItem.appendChild(completeButton);
  taskItem.appendChild(editButton);
  taskItem.appendChild(deleteButton);

  if (isCompleted == false) {
    pendingTasks.appendChild(taskItem);
  } else {
    completedTasks.appendChild(taskItem);
  }
}

// handle edit task modal logic
const editTaskSubmitBtn = document.getElementById("editTaskSubmitBtn");
editTaskSubmitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const editedTask = document.getElementById("editTaskInput");
  const editedTaskValue = editedTask.value;
  tasks.forEach((task) => {
    if (task.id == parentId) {
      task.text = editedTaskValue;
    }
  });
  const pendingTasks = document.getElementById("pending-task-list");
  const completedTasks = document.getElementById("completed-task-list");
  pendingTasks.innerHTML = "";
  completedTasks.innerHTML = "";
  tasks.forEach((task) => {
    updateUI(task.id, task.text, task.isCompleted);
  });
  editedTask.value = "";
  editTaskModal.hide();
});

// fetch and display initial tasks on DOM load
document.addEventListener("DOMContentLoaded", () => {
  const pendingTasks = document.getElementById("pending-task-list");
  const completedTasks = document.getElementById("completed-task-list");
  pendingTasks.innerHTML = "";
  completedTasks.innerHTML = "";

  tasks.forEach((task) => {
    updateUI(task.id, task.text, task.isCompleted);
  });
});

// function to add task to tasks array
function addTask() {
  let id = idGenerator();
  let input = document.getElementById("input");
  let inputValue = input.value;
  if (inputValue.length < 1) {
    return;
  }

  const task = {
    id: id,
    text: inputValue,
    isCompleted: false,
  };

  tasks.push(task);
  updateUI(task.id, task.text, task.isCompleted);
  input.value = "";
}

// add task button event handler
const addTaskBtn = document.getElementById("submitBtn");
addTaskBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addTask();
});
