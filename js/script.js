// Variables of HTML id's
var startButton = document.getElementById("startBtn");
var questionDiv = document.getElementById("questionCont");
var answersDiv = document.getElementById("answersCont");
var resultsDiv = document.getElementById("resultsCont");


// Shuffle Questions
var shuffledQuestions, currentQuestionIndex

// Score
var score = 0;

// on click of 'Start Quiz' button start the quizStart function
startButton.addEventListener('click', countdown);

// 60 second timer variable
var seconds = 60;

// Countdown timer
function countdown() {
    quizStart();
    interval = setInterval(function () {
        if (seconds <= -1) {
            resultsDiv.removeChild(resultsDiv.firstChild);
            questionDiv.removeChild(questionDiv.firstChild);
            clearInterval(interval);
            resetContainers();

            var endMsg = document.createElement("p");
            endMsg.textContent = "You didn't score this time, Please try again!";
            answersDiv.appendChild(endMsg);
            endMsg.setAttribute("class", "noScore");
            return;

        } else {
            
        }
        document.getElementById("timer").innerHTML = " Time: " + seconds + " secs";
        seconds--;
    }, 1000);
}

// Start quiz function also starts the countdown
function quizStart() {
    // countdown();
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    nextQuestion();
};

// shows next question
function nextQuestion() {
    resetContainers();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
};

// shows current question and multiple choices answers
function showQuestion(question) {
    // Display question
    questionDiv.innerText = question.question;
    questionDiv.setAttribute("class", "questions");
    // Display answers
    question.answers.forEach(answer => {
        var button = document.createElement("button");
        button.innerText = answer.text;
        button.setAttribute("class", "answerBtn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answersDiv.appendChild(button);
    });
};

// Resets container before displaying next question and answers
function resetContainers() {
    while (answersDiv.firstChild) {
        answersDiv.removeChild(answersDiv.firstChild);
    }
};

// Answer Selected
function selectAnswer(answer) {
    resultsDiv.removeChild(resultsDiv.firstChild);
    var selectedAnswer = answer.target;
    var correct = selectedAnswer.dataset.correct;
    if (correct) {

        var correctMsg = document.createElement("div");
        correctMsg.textContent = "Correct!";
        resultsDiv.appendChild(correctMsg);
        correctMsg.setAttribute("class", "result");

        shuffledQuestions.length > currentQuestionIndex + 1;
        currentQuestionIndex++;
        nextQuestion();

    } else {

        var wrongMsg = document.createElement("div");
        wrongMsg.textContent = "Wrong!";
        resultsDiv.appendChild(wrongMsg);
        wrongMsg.setAttribute("class", "result");

        seconds -= 10;

        shuffledQuestions.length > currentQuestionIndex + 1;
        currentQuestionIndex++;
        nextQuestion();

    }
};

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


