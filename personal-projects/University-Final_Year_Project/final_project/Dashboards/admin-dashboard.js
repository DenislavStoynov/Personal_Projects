const adminText = document.getElementById('adminText');
const usersList = document.getElementById('usersList');
const trainersList = document.getElementById('trainersList');
const subscribersList = document.getElementById('subscribersList');

function GetUsers() {
    fetch('https://localhost:44311/api/Registration/users', {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    }).then(res => res.json()).then(data => {
        for(let i = 0; i < data.length; i++) {
            let holder = document.createElement("div");
            let span = document.createElement("span");
            let anchor = document.createElement("anchor");
            span.innerHTML = data[i].username;
            anchor.innerHTML = "Block";
            anchor.style.float = "right";
            anchor.style.color = "#ff0000";
            anchor.style.cursor = "pointer";
            anchor.classList.add("block-btn")
            holder.appendChild(span);
            holder.appendChild(anchor);
            holder.classList.add("holder");
            usersList.appendChild(holder);
        }
        let blockBtn = document.getElementsByClassName('block-btn');
        for(let i = 0; i < blockBtn.length; i++) {
            blockBtn[i].onclick = function () {
                // Fetch
                RemoveUserFromDB(data[i].username);
                usersList.children[i].remove();
            }
        }
    })
}

function GetTrainers() {
    fetch('https://localhost:44311/api/Trainers/trainersList', {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    }).then(res => res.json()).then(data => {
        for(let i = 0; i < data.length; i++) {
            let holder = document.createElement("div");
            let span = document.createElement("span");
            let anchor = document.createElement("anchor");
            span.innerHTML = data[i].tUsername;
            anchor.innerHTML = "Block";
            anchor.style.float = "right";
            anchor.style.color = "#ff0000";
            anchor.style.cursor = "pointer";
            anchor.classList.add("block-btn-trainer")
            holder.appendChild(span);
            holder.appendChild(anchor);
            holder.classList.add("holder");
            trainersList.appendChild(holder);
        }
        console.log(data);
        let blockBtn = document.getElementsByClassName('block-btn-trainer');
        for(let i = 0; i < blockBtn.length; i++) {
            blockBtn[i].onclick = function () {
                // Fetch
                //RemoveTrainerFromDB(username)
                trainersList.children[i].remove();
            }
        }
    })
}

function GetSubscribers() {
    fetch('https://localhost:44311/api/Subscribers/getSubscribers', {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    }).then(res => res.json()).then(data => {
        for(let i = 0; i < data.length; i++) {
            let paragraph = document.createElement("p");
            paragraph.innerHTML = data[i].email;
            paragraph.style.marginBottom = "15px";
            paragraph.style.fontSize = "25px";
            paragraph.style.fontWeight = "bold";
            subscribersList.appendChild(paragraph);
        }
    })
}

function LoadEntities() {
    GetUsers();
    GetTrainers();
    GetSubscribers();
}

window.addEventListener('load', LoadEntities);

function GetAdminUsername() {
   adminText.innerHTML = sessionStorage.getItem("Username");
}

window.addEventListener('load', GetAdminUsername);

function AdminLogout() {
    fetch('https://localhost:44311/api/Admin/adminLogout', {
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

function RemoveUserFromDB(username) {
    fetch('https://localhost:44311/api/Admin/deleteUser', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            Username: username
        })
    })
}

function RemoveTrainerFromDB(username) {
    fetch('https://localhost:44311/api/Admin/deleteTrainer', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            Username: username
        })
    })
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

/* Trainer Registration */

function RegisterTrainer(event) {
    event.preventDefault();
    let trainerEmail = document.getElementById('trainerEmail').value;
    let trainerPassword = document.getElementById('trainerPassword').value;
    let trainerUsername = document.getElementById('trainerUsr').value;
    fetch("https://localhost:44311/api/Trainers/trainerRegister", {
        method: "POST",
        headers: { "Content-Type": "application/json", 'Accept': 'application/json' },
        body: JSON.stringify({
            trainerEmail: trainerEmail,
            trainerPassword: trainerPassword,
            trainerUsername: trainerUsername
        })
    }).then(res => res.json()).then(data => {
        if(data == "added") {
            alert("Trainer Added!")
        } else {
            alert("Maximum Three Trainers are Allowed!")
        }
    })
}