
# Quiz App

This is a simple **Quiz Web App** project that lets users take a quiz, and admins add, edit, or delete quiz questions.

---

## 📂 Project Structure

```
/ (root)
├── index.html        # Main Quiz Page
├── admin.html        # Admin Panel for managing questions
├── css/
│   └── style.css     # Stylesheet for both quiz and admin pages
├── js/
│   ├── quiz.js       # JavaScript for quiz functionality (user side)
│   └── admin.js      # JavaScript for admin functionality (admin side)
└── README.md         # Project documentation (this file)
```

---

## ✨ Features

- **User (Quiz)**:
  - Display questions one-by-one.
  - Show options (A, B, C, D).
  - Highlight correct answers.
  - Track score.

- **Admin**:
  - Add new questions with four options.
  - Mark the correct answer.
  - Edit existing questions.
  - Delete specific or all questions.
  - Save all questions in **Local Storage**.

---

## 🚀 How to Run

1. **Download or clone** the repository.
2. Open `index.html` in a web browser to take the quiz.
3. Open `admin.html` to add, edit, or delete questions.

_No server setup is required! It works entirely in the browser using local storage._

---

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript (Vanilla)

---

## 📋 Admin Page Details (`admin.html`)

- `admin.js` handles:
  - Form submissions for adding/editing.
  - Rendering the question list.
  - Deleting or clearing all questions.
- Questions are stored under `localStorage` key: `quiz_questions`.

---

## 🎯 Future Improvements

- Add timer for each question.
- Show quiz results page.
- Export and import question sets.
- Add difficulty levels.

---

## 🧑‍💻 Author

- Created with ❤️ by **Keval Nagariya** 
- ❤️ **https://op-quizzify.netlify.app/**
