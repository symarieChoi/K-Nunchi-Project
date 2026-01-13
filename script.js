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

    const situationText = document.getElementById('situation-text');
    const questionText = document.getElementById('question-text');
    const scenarioImg = document.getElementById('scenario-img');
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

        // 1. 화면을 갱신하는 로직을 함수로 따로 묶어둡니다. (나중에 부르기 위해)
        const updateScreen = () => {
            // 화면 초기화
            feedbackArea.classList.add('hidden');
            optionsContainer.innerHTML = '';
            nextBtn.disabled = false;

            // 텍스트 설정 (이제야 바뀝니다)
            categoryBadge.innerText = currentQuestion.category;

            // 시나리오 상황/질문 쪼개기
            const parts = currentQuestion.scenario.split('\n\n');
            if (parts.length > 1) {
                situationText.innerText = parts[0];
                questionText.innerText = parts[1];
            } else {
                situationText.innerText = currentQuestion.scenario;
                questionText.innerText = "";
            }

            // 진행도 표시
            progressText.innerText = `${currentQuestionIndex + 1} / ${quizData.length}`;
            progressFill.style.width = `${(currentQuestionIndex / quizData.length) * 100}%`;

            // 버튼 생성
            currentQuestion.options.forEach((opt, i) => {
                const btn = document.createElement('button');
                btn.className = 'btn option-btn';
                btn.innerText = opt;
                btn.onclick = () => selectOption(i, btn);
                optionsContainer.appendChild(btn);
            });
        };

        // 2. 이미지 로딩 처리 (핵심 변경 부분)
        if (currentQuestion.img) {
            // 사용자에게 '로딩 중'임을 살짝 티냅니다 (기존 이미지를 흐리게)
            scenarioImg.style.opacity = '0.3';

            // 가상의 이미지 객체로 미리 로드
            const tempImg = new Image();
            tempImg.src = currentQuestion.img;

            // "이미지 로딩이 끝나면" 실행될 코드
            tempImg.onload = () => {
                scenarioImg.src = currentQuestion.img; // 실제 이미지 교체
                scenarioImg.style.display = 'block';
                scenarioImg.style.opacity = '1';       // 다시 선명하게

                updateScreen(); // ★ 여기서 텍스트와 버튼도 같이 바꿉니다!
            };

            // 혹시 이미지가 깨지거나 로딩 실패해도 퀴즈는 진행되어야 함
            tempImg.onerror = () => {
                scenarioImg.style.display = 'none'; // 이미지 숨김
                updateScreen(); // 텍스트라도 보여줌
            };

        } else {
            // 이미지가 없는 문제라면 그냥 즉시 실행
            scenarioImg.style.display = 'none';
            updateScreen();
        }
    }

    function preloadImages() {
        quizData.forEach((question) => {
            // 이미지 객체를 생성하여 미리 로드 (화면에는 안 보임)
            const img = new Image();
            img.src = question.img; // 데이터에서 이미지 경로가 있는 속성명 (예: .img, .imageSrc 등)
        });
    }

    // 페이지가 로드되거나 퀴즈가 시작될 때 이 함수를 한 번 실행
    preloadImages();

    function selectOption(index, btn) {
        const buttons = document.querySelectorAll('.option-btn');
        buttons.forEach(b => b.disabled = true);

        if (index === currentQuestion.correctIndex) {
            score++;
            btn.classList.add('correct');

            feedbackTitle.innerText = "✅ That's Correct!";
            feedbackTitle.style.color = "var(--correct-color)";
        } else {
            btn.classList.add('wrong');

            buttons[currentQuestion.correctIndex].classList.add('correct');

            feedbackTitle.innerText = "❌ Oops!";
            feedbackTitle.style.color = "var(--wrong-color)";
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
    let finalLevel = resultLevels[0]; // 기본값을 가장 낮은 레벨(Tourist)로 설정
    // 점수에 맞는 레벨 찾기 (낮은 점수부터 순차적으로 비교)
    for (let level of resultLevels) {
        if (finalScore >= level.minScore) {
            finalLevel = level;
        }
    }

    // 3. UI 업데이트
    const levelTitle = document.getElementById("level-title");
    const levelDesc = document.getElementById("level-desc");

    if (levelTitle) levelTitle.textContent = finalLevel.title;
    if (levelDesc) levelDesc.textContent = finalLevel.description;

    // 레벨별 이미지
    const levelImage = document.getElementById("level-image"); // 혹시 나중에 추가할 경우를 대비
    if (levelImage && finalLevel.image) {
        levelImage.src = finalLevel.image;
    }

    // 3. 이미지 저장 기능 (html2canvas 사용)
    const saveImgBtn = document.getElementById('save-img-btn');

    if (saveImgBtn) {
        saveImgBtn.onclick = () => {
            const captureArea = document.querySelector('.app-container');
            const shareBox = document.querySelector('.share-box');
            const restartBtn = document.getElementById('restart-btn');

            // 현재 활성화된 화면(.screen.active)을 찾기
            const activeScreen = document.querySelector('.screen.active');

            // 버튼 잠시 숨기기
            if (shareBox) shareBox.style.display = 'none';
            if (restartBtn) restartBtn.style.display = 'none';

            // 캡처할 때만 애니메이션 강제로 끄기
            if (activeScreen) {
                activeScreen.style.animation = 'none';
                activeScreen.style.opacity = '1';
            }

            // 캡처 시작
            html2canvas(captureArea, {
                backgroundColor: "#fffaf2",
                scale: 3,
                useCORS: true,
                allowTaint: true,
                scrollY: 0,
            }).then(canvas => {
                const link = document.createElement('a');
                link.download = 'k-nunchi-result.png';
                link.href = canvas.toDataURL('image/png');
                link.click();

                // 원상 복구 (버튼 다시 보이기)
                if (shareBox) shareBox.style.display = 'block';
                if (restartBtn) restartBtn.style.display = 'block';

            }).catch(err => {
                console.error("Capture failed:", err);
                alert("Image save failed.");

                // 에러 나도 버튼은 복구
                if (shareBox) shareBox.style.display = 'block';
                if (restartBtn) restartBtn.style.display = 'block';
            });
        };
    }

    // 4. 공유 기능 (finalLevel 정보 사용)
    const kakaoBtn = document.getElementById("kakao-share-btn");
    if (kakaoBtn) {
        try {
            if (window.Kakao && !Kakao.isInitialized()) {
                Kakao.init("c5ced87e2904c7f993809b80c926c5c3");
            }
        } catch (e) { console.log("Kakao SDK Error"); }

        kakaoBtn.addEventListener("click", () => {
            if (!window.Kakao) return;
            const shareUrl = window.location.href.replace('result.html', 'index.html');

            Kakao.Share.sendDefault({
                objectType: "feed",
                content: {
                    title: "🇰🇷 K-Nunchi Quiz Result",
                    // finalLevel.title을 직접 사용
                    description: `I scored ${finalScore}/13 (${finalLevel.title}). Can you beat my score?`,
                    imageUrl: "https://symariechoi.github.io/K-Nunchi-Project/images/hanbok-characters.png",
                    link: { mobileWebUrl: shareUrl, webUrl: shareUrl },
                },
                buttons: [{
                    title: 'Try it',
                    link: { mobileWebUrl: shareUrl, webUrl: shareUrl },
                }]
            });
        });
    }

    const webShareBtn = document.getElementById("web-share-btn");
    if (webShareBtn) {
        webShareBtn.addEventListener("click", async () => {
            const shareData = {
                title: "K-Nunchi Result",
                text: `I got ${finalScore}/13 (${finalLevel.title}) on K-Nunchi Quiz!`,
                url: window.location.href.replace('result.html', 'index.html'),
            };

            if (navigator.share) {
                try { await navigator.share(shareData); } catch (err) { }
            } else {
                try {
                    await navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`);
                    alert("Link copied to clipboard!");
                } catch (err) { alert("Copy failed"); }
            }
        });
    }

    // 5. 다시 풀기 기능
    const restartBtn = document.getElementById("restart-btn");
    if (restartBtn) {
        restartBtn.addEventListener("click", () => {
            localStorage.removeItem("quizScore");
            window.location.href = "index.html";
        });
    }
}
