// 데이터 파일 연결
import { quizData, resultLevels } from './data.js';

// HTML에 특정 ID가 있는지 확인해서 현재 페이지가 어딘지 판단
const isQuizPage = document.getElementById('quiz-page');
const isResultPage = document.getElementById('result-page');

let currentQuestion = null;

// 보기 섞기: 정답 표시(isCorrect)를 붙여서 섞고 다시 떼어내는 방식
/* [Note]
    보기를 섞을 때 정답 위치(index)도 같이 이동해야 함
    1. map()으로 텍스트와 정답여부(boolean)를 묶음
    2. 랜덤하게 섞음
    3. findIndex()로 정답이 어디 있는지 다시 찾아서 반환
*/
function shuffleOptions(options, correctIndex) {
    // 1. 정답 표시 붙이기: 정답을 알려주는 정보를 객체로 만듦
    const arr = options.map((text, i) => ({
        text,
        isCorrect: i === correctIndex // 정답이면 true, 아니면 false
    }));

    // 2. 피셔-예이츠 셔플 (무작위로 섞기)
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    // 3. 정답 표시 떼고 결과 반환
    return {
        options: arr.map(o => o.text), // 섞인 텍스트들
        correctIndex: arr.findIndex(o => o.isCorrect) // 정답이 몇 번째로 이동했는지 찾기
    };
}

// 게임 진행
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

    // 화면을 그리는 함수
    function loadQuestion() {
        const base = quizData[currentQuestionIndex]; // data.js에서 데이터 가져오기
        const shuffled = shuffleOptions(base.options, base.correctIndex); // 보기 섞기

        currentQuestion = {
            ...base,
            options: shuffled.options,
            correctIndex: shuffled.correctIndex
        };

        feedbackArea.classList.add('hidden');
        optionsContainer.innerHTML = ''; // 기존 버튼 지우고 새로운 버튼 만들기
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

    // 사용자가 버튼을 눌렀을 때 실행
    function selectOption(index, btn) {
        const buttons = document.querySelectorAll('.option-btn');
        buttons.forEach(b => b.disabled = true); // 모든 버튼 비활성화 -> 중복 선택 막기

        if (index === currentQuestion.correctIndex) {
            score++; // 정답이면 점수 올리기
            btn.classList.add('correct');
            feedbackTitle.innerText = "✅ That's Correct!";
            feedbackTitle.style.color = "var(--correct-color)"; // 초록색
        } else {
            btn.classList.add('wrong');
            buttons[currentQuestion.correctIndex].classList.add('correct');
            feedbackTitle.innerText = "❌ Oops!";
            feedbackTitle.style.color = "var(--wrong-color)"; // 빨간색
        }

        // 해설 보여주기
        explanationText.innerText = currentQuestion.explanation;
        feedbackArea.classList.remove('hidden');
    }

    // 다음 버튼 로직
    nextBtn.onclick = () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            loadQuestion();
        } else {
            // [Note] 마지막 문제인 경우
            // 페이지가 넘어가면 변수(score)가 초기화되므로
            // 브라우저 저장소(LocalStorage)에 점수 백업해두고 이동
            localStorage.setItem('quizScore', score); // localStorage: 브라우저에 있는 주머니 -> 점수를 넣어두고 결과 페이지로 이동
            window.location.href = 'result.html';
        }
    };
}

// 결과 처리
if (isResultPage) {
    // 1. 점수 불러오기
    const savedScore = localStorage.getItem('quizScore'); // 점수 꺼내기
    const finalScore = savedScore ? parseInt(savedScore) : 0;

    // 점수 화면 표시
    document.getElementById('final-score').innerText = finalScore;

    // 2. 레벨 계산 (data.js의 기준 사용)
    let finalLevel = resultLevels[0];
    for (let level of resultLevels) {
        if (finalScore >= level.minScore) {
            finalLevel = level;
        }
    }

    // 레벨 텍스트 표시
    document.getElementById('level-title').innerText = finalLevel.title;
    document.getElementById('level-desc').innerText = finalLevel.description;

    // 3. Try Again 버튼 기능
    const restartBtn = document.getElementById('restart-btn');
    if (restartBtn) {
        restartBtn.onclick = () => {
            localStorage.removeItem('quizScore'); // 점수 초기화
            window.location.href = 'index.html';
        };
    }

    // 4. Copy Link (공유) 버튼 기능
    const webShareBtn = document.getElementById('web-share-btn');
    if (webShareBtn) {
        webShareBtn.onclick = async () => {
            const shareData = {
                title: 'K-Nunchi Quiz',
                text: `I scored ${finalScore}/10 (${finalLevel.title}) on the Korean Manners Quiz!`,
                url: window.location.href
            };

            // 모바일 공유: 모바일 브라우저의 기본 공유 기능 창을 띄움
            if (navigator.share) {
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
                Kakao.init('c5ced87e2904c7f993809b80c926c5c3'); // 본인 키 확인
            } catch (e) { console.log('Kakao SDK error'); }
        }

        kakaoBtn.onclick = () => {
            if (!window.Kakao || !Kakao.isInitialized()) return;

            // 친구가 눌렀을 때 이동할 주소 (결과 페이지 주소를 index.html로 교체)
            const shareUrl = window.location.href.replace('result.html', 'index.html');

            // 카카오톡 전용 공유 버튼
            Kakao.Share.sendDefault({
                objectType: 'feed',
                content: {
                    title: '🇰🇷 K-Nunchi Quiz Result',
                    description: `I scored ${finalScore}/10 (${finalLevel.title}). Can you beat my score?`,
                    imageUrl: 'https://images.unsplash.com/photo-1580974852861-c381510bc98a?q=80&w=800&auto=format&fit=crop', // 이미지
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