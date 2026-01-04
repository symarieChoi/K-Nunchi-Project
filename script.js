import { quizData, resultLevels } from './data.js';

// --- 페이지 식별 요소 가져오기 ---
const isQuizPage = document.getElementById('quiz-page');
const isResultPage = document.getElementById('result-page');

/* =======================================================
    PART 1. 퀴즈 페이지 로직 (quiz.html)
   ======================================================= */
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

    function shuffleOptions(options, correctIndex) {
    const mapped = options.map((text, index) => ({
        text,
        isCorrect: index === correctIndex
    }));

    // Fisher–Yates shuffle
    for (let i = mapped.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [mapped[i], mapped[j]] = [mapped[j], mapped[i]];
    }

    const newCorrectIndex = mapped.findIndex(opt => opt.isCorrect);
    const newOptions = mapped.map(opt => opt.text);

    return {
        options: newOptions,
        correctIndex: newCorrectIndex
    };
}


function loadQuestion() {
    const originalData = quizData[currentQuestionIndex];

    // Shuffle options safely
    const shuffled = shuffleOptions(
        originalData.options,
        originalData.correctIndex
    );

    // Save shuffled data temporarily
    currentQuestion = {
        ...originalData,
        options: shuffled.options,
        correctIndex: shuffled.correctIndex
    };

    // UI reset
    feedbackArea.classList.add('hidden');
    optionsContainer.innerHTML = '';

    // Fill UI
    categoryBadge.innerText = currentQuestion.category;
    scenarioText.innerText = currentQuestion.scenario;
    progressText.innerText = `${currentQuestionIndex + 1} / ${quizData.length}`;

    const progressPercent = (currentQuestionIndex / quizData.length) * 100;
    progressFill.style.width = `${progressPercent}%`;

    // Render buttons
    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.innerText = option;
        button.classList.add('btn', 'option-btn');
        button.addEventListener('click', () => selectOption(index, button));
        optionsContainer.appendChild(button);
    });
}


    function selectOption(selectedIndex, selectedButton) {
        const currentData = currentQuestion;
        const correctIndex = currentData.correctIndex;
        const allButtons = document.querySelectorAll('.option-btn');

        allButtons.forEach(btn => btn.disabled = true); // 중복 클릭 방지

        if (selectedIndex === correctIndex) {
            score++;
            selectedButton.classList.add('correct');
            feedbackTitle.innerText = "✅ That's Correct!";
            feedbackTitle.style.color = "var(--correct-color)";
        } else {
            selectedButton.classList.add('wrong');
            allButtons[correctIndex].classList.add('correct');
            feedbackTitle.innerText = "❌ Oops!";
            feedbackTitle.style.color = "var(--wrong-color)";
        }

        explanationText.innerText = currentData.explanation;
        feedbackArea.classList.remove('hidden');
    }

    nextBtn.addEventListener('click', () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            loadQuestion();
        } else {
            // 퀴즈 끝 -> 점수 저장하고 결과 페이지로
            localStorage.setItem('quizScore', score);
            window.location.href = 'result.html';
        }
    });
}

/* =======================================================
   PART 2. 결과 페이지 로직 (result.html)
   ======================================================= */
if (isResultPage) {
    // 1. 점수 불러오기
    const savedScore = localStorage.getItem('quizScore');
    const finalScore = savedScore ? parseInt(savedScore) : 0;

    document.getElementById('final-score').innerText = finalScore;

    // 2. 레벨 계산 (4단계)
    let finalLevel = resultLevels[0];
    for (let level of resultLevels) {
        if (finalScore >= level.minScore) {
            finalLevel = level;
        }
    }

    document.getElementById('level-title').innerText = finalLevel.title;
    document.getElementById('level-desc').innerText = finalLevel.description;

    // 3. 재시작 기능
    document.getElementById('restart-btn').addEventListener('click', () => {
        localStorage.removeItem('quizScore');
        window.location.href = 'index.html';
    });

    // 4. 공유 기능 (카카오톡 SDK 초기화 포함)
    const kakaoBtn = document.getElementById('kakao-share-btn');

    // 카카오 SDK 초기화 (안전 장치 추가)
    if (window.Kakao && !Kakao.isInitialized()) {
        try {
            // 👇 여기에 본인의 카카오 JavaScript 키를 입력하세요
            Kakao.init('YOUR_KAKAO_API_KEY');
        } catch (e) {
            console.error("Kakao Init Failed:", e);
        }
    }

    // 카카오 공유 버튼 클릭
    kakaoBtn.addEventListener('click', () => {
        if (!window.Kakao || !Kakao.isInitialized()) {
            alert("Kakao API Key is missing in script.js!");
            return;
        }

        Kakao.Share.sendDefault({
            objectType: 'feed',
            content: {
                title: '🇰🇷 K-Nunchi Quiz Result',
                description: `My Level: ${finalLevel.title}\nI scored ${finalScore}/10!`,
                imageUrl: 'https://cdn-icons-png.flaticon.com/512/5112/5112002.png', // 임시 이미지
                link: {
                    mobileWebUrl: window.location.href,
                    webUrl: window.location.href,
                },
            },
            buttons: [
                {
                    title: 'Take the Quiz',
                    link: {
                        mobileWebUrl: window.location.origin + '/index.html',
                        webUrl: window.location.origin + '/index.html',
                    },
                },
            ],
        });
    });

    // 통합 공유 (링크 복사 등)
    document.getElementById('web-share-btn').addEventListener('click', async () => {
        const shareData = {
            title: 'K-Nunchi Quiz',
            text: `I got ${finalScore}/10 (${finalLevel.title}) on the Korean Manners Quiz!`,
            url: window.location.href
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) { }
        } else {
            navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`)
                .then(() => alert('Link copied to clipboard!'))
                .catch(() => alert('Failed to copy.'));
        }
    });
}
