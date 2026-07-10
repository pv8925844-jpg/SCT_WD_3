const percentageText = document.getElementById("percentage");

const message = document.getElementById("message");

let timeLeft = 20;
let timerInterval;

const resultScreen = document.getElementById("resultScreen");

const finalScore = document.getElementById("finalScore");

const performance = document.getElementById("performance");

const restartBtn = document.getElementById("restartBtn");

const feedback = document.getElementById("feedback");

const questions = [

{
    question: "Which HTML tag is used to include JavaScript?",

    answers: [
        "<script>",
        "<javascript>",
        "<js>",
        "<code>"
    ],

    correct: 0
},

{
    question: "Which CSS property changes text color?",

    answers: [
        "background-color",
        "font-style",
        "color",
        "text-decoration"
    ],

    correct: 2
},

{
    question: "Which keyword declares a constant in JavaScript?",

    answers: [
        "var",
        "let",
        "const",
        "constant"
    ],

    correct: 2
},

{
    question: "Git is mainly used for?",

    answers: [
        "Database",
        "Version Control",
        "Networking",
        "Compiler"
    ],

    correct: 1
},

{
    question: "Which company developed JavaScript?",

    answers: [
        "Google",
        "Microsoft",
        "Netscape",
        "Apple"
    ],

    correct: 2
},

{
    question: "Which symbol is used for comments in JavaScript?",

    answers: [
        "//",
        "#",
        "<!-- -->",
        "**"
    ],

    correct: 0
},

{
    question: "Which HTML element displays the largest heading?",

    answers: [
        "<h6>",
        "<head>",
        "<heading>",
        "<h1>"
    ],

    correct: 3
},

{
    question: "Which CSS layout is best for one-dimensional layouts?",

    answers: [
        "Grid",
        "Flexbox",
        "Float",
        "Table"
    ],

    correct: 1
},

{
    question: "Which method prints something in the browser console?",

    answers: [
        "print()",
        "display()",
        "console.log()",
        "write()"
    ],

    correct: 2
},

{
    question: "GitHub is primarily used to?",

    answers: [
        "Host Git repositories",
        "Run Java programs",
        "Edit videos",
        "Store databases"
    ],

    correct: 0
}

];

const question = document.getElementById("question");

const answers = document.getElementById("answers");

const nextBtn = document.getElementById("nextBtn");

const progressBar = document.getElementById("progressBar");

const questionNumber = document.getElementById("questionNumber");

let currentQuestion = 0;

let score = 0;

function showQuestion(){

    const q = questions[currentQuestion];

    question.textContent = q.question;

    questionNumber.textContent =
        `Question ${currentQuestion+1} / ${questions.length}`;

    progressBar.style.width =
        ((currentQuestion+1)/questions.length)*100 + "%";

    answers.innerHTML = "";

    q.answers.forEach((answer,index)=>{

        const button = document.createElement("button");

        button.classList.add("answer-btn");

        button.textContent = answer;

        button.onclick = ()=>checkAnswer(index);

        answers.appendChild(button);

    });

    feedback.textContent = "";
    feedback.className = "";

    startTimer();

}

function startTimer() {

    clearInterval(timerInterval);

    timeLeft = 20;

    document.getElementById("timer").textContent = `⏳ ${timeLeft}s`;

    timerInterval = setInterval(() => {

        timeLeft--;

        document.getElementById("timer").textContent = `⏳ ${timeLeft}s`;

        if (timeLeft <= 0) {

            clearInterval(timerInterval);

            autoSubmit();

        }

    }, 1000);

}

function autoSubmit() {

    const buttons = document.querySelectorAll(".answer-btn");

    buttons.forEach((button, index) => {

        button.disabled = true;

        if (index === questions[currentQuestion].correct) {

            button.classList.add("correct");

        }

    });

    feedback.textContent = "⏰ Time's Up!";

    feedback.className = "wrong-text";

    setTimeout(() => {

    currentQuestion++;

    if(currentQuestion < questions.length){

        showQuestion();

    }else{

        showResult();

    }

},2000);

}

function checkAnswer(selected){

    clearInterval(timerInterval);

    if(selected === questions[currentQuestion].correct){

    score++;

    feedback.textContent = "✅ Correct!";

    feedback.className = "correct-text";

}
else{

    feedback.textContent =
        "❌ Incorrect! Correct Answer: " +
        questions[currentQuestion].answers[
            questions[currentQuestion].correct
        ];

    feedback.className = "wrong-text";

}

    nextBtn.disabled=false;

}

function showResult(){

    clearInterval(timerInterval);

    question.style.display="none";

    answers.style.display="none";

    nextBtn.style.display="none";

    questionNumber.style.display="none";

    progressBar.parentElement.style.display="none";

    feedback.style.display="none";

    document.getElementById("timer").style.display="none";

    resultScreen.style.display="block";

    finalScore.textContent =
        `${score} / ${questions.length}`;

    const percentage =
        Math.round((score/questions.length)*100);

    percentageText.textContent =
    percentage + "%";

    if(percentage>=90){

    performance.textContent="🏆 Excellent!";

    message.textContent=
    "Outstanding work! Your programming fundamentals are very strong.";

}

else if(percentage>=70){

    performance.textContent="⭐ Great Job!";

    message.textContent=
    "Very good! Keep practicing and you'll master these concepts.";

}

else if(percentage>=50){

    performance.textContent="👍 Good Effort!";

    message.textContent=
    "Nice attempt! A little more practice will improve your score.";

}

else{

    performance.textContent="📚 Keep Practicing!";

    message.textContent=
    "Don't give up. Practice consistently and you'll improve.";

}

}

nextBtn.addEventListener("click",()=>{

    currentQuestion++;

    if(currentQuestion<questions.length){

    showQuestion();

    }
    else{

        showResult();

    }

});


nextBtn.disabled=true;

showQuestion();

restartBtn.addEventListener("click",()=>{

    currentQuestion=0;

    score=0;

    resultScreen.style.display="none";

    question.style.display="block";

    answers.style.display="flex";

    questionNumber.style.display="flex";

    progressBar.parentElement.style.display="block";

    feedback.style.display="block";

    document.getElementById("timer").style.display="block";

    showQuestion();

});