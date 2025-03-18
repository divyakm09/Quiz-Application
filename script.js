const questions = [
    { question: "Choose the correct HTML element for the largest heading:", options: ["Head Tag", "H6 Tag", "Heading Tag", "H1 Tag"], answer: "D" },
    { question: "Which HTML element defines the title of a document?", options: ["Meta tag", "Head Tag", "Title Tag", "Body Tag"], answer: "C" },
    { question: "How can you open a link in a new browser window?", options: ["Blank", "Target", "Same", "Open"], answer: "A" },
    { question: "Which property adds space outside elements?", options: ["Span", "Padding", "Margin", "Outline"], answer: "C" },
    { question: "Which programming language is used for web development?", options: ["Python", "JavaScript", "C++", "Java"], answer: "B" }
];

let currentQuestionIndex = 0;
let score = 0;
let selectedAnswers = new Array(questions.length).fill(null);

const startButton = document.getElementById("start-quiz");
const quizContent = document.getElementById("quiz-content");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const scoreDisplay = document.getElementById("score");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const resetButton = document.getElementById("reset");
const finalScoreDisplay = document.getElementById("final-score");

startButton.addEventListener("click", () => {
    startButton.style.display = "none";
    quizContent.style.display = "block";
    loadQuestion();
});

function loadQuestion() {
    optionsContainer.innerHTML = "";
    finalScoreDisplay.style.display = "none";
    resetButton.style.display = "none";

    let q = questions[currentQuestionIndex];
    questionText.textContent = `${currentQuestionIndex + 1}. ${q.question} (10 marks)`;

    let labels = ["A", "B", "C", "D"];
    q.options.forEach((option, index) => {
        let optionBox = document.createElement("div");
        optionBox.classList.add("option-box");

        let abcdBox = document.createElement("div");
        abcdBox.classList.add("abcd-box");
        abcdBox.textContent = labels[index];

        let optionText = document.createElement("span");
        optionText.textContent = option;

        optionBox.appendChild(abcdBox);
        optionBox.appendChild(optionText);
        optionsContainer.appendChild(optionBox);

        if (selectedAnswers[currentQuestionIndex]) {
            optionBox.classList.add("disabled");
        }

        optionBox.addEventListener("click", () => {
            if (selectedAnswers[currentQuestionIndex]) return;

            selectedAnswers[currentQuestionIndex] = labels[index];
            optionBox.classList.add(labels[index] === q.answer ? "correct" : "incorrect");
            optionBox.classList.add("disabled");

            updateScore();
        });
    });

    prevButton.disabled = currentQuestionIndex === 0;
}

nextButton.addEventListener("click", () => {
    if (!selectedAnswers[currentQuestionIndex]) {
        alert("Please select an answer before proceeding!");
        return;
    }
    currentQuestionIndex++;
    currentQuestionIndex < questions.length ? loadQuestion() : showFinalScore();
});

prevButton.addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
});

function updateScore() {
    score = selectedAnswers.reduce((total, answer, idx) => answer === questions[idx].answer ? total + 10 : total, 0);
    scoreDisplay.textContent = `Score: ${score} / 50`;
}

function showFinalScore() {
    finalScoreDisplay.textContent = `Final Score: ${score} / 50`;
    finalScoreDisplay.classList.add("show");
    finalScoreDisplay.style.display = "block";
    resetButton.style.display = "block";


    generateConfetti();
}

resetButton.addEventListener("click", () => {
    score = 0;
    selectedAnswers = new Array(questions.length).fill(null);
    currentQuestionIndex = 0;
    scoreDisplay.textContent = "Score: 0 / 50";
    loadQuestion();
    finalScoreDisplay.style.display = "none";
    resetButton.style.display = "none";
    startButton.style.display = "block";
    quizContent.style.display = "none";
});

function generateConfetti() {
    const confettiContainer = document.createElement("div");
    document.body.appendChild(confettiContainer);

    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement("div");
        confetti.classList.add("confetti");


        const size = Math.random() * 10 + 5;
        const color = getRandomColor();
        const startPositionX = Math.random() * window.innerWidth;
        const startPositionY = Math.random() * window.innerHeight;

        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        confetti.style.backgroundColor = color;
        confetti.style.left = `${startPositionX}px`;
        confetti.style.top = `${startPositionY}px`;

        confettiContainer.appendChild(confetti);


        setTimeout(() => {
            confetti.remove();
        }, 6000);
    }
}

function getRandomColor() {
    const colors = ['#ff6347', '#ffd700', '#32cd32', '#1e90ff', '#8a2be2'];
    return colors[Math.floor(Math.random() * colors.length)];
}