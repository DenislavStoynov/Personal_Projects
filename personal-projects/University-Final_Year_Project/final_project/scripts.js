const header = document.getElementsByTagName('header')[0];
const initialValue = "initial";
const navMobile = document.getElementById('navMobile');
const hamburgerBtn = document.getElementsByClassName('hamburger-btn')[0];
const subscribeBtn = document.getElementsByClassName('subscription-btn')[0];
const faqs = document.getElementsByClassName('faqs');
const answer = document.getElementsByClassName('answer');
const checkActiveAccordion = document.getElementsByClassName('activeAccordion');
const prevBody = document.getElementById('prevBody');
const nextBody = document.getElementById('nextBody');
const bodyTransformation = document.getElementsByClassName('body-transformation');
const rectangularCarousel = document.getElementsByClassName('rectangular-carousel');
let count = 0;

window.addEventListener('load', () => {
    if(window.location.href == "http://127.0.0.1:8080/") {
        window.location.replace("http://localhost:8080/");
    }
})
window.addEventListener('load', () => {
    fetch('https://localhost:44311/api/Admin/adminRegister', {
        method: "POST",
        headers: {"Content-Type" : "application/json", 'Accept': 'application/json'}
    }).then(res => res.json()).then(data => {
        if (data == "added") {
            alert("Admin Added! Email: admin@gmail.com | Password: admin")
        }
    });
})

const headerStyles = {
    backgroundColor: "#363636",
    updatedPosition: "fixed",
    topPosition: 0
};

const carouselStyles = {
    "zeroMaxWidth": "0",
    "zeroTransition": "0s",
    "makeMaxWidth": "100%",
    "makeTransition": "max-width .9s ease-in",
    "defaultCarouselBtnsColor": "#000",
    "activeCarouselBtnsColor": "rgb(214, 214, 214)",
    "addedBorder": "8px solid #fff",
    "deletedBorder": "none"
};

accordionToggle();

window.onscroll = () => {
    if (window.pageYOffset > 0 || window.scrollY > 0) {
        header.style.backgroundColor = headerStyles.backgroundColor;
        header.style.position = headerStyles.updatedPosition;
        header.style.top = headerStyles.topPosition;
    } else {
        header.style.backgroundColor = initialValue;
        header.style.position = initialValue;
        header.style.top = initialValue;
    }
}

hamburgerBtn.addEventListener('click', () => {
    if (navMobile.getAttribute('data-visible') === "false") {
        navMobile.setAttribute('data-visible', "true");
        hamburgerBtn.setAttribute('cross-visible', "true");
    }
    else if (navMobile.getAttribute('data-visible') === "true") {
        navMobile.setAttribute('data-visible', "false");
        hamburgerBtn.setAttribute('cross-visible', "false");
    }
});

/* Get list of subscribers */

function AddSubscribersToDb(event) {
    let email = document.getElementById('email').value;
    event.preventDefault()
    fetch('https://localhost:44311/api/Subscribers/addSubscribers', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            Email: email
        })
    })
    alert("Subscribed!");
}

/* Responsive accordion */

function accordionToggle() {
    const accordionSign = document.getElementsByClassName('accordion-sign');
    for (let i = 0; i < faqs.length; i++) {
        faqs[i].addEventListener('click', () => {
            if (!answer[i].classList.contains("activeAccordion")) {
                answer[i].classList.add("activeAccordion");
                accordionSign[i].firstElementChild.style.display = "none";
                accordionSign[i].lastElementChild.style.display = "inline-block";
            } else {
                answer[i].classList.remove("activeAccordion");
                accordionSign[i].firstElementChild.style.display = "inline-block";
                accordionSign[i].lastElementChild.style.display = "none";
            }
        })
    }
}

/* Body Transformation Carousel */

nextBody.addEventListener('click', () => {
    count++;
    if (count >= 3) {
        count = 3;
    }
    bodyTransformation[count - 1].style.maxWidth = carouselStyles.zeroMaxWidth;
    bodyTransformation[count - 1].style.transition = carouselStyles.zeroTransition;
    bodyTransformation[count - 1].style.border = carouselStyles.deletedBorder;
    rectangularCarousel[count - 1].style.backgroundColor = carouselStyles.defaultCarouselBtnsColor;

    bodyTransformation[count].style.maxWidth = carouselStyles.makeMaxWidth;
    bodyTransformation[count].style.transition = carouselStyles.makeTransition;
    bodyTransformation[count].style.border = carouselStyles.addedBorder;
    rectangularCarousel[count].style.backgroundColor = carouselStyles.activeCarouselBtnsColor;
})

prevBody.addEventListener('click', () => {
    count--;
    if (count <= 0) {
        count = 0;
    }
    bodyTransformation[count + 1].style.maxWidth = carouselStyles.zeroMaxWidth;
    bodyTransformation[count + 1].style.transition = carouselStyles.zeroTransition;
    bodyTransformation[count + 1].style.border = carouselStyles.deletedBorder;
    rectangularCarousel[count + 1].style.backgroundColor = carouselStyles.defaultCarouselBtnsColor;

    bodyTransformation[count].style.maxWidth = carouselStyles.makeMaxWidth;
    bodyTransformation[count].style.transition = carouselStyles.makeTransition;
    bodyTransformation[count].style.border = carouselStyles.addedBorder;
    rectangularCarousel[count].style.backgroundColor = carouselStyles.activeCarouselBtnsColor;
})

window.addEventListener('load', () => {
    if (count == 0) {
        prevBody.classList.remove("activeCarouselButton");
        prevBody.classList.add("deactiveCarouselButton");
    }
})

nextBody.addEventListener('click', () => {
    if (count > 0) {
        prevBody.classList.remove("deactiveCarouselButton");
        prevBody.classList.add("activeCarouselButton");
    }
    if (count == bodyTransformation.length - 1) {
        nextBody.classList.remove("activeCarouselButton");
        nextBody.classList.add("deactiveCarouselButton");
    }
})

prevBody.addEventListener('click', () => {
    if (count == 0) {
        prevBody.classList.remove("activeCarouselButton");
        prevBody.classList.add("deactiveCarouselButton");
    }
    if (count < bodyTransformation.length - 1) {
        nextBody.classList.remove("deactiveCarouselButton");
        nextBody.classList.add("activeCarouselButton");
    }
})

/* Rectangular Carousel Buttons */

window.addEventListener('load', () => {
    if (count == 0) {
        rectangularCarousel[0].style.backgroundColor = carouselStyles.activeCarouselBtnsColor;
        bodyTransformation[count].style.border = carouselStyles.addedBorder;
    }
})

function validateRectangularButtons() {
    for (let i = count; i < rectangularCarousel.length; i++) {
        rectangularCarousel[i].addEventListener('click', () => {
            count = i;
            rectangularCarousel[count].style.backgroundColor = carouselStyles.activeCarouselBtnsColor;
            bodyTransformation[count].style.maxWidth = carouselStyles.makeMaxWidth;
            bodyTransformation[count].style.transition = carouselStyles.makeTransition;
            bodyTransformation[count].style.border = carouselStyles.addedBorder;
            if (count == 0) {
                prevBody.classList.add("deactiveCarouselButton");
                prevBody.classList.remove("activeCarouselButton");
            } else if (count > 0 && count < bodyTransformation.length) {
                prevBody.classList.remove("deactiveCarouselButton");
                prevBody.classList.add("activeCarouselButton");
            }
            if (count == bodyTransformation.length - 1) {
                nextBody.classList.remove("activeCarouselButton");
                nextBody.classList.add("deactiveCarouselButton");
            } else if (count < bodyTransformation.length - 1) {
                nextBody.classList.add("activeCarouselButton");
                nextBody.classList.remove("deactiveCarouselButton");
            }
            for (let j = 0; j < rectangularCarousel.length; j++) {
                if (j != count) {
                    rectangularCarousel[j].style.backgroundColor = carouselStyles.defaultCarouselBtnsColor;
                    bodyTransformation[j].style.maxWidth = carouselStyles.zeroMaxWidth;
                    bodyTransformation[j].style.transition = carouselStyles.zeroTransition;
                    bodyTransformation[j].style.border = carouselStyles.deletedBorder;
                }
            }
        })
    }
}

window.addEventListener('load', validateRectangularButtons);


