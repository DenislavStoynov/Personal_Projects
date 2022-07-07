"use strict";
localStorage.setItem("roomValue", -5);
var connection = new signalR.HubConnectionBuilder().configureLogging(signalR.LogLevel.Debug)
.withUrl("https://localhost:44311/chatHub", {
  transport: signalR.HttpTransportType.WebSockets,
  skipNegotiation: true
}).build();


connection.on("ReceiveMessage", function (user, message) {
    var paragraph = document.createElement("p");
    document.getElementById("chatMessageHolder").appendChild(paragraph);
    // We can assign user-supplied strings to an element's textContent because it
    // is not interpreted as markup. If you're assigning in any other way, you
    // should be aware of possible script injection concerns.
    paragraph.textContent = `${user} says: ${message}`;
});

connection.start().then(function () {
}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("sendMessage").addEventListener("click", function (event) {
    var user = sessionStorage.getItem("Username");
    var message = document.getElementById("messageInput").value;
    connection.invoke("SendMessage", user, message).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});

const SendToRoom = (id)=>{
    
    var message = document.getElementById("inputMessege").value;
    connection.invoke("SendMessageToGroup",sessionStorage.getItem('Username'),id, message )
    event.preventDefault();
}

// connection.on("ReceiveGroupMessage", function (request) {
//     let paragraph;
//     if(request.chatRoom.includes(sessionStorage.getItem('Username'))){
//         paragraph = document.createElement("p");
//         paragraph.innerHTML = request.user + " says: " + request.message;
//         document.getElementById("chatContaiiner").appendChild(paragraph);
//     }
// })

/* Chat Rooms */

let sendMyMessage = document.getElementById('sendMyMessage');
let roomsHolder = document.getElementById('roomsHolder');
let roomsTextField = document.getElementById('roomsTextField');
let chatContainersHolder = document.getElementById('chatContainersHolder');
let headerTwo;
window.addEventListener('load', () => {
    getUserRooms();
})

const getUserRooms = () => {
    fetch("https://localhost:44311/api/ChatRoom/getUserRoomNames", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            Username: sessionStorage.getItem("Username")
        })
    }).then(res => res.json()).then(data => {
        data.forEach(room => {
            headerTwo = document.createElement("h2");
            headerTwo.innerHTML = room;
            headerTwo.classList.add("room-name");
            headerTwo.style.marginTop = "11px";
            roomsHolder.appendChild(headerTwo);
        });
        CreateMessageFields(roomsHolder);
        let roomName = document.getElementsByClassName('room-name');
        let chatContainer = document.getElementsByClassName('chat-container');
        HideRooms(chatContainer);
        PassRoomName(roomName, chatContainer);
    })
}

function HideRooms(chatContainer) {
    for (let i = 0; i < chatContainer.length; i++) {
        chatContainer[i].style.display = "none"
    }
    roomsTextField.style.display = "none";
}

function CreateMessageFields(roomsHolder) {
    let messageFieldDiv;
    for (let i = 0; i < roomsHolder.children.length; i++) {
        messageFieldDiv = document.createElement("div");
        messageFieldDiv.classList.add("chat-container");
        messageFieldDiv.setAttribute("id", roomsHolder.children[i].innerHTML);
        chatContainersHolder.appendChild(messageFieldDiv);
    }
}

function PassRoomName(roomName, chatContainer) {
    if (roomName.length > 0) {
        for (let i = 0; i < roomName.length; i++) {
            roomName[i].onclick = function () {
                sendMyMessage.setAttribute("onclick", "SendToRoom('" + roomName[i].innerHTML + "')");
                localStorage.setItem("roomValue", i);
                CloseOtherFields();
                chatContainer[i].style.display = "block";
                roomsTextField.style.display = "flex"; 
                for (let j = 0; j < chatContainer.length; j++) {
                    if (j != i) {
                        chatContainer[j].style.display = "none";
                    }
                }
            }
        }
        connection.on("ReceiveGroupMessage", function (request) {
            let paragraph;
            if (!request.chatRoom.includes(sessionStorage.getItem('Username'))) request.chatRoom.push(sessionStorage.getItem('Username')); // Add trainer to database
            if (request.chatRoom.includes(sessionStorage.getItem('Username'))) {
                paragraph = document.createElement("p");
                paragraph.innerHTML = request.user + " says: " + request.message;
                document.getElementById(request.roomName).appendChild(paragraph);
            }
        });
    }
}

function CloseOtherFields() {
    chatMessageHolder.style.display = "none";
    textField.style.display = "none";
    openRoomReminder.style.display = "none";
}