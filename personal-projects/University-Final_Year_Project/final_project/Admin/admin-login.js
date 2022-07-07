AdminAPI = (event) => {
    event.preventDefault();
    let adminEmail = document.getElementById('adminEmail').value;
    let adminPassword = document.getElementById('adminPassword').value
    if (adminEmail.includes("=") || adminPassword.includes("=") || adminEmail.includes("<") || adminPassword.includes("<")) {
        alert("Invalid Characters!")
    } else {
        fetch('https://localhost:44311/api/Admin/adminLogin', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            mode: "cors",
            credentials: "include",
            body: JSON.stringify({
                Email: adminEmail,
                Password: adminPassword
            })
        }).then(res => res.json()).then(data => {
            if (data.message == "success") {
                console.log("success!");
                sessionStorage.setItem("Username", data.username);
                window.location.replace("http://localhost:8080/Dashboards/admin-dashboard.html");
            } else {
                alert("Wrong Credentials!");
            }
        });
    }
}