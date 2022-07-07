let userText = document.getElementById('userText');
let userAssignedTasks = document.getElementById('userAssignedTasks');

let userProgramObjective = document.getElementById('userProgramObjective');
let userWeeks = document.getElementById('userWeeks');
let userTrainingDescription = document.getElementById('userTrainingDescription');
const finishProgram = document.getElementById('finishProgram');

let userCalories = document.getElementById('userCalories');
let userProtein = document.getElementById('userProtein');
let userCarbs = document.getElementById('userCarbs');
let userFats = document.getElementById('userFats');
const completeNutritionBtn = document.getElementById('completeNutritionBtn');

let workoutProgress = document.getElementById('workoutProgress');
let tasksProgress = document.getElementById('tasksProgress');
let nutritionProgress = document.getElementById('nutritionProgress');

let trainerName = document.getElementById('trainerName');

function getNutrition() {
    fetch("https://localhost:44311/api/Nutrition/getNutrition", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            Username: sessionStorage.getItem("Username")
        })
    }).then(res => res.json()).then(data => {
        if (data.length > 0) {
            userCalories.value = data[0];
            userProtein.value = data[1];
            userCarbs.value = data[2];
            userFats.value = data[3];
        }
    })
}

function getTrainingProgram() {
    fetch("https://localhost:44311/api/TrainingProgram/getTrainingProgram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            Username: sessionStorage.getItem("Username")
        })
    }).then(res => res.json()).then(data => {
        if (data.length > 0) {
            userProgramObjective.value = data[0];
            userWeeks.value = data[1];
            userTrainingDescription.value = data[2];
        }
    })
}

function displayUsername() {
    userText.innerHTML = sessionStorage.getItem("Username");
    fetch("https://localhost:44311/api/Tasks/getTask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            Username: sessionStorage.getItem("Username")
        })
    }).then(res => res.json()).then(data => AppendTasksOnDashboard(data))
    getNutrition();
    getTrainingProgram();
    GetProgressValues();
    GetUserTrainer();
}

window.addEventListener('load', displayUsername);

function AppendTasksOnDashboard(data) {
    let divHolder;
    let spanTask;
    let anchorBtn;
    if (data.length < 1) {
        divHolder = document.createElement("div");
        divHolder.innerHTML = "No Tasks Assigned Yet";
        divHolder.style.fontSize = "21px";
        divHolder.style.textAlign = "center";
        userAssignedTasks.appendChild(divHolder);
    }
    else {
        for (let i = 0; i < data.length; i++) {
            divHolder = document.createElement("div");
            spanTask = document.createElement("span");
            anchorBtn = document.createElement("a");
            anchorBtn.innerHTML = "✓";
            anchorBtn.style.cursor = "pointer";
            anchorBtn.classList.add("finish-task-btn");
            spanTask.innerHTML = data[i];
            divHolder.appendChild(spanTask);
            divHolder.appendChild(anchorBtn);
            anchorBtn.style.float = "right";
            userAssignedTasks.appendChild(divHolder);
        }
        let finishTaskBtn = document.getElementsByClassName('finish-task-btn');
        for (let i = 0; i < finishTaskBtn.length; i++) {
            finishTaskBtn[i].onclick = function () {
                UpdateTaskProgressDb(data[i]);
                userAssignedTasks.removeChild(userAssignedTasks.children[i]);
            }
        }
    }
}

function UpdateTaskProgressDb(data) {
    fetch("https://localhost:44311/api/Progress/updateProgressTask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            Username: sessionStorage.getItem("Username"),
            TaskText: data
        })
    })
}

function DeleteTrainingProgressDb() {
    fetch("https://localhost:44311/api/Progress/updateProgressWorkouts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            Username: sessionStorage.getItem("Username"),
        })
    })
    userProgramObjective.value = null;
    userWeeks.value = null;
    userTrainingDescription.value = null;
}

finishProgram.addEventListener('click', DeleteTrainingProgressDb);

function DeleteNutritionProgressDb() {
    fetch("https://localhost:44311/api/Progress/updateProgressNutrition", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            Username: sessionStorage.getItem("Username"),
        })
    })
    userCalories.value = null;
    userProtein.value = null;
    userCarbs.value = null;
    userFats.value = null;
}

completeNutritionBtn.addEventListener('click', DeleteNutritionProgressDb);

function GetProgressValues() {
    fetch("https://localhost:44311/api/Progress/getProgress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            Username: sessionStorage.getItem("Username")
        })
    }).then(res => res.json()).then(data => {
        workoutProgress.style.width = data[0] + "%";
        tasksProgress.style.width = data[1] + "%";
        nutritionProgress.style.width = data[2] + "%";
    });
}

function GetUserTrainer() {
    if (sessionStorage.getItem("Question") == "neverTrained" || sessionStorage.getItem("Question") == "lessTwoYears") {
        trainerName.innerHTML = "Jorge";
    } else if (sessionStorage.getItem("Question") == "moreTwoYears") {
        trainerName.innerHTML = "Ben";
    } else if (sessionStorage.getItem("Question") == "moreFiveYears") {
        trainerName.innerHTML = "John";
    }
}

function UserLogout() {
    fetch('https://localhost:44311/api/Registration/logout', {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" }
    }).then(res => res.json()).then(data => {
        if (data.message == "success") {
            sessionStorage.clear();
            window.location.replace("http://localhost:8080");
        }
    })
}

let userMenusHolder = document.getElementById('userMenusHolder');
let activeNavSign = document.getElementsByClassName('active-nav-sign');
let navBtns = document.getElementsByClassName('nav-btns');

function HandleMenuChildren() {
    userMenusHolder.children[0].style.display = "block";
    for (let i = 1; i < userMenusHolder.children.length; i++) {
        userMenusHolder.children[i].style.display = "none";
    }
}

function HandleHavBtns() {
    activeNavSign[0].style.visibility = "visible";
    navBtns[0].classList.add("active-nav-btn");
    HandleMenuChildren();
    for (let i = 0; i < navBtns.length; i++) {
        navBtns[i].addEventListener('click', () => {
            activeNavSign[i].style.visibility = "visible";
            navBtns[i].classList.add("active-nav-btn");
            userMenusHolder.children[i].style.display = "block";
            for (let j = 0; j < navBtns.length; j++) {
                if (i != j) {
                    activeNavSign[j].style.visibility = "hidden";
                    navBtns[j].classList.remove("active-nav-btn");
                    userMenusHolder.children[j].style.display = "none";
                }
            }
        })
    }
}

window.addEventListener('load', HandleHavBtns);

/* Booking System */

function BookPrivateChatMeeting(event) {
    event.preventDefault();
    let bookingTextarea = document.getElementById('bookingTextarea');
    if (bookingTextarea.value && /\S/.test(bookingTextarea.value)) {
        fetch("https://localhost:44311/api/Booking/booking", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                BookingText: bookingTextarea.value,
                TrainerUsername: trainerName.innerHTML,
                User: sessionStorage.getItem("Username")
            })
        })
        alert("Your message is sent successfully!")
    } else {
        alert("Text area cannot be blank!")
    }
}

/* Chat System */

let chatMessageHolder = document.getElementById('chatMessageHolder');
let textField = document.getElementById('textField');
let openMainChat = document.getElementById('openMainChat');
let chatSystem = document.getElementById('chatSystem');
let openChatSystem = document.getElementById('openChatSystem');
let closeChatSystem = document.getElementById('closeChatSystem');
let openRoomReminder = document.getElementById('openRoomReminder');

function OpenChatSystem() {
    chatSystem.style.right = "31px";
}

openChatSystem.addEventListener('click', OpenChatSystem);

function CloseChatSystem() {
    chatSystem.style.right = "-100%";
}

closeChatSystem.addEventListener('click', CloseChatSystem);

function OpenMainChatRoom() {
    chatMessageHolder.style.display = "block";
    textField.style.display = "flex";
    openRoomReminder.style.display = "none";
}

openMainChat.addEventListener('click', OpenMainChatRoom);
