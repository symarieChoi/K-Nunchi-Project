import { quizData, resultLevels } from './data.js';

const isQuizPage = document.getElementById('quiz-page');
const isResultPage = document.getElementById('result-page');

let currentQuestion = null;

/* ============================
   SHUFFLE FUNCTION (CORE)
   ============================ */
function shuffleOptions(options, correctIndex) {
    const temp = options.map((text, index) => ({
        text,
        isCorrect: index === correctIndex
    }));

    for (let i = temp.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [temp[i], temp[j]] = [temp[j], temp[i]];
    }

    return {
        options: temp.map(o => o.text),
        correctIndex: temp.findIndex(o => o.isCorrect)
    };
}

/* ============================
   QUIZ PAGE
   ============================ */
if (isQuizPage) {
    let currentQuestionIndex = 0;
    let score = 0;

    const scenarioText = document.getElementById('scenario-text');
    const optionsContainer = document.getElementById('options-container');
    const progressText = document.getElementById('progress-text');
    const progressFill = document.getElementById('progress-fill');
    const categoryBadge = document.getElementById('category-badge');
    const feedbackArea = document.getElementById('feedback-area');
    const feedbackTitle = document.getElementById('feedback-title');
    const explanationText = document.getElementById('explanation-text');
    const nextBtn = document.getElementById('next-btn');

    loadQuestion();

    function loadQuestion() {
        const base = quizData[currentQuestionIndex];

        const shuffled = shuffleOptions(
            base.options,
            base.correctIndex
        );

        currentQuestion = {
            ...base,
            options: shuffled.options,
            correctIndex: shuffled.correctIndex
        };

        feedbackArea.classList.add('hidden');
        optionsContainer.innerHTML = '';

        categoryBadge.innerText = currentQuestion.category;
        scenarioText.innerText = currentQuestion.scenario;
        progressText.innerText = `${currentQuestionIndex + 1} / ${quizData.length}`;

        progressFill.style.width =
            `${(currentQuestionIndex / quizData.length) * 100}%`;

        currentQuestion.options.forEach((option, index) => {
            const btn = document.createElement('button');
            btn.innerText = option;
            btn.classList.add('btn', 'option-btn');
            btn.onclick = () => selectOption(index, btn);
            optionsContainer.appendChild(btn);
        });
    }

    function selectOption(selectedIndex, selectedBtn) {
        const allBtns = document.querySelectorAll('.option-btn');
        allBtns.forEach(b => b.disabled = true);

        if (selectedIndex === currentQuestion.correctIndex) {
            score++;
            selectedBtn.classList.add('correct');
            feedbackTitle.innerText = "✅ That's Correct!";
        } else {
            selectedBtn.classList.add('wrong');
            allBtns[currentQuestion.correctIndex].classList.add('correct');
            feedbackTitle.innerText = "❌ Oops!";
        }

        explanationText.innerText = currentQuestion.explanation;
        feedbackArea.classList.remove('hidden');
    }

    nextBtn.onclick = () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            loadQuestion();
        } else {
            localStorage.setItem('quizScore', score);
            window.location.href = 'result.html';
        }
    };
}

