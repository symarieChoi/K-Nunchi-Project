import { quizData, resultLevels } from './data.js';

const isQuizPage = document.getElementById('quiz-page');
const isResultPage = document.getElementById('result-page');

let currentQuestion = null;

/* ========= SHUFFLE ========= */
function shuffleOptions(options, correctIndex) {
    const arr = options.map((text, i) => ({
        text,
        isCorrect: i === correctIndex
    }));

    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return {
        options: arr.map(o => o.text),
        correctIndex: arr.findIndex(o => o.isCorrect)
    };
}

/* ========= QUIZ PAGE ========= */
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
        const shuffled = shuffleOptions(base.options, base.correctIndex);

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

        currentQuestion.options.forEach((opt, i) => {
            const btn = document.createElement('button');
            btn.className = 'btn option-btn';
            btn.innerText = opt;
            btn.onclick = () => selectOption(i, btn);
            optionsContainer.appendChild(btn);
        });
    }

    function selectOption(index, btn) {
        const buttons = document.querySelectorAll('.option-btn');
        buttons.forEach(b => b.disabled = true);

        if (index === currentQuestion.correctIndex) {
            score++;
            btn.classList.add('correct');
            feedbackTitle.innerText = "✅ That's Correct!";
        } else {
            btn.classList.add('wrong');
            buttons[currentQuestion.correctIndex].classList.add('correct');
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
