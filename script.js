// ===============================
// Anime TaskVerse
// Script.js - Part 1
// ===============================

// DOM Elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");
const themeToggle = document.getElementById("themeToggle");
const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter-btn");

let currentFilter = "all";
const xpText = document.getElementById("xp");
const xpFill = document.getElementById("xpFill");
const levelText = document.getElementById("level");
const streakDays = document.getElementById("streakDays");




// Task Array
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let xp = Number(localStorage.getItem("xp")) || 0;
let level = Number(localStorage.getItem("level")) || 1;
let streak = Number(localStorage.getItem("streak")) || 0;

// ===============================
// Save Tasks
// ===============================
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ===============================
// Render Tasks
// ===============================
function renderTasks() {

    taskList.innerHTML = "";

    const keyword = searchInput.value.toLowerCase();

    tasks.forEach((task, index) => {

        const searchMatch = task.text.toLowerCase().includes(keyword);

        if (!searchMatch) return;

        if (currentFilter === "completed" && !task.completed) return;

        if (currentFilter === "pending" && task.completed) return;

        const li = document.createElement("li");

        li.innerHTML = `
            <span class="${task.completed ? "completed" : ""}">
                ${task.text}
            </span>

            <div class="buttons">

                <button class="complete-btn" onclick="toggleTask(${index})">
                    ✔
                </button>

                <button class="edit-btn" onclick="editTask(${index})">
                    ✏
                </button>

                <button class="delete-btn" onclick="deleteTask(${index})">
                    🗑
                </button>

            </div>
        `;

        taskList.appendChild(li);

    });

    updateProgress();
    updateXP();
    saveTasks();

}


// ===============================
// Add Task
// ===============================
function addTask() {

    const text = taskInput.value.trim();

    if (text === "") {
        alert("Please enter a task.");
        return;
    }

    tasks.push({
        text: text,
        completed: false
    });

    // Increase streak
    streak++;

    // Update streak card
    updateStreak();

    taskInput.value = "";

    renderTasks();

}
// Button Click
addTaskBtn.addEventListener("click", addTask);

// Enter Key
taskInput.addEventListener("keypress", function(event){

    if(event.key === "Enter"){
        addTask();
    }

});



// Initial Load
renderTasks();


// ===============================
// Toggle Complete
// ===============================
function toggleTask(index){

    tasks[index].completed = !tasks[index].completed;

    if(tasks[index].completed){

        xp += 10;

        if(xp >= 100){

            xp = 0;
            level++;

            alert("🎉 Level Up!");

        }

    }

    updateXP();

    renderTasks();

}
// ===============================
// Delete Task
// ===============================

function deleteTask(index){

    const confirmDelete = confirm("Delete this task?");

    if(confirmDelete){

        tasks.splice(index,1);

        renderTasks();

    }

}

// ===============================
// Edit Task
// ===============================

function editTask(index){

    const updatedTask = prompt(
        "Edit your task:",
        tasks[index].text
    );

    if(updatedTask === null){
        return;
    }

    if(updatedTask.trim() === ""){
        alert("Task cannot be empty.");
        return;
    }

    tasks[index].text = updatedTask.trim();

    renderTasks();

}
function updateProgress(){

    const total = tasks.length;

    const completed = tasks.filter(task => task.completed).length;

    const percent = total === 0 ? 0 : (completed / total) * 100;

    progressFill.style.width = percent + "%";

    progressText.innerText = `${completed} / ${total} Completed`;

}
// ===============================
// Dark Mode
// ===============================

const savedTheme = localStorage.getItem("theme");

if(savedTheme === "dark"){

    document.body.classList.add("dark-mode");

    themeToggle.innerHTML = "☀";

}

themeToggle.addEventListener("click",()=>{

    document.body.classList.toggle("dark-mode");

    if(document.body.classList.contains("dark-mode")){

        localStorage.setItem("theme","dark");

        themeToggle.innerHTML="☀";

    }
    else{

        localStorage.setItem("theme","light");

        themeToggle.innerHTML="🌙";

    }

});
// ===============================
// Live Search
// ===============================

searchInput.addEventListener("keyup",()=>{

    renderTasks();

});
// ===============================
// Task Filters
// ===============================

filterButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        filterButtons.forEach(btn=>{

            btn.classList.remove("active");

        });

        button.classList.add("active");

        currentFilter = button.dataset.filter;

        renderTasks();

    });

});
function updateXP(){

    xpText.innerText = xp;

    xpFill.style.width = xp + "%";

    levelText.innerText = level;

    localStorage.setItem("xp",xp);

    localStorage.setItem("level",level);

}
updateXP();
function updateStreak(){

    streakDays.innerText = streak + " Days";

    localStorage.setItem("streak",streak);

}
// ===============================
// Sakura Animation
// ===============================

const petalsContainer = document.getElementById("petals");

function createPetal(){

    const petal = document.createElement("div");

    petal.classList.add("petal");

    petal.style.left = Math.random()*100 + "%";

    petal.style.animationDuration =
        Math.random()*5 + 5 + "s";

    petal.style.opacity =
        Math.random();

    petal.style.width =
        Math.random()*10 + 10 + "px";

    petal.style.height =
        petal.style.width;

    petalsContainer.appendChild(petal);

    setTimeout(()=>{

        petal.remove();

    },10000);

}

setInterval(createPetal,300);