import { quizData, resultLevels } from './data.js';

const isQuizPage = document.getElementById('quiz-page');
const isResultPage = document.getElementById('result-page');

let currentQuestion = null;

// shuffle function
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

// quiz page logic
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
        // 셔플 기능 적용
        const shuffled = shuffleOptions(base.options, base.correctIndex);

        currentQuestion = {
            ...base,
            options: shuffled.options,
            correctIndex: shuffled.correctIndex
        };

        feedbackArea.classList.add('hidden');
        optionsContainer.innerHTML = '';
        nextBtn.disabled = false; // 버튼 활성화

        categoryBadge.innerText = currentQuestion.category;
        scenarioText.innerText = currentQuestion.scenario;
        progressText.innerText = `${currentQuestionIndex + 1} / ${quizData.length}`;
        progressFill.style.width = `${(currentQuestionIndex / quizData.length) * 100}%`;

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
            feedbackTitle.style.color = "var(--correct-color)"; // 스타일 추가
        } else {
            btn.classList.add('wrong');
            buttons[currentQuestion.correctIndex].classList.add('correct');
            feedbackTitle.innerText = "❌ Oops!";
            feedbackTitle.style.color = "var(--wrong-color)"; // 스타일 추가
        }

        explanationText.innerText = currentQuestion.explanation;
        feedbackArea.classList.remove('hidden');
    }

    nextBtn.onclick = () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            loadQuestion();
        } else {
            // 점수 저장 후 이동
            localStorage.setItem('quizScore', score);
            window.location.href = 'result.html';
        }
    };
}

// result page logic
if (isResultPage) {
    // 1. 점수 불러오기
    const savedScore = localStorage.getItem('quizScore');
    const finalScore = savedScore ? parseInt(savedScore) : 0;

    // 점수 화면 표시
    document.getElementById('final-score').innerText = finalScore;

    // 2. 레벨 계산
    let finalLevel = resultLevels[0];
    for (let level of resultLevels) {
        if (finalScore >= level.minScore) {
            finalLevel = level;
        }
    }

    // 레벨 텍스트 표시
    document.getElementById('level-title').innerText = finalLevel.title;
    document.getElementById('level-desc').innerText = finalLevel.description;

    // 레벨 이미지 표시
    const levelImage = document.getElementById('level-image');
    if (levelImage) levelImage.src = finalLevel.image;

    // 3. Try Again 버튼 기능
    const restartBtn = document.getElementById('restart-btn');
    if (restartBtn) {
        restartBtn.onclick = () => {
            localStorage.removeItem('quizScore'); // 점수 초기화
            window.location.href = 'index.html';
        };
    }

    // 4. Copy Link 버튼 기능
    const webShareBtn = document.getElementById('web-share-btn');
    if (webShareBtn) {
        webShareBtn.onclick = async () => {
            const shareData = {
                title: 'K-Nunchi Quiz',
                text: `I scored ${finalScore}/10 (${finalLevel.title}) on the Korean Manners Quiz!`,
                url: window.location.href
            };

            if (navigator.share) {
                // 모바일 공유
                try { await navigator.share(shareData); } catch (err) { }
            } else {
                // PC 클립보드 복사
                try {
                    await navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`);
                    alert('Link copied to clipboard!');
                } catch (err) {
                    alert('Copy failed (Please copy URL manually)');
                }
            }
        };
    }

    // 5. 카카오톡 공유 기능
    const kakaoBtn = document.getElementById('kakao-share-btn');
    if (kakaoBtn) {
        if (window.Kakao && !Kakao.isInitialized()) {
            try {
                Kakao.init('c5ced87e2904c7f993809b80c926c5c3');
            } catch (e) { console.log('Kakao SDK error'); }
        }

        kakaoBtn.onclick = () => {
            if (!window.Kakao || !Kakao.isInitialized()) return;

            // 친구가 눌렀을 때 이동할 주소 (결과 페이지 주소를 index.html로 교체)
            const shareUrl = window.location.href.replace('result.html', 'index.html');

            Kakao.Share.sendDefault({
                objectType: 'feed',
                content: {
                    title: '🇰🇷 K-Nunchi Quiz Result',
                    description: `I scored ${finalScore}/10 (${finalLevel.title}). Can you beat my score?`,
                    imageUrl: 'https://images.unsplash.com/photo-1580974852861-c381510bc98a?q=80&w=800&auto=format&fit=crop', // 원하는 이미지 주소
                    link: {
                        mobileWebUrl: shareUrl,
                        webUrl: shareUrl,
                    },
                },
                buttons: [
                    {
                        title: '나도 풀어보기',
                        link: {
                            mobileWebUrl: shareUrl,
                            webUrl: shareUrl,
                        },
                    },
                ]
            });
        };
    }
}
