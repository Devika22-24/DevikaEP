// Select DOM elements
const tasksSection = document.getElementById("tasks-section");
const scheduledTasksSection = document.getElementById("scheduled-tasks-section");
const settingsSection = document.getElementById("settings-section");

const tasksBtn = document.getElementById("tasks-btn");
const scheduledTasksBtn = document.getElementById("scheduled-tasks-btn");
const settingsBtn = document.getElementById("settings-btn");

const taskInput = document.getElementById("task-input");
const taskDate = document.getElementById("task-date");
const taskTime = document.getElementById("task-time");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");
const scheduledTaskList = document.getElementById("scheduled-task-list");

// Show/hide sections
tasksBtn.addEventListener("click", () => {
    tasksSection.style.display = "block";
    scheduledTasksSection.style.display = "none";
    settingsSection.style.display = "none";
});

scheduledTasksBtn.addEventListener("click", () => {
    tasksSection.style.display = "none";
    scheduledTasksSection.style.display = "block";
    settingsSection.style.display = "none";
});

settingsBtn.addEventListener("click", () => {
    tasksSection.style.display = "none";
    scheduledTasksSection.style.display = "none";
    settingsSection.style.display = "block";
});

// Function to create task items
function createTaskElement(taskText, taskDateTime, listElement, syncWithOtherList = null) {
    const taskItem = document.createElement("li");
    taskItem.classList.add("task-item");

    // Create task text
    const taskDetails = document.createElement("span");
    taskDetails.textContent = `${taskText} - ${taskDateTime}`;
    taskItem.appendChild(taskDetails);

    // Create complete button
    const completeBtn = document.createElement("button");
    completeBtn.innerHTML = '<i class="fas fa-check"></i> Complete';
    completeBtn.classList.add("complete-btn");
    taskItem.appendChild(completeBtn);

    // Create delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i> Delete';
    deleteBtn.classList.add("delete-btn");
    taskItem.appendChild(deleteBtn);

    // Add task item to the provided list
    listElement.appendChild(taskItem);

    // Event: Mark task as completed
    completeBtn.addEventListener("click", () => {
        taskItem.classList.toggle("completed");
        if (syncWithOtherList) {
            const otherTask = syncWithOtherList.querySelector(`li:nth-child(${[...listElement.children].indexOf(taskItem) + 1})`);
            if (otherTask) {
                otherTask.classList.toggle("completed");
            }
        }
    });

    // Event: Delete task
    deleteBtn.addEventListener("click", () => {
        listElement.removeChild(taskItem);
        if (syncWithOtherList) {
            const otherTask = syncWithOtherList.querySelector(`li:nth-child(${[...listElement.children].indexOf(taskItem) + 1})`);
            if (otherTask) {
                syncWithOtherList.removeChild(otherTask);
            }
        }
    });

    return taskItem;
}

// Add tasks to both lists
addTaskBtn.addEventListener("click", () => {
    const task = taskInput.value.trim();
    const date = taskDate.value;
    const time = taskTime.value;

    if (task && date && time) {
        const taskDateTime = `${date} ${time}`;

        // Create task in "Today's Tasks"
        createTaskElement(task, taskDateTime, taskList, scheduledTaskList);

        // Create task in "Scheduled Tasks"
        createTaskElement(task, taskDateTime, scheduledTaskList, taskList);

        // Clear input fields
        taskInput.value = "";
        taskDate.value = "";
        taskTime.value = "";
    }
});
