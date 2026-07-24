// add functionality
const taskInput = document.getElementById("taskInput");
const taskForm = document.getElementById("addTaskForm");
const taskList = document.getElementById("taskList");

taskForm.addEventListener("submit", addTask);

function addTask(event){
    event.preventDefault();
    const task = taskInput.value.trim();
    
    if (task === "") return;
    taskInput.value = "";

    const li = document.createElement("li");
    li.classList.add("task");
    taskList.appendChild(li);

    const label = document.createElement("label");
    label.classList.add("task__left");
    li.appendChild(label);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("task__checkbox");

    const span = document.createElement("span");
    span.classList.add("task__text");
    span.textContent = task;

    label.appendChild(checkbox);
    label.appendChild(span);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("task__delete");

    deleteBtn.setAttribute("aria-label", "Delete task");
    deleteBtn.setAttribute("type", "button"); // prevent it from submitting the form
    deleteBtn.textContent = "×";

    li.appendChild(deleteBtn);
    //When you create an event listener inside a function, it remembers the variables that were available at that moment.
    deleteBtn.addEventListener("click", function() {
        li.remove();
        updateCounts();
    });

    checkbox.addEventListener("change",function(event){
        li.classList.toggle("task--completed",event.target.checked ); //checkbox.checked);
        updateCounts();
    });

    updateCounts();
    
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