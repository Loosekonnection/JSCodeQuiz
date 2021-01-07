// Variables of HTML id's
var startButton = document.getElementById("startBtn");
var questionDiv = document.getElementById("questionCont");
var answersDiv = document.getElementById("answersCont");
var resultsDiv = document.getElementById("resultsCont");
var refreshButton = document.getElementById("clear-highscores");
var timer = document.getElementById("timer");

// Shuffle Questions variables
var shuffledQuestions, currentQuestionIndex

// Holds score variable
var score = 0;

// Counts total questions answered variable
var totalQuestions = 0;

// onClick button event to start the quiz
startButton.addEventListener('click', quizStart);

// Start quiz function also starts the countdown
function quizStart() {
    countdown();
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    nextQuestion();
}

// 60 second timer variable
var seconds = 60;

// Countdown timer starts the presentation of questions and answers
function countdown() {
    interval = setInterval(function () {
        if (seconds <= -1) {
            clearInterval(interval);
            resetContainers();
            questionDiv.removeChild(questionDiv.firstChild);
            resultsDiv.removeChild(resultsDiv.firstChild);
            // Displays Game Over! if the timer runs out
            var gameOverMsg = document.createElement("p");
            gameOverMsg.textContent = "Game Over!";
            answersDiv.appendChild(gameOverMsg);
            gameOverMsg.setAttribute("class", "gameOver");
            // Displays the Try Again button if the timer runs out
            var endMsg = document.createElement("p");
            answersDiv.appendChild(endMsg);
            endMsg.setAttribute("class", "gameOver");
            var tryAgainBtn = document.createElement("button");
            tryAgainBtn.innerText = "Try Again";
            tryAgainBtn.onclick = function() {
                window.location.reload()
            }
            endMsg.appendChild(tryAgainBtn);
            tryAgainBtn.setAttribute("class", "btn btn-danger");   
        } else {
            score = seconds;
        }
        document.getElementById("timer").textContent = " Time: " + seconds + " secs";
        seconds--;    
    }, 1000);
}

// Generates next question 
function nextQuestion() {
    totalQuestions++;
    if (totalQuestions === 7) {
        clearInterval(interval);
        highscore();
    } else {
        resetContainers();
        showQuestion(shuffledQuestions[currentQuestionIndex]);
    }
}

// Shows current question and multiple choice answers
function showQuestion(question) {
    // Display question
    questionDiv.innerText = question.question;
    questionDiv.setAttribute("class", "questions");
    // Display answers as butoons
    question.answers.forEach(answer => {
        var button = document.createElement("button");
        button.textContent = answer.text;
        button.setAttribute("class", "answerBtn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answersDiv.appendChild(button);
    });
}

// Resets answerDiv container before displaying next question and next set of answers
function resetContainers() {
    while (answersDiv.firstChild) {
        answersDiv.removeChild(answersDiv.firstChild);
    }
}

// When an answer is chosen, selectAnswer presents either a correct or wrong message
function selectAnswer(answer) {
    resultsDiv.removeChild(resultsDiv.firstChild);
    var selectedAnswer = answer.target;
    var correct = selectedAnswer.dataset.correct;
    if (correct) {
        // Displays Correct! message when a question is answered correclty
        var correctMsg = document.createElement("div");
        correctMsg.textContent = "Correct!";
        resultsDiv.appendChild(correctMsg);
        correctMsg.setAttribute("class", "result");
        shuffledQuestions.length > currentQuestionIndex + 1;
        currentQuestionIndex++;
        nextQuestion();
    } else {
        // Displays Wrong! message when a question is answered incorreclty
        var wrongMsg = document.createElement("div");
        wrongMsg.textContent = "Wrong!";
        resultsDiv.appendChild(wrongMsg);
        wrongMsg.setAttribute("class", "result");
        seconds -= 10;
        shuffledQuestions.length > currentQuestionIndex + 1;
        currentQuestionIndex++;
        nextQuestion();
    }
}

// Highscore function to store initials and score in local storage
function highscore() {
    if (score >= 1) {
        resetContainers();
        questionDiv.removeChild(questionDiv.firstChild);
        resultsDiv.removeChild(resultsDiv.firstChild);
        // Displays All Done! message
        var wellDoneMsg = document.createElement("div");
        wellDoneMsg.textContent = "Well Done!";
        questionDiv.appendChild(wellDoneMsg);
        wellDoneMsg.setAttribute("class", "wellDoneMsg");
        // Displays users Final Score
        var scoreMsg = document.createElement("div");
        scoreMsg.textContent = "You scored: " + score + ".";
        answersDiv.appendChild(scoreMsg);
        // Prompts user to input their initials 
        var enterInitialsMsg = document.createElement("p");
        enterInitialsMsg.textContent = "Enter Your Initials: ";
        resultsDiv.appendChild(enterInitialsMsg);
        // Input field for users initials
        var initialsInput = document.createElement("input");
        initialsInput.type = "text";
        initialsInput.name = "name-text";
        initialsInput.placeholder = "D.B.";
        initialsInput.setAttribute("class", "initialsInput");
        enterInitialsMsg.appendChild(initialsInput);
        // Submit button to store users Initials in local storage
        var submitBtn = document.createElement("button");
        submitBtn.innerText = "Submit";
        submitBtn.setAttribute("class", "submitBtn");
        enterInitialsMsg.appendChild(submitBtn);
    }
}

// Array of Objects containing 10 JavaScreipt questions
var questions = [
    {
        question: "Who invented JavaScript?",
        answers: [
            { text: "1. Douglas Crockford", correct: false },
            { text: "2. Brendan Eich", correct: true },
            { text: "3. Sheryl Sandberg", correct: false },
            { text: "4. Linus Torvolds", correct: false }
        ],
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: [
            { text: "1. JavaScript", correct: false },
            { text: "2. Terminal / Bash", correct: false },
            { text: "3. for loops", correct: false },
            { text: "4. console.log", correct: true }
        ],
    },
    {
        question: "String values must be enclosed within _______ when being assigned to variables.",
        answers: [
            { text: "1. commas", correct: false },
            { text: "2. curly brackets", correct: false },
            { text: "3. quotes", correct: true },
            { text: "4. parentheses", correct: false }
        ],
    },
    {
        question: "Which tool can you use to ensure code quality?",
        answers: [
            { text: "1. Angular", correct: false },
            { text: "2. jQuery", correct: false },
            { text: "3. ESLint", correct: true },
            { text: "4. RequireJS", correct: false }
        ],
    },
    {
        question: "Inside which HTML element do we put the JavaScript?",
        answers: [
            { text: "1. <script>", correct: true },
            { text: "2. <js>", correct: false },
            { text: "3. <scripting>", correct: false },
            { text: "4. <javascript>", correct: false }
        ],
    },
    {
        question: "Where is the correct place to insert a JavaScript?",
        answers: [
            { text: "1. The <head> section", correct: false },
            { text: "2. The <body> section", correct: false },
            { text: "3. The <footer> section", correct: false },
            { text: "4. Both the <head> section and the <body> section are correct", correct: true }
        ],
    },
    {
        question: "How do you write 'Hello World' in an alert box?",
        answers: [
            { text: "1. alertBox('Hello World');", correct: false },
            { text: "2. alert('Hello World');", correct: true },
            { text: "3. msgBox('Hello World');", correct: false },
            { text: "4. prompt('Hello World');", correct: false }
        ],
    },
    {
        question: "Which operator is used to assign a value to a variable?",
        answers: [
            { text: "1. -", correct: false },
            { text: "2. *", correct: false },
            { text: "3. X", correct: false },
            { text: "4. =", correct: true }
        ],
    },
    {
        question: "How do you find the number with the highest value of x and y?",
        answers: [
            { text: "1. top(x, y)", correct: false },
            { text: "2. ceil(x, y)", correct: false },
            { text: "3. Math.max(x, y)", correct: true },
            { text: "4. Math.ceil(x, y)", correct: false }
        ],
    },
    {
        question: "How does a FOR loop start??",
        answers: [
            { text: "1. for (i = 0; i <= 5; i++)", correct: true },
            { text: "2. for i = 1 to 5", correct: false },
            { text: "3. for (i = 0; i <= 5)", correct: false },
            { text: "4. for (i <= 5; i++)", correct: false }
        ],
    },
];


