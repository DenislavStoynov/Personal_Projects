var connection = new signalR.HubConnectionBuilder().configureLogging(signalR.LogLevel.Debug)
    .withUrl("https://localhost:44311/chatHub", {
        transport: signalR.HttpTransportType.WebSockets,
        skipNegotiation: true
    }).build();

connection.start();

function LogUser(event) {
    event.preventDefault();
    let email = document.getElementById('loginEmail').value;
    let password = document.getElementById('loginPassword').value;
    if (email.includes("=") || password.includes("=") || email.includes("<") || password.includes("<")) {
        alert("Invalid Characters!")
    } else {
        fetch('https://localhost:44311/api/Registration/login', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            mode: "cors",
            credentials: "include",
            body: JSON.stringify({
                email: email,
                password: password
            })
        }).then(res => res.json()).then(data => {
            if (data.message == "success") {
                console.log("success!");
                sessionStorage.setItem("Username", data.username);
                sessionStorage.setItem("Question", data.question);
                connection.invoke("InitializeUserToCache", data.username).catch((ërr) => {
                    console.error(ërr.toString());
                })
                window.location.replace("http://localhost:8080/Dashboards/user-dashboard.html");
            } else {
                alert("Wrong Credentials!");
            }
        });
    }
}