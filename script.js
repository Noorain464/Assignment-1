
const quizData = {
    html: [
    {
        question: "Which HTML tag is used to define an inline style?",
        choices: ["<script>", "<css>", "<style>", "<span>"],
        answer: 2
    },
    {
        question: "Which property is used to change the text color in CSS?",
        choices: ["text-color", "font-color", "text-style", "color"],
        answer: 3
    },
    {
        question: "Which of the following is the correct way to comment in HTML?",
        choices: ["// Comment", "<!-- Comment -->", "/* Comment */", "<! Comment>"],
        answer: 1
    }
    ],
    css: [
    {
        question: "What does CSS stand for?",
        choices: [
        "Cascading Style Sheets",
        "Colorful Style Sheets",
        "Creative Style Sheets",
        "Computer Style Sheets"
        ],
        answer: 0
    },
    {
        question: "Which CSS property controls the text size?",
        choices: ["font-style", "text-size", "font-size", "text-style"],
        answer: 2
    }
    ],
    js: [
    {
        question: "Which company developed JavaScript?",
        choices: ["Mozilla", "Netscape", "Microsoft", "Google"],
        answer: 1
    },
    {
        question: "Which of the following is not a JavaScript data type?",
        choices: ["Null", "Undefined", "Number", "Character"],
        answer: 3
    }
    ]
};

let questions = [];
const urlParams = new URLSearchParams(window.location.search);
const selectedQuiz = urlParams.get("quiz");

if (selectedQuiz && quizData[selectedQuiz]) {
    questions = quizData[selectedQuiz];
}

const scoreText = document.getElementById("score");
let questionIndex = 0;
let score = 0;
let questionCounter = 1;
const progressText = document.getElementById("progressText");
const progressBarFull = document.getElementById("progressBarFull");

function displayQuestion() {
    let questionElement = document.getElementById("question");
    let choiceContainer = document.getElementById("choice-container");
    let currentQuestion = questions[questionIndex];

    questionElement.textContent = currentQuestion.question;
    choiceContainer.innerHTML = "";

    const letters = ["A", "B", "C", "D"];
    currentQuestion.choices.forEach((choice, i) => {
    let choiceElement = document.createElement("div");
    choiceElement.classList.add("choice");
    choiceElement.dataset.choiceIndex = i;

    let prefix = document.createElement("p");
    prefix.classList.add("choice-prefix");
    prefix.textContent = letters[i];

    let text = document.createElement("p");
    text.classList.add("choice-text");
    text.textContent = choice;

    choiceElement.appendChild(prefix);
    choiceElement.appendChild(text);

    choiceContainer.appendChild(choiceElement);

    choiceElement.addEventListener("click", function () {
        selectAnswer(i);
    });
    });

    progressText.innerHTML = `Question ${questionCounter}/${questions.length}`;
    let progressPercentage = ((questionCounter - 1) / questions.length) * 100;
    progressBarFull.style.width = `${progressPercentage}%`;
}

function selectAnswer(choiceIndex) {
    let choiceElements = document.querySelectorAll(".choice");
    let currentQuestion = questions[questionIndex];
    let clickedChoiceIndex = choiceIndex;

    choiceElements.forEach((choiceElement, i) => {
    if (i === clickedChoiceIndex) {
        if (i === currentQuestion.answer) {
        choiceElement.classList.add("correct-answer");
        incrementScore(10);
        } else {
        choiceElement.classList.add("incorrect-answer");
        }
        choiceElement.removeEventListener("click", selectAnswer);
    }
    });

    questionIndex++;
    questionCounter++;
    if (questionIndex < questions.length) {
    setTimeout(displayQuestion, 500);
    } else {
    setTimeout(() => {
        localStorage.setItem("score", score);
        window.location.replace("./end.html");
    }, 500);
    }
}

function incrementScore(num) {
    score += num;
    scoreText.innerText = score;
}
let toggle = document.getElementById("toggle");
toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
});
  
  
displayQuestion();
  