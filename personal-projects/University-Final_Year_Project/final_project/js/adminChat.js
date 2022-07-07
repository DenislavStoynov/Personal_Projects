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