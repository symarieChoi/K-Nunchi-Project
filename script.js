import { quizData, resultLevels } from "./data.js";

document.addEventListener("DOMContentLoaded", () => {

  /* =======================
     QUIZ PAGE LOGIC
  ======================= */
  const questionEl = document.getElementById("question");

  if (questionEl) {
    let currentIndex = 0;
    let score = 0;

    function shuffle(arr) {
      return arr.sort(() => Math.random() - 0.5);
    }

    const questions = shuffle([...quizData]);

    function loadQuestion() {
      const q = questions[currentIndex];

      document.getElementById("category").textContent = q.category;
      document.getElementById("progress").textContent =
        `${currentIndex + 1} / ${questions.length}`;

      questionEl.textContent = q.question;

      const answersDiv = document.getElementById("answers");
      answersDiv.innerHTML = "";

      const answers = q.answers.map((text, idx) => ({
        text,
        isCorrect: idx === q.correctIndex
      }));

      shuffle(answers);

      answers.forEach(ans => {
        const btn = document.createElement("button");
        btn.className = "answer-btn";
        btn.textContent = ans.text;

        btn.addEventListener("click", () => {
          if (ans.isCorrect) score++;
          currentIndex++;

          if (currentIndex < questions.length) {
            loadQuestion();
          } else {
            localStorage.setItem("score", score);
            window.location.href = "result.html";
          }
        });

        answersDiv.appendChild(btn);
      });
    }

    loadQuestion();
  }

  /* =======================
     RESULT PAGE LOGIC
  ======================= */
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

    // ✅ TRY AGAIN BUTTON (NOW GUARANTEED TO WORK)
    const restartBtn = document.getElementById("restart-btn");
    restartBtn.addEventListener("click", () => {
      localStorage.removeItem("score");
      window.location.href = "quiz.html";
    });

    // ✅ KAKAO SHARE (RESTORED)
    if (window.Kakao && !Kakao.isInitialized()) {
      Kakao.init("YOUR_KAKAO_APP_KEY");
    }

    const kakaoBtn = document.getElementById("kakao-share-btn");
    if (kakaoBtn) {
      kakaoBtn.addEventListener("click", () => {
        Kakao.Share.sendDefault({
          objectType: "text",
          text: `I scored ${score}/10 on the K-Nunchi Quiz! 🇰🇷`,
          link: {
            mobileWebUrl: window.location.origin,
            webUrl: window.location.origin
          }
        });
      });
    }

    // ✅ WEB SHARE / COPY
    const webShareBtn = document.getElementById("web-share-btn");
    if (webShareBtn) {
      webShareBtn.addEventListener("click", async () => {
        const url = window.location.href;
        try {
          await navigator.clipboard.writeText(url);
          alert("Link copied!");
        } catch {
          alert(url);
        }
      });
    }
  }
});
