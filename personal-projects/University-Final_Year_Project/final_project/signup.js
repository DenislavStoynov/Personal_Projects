/* Sign Up Back End */

/* Registration API Starts From Here */
let exist;

// Return a dictionary of all usernames and passwords

AddToList = (event) => {
    event.preventDefault();
    let email = document.getElementById('email').value;
    let username = document.getElementById('username').value
    let password = document.getElementById('password').value;
    let retypePass = document.getElementById('retypePass').value;
    let q1 = document.querySelector('input[name="radioGroupOne"]:checked').value;
    let q2 = document.querySelector('input[name="radioGroupTwo"]:checked').value;
    let q3 = document.querySelector('input[name="radioGroupThree"]:checked').value;
    if (email == "" || username == "" || password == "" || retypePass == "") {
        alert("All fields are required!");
    } else {
        if (password !== retypePass) { // if blank field detected -> alert
            alert("Passwords not matching!");
        } else {                                // if not blank filed detected -> fetch from API
            userExist(email, username); // call function to check for existing usernames
            fetch('https://localhost:44311/api/Registration', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    username: username,
                    q1: q1,
                    q2: q2,
                    q3: q3
                })
            }).then(res => res.json()).then(data => {
                console.log(email);                    
            });
            redirect(email, username);   // redirect to homepage if user does not exist and is registered successfully
        }
    }
}

// Fetch from API, get list and apply checkUser and redirectToDashboard functions

const userExist = async (userEmail, userName) => {
    const response = await fetch('https://localhost:44311/api/Registration/users');
    const data = await response.json();
    checkUser(data, userEmail, userName);
}

const redirect = async (userEmail, userName) => {
    const response = await fetch('https://localhost:44311/api/Registration/users');
    const data = await response.json();
    redirectToHomepage(data, userEmail, userName);
}

// Iterate over the dictionary and check if user exists

function checkUser(myData, userEmail, userName) {
    for (let i = 0; i < myData.length; i++) {
        if (userEmail == myData[i].email && userName == myData[i].username) {
            alert("Error: Both email and username are already taken!");
        } else if (userEmail == myData[i].email) {
            alert("Error: This email is already taken!");
        } else if (userName == myData[i].username) {
            alert("Error: This username is already taken!");
        }
    }
}

function redirectToHomepage(myData, userEmail, userName) {
    for (let i = 0; i < myData.length; i++) {
        if (userEmail != myData[i].email && userName != myData[i].username) {
            exist = true;
        } else if (userEmail == myData[i].email || userName == myData[i].username) {
            exist = false;
            break;
        }
    }
    if (exist == true) {
        window.location.replace("http://localhost:8080");
    }
}