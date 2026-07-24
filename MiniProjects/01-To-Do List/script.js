// add functionality
const taskInput = document.getElementById("taskInput");
const taskForm = document.getElementById("addTaskForm");
const taskList = document.getElementById("taskList");

taskForm.addEventListener("submit", addTask);

function createTask(taskText, completed = false) {
    const li = document.createElement("li");
    li.classList.add("task");
    taskList.appendChild(li);

    const label = document.createElement("label");
    label.classList.add("task__left");
    li.appendChild(label);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("task__checkbox");
    checkbox.checked = completed;

    const span = document.createElement("span");
    span.classList.add("task__text");
    span.textContent = taskText;

    label.appendChild(checkbox);
    label.appendChild(span);

    if (completed) {
        li.classList.add("task--completed");
    }

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("task__delete");
    deleteBtn.setAttribute("aria-label", "Delete task");
    deleteBtn.setAttribute("type", "button");
    deleteBtn.textContent = "×";

    li.appendChild(deleteBtn);

    deleteBtn.addEventListener("click", function () {
        li.remove();
        saveTasks();
        updateCounts();
    });

    checkbox.addEventListener("change", function (event) {
        li.classList.toggle("task--completed", event.target.checked);
        saveTasks();
        updateCounts();
    });
}

function addTask(event){
    event.preventDefault();
    const task = taskInput.value.trim();
    
    if (task === "") return;

    createTask(task);

    taskInput.value = "";
}

const totalCount = document.getElementById("totalCount");
const completedCount = document.getElementById("completedCount");
const remainingCount = document.getElementById("remainingCount");

function updateCounts(){
    const actualCount = taskList.children.length;
    const actualCompleted = taskList.querySelectorAll(".task--completed").length;
    const remaining = actualCount - actualCompleted;

    totalCount.textContent = actualCount;
    completedCount.textContent = actualCompleted;
    remainingCount.textContent = remaining;

}

function saveTasks(){
    const taskArray = [];
    const allTasks = taskList.querySelectorAll(".task");  // returns NodeList

    allTasks.forEach(function(task) {
        const taskText = task.querySelector(".task__text").textContent;
        const completed = task.querySelector(".task__checkbox").checked;

        taskArray.push({
            text: taskText,
            completed: completed
        });
    });
    localStorage.setItem("tasks", JSON.stringify(taskArray));

}


function loadTasks(){
    const savedTasks = localStorage.getItem("tasks");
    if(savedTasks === null){
        return;
    }

    const taskArray = JSON.parse(savedTasks);
    taskArray.forEach(function(task){
        createTask(task.text, task.completed);
    });

    updateCounts();
}

loadTasks();