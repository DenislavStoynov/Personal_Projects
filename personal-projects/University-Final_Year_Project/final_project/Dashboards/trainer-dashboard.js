const navBtns = document.getElementsByClassName('nav-btns');
const activeNavSign = document.getElementsByClassName('active-nav-sign');
const usersHolder = document.getElementById('usersHolder');
const trainerMenusHolder = document.getElementById('trainerMenusHolder');
const totalUsers = document.getElementById('totalUsers'); // select options tag
const assignedMetrics = document.getElementById('assignedMetrics')
const addTaskBtn = document.getElementById('addTaskBtn');
const assignedTasks = document.getElementById('assignedTasks');
const difficulty = document.querySelector('input[name="task_difficulty"]:checked');
const taskTextarea = document.getElementById("taskTextarea");
const trainerLogout = document.getElementById('trainerLogout');
const trainerUsername = document.getElementById('trainerUsername');
const assignedProgram = document.getElementById('assignedProgram');
const searchBar = document.getElementById('searchBar');
let localStorageArr = JSON.parse(localStorage.getItem('ToDoList')) || [];

let beginnerUser = [];
let midUser = [];
let advancedUser = [];

function HandleMenuChildren() {
    trainerMenusHolder.children[0].style.display = "block";
    for (let i = 1; i < trainerMenusHolder.children.length; i++) {
        trainerMenusHolder.children[i].style.display = "none";
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
            trainerMenusHolder.children[i].style.display = "block";
            for (let j = 0; j < navBtns.length; j++) {
                if (i != j) {
                    activeNavSign[j].style.visibility = "hidden";
                    navBtns[j].classList.remove("active-nav-btn");
                    trainerMenusHolder.children[j].style.display = "none";
                }
            }
        })
    }
}

window.addEventListener('load', HandleHavBtns);

function AddUsersToArr(data) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].q1 == "neverTrained" || data[i].q1 == "lessTwoYears") {
            beginnerUser.push(data[i].username);
        } else if (data[i].q1 == "moreTwoYears") {
            midUser.push(data[i].username);
        } else if (data[i].q1 == "moreFiveYears") {
            advancedUser.push(data[i].username);
        }
    }
}

function CreateTags(array) {
    let userParagraph, mainDiv, innerDiv, workoutDivHolder, taskDivHolder, nutritionDivHolder, workoutText, taskText, nutritionText, workoutDiv, taskDiv, nutritionDiv,
        positiveWorkout, negativeWorkout, positiveTasks, negativeTasks, positiveNutrition, negativeNutrition;
    let counter = 1;
    for (let i = 0; i < 6; i++) {
        mainDiv = document.createElement("div");    // Main Div Holder
        mainDiv.classList.add("main-div");
        userParagraph = document.createElement("p"); // first 6 Usernames
        userParagraph.classList.add("username-paragraph");
        innerDiv = document.createElement("div");   // inner div, holding progress divs
        workoutText = document.createElement("p");
        workoutText.innerHTML = "Workouts";
        /* =================================================================== */
        workoutDiv = document.createElement("div");
        workoutDiv.classList.add("workout-div");
        workoutDiv.style.display = "flex";
        workoutDiv.style.position = "relative";
        positiveWorkout = document.createElement("div");
        positiveWorkout.classList.add("positive-workout")
        positiveWorkout.style.position = "absolute";
        positiveWorkout.style.width = 0 + "%";
        positiveWorkout.style.height = 16 + "px";
        positiveWorkout.style.backgroundColor = "#00ff8c";

        negativeWorkout = document.createElement("div");
        negativeWorkout.classList.add("negative-workout");
        negativeWorkout.style.width = 100 + "%";
        negativeWorkout.style.height = 16 + "px";
        negativeWorkout.style.backgroundColor = "#ff4b4b";
        workoutDiv.appendChild(positiveWorkout);
        workoutDiv.appendChild(negativeWorkout);
        /* =================================================================== */
        taskDiv = document.createElement("div");
        taskDiv.classList.add("task-div");
        taskDiv.style.display = "flex";
        taskDiv.style.position = "relative";
        positiveTasks = document.createElement("div");
        positiveTasks.classList.add("positive-tasks")
        positiveTasks.style.position = "absolute";
        positiveTasks.style.width = 0 + "%";
        positiveTasks.style.height = 16 + "px";
        positiveTasks.style.backgroundColor = "#00ff8c";

        negativeTasks = document.createElement("div");
        negativeTasks.classList.add("negative-tasks");
        negativeTasks.style.width = 100 + "%";
        negativeTasks.style.height = 16 + "px";
        negativeTasks.style.backgroundColor = "#ff4b4b";
        taskDiv.appendChild(positiveTasks);
        taskDiv.appendChild(negativeTasks);
        /* =================================================================== */
        nutritionDiv = document.createElement("div");
        nutritionDiv.classList.add("nutrition-div");
        nutritionDiv.style.display = "flex";
        nutritionDiv.style.position = "relative";
        positiveNutrition = document.createElement("div");
        positiveNutrition.classList.add("positive-nutrition")
        positiveNutrition.style.position = "absolute";
        positiveNutrition.style.width = 0 + "%";
        positiveNutrition.style.height = 16 + "px";
        positiveNutrition.style.backgroundColor = "#00ff8c";

        negativeNutrition = document.createElement("div");
        negativeNutrition.classList.add("negative-nutrition");
        negativeNutrition.style.width = 100 + "%";
        negativeNutrition.style.height = 16 + "px";
        negativeNutrition.style.backgroundColor = "#ff4b4b";
        nutritionDiv.appendChild(positiveNutrition);
        nutritionDiv.appendChild(negativeNutrition);
        /* =================================================================== */
        taskText = document.createElement("p");
        taskText.innerHTML = "Tasks";

        nutritionText = document.createElement("p");
        nutritionText.innerHTML = "Nutrition";

        workoutDivHolder = document.createElement("div"); // first progress div
        workoutDivHolder.appendChild(workoutText);
        workoutDivHolder.appendChild(workoutDiv);
        workoutDivHolder.classList.add("workout-progress-holder");

        taskDivHolder = document.createElement("div");    // second progress div
        taskDivHolder.appendChild(taskText);
        taskDivHolder.appendChild(taskDiv);
        taskDivHolder.classList.add("tasks-progress-holder");

        nutritionDivHolder = document.createElement("div");   // third progress div
        nutritionDivHolder.appendChild(nutritionText);
        nutritionDivHolder.appendChild(nutritionDiv);
        nutritionDivHolder.classList.add("nutrition-progress-holder");

        innerDiv.appendChild(workoutDivHolder);
        innerDiv.appendChild(taskDivHolder);
        innerDiv.appendChild(nutritionDivHolder);
        innerDiv.classList.add("progress-holder");
        userParagraph.innerHTML = counter + "." + " " + array[i];
        mainDiv.appendChild(userParagraph);
        mainDiv.appendChild(innerDiv);
        usersHolder.appendChild(mainDiv);
        counter++;
    }
}

function CreateSelectOptions(arrayType) {
    let option;
    arrayType.forEach(element => {
        option = document.createElement("option");
        assignedProgram.appendChild(option);
        option.innerHTML = element;
    })
    arrayType.forEach(element => {
        option = document.createElement("option");
        totalUsers.appendChild(option);
        option.innerHTML = element;
    });
    arrayType.forEach(element => {
        option = document.createElement("option");
        assignedMetrics.appendChild(option);
        option.innerHTML = element;
    })
}

function RegistrationAPI() {
    fetch('https://localhost:44311/api/Registration/users', {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    }).then(res => res.json()).then(data => {
        AddUsersToArr(data);
        if (sessionStorage.getItem("Username") == "Jorge") {
            CreateTags(beginnerUser);
            CreateSelectOptions(beginnerUser);
            GetProgressOfAllUsers(beginnerUser);
            AddUserPopup(beginnerUser);
            ValidateSearchBar(beginnerUser);
            GenerateChatMembers(beginnerUser);
            GetUsersGoals(beginnerUser);
        } else if (sessionStorage.getItem("Username") == "Ben") {
            CreateTags(midUser);
            CreateSelectOptions(midUser);
            GetProgressOfAllUsers(midUser);
            AddUserPopup(midUser);
            ValidateSearchBar(midUser);
            GenerateChatMembers(midUser);
            GetUsersGoals(midUser);
        } else if (sessionStorage.getItem("Username") == "John") {
            CreateTags(advancedUser);
            CreateSelectOptions(advancedUser);
            GetProgressOfAllUsers(advancedUser);
            AddUserPopup(advancedUser);
            ValidateSearchBar(advancedUser);
            GenerateChatMembers(advancedUser);
            GetUsersGoals(advancedUser);
        }
    });
    GetAllBookings();
}

window.addEventListener('load', RegistrationAPI);

/* Search Bar */

function ValidateSearchBar(array) {
    let mainDiv = document.getElementsByClassName('main-div');
    searchBar.addEventListener('keyup', (event) => {
        const searchString = event.target.value.toLowerCase();
        array.filter(user => {
            for (let i = 0; i < mainDiv.length; i++) {
                if (mainDiv[i].firstChild.innerHTML.toLowerCase().includes(searchString) && searchString != "" && searchString != " ") {
                    mainDiv[i].firstChild.style.color = "#0053ff";
                } else {
                    mainDiv[i].firstChild.style.color = "#000";
                }
            }
        });
    });
}

/* Add Task To User */

function AddTaskToUser(event) {
    event.preventDefault();
    let taskTextarea = document.getElementById("taskTextarea").value;
    let totalUsers = document.getElementById('totalUsers').value;

    fetch('https://localhost:44311/api/Tasks/createTask', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username: totalUsers,
            textareavalue: taskTextarea
        })
    })

    alert("Task Assigned To " + totalUsers);
}

function TrainerLogout() {
    fetch('https://localhost:44311/api/Trainers/trainerLogout', {
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

trainerLogout.addEventListener('click', TrainerLogout);

/* Add Nutritions to User */

function AddNutritionToUser(event) {
    event.preventDefault();
    let assignedMetrics = document.getElementById('assignedMetrics').value;
    let calories = document.getElementById("calories").value;
    let protein = document.getElementById("protein").value;
    let carbs = document.getElementById("carbs").value;
    let fats = document.getElementById("fats").value;

    fetch('https://localhost:44311/api/Nutrition/createNutrition', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            Username: assignedMetrics,
            Calories: calories,
            Protein: protein,
            Carbohydrates: carbs,
            Fats: fats
        })
    })

    alert("Diet Plant Assigned To " + assignedMetrics);
}

/* Add Training Program To User */

function AddTrainingProgramToUser(event) {
    event.preventDefault();
    let assignedProgram = document.getElementById('assignedProgram').value;
    let programObjective = document.getElementById("programObjective").value;
    let programWeeks = document.getElementById("programWeeks").value;
    let programTextarea = document.getElementById("programTextarea").value;

    fetch('https://localhost:44311/api/TrainingProgram/createTrainingProgram', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            Username: assignedProgram,
            Objective: programObjective,
            Weeks: programWeeks,
            Description: programTextarea
        })
    })
    alert("Training Program Assigned To " + assignedProgram);
}

/* Display trainer's username */
window.addEventListener('load', () => {
    trainerUsername.innerHTML = sessionStorage.getItem("Username");
})

/* Trainer Button Popups */

const addClientPopup = document.getElementById('addClientPopup');
const addClient = document.getElementById('addClient');
const closeAddClientPopup = document.getElementById('closeAddClientPopup');

function AddUserPopup(arrayType) {
    let p;
    let pArr = [];
    let cnt = usersHolder.children.length + 1;
    if (arrayType.length > 6) {
        for (let i = 6; i < arrayType.length; i++) {
            p = document.createElement("p");
            addClientPopup.appendChild(p);
            p.innerHTML = arrayType[i];
            pArr.push(p);
        }
        for (let i = 0; i < pArr.length; i++) {
            pArr[i].onclick = function () {
                getUserProgress(pArr[i].innerHTML, cnt, pArr[i]);
                cnt++;
                pArr[i].remove();
                localStorage.clear();
            }
        }
    }
}

addClient.addEventListener('click', () => {
    addClientPopup.style.display = "block";
})

closeAddClientPopup.addEventListener('click', () => {
    addClientPopup.style.display = "none";
});

/* Get Progress of All Users */

function GetProgressOfAllUsers(array) {
    fetch('https://localhost:44311/api/Progress/getProgressOfAllUsers', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            MyList: array,
        })
    }).then(res => res.json()).then(data => {
        console.log(data);
        let positiveWorkout = document.getElementsByClassName('positive-workout');
        let positiveTasks = document.getElementsByClassName('positive-tasks');
        let positiveNutrition = document.getElementsByClassName('positive-nutrition');
        for (let i = 0; i < 6; i++) {
            positiveWorkout[i].style.width = Object.values(data)[i][0] + "%"; // 0 value corresponds to workout
            positiveTasks[i].style.width = Object.values(data)[i][1] + "%"; // 1 value corresponds to tasks
            positiveNutrition[i].style.width = Object.values(data)[i][2] + "%"; // 2 value corresponds to nutrition
        }
    });
}

/* Get Progress of Particular User */

function getUserProgress(username, cnt, textUsername) {
    fetch('https://localhost:44311/api/Progress/getProgress', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            Username: username,
        })
    }).then(res => res.json()).then(data => {
        localStorage.setItem(username, data);
        CreateUserProgress(cnt, textUsername);
    });
}

/* Create User Progress */

function CreateUserProgress(cnt, username) {
    let userParagraph, mainDiv, innerDiv, workoutDivHolder, taskDivHolder, nutritionDivHolder, workoutText, taskText, nutritionText, workoutDiv, taskDiv, nutritionDiv,
        positiveWorkout, negativeWorkout, positiveTasks, negativeTasks, positiveNutrition, negativeNutrition;
    mainDiv = document.createElement("div");    // Main Div Holder
    mainDiv.classList.add("main-div");
    userParagraph = document.createElement("p"); // first 6 Usernames
    userParagraph.classList.add("username-paragraph");
    innerDiv = document.createElement("div");   // inner div, holding progress divs
    workoutText = document.createElement("p");
    workoutText.innerHTML = "Workouts";
    /* =================================================================== */
    workoutDiv = document.createElement("div");
    workoutDiv.classList.add("workout-div");
    workoutDiv.style.display = "flex";
    workoutDiv.style.position = "relative";
    positiveWorkout = document.createElement("div");
    positiveWorkout.classList.add("positive-workout")
    positiveWorkout.style.position = "absolute";
    positiveWorkout.style.width = 0 + "%";
    positiveWorkout.style.height = 16 + "px";
    positiveWorkout.style.backgroundColor = "#00ff8c";

    negativeWorkout = document.createElement("div");
    negativeWorkout.classList.add("negative-workout");
    negativeWorkout.style.width = 100 + "%";
    negativeWorkout.style.height = 16 + "px";
    negativeWorkout.style.backgroundColor = "#ff4b4b";
    workoutDiv.appendChild(positiveWorkout);
    workoutDiv.appendChild(negativeWorkout);
    /* =================================================================== */
    taskDiv = document.createElement("div");
    taskDiv.classList.add("task-div");
    taskDiv.style.display = "flex";
    taskDiv.style.position = "relative";
    positiveTasks = document.createElement("div");
    positiveTasks.classList.add("positive-tasks")
    positiveTasks.style.position = "absolute";
    positiveTasks.style.width = 0 + "%";
    positiveTasks.style.height = 16 + "px";
    positiveTasks.style.backgroundColor = "#00ff8c";

    negativeTasks = document.createElement("div");
    negativeTasks.classList.add("negative-tasks");
    negativeTasks.style.width = 100 + "%";
    negativeTasks.style.height = 16 + "px";
    negativeTasks.style.backgroundColor = "#ff4b4b";
    taskDiv.appendChild(positiveTasks);
    taskDiv.appendChild(negativeTasks);
    /* =================================================================== */
    nutritionDiv = document.createElement("div");
    nutritionDiv.classList.add("nutrition-div");
    nutritionDiv.style.display = "flex";
    nutritionDiv.style.position = "relative";
    positiveNutrition = document.createElement("div");
    positiveNutrition.classList.add("positive-nutrition")
    positiveNutrition.style.position = "absolute";
    positiveNutrition.style.width = 0 + "%";
    positiveNutrition.style.height = 16 + "px";
    positiveNutrition.style.backgroundColor = "#00ff8c";

    negativeNutrition = document.createElement("div");
    negativeNutrition.classList.add("negative-nutrition");
    negativeNutrition.style.width = 100 + "%";
    negativeNutrition.style.height = 16 + "px";
    negativeNutrition.style.backgroundColor = "#ff4b4b";
    nutritionDiv.appendChild(positiveNutrition);
    nutritionDiv.appendChild(negativeNutrition);
    /* =================================================================== */
    taskText = document.createElement("p");
    taskText.innerHTML = "Tasks";

    nutritionText = document.createElement("p");
    nutritionText.innerHTML = "Nutrition";

    workoutDivHolder = document.createElement("div"); // first progress div
    workoutDivHolder.appendChild(workoutText);
    workoutDivHolder.appendChild(workoutDiv);
    workoutDivHolder.classList.add("workout-progress-holder");

    taskDivHolder = document.createElement("div");    // second progress div
    taskDivHolder.appendChild(taskText);
    taskDivHolder.appendChild(taskDiv);
    taskDivHolder.classList.add("tasks-progress-holder");

    nutritionDivHolder = document.createElement("div");   // third progress div
    nutritionDivHolder.appendChild(nutritionText);
    nutritionDivHolder.appendChild(nutritionDiv);
    nutritionDivHolder.classList.add("nutrition-progress-holder");

    innerDiv.appendChild(workoutDivHolder);
    innerDiv.appendChild(taskDivHolder);
    innerDiv.appendChild(nutritionDivHolder);
    innerDiv.classList.add("progress-holder");
    userParagraph.innerHTML = cnt + "." + " " + username.innerHTML;

    mainDiv.appendChild(userParagraph);
    mainDiv.appendChild(innerDiv);
    usersHolder.appendChild(mainDiv);

    positiveWorkout.style.width = localStorage.getItem(username.innerHTML)[0] + "%"; // 0 value corresponds to workout
    positiveTasks.style.width = localStorage.getItem(username.innerHTML)[2] + "%"; // 1 value corresponds to tasks
    positiveNutrition.style.width = localStorage.getItem(username.innerHTML)[4] + "%"; // 2 value corresponds to nutrition
}

/* Chat System */

let chatMessageHolder = document.getElementById('chatMessageHolder');
let textField = document.getElementById('textField');
let openMainChat = document.getElementById('openMainChat');
let chatSystem = document.getElementById('chatSystem');
let openChatSystem = document.getElementById('openChatSystem');
let closeChatSystem = document.getElementById('closeChatSystem');
let addChatRoom = document.getElementById('addChatRoom');
let roomCreation = document.getElementById('roomCreation');
let createChatRoom = document.getElementById('createChatRoom');
let cancelChatCreation = document.getElementById('cancelChatCreation');
let chatMembersContainer = document.getElementById('chatMembersContainer');
let roomName = document.getElementById('roomName');
let createRoomReminder = document.getElementsByClassName('create-room-reminder')[0];
let chosenUsers = [];

function OpenChatSystem() {
    chatSystem.style.right = "31px";
}

openChatSystem.addEventListener('click', OpenChatSystem);

function CloseChatSystem() {
    chatSystem.style.right = "-100%";
}

closeChatSystem.addEventListener('click', CloseChatSystem);

function OpenRoomCreation() {
    createRoomReminder.style.display = "none";
    chatMessageHolder.style.display = "none";
    textField.style.display = "none";
    roomCreation.style.display = "block";
    document.getElementById('chatContainersHolder').style.visibility = "hidden";
    openMainChat.style.backgroundColor = "#00041c";
    for(let i = 0; i < document.getElementById('roomsHolder').children.length; i++) { 
        document.getElementById('roomsHolder').children[i].style.backgroundColor = "#00041c";
    }
}

function CloseRoomCreation() {
    createRoomReminder.style.display = "block";
    roomCreation.style.display = "none";
    for (let i = 0; i < chatMembersContainer.children.length; i++) {
        chatMembersContainer.children[i].style.fontWeight = "normal";
    }
    chosenUsers.splice(0, chosenUsers.length);
}

addChatRoom.addEventListener('click', OpenRoomCreation);

cancelChatCreation.addEventListener('click', CloseRoomCreation);

function OpenMainChatRoom() {
    chatMessageHolder.style.display = "block";
    textField.style.display = "flex";
    createRoomReminder.style.display = "none";
    roomCreation.style.display = "none";
    document.getElementById('chatContainersHolder').style.visibility = "hidden";
}

openMainChat.addEventListener('click', OpenMainChatRoom);

function GenerateChatMembers(array) {
    let para;
    array.forEach(user => {
        para = document.createElement("p");
        para.innerHTML = user;
        para.style.margin = "0 0 11px 5px";
        para.style.fontSize = "16px";
        para.style.fontWeight = "normal";
        para.style.cursor = "pointer";
        chatMembersContainer.appendChild(para);
    });
    PickAndRemoveChatMembers(chosenUsers);
}

function PickAndRemoveChatMembers(array) {
    for (let i = 0; i < chatMembersContainer.children.length; i++) {
        chatMembersContainer.children[i].onclick = function () {
            if (chatMembersContainer.children[i].style.fontWeight == "normal") {
                chatMembersContainer.children[i].style.fontWeight = "bold";
                array.push(chatMembersContainer.children[i].innerHTML);
            } else {
                chatMembersContainer.children[i].style.fontWeight = "normal";
                var removeEl = array.indexOf(chatMembersContainer.children[i].innerHTML);
                array.splice(removeEl, 1);
            }
        }
    }
}

createChatRoom.addEventListener('click', async () => {
    if (roomName.value.length > 7) {
        alert("Room name must be less than 7 characters! (Whitespace is count as character)");
    } else if (chosenUsers.length > 0 && roomName.value && /\S/.test(roomName.value)) {
        console.log(roomName.value + "->" + chosenUsers);
        var id = await createRoomInDb();
        console.log(id);
        alert("Room Created!")
    } else {
        alert("All fields are required!")
    }
})

/* Booking System */

let bookingsHolder = document.getElementById('bookingsHolder');
let noBookings = document.getElementById('noBookings');

function GetAllBookings() {
    fetch("https://localhost:44311/api/Booking/getBooking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            TrainerUsername: sessionStorage.getItem("Username"),
        })
    }).then(res => res.json()).then(data => {
        if (Object.keys(data).length > 0) {
            noBookings.style.display = "none";
            let mainDiv, username, bookingText, acceptButton;
            for (let i = 0; i < Object.keys(data).length; i++) {
                mainDiv = document.createElement("div");
                mainDiv.classList.add("booking-content");
                mainDiv.style.marginBottom = "15px";
                mainDiv.style.fontSize = "19px";

                username = document.createElement("span");
                username.innerHTML = Object.keys(data)[i] + " - ";
                mainDiv.appendChild(username);

                bookingText = document.createElement("span");
                bookingText.innerHTML = Object.values(data)[i];
                mainDiv.appendChild(bookingText);

                acceptButton = document.createElement("span");
                acceptButton.classList.add("accept-button");
                acceptButton.innerHTML = "✓";
                acceptButton.style.float = "right";
                acceptButton.style.cursor = "pointer";
                mainDiv.appendChild(acceptButton);

                bookingsHolder.appendChild(mainDiv);
            }
            acceptButton = document.getElementsByClassName('accept-button');
            mainDiv = document.getElementsByClassName('booking-content');
            MarkBookingsAsRead(acceptButton, mainDiv, Object.values(data));
            // for(let acce)
            // acceptButton.onclick = function 
        } else {
            noBookings.style.display = "block";
        }
    });
}

function MarkBookingsAsRead(button, content, text) {
    for (let i = 0; i < button.length; i++) {
        button[i].onclick = function () {
            // Fetch and delete from database
            content[i].remove();
            fetch("https://localhost:44311/api/Booking/deleteBooking", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    BookingText: text[i]
                })
            })
        }
    }
}

const createRoomInDb = async () => {
    var request = await fetch("https://localhost:44311/api/ChatRoom/createRoom", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            users: chosenUsers,
            roomName: roomName.value
        })
    })

    var result = await request.json();
    return result;
}

/* View Clients Goals */

const viewClientsGoals = document.getElementById('viewClientsGoals');
const closeClientsGoalsWindowBtn = document.getElementById('closeClientsGoalsWindow');
const clientsGoalsBtn = document.getElementById('clientsGoalsBtn');

function OpenClientsGoalsWindow() {
    viewClientsGoals.style.display = "block";
}

clientsGoalsBtn.addEventListener('click', OpenClientsGoalsWindow);

function CloseClientsGoalsWindow() {
    viewClientsGoals.style.display = "none";
}

closeClientsGoalsWindowBtn.addEventListener('click', CloseClientsGoalsWindow);

function GetUsersGoals(array) {
    fetch("https://localhost:44311/api/Registration/getUsersGoals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            users: array
        })
    }).then(res => res.json()).then(data => {
        for (let i = 0; i < array.length; i++) {
            let paragraph = document.createElement("p");
            if (data[i] == "loseWeight") {
                data[i] = "Lose Weight";
            } else if (data[i] == "gainMuscleMass") {
                data[i] = "Gain Muscle Mass";
            } else if(data[i] == "maintainShape") {
                data[i] = "Maintain Shape";
            } else if(data[i] == "getShredded") {
                data[i] = "Get Shredded";
            }
            paragraph.innerHTML = array[i] + "->" + data[i];
            viewClientsGoals.appendChild(paragraph);
        }
    });
}
