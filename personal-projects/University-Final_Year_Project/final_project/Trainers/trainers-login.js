TrainersAPI = (event) => {
    event.preventDefault();
    let trainerEmail = document.getElementById('trainerEmail').value;
    let trainerPassword = document.getElementById('trainerPassword').value
    if (trainerEmail.includes("=") || trainerPassword.includes("=") || trainerEmail.includes("<") || trainerPassword.includes("<")) {
        alert("Invalid Characters!")
    } else {
        fetch('https://localhost:44311/api/Trainers/trainerLogin', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            mode: "cors",
            credentials: "include",
            body: JSON.stringify({
                trainerEmail: trainerEmail,
                trainerPassword: trainerPassword
            })
        }).then(res => res.json()).then(data => {
            if (data.message == "success") {
                console.log("success!");
                sessionStorage.setItem("Username", data.username);
                connection.invoke("InitializeUserToCache", data.username).catch((ërr) => {
                    console.error(ërr.toString());
                })
                window.location.replace("http://localhost:8080/Dashboards/trainer-dashboard.html");
            } else {
                alert("Wrong Credentials!");
            }
        });
    }
}