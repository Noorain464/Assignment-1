let questions = [
    {
        question: 'Which HTML tag is used to define an inline style?',
        choice1: '<script>',
        choice2: '<css>',
        choice3: '<style>',
        choice4: '<span>',
        answer: 3,
    },
    {
        question: 'Which property is used to change the text color in CSS?',
        choice1: 'text-color',
        choice2: 'font-color',
        choice3: 'text-style',
        choice4: 'color',
        answer: 4,
    },
    {
        question: 'Which of the following is the correct way to comment in HTML?',
        choice1: '// Comment',
        choice2: '<!-- Comment -->',
        choice3: '/* Comment */',
        choice4: '<! Comment>',
        answer: 2,
    },
];
const scoreText = document.getElementById("score");
let questionIndex = 0;
let score = 0;
let questionCounter = 1;
const progressText = document.getElementById("progressText");
const progressBarFull = document.getElementById("progressBarFull"); 

function displayQuestion() {
    let questionElement = document.getElementById('question');
    let choiceContainer = document.getElementById('choice-container');
    let currentQuestion = questions[questionIndex];

    questionElement.textContent = currentQuestion.question;
    choiceContainer.innerHTML = '';

    const letters = ['A', 'B', 'C', 'D'];
    for (let i = 1; i <= 4; i++) {
        let choice = currentQuestion['choice' + i];
        
        let choiceElement = document.createElement('div');
        choiceElement.classList.add('choice');
        choiceElement.dataset.choiceIndex = i;
        
        let prefix = document.createElement('p');
        prefix.classList.add('choice-prefix');
        prefix.textContent = letters[i - 1];
        
        let text = document.createElement('p');
        text.classList.add('choice-text');
        text.textContent = choice;
        
        choiceElement.appendChild(prefix);
        choiceElement.appendChild(text);
        
        choiceContainer.appendChild(choiceElement);
        
        choiceElement.addEventListener('click', function() {
            selectAnswer(i);
        });
    }
    progressText.innerHTML = `Question ${questionCounter}/${questions.length}`;
    let progressPercentage = ((questionCounter - 1) / questions.length) * 100;
    progressBarFull.style.width = `${progressPercentage}%`;
}

function selectAnswer(choiceIndex) {
    let choiceElements = document.querySelectorAll('.choice');
    let currentQuestion = questions[questionIndex];
    let clickedChoiceIndex = choiceIndex; 

    for (let i = 0; i < choiceElements.length; i++) {
        let choiceElement = choiceElements[i];
        let index = parseInt(choiceElement.dataset.choiceIndex);

        // Check if the current choice is the one that was clicked
        if (index === clickedChoiceIndex) {
            if (index === currentQuestion.answer) {
                choiceElement.classList.add('correct-answer');
                incrementScore(10);
            } else {
                choiceElement.classList.add('incorrect-answer');
            }
            // Remove the event listener for the clicked choice
            choiceElement.removeEventListener('click', selectAnswer); 
        } 
        choiceElements[clickedChoiceIndex - 1].removeEventListener('click', selectAnswer); 
    }

    questionIndex++;
    questionCounter++;
    if (questionIndex < questions.length) {
        setTimeout(displayQuestion, 500); 
    } else {
        setTimeout(() => {
            localStorage.setItem('score', score);
            window.location.replace("./end.html"); 
        }, 500);
    }
}

function incrementScore(num){
    score += num;
    scoreText.innerText = score;
}
  



displayQuestion();