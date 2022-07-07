"use strict";

var connection = new signalR.HubConnectionBuilder().configureLogging(signalR.LogLevel.Debug)
    .withUrl("https://localhost:44311/chatHub", {
        transport: signalR.HttpTransportType.WebSockets,
        skipNegotiation: true
    }).build();

//Disable send button until connection is established
document.getElementById("sendMessage").disabled = true;

connection.on("ReceiveMessage", function (user, message) {
    var paragraph = document.createElement("p");
    document.getElementById("chatMessageHolder").appendChild(paragraph);
    // We can assign user-supplied strings to an element's textContent because it
    // is not interpreted as markup. If you're assigning in any other way, you
    // should be aware of possible script injection concerns.
    paragraph.textContent = `${user} says: ${message}`;
});

connection.start().then(function () {
    document.getElementById("sendMessage").disabled = false;
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

// --------------------------------------------------- Groups --------------------------------------

document.getElementById('createChatRoom').addEventListener('click', (event) => {
    if (!chosenUsers.includes(sessionStorage.getItem("Username")))
        chosenUsers.push(sessionStorage.getItem("Username"))
    //connection.invoke("AddToGroup", document.getElementById('roomName').value, users);
})

const SendToRoom = (id) => {
    var message = document.getElementById("inputMessege").value;
    connection.invoke("SendMessageToGroup", sessionStorage.getItem('Username'), id, message)
    event.preventDefault();
}

// connection.on("ReceiveGroupMessage", function (request) {
//     let paragraph;
//     if (!request.chatRoom.includes(sessionStorage.getItem('Username'))) request.chatRoom.push(sessionStorage.getItem('Username')); // Add trainer to database
//     if (request.chatRoom.includes(sessionStorage.getItem('Username'))) {
//         paragraph = document.createElement("p");
//         paragraph.innerHTML = request.user + " says: " + request.message;
//         document.getElementById("chatContaiiner").appendChild(paragraph);
//     }
// });

let sendMyMessage = document.getElementById('sendMyMessage');
let roomsHolder = document.getElementById('roomsHolder');
let roomsTextField = document.getElementById('roomsTextField');
let chatContainersHolder = document.getElementById('chatContainersHolder');
let deleteChatRoomPopUp = document.getElementById('deleteChatRoomPopUp');
let deleteChatRoom = document.getElementById('deleteChatRoom');
let cancelDeleting = document.getElementById('cancelDeleting');
let headerTwo;
window.addEventListener('load', () => {
    getTrainerRooms();
})

const getTrainerRooms = () => {
    fetch("https://localhost:44311/api/ChatRoom/getRoomNames", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
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
    let deleteRoomBtn;
    for (let i = 0; i < roomsHolder.children.length; i++) {
        deleteRoomBtn = document.createElement('span');
        messageFieldDiv = document.createElement("div");
        messageFieldDiv.classList.add("chat-container");
        messageFieldDiv.style.position = "relative";
        messageFieldDiv.style.overflow = "scroll";
        messageFieldDiv.setAttribute("id", roomsHolder.children[i].innerHTML);
        deleteRoomBtn.classList.add("delete-room");
        deleteRoomBtn.style.position = "absolute";
        deleteRoomBtn.style.top = 0;
        deleteRoomBtn.style.right = "25px";
        deleteRoomBtn.innerHTML = "X";
        deleteRoomBtn.style.fontSize = "21px";
        deleteRoomBtn.style.fontWeight = "bold";
        deleteRoomBtn.style.color = "#ff0000";
        deleteRoomBtn.style.cursor = "pointer";
        messageFieldDiv.appendChild(deleteRoomBtn);
        chatContainersHolder.appendChild(messageFieldDiv);
    }
    DeleteRoom();
}

function PassRoomName(roomName, chatContainer) {
    if (roomName.length > 0) {
        for (let i = 0; i < roomName.length; i++) {
            roomName[i].onclick = function () {
                document.getElementById('chatContainersHolder').style.visibility = "visible";
                document.getElementById('roomsTextField').style.display = "flex";
                roomName[i].style.backgroundColor = "blue";
                sendMyMessage.setAttribute("onclick", "SendToRoom('" + roomName[i].innerHTML + "')");
                localStorage.setItem("roomValue", i);
                CloseOtherFields();
                chatContainer[i].style.display = "block";
                roomsTextField.style.display = "flex";
                for (let j = 0; j < chatContainer.length; j++) {
                    if (j != i) {
                        roomName[j].style.backgroundColor = "#00041c";
                        chatContainer[j].style.display = "none";
                        document.getElementById('openMainChat').style.backgroundColor = "#00041c";
                    }
                }
            }
        }
        connection.on("ReceiveGroupMessage", function (request) {
            let paragraph;
            if (!request.chatRoom.includes(sessionStorage.getItem('Username'))) request.chatRoom.push(sessionStorage.getItem('Username')); // Add trainer to chat database
            if (request.chatRoom.includes(sessionStorage.getItem('Username'))) {
                paragraph = document.createElement("p");
                paragraph.innerHTML = request.user + " says: " + request.message;
                document.getElementById(request.roomName).appendChild(paragraph);
            }
        });
        document.getElementById('openMainChat').onclick = () => {
            document.getElementById('openMainChat').style.backgroundColor = "blue";
            for (let i = 0; i < document.getElementById('roomsHolder').children.length; i++) {
                document.getElementById('roomsHolder').children[i].style.backgroundColor = "#00041c";
            }
        };
    }
}

function CloseOtherFields() {
    chatMessageHolder.style.display = "none";
    textField.style.display = "none";
    createRoomReminder.style.display = "none";
    roomCreation.style.display = "none";
}

function DeleteRoom() {
    let deleteBtn = document.getElementsByClassName('delete-room');
    let rooms = document.getElementById('roomsHolder').children;
    for (let i = 0; i < deleteBtn.length; i++) {
        deleteBtn[i].onclick = () => {
            deleteChatRoomPopUp.style.display = "block";
            deleteChatRoom.onclick = () => {
                GetDeletedRoomName(rooms[i].innerHTML);
                rooms[i].style.display = "none";
                document.getElementById(rooms[i].innerHTML).style.display = "none";
                document.getElementById('roomsTextField').style.display = "none";
                deleteChatRoomPopUp.style.display = "none";
            }
        }
    }
}

function GetDeletedRoomName(room) {
    fetch("https://localhost:44311/api/ChatRoom/deleteRoom", {
        method: "POST",
        headers: { "Content-Type": "application/json", 'Accept': 'application/json' },
        body: JSON.stringify({
            RoomName: room
        })
    })
}

cancelDeleting.addEventListener('click', () => {
    deleteChatRoomPopUp.style.display = "none";
})