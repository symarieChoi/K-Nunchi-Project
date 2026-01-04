import { quizData, resultLevels } from "./data.js";

/* ---------- QUIZ PAGE ---------- */
const questionEl = document.getElementById("question");

if (questionEl) {
  let currentIndex = 0;
  let score = 0;

  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  const shuffledQuestions = shuffle([...quizData]);

  function loadQuestion() {
    const q = shuffledQuestions[currentIndex];

    document.getElementById("category").textContent = q.category;
    document.getElementById("progress").textContent =
      `${currentIndex + 1} / ${shuffledQuestions.length}`;

    questionEl.textContent = q.question;

    const answersDiv = document.getElementById("answers");
    answersDiv.innerHTML = "";

    const shuffledAnswers = q.answers.map((text, index) => ({
      text,
      isCorrect: index === q.correctIndex
    }));

    shuffle(shuffledAnswers);

    shuffledAnswers.forEach(ans => {
      const btn = document.createElement("button");
      btn.textContent = ans.text;
      btn.className = "answer-btn";

      btn.onclick = () => {
        if (ans.isCorrect) score++;
        currentIndex++;

        if (currentIndex < shuffledQuestions.length) {
          loadQuestion();
        } else {
          localStorage.setItem("score", score);
          window.location.href = "result.html";
        }
      };

      answersDiv.appendChild(btn);
    });
  }

  loadQuestion();
}

/* ---------- RESULT PAGE ---------- */
const scoreEl = document.getElementById("final-score");

if (scoreEl) {
  const score = parseInt(localStorage.getItem("score")) || 0;
  scoreEl.textContent = score;

  const level = resultLevels.find(
    l => score >= l.min && score <= l.max
  );

  if (level) {
    document.getElementById("level-title").textContent = level.title;
    document.getElementById("level-desc").textContent = level.description;
  }

  document.getElementById("restart-btn").onclick = () => {
    localStorage.removeItem("score");
    window.location.href = "quiz.html";
  };
}


