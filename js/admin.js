// --- DOM Elements ---
const questionForm = document.getElementById('question-form');
const questionList = document.getElementById('question-list');
const clearAllBtn = document.getElementById('clear-all');
const cancelEditBtn = document.getElementById('cancel-edit');

// --- Form Fields ---
const questionField = document.getElementById('question');
const optionAField = document.getElementById('optionA');
const optionBField = document.getElementById('optionB');
const optionCField = document.getElementById('optionC');
const optionDField = document.getElementById('optionD');
const answerField = document.getElementById('answer');
const editIdField = document.getElementById('edit-id');

// --- Initialize App ---
document.addEventListener('DOMContentLoaded', renderQuestionList); // Render questions when page loads
questionForm.addEventListener('submit', handleFormSubmit); // Handle form submission
clearAllBtn.addEventListener('click', clearAllQuestions); // Clear all questions
cancelEditBtn.addEventListener('click', resetForm); // Cancel editing and reset form

// --- Handle Form Submit (Add or Update Question) ---
function handleFormSubmit(e) {
    e.preventDefault(); // Prevent default form behavior
    
    // Create question data object
    const questionData = {
        id: editIdField.value || Date.now().toString(), // Use existing ID if editing, else generate new ID
        question: questionField.value,
        options: [
            optionAField.value,
            optionBField.value,
            optionCField.value,
            optionDField.value
        ],
        answer: answerField.value
    };
    
    let questions = getQuestions(); // Get current questions from localStorage
    
    if (editIdField.value) {
        // If editing existing question
        const index = questions.findIndex(q => q.id === editIdField.value);
        questions[index] = questionData;
    } else {
        // If adding new question
        questions.push(questionData);
    }
    
    saveQuestions(questions); // Save updated questions list
    resetForm(); // Clear form
    renderQuestionList(); // Re-render updated question list
}

// --- Render Question List on the Page ---
function renderQuestionList() {
    const questions = getQuestions(); // Get questions from localStorage

    // If no questions, show a message
    questionList.innerHTML = questions.length === 0 
        ? '<p>No questions added yet.</p>'
        : questions.map(q => `
            <div class="question-item" data-id="${q.id}">
                <h3>${q.question}</h3>
                <ol type="A">
                    ${q.options.map((opt, i) => `
                        <li class="${q.answer == i ? 'correct' : ''}">${opt}</li>
                    `).join('')}
                </ol>
                <div class="question-actions">
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                </div>
            </div>
        `).join('');

    // Attach event listeners to Edit and Delete buttons
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', editQuestion);
    });
    
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', deleteQuestion);
    });
}

// --- Edit Existing Question ---
function editQuestion(e) {
    const questionId = e.target.closest('.question-item').dataset.id; // Get question ID from clicked item
    const question = getQuestions().find(q => q.id === questionId); // Find the question data

    // Populate form fields with existing question data
    questionField.value = question.question;
    optionAField.value = question.options[0];
    optionBField.value = question.options[1];
    optionCField.value = question.options[2];
    optionDField.value = question.options[3];
    answerField.value = question.answer;
    editIdField.value = question.id;
    
    cancelEditBtn.classList.remove('hidden'); // Show Cancel button
    questionForm.scrollIntoView({ behavior: 'smooth' }); // Scroll to form
}

// --- Delete Single Question ---
function deleteQuestion(e) {
    if (confirm('Delete this question?')) {
        const questionId = e.target.closest('.question-item').dataset.id; // Get question ID
        const questions = getQuestions().filter(q => q.id !== questionId); // Remove question
        saveQuestions(questions); // Save updated list
        renderQuestionList(); // Re-render list
    }
}

// --- Clear All Questions ---
function clearAllQuestions() {
    if (confirm('Delete ALL questions?')) {
        localStorage.removeItem('quiz_questions'); // Remove all questions from localStorage
        renderQuestionList(); // Re-render empty list
    }
}

// --- Reset Form to Default State ---
function resetForm() {
    questionForm.reset(); // Clear form fields
    editIdField.value = ''; // Clear edit ID
    cancelEditBtn.classList.add('hidden'); // Hide Cancel button
}

// --- Helper: Get Questions from LocalStorage ---
function getQuestions() {
    const questions = localStorage.getItem('quiz_questions');
    return questions ? JSON.parse(questions) : []; // Return parsed list or empty array
}

// --- Helper: Save Questions to LocalStorage ---
function saveQuestions(questions) {
    localStorage.setItem('quiz_questions', JSON.stringify(questions));
}
