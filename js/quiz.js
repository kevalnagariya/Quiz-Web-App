// ============================
// DOM Elements
// ============================
const startBtn = document.getElementById('start-btn');
const quizContainer = document.getElementById('quiz-container');
const questionContainer = document.getElementById('question-container');
const nextBtn = document.getElementById('next-btn');
const progressElement = document.getElementById('progress');
const startScreen = document.getElementById('start-screen');
const resultsContainer = document.getElementById('results-container');

// ============================
// Quiz State Variables
// ============================
let currentQuestionIndex = 0;
let score = 0;
let questions = [];

// ============================
// Event Listeners
// ============================
// Start the quiz when Start button is clicked
startBtn.addEventListener('click', startQuiz);

// Move to next question when Next button is clicked
nextBtn.addEventListener('click', showNextQuestion);

// ============================
// Function to Start the Quiz
// ============================
function startQuiz() {
    const storedQuestions = localStorage.getItem('quiz_questions');
    
    // Check if there are any stored questions
    if (!storedQuestions || JSON.parse(storedQuestions).length === 0) {
        alert('No questions available! Please add questions in the admin panel.');
        return;
    }
    
    // Parse and shuffle the questions
    questions = shuffleQuestions(JSON.parse(storedQuestions));
    console.log("Questions array:", questions); // Debugging log
    
    // Reset quiz state
    currentQuestionIndex = 0;
    score = 0;
    
    // Hide start screen and show quiz container
    startScreen.classList.add('hidden');
    quizContainer.classList.remove('hidden');
    
    // Show the first question
    showQuestion();
}

// ============================
// Function to Show a Question
// ============================
function showQuestion() {
    // If no more questions, show results
    if (currentQuestionIndex >= questions.length) {
        showResults();
        return;
    }
    
    // Get current question
    const question = questions[currentQuestionIndex];
    
    // Update progress text
    progressElement.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    
    // Render question and options
    questionContainer.innerHTML = `
        <div class="question">${question.question}</div>
        <div class="options">
            ${question.options.map((option, index) => `
                <button class="option" data-index="${index}">${option}</button>
            `).join('')}
        </div>
    `;
    
    // Attach event listeners to each option button
    document.querySelectorAll('.option').forEach(option => {
        option.addEventListener('click', selectAnswer);
    });
    
    // Hide Next button until an answer is selected
    nextBtn.classList.add('hidden');
}

// ============================
// Function to Handle Answer Selection
// ============================
function selectAnswer(e) {
    const selectedButton = e.target;
    const selectedIndex = selectedButton.dataset.index;
    const question = questions[currentQuestionIndex];
    
    // Check if selected answer is correct
    if (selectedIndex == question.answer) {
        selectedButton.classList.add('correct');
        score++;
    } else {
        selectedButton.classList.add('incorrect');
        // Highlight correct answer
        document.querySelector(`.option[data-index="${question.answer}"]`).classList.add('correct');
    }
    
    // Disable all options after selection
    document.querySelectorAll('.option').forEach(option => {
        option.disabled = true;
    });
    
    // Show Next button after an answer is selected
    nextBtn.classList.remove('hidden');
}

// ============================
// Function to Show Next Question
// ============================
function showNextQuestion() {
    currentQuestionIndex++;
    showQuestion();
}

// ============================
// Function to Show Quiz Results
// ============================
function showResults() {
    console.log("showResults called"); // Debugging log
    
    // Hide quiz container
    quizContainer.classList.add('hidden');
    
    // Show results container
    resultsContainer.classList.remove('hidden');
    
    // Calculate score percentage
    const percentage = Math.round((score / questions.length) * 100);
    
    // Render results
    resultsContainer.innerHTML = `
        <h2>Quiz Completed</h2>
        <p>Score: ${score}/${questions.length}</p>
        <p>${percentage}% correct</p>
        <button onclick="window.location.reload()">Restart</button>
    `;
    
    console.log("Results container should be shown now"); // Debugging log
}

// ============================
// Utility Function to Shuffle Questions
// ============================
function shuffleQuestions(array) {
    return array.sort(() => Math.random() - 0.5);
}
