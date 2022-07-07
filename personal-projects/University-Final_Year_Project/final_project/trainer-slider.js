const sliderBtnRight = document.getElementById('sliderBtnRight');
const sliderBtnLeft = document.getElementById('sliderBtnLeft');
const sliderWrapper = document.getElementById('sliderWrapper');
const sliderContent = document.getElementById('sliderContent');
let num = 0;

/* Show last 2 slider children -> width of wrapper - width of parent 
sliderWrapper.offsetWidth-sliderContent.offsetWidth
*/

function sliderForward() {
    if (sliderContent.children.length % 2 == 1) {
        if (num > (sliderWrapper.offsetWidth - sliderContent.offsetWidth)) {
            num = num - 515;
            sliderContent.style.left = num + "px";
            if (num < (sliderWrapper.offsetWidth - sliderContent.offsetWidth)) {
                num = 0;
                sliderContent.style.left = num + "px";
            }
        }
    } else if (sliderContent.children.length % 2 == 0) {
        if (num > (sliderWrapper.offsetWidth - sliderContent.offsetWidth)) {
            num = num - 515;
            sliderContent.style.left = num + "px";
        } else if (num <= (sliderWrapper.offsetWidth - sliderContent.offsetWidth)) {
            num = 0;
            sliderContent.style.left = num + "px";
        }
    }
}

sliderBtnRight.addEventListener('click', () => {
    sliderForward();
})

sliderBtnLeft.addEventListener('click', () => {
    if (num < 0) {
        num = num + 515;
        sliderContent.style.left = num + "px";
    } else if (num >= 0) {
        sliderContent.style.left = 0;
    }
})

function sliderInterval() {
    sliderForward();
}

var slider = setInterval(sliderInterval, 5500);

sliderWrapper.addEventListener('mouseenter', () => {
    clearInterval(slider);
})

sliderWrapper.addEventListener('mouseleave', () => {
    slider = setInterval(sliderInterval, 5500);
})

/* Trainers Quiz */

const progressBarContainer = document.getElementById('progressBarContainer');
const quizContainer = document.getElementById('quizContainer');
const quizBtnsHoler = document.getElementById('quizBtnsHoler');
const answers = document.getElementsByClassName('answers')[0];
const questionCounter = document.getElementById('questionCounter');
let questionC = 1;
const answersHolder = document.getElementsByClassName('quiz-answers_holder');
const quizQuestions = ['We all know that calcium is good for us, but what does it actually do?',
    'What does "HIIT" stand for?', 'Where in the body is the pectoralis major located?',
    'Which of the following is NOT an expected outcome of personal training?', 'What kind of joint are the elbows, fingers, and knees?',
    'Regularly eating foods that contain saturated fats raises the level of _____ in your blood.',
    'What does "CPT" stand for in the fitness world?',
    'What piece of exercise equipment is excellent for improving core strength and balance?',
    'Exercise and physical activity fall into four main categories: Endurance, Strength, Balance, and _____.',
    'What is the largest muscle in the human body?'];
const questionText = document.getElementsByClassName('quiz-question')[0];
const quizResultContainer = document.getElementById('quizResultContainer');
let quizNext = document.getElementById('quizNext');
let quizPrev = document.getElementById('quizPrev');
let finishButton = document.getElementById('finishButton');
let checkSelected = [];
let question = 0;
let userScore = 0;
const quizResult = document.getElementById('quizResult'); // stores user grade
const scoreText = document.getElementById('scoreText'); // stores user score
const passed = document.getElementById('passed'); // stores innerHTML of passed or failed text
const userResuls = {
    A: "A",
    B: "B",
    C: "C",
    D: "D",
    E: "E",
    F: "F"
};

function disablePrevButton() {
    if (questionC <= 1) {
        quizPrev.style.cursor = "auto";
        quizPrev.style.color = "gray";
        quizPrev.style.backgroundColor = "lightgray";
    }
}

function enablePrevButton() {
    if (questionC > 1) {
        quizPrev.style.cursor = "pointer";
        quizPrev.style.color = "#000000";
        quizPrev.style.backgroundColor = "#ffffff";
    }
}

function deleteNextButtonShowFinish() {
    quizNext.style.display = "none";
    finishButton.style.display = "block";
}

function deleteFinishButtonShowNext() {
    quizNext.style.display = "block";
    finishButton.style.display = "none";
}

function showQuizResults() {
    quizContainer.style.display = "none";
    quizBtnsHoler.style.display = "none";
    quizResultContainer.style.display = "block";
}

function validateNotSelectedOption() {
    for (let i = 0; i < answersHolder[question].children.length; i++) {
        if (!answersHolder[question].children[i].classList.contains("selected")) {
            checkSelected.push("not_selected");
        }
    }
    if (checkSelected.length == 4 && question < answers.children.length - 1) {
        alert("Please select an option!");
        question--;
        questionC--;
    }
    if (checkSelected.length == 4 && question == answers.children.length - 1) {
        alert("Please select an option!");
        question = answers.children.length - 1; // 9
        questionC = answersHolder.length; // 10
    } else if (checkSelected.length < 4 && question == answers.children.length - 1) {
        finishQuiz();
        showQuizResults();
        diplayUserResult();
        scoreText.innerHTML = userScore;
    }
    checkSelected = [];
}

function markClickedAnswer() {
    for (let i = 0; i < answersHolder.length; i++) {
        for (let j = 0; j < answersHolder[i].children.length; j++) {
            answersHolder[i].children[j].addEventListener('click', () => {
                answersHolder[i].children[j].classList.add("selected");
                for (let k = 0; k < answersHolder[i].children.length; k++) {
                    if (k != j) {
                        answersHolder[i].children[k].classList.remove("selected");
                    }
                }
            })
        }
    }
}

function nextQuestion() {
    validateNotSelectedOption();
    questionC++;
    questionCounter.innerHTML = questionC;
    enablePrevButton();
    question++;
    questionText.innerHTML = quizQuestions[question];
    answersHolder[question].style.display = "flex";
    for (let i = 0; i < answersHolder.length; i++) {
        if (i != question) {
            answersHolder[i].style.display = "none";
        }
    }
    if (question == answers.children.length - 1) {
        deleteNextButtonShowFinish();
    }
}

function prevQuestion() {
    question--;
    questionC--;
    if (questionC <= 1) {
        questionC = 1;
        disablePrevButton();
    }
    if (question <= 0) {
        question = 0;
    }
    if (questionC < 10) {
        deleteFinishButtonShowNext();
    }
    answersHolder[question + 1].style.display = "none";
    answersHolder[question].style.display = "flex";
    questionText.innerHTML = quizQuestions[question];
    questionCounter.innerHTML = questionC;
}

function finishQuiz() {
    for (let i = 0; i < answersHolder.length; i++) {
        for (let j = 0; j < answersHolder[i].children.length; j++) {
            if (answersHolder[i].children[j].classList.contains("selected") && answersHolder[i].children[j].classList.contains("correct")) {
                userScore += 10;
            }
        }
    }
}

function windowQuizOnLoadFunctions() {
    markClickedAnswer();
    disablePrevButton();
}

window.addEventListener('load', windowQuizOnLoadFunctions);

quizPrev.addEventListener('click', prevQuestion);

quizNext.addEventListener('click', nextQuestion);

finishButton.addEventListener('click', validateNotSelectedOption);

/* Progress Bar */

let updateBar;
let barWidth = 0;
let startQuiz = document.getElementById('startQuiz');
let progressBar = document.getElementById('progressBar');
let percent = document.getElementById('percent');
const tryAgain = document.getElementById('tryAgain');

function updateProgressBar() {
    barWidth += 1;
    progressBar.style.width = barWidth + "%";
    percent.innerHTML = barWidth.toFixed() + "%";
    if (barWidth == 100) {
        clearInterval(updateBar);
        setTimeout(() => {
            progressBarContainer.style.display = "none";
            quizContainer.style.display = "block";
            quizBtnsHoler.style.display = "flex";
        }, 500)
    }
}

startQuiz.addEventListener('click', () => {
    updateBar = setInterval(updateProgressBar, 11);
})

/* Restart Quiz */

function removeAllSelectedAnswers() {
    for (let i = 0; i < answersHolder.length; i++) {
        for (let j = 0; j < answersHolder[i].children.length; j++) {
            answersHolder[i].children[j].classList.remove("selected");
        }
    }
}

function restoreInitialQuizStatement() {
    quizResultContainer.style.display = "none"; // hide result container
    quizContainer.style.display = "block"; // show quiz with answers container
    quizBtnsHoler.style.display = "flex"; // show quiz navigation buttons
    answersHolder[answersHolder.length - 1].style.display = "none"; // hide last question
    answersHolder[question].style.display = "flex"; // show first question
    questionCounter.innerHTML = questionC; // update question text counter
    questionText.innerHTML = quizQuestions[question]; // update question
}

tryAgain.addEventListener('click', () => {
    // Back to initial values
    question = 0;
    questionC = 1;
    userScore = 0;
    removeAllSelectedAnswers();
    restoreInitialQuizStatement();
    disablePrevButton();
    deleteFinishButtonShowNext();
})

/* Display User Result */

function diplayUserResult() {
    if (userScore < 20) {
        quizResult.innerHTML = userResuls.F;
        passed.innerHTML = "You failed!";
    }
    if (userScore >= 20 && userScore < 40) {
        quizResult.innerHTML = userResuls.E;
        passed.innerHTML = "You failed!";
    }
    if (userScore >= 40 && userScore < 60) {
        quizResult.innerHTML = userResuls.D;
        passed.innerHTML = "You failed!";
    }
    if (userScore >= 60 && userScore < 70) {
        quizResult.innerHTML = userResuls.C;
        passed.innerHTML = "You passed!";
    }
    if (userScore >= 70 && userScore < 90) {
        quizResult.innerHTML = userResuls.B;
        passed.innerHTML = "You passed!";
    }
    if (userScore >= 90) {
        quizResult.innerHTML = userResuls.A;
        passed.innerHTML = "You passed!";
    }
}

/* Display Correct Answers */

const correctAnswers = document.getElementById('correctAnswers'); // Correct answers btn
const correctAnswersContainer = document.getElementById('correctAnswersContainer');
const backToResults = document.getElementById('backToResults'); // Back to results btn
const presentAnswers = document.getElementById('presentAnswers'); // Correct answers container
const correctAnswersArr = ['C. Builds and Protects Bones', 'D. High-Intensity Interval Training',
'C. Upper Chest', 'B. Improved Social Skills', 'B. Hinge', 'B. Cholesterol', 'A. Certified Personal Trainer',
'D. Stability Ball', 'A. Flexibility', 'B. Gluteus Maximus'];

correctAnswers.addEventListener('click', () => {
    quizResultContainer.style.display = "none";
    correctAnswersContainer.style.display = "block";
    displayCorrectAnswers();
})

backToResults.addEventListener('click', () => {
    quizResultContainer.style.display = "block";
    correctAnswersContainer.style.display = "none";
})

function displayCorrectAnswers() {
    for (let i = 0; i < answersHolder.length; i++) {
        var myDiv = document.createElement("div");
        var myAnchor = document.createElement("a");
        var mySpan = document.createElement("span");
        var myParagraph = document.createElement("p");
        presentAnswers.appendChild(myDiv);
        presentAnswers.children[i].style.marginBottom = "19px";
        presentAnswers.children[i].appendChild(myAnchor);
        presentAnswers.children[i].appendChild(mySpan);
        presentAnswers.children[i].appendChild(myParagraph);
        presentAnswers.children[i].children[0].innerHTML = i+1 + ".";
        presentAnswers.children[i].children[0].style.color = "#ffffff";
        presentAnswers.children[i].children[1].innerHTML = quizQuestions[i];
        presentAnswers.children[i].children[1].style.color = "#ffffff";
        presentAnswers.children[i].children[2].innerHTML = correctAnswersArr[i];
        presentAnswers.children[i].children[2].style.color = "#00ff8c";
    }
}

