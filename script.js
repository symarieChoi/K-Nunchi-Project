import { quizData, resultLevels } from './data.js';

const isQuizPage = document.getElementById('quiz-page');
const isResultPage = document.getElementById('result-page');

let currentQuestion = null;

// Shuffle function
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

// Quiz page logic
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
        // Apply shuffle function
        const shuffled = shuffleOptions(base.options, base.correctIndex);

        currentQuestion = {
            ...base,
            options: shuffled.options,
            correctIndex: shuffled.correctIndex
        };

        // 1. Function to update the UI
        const updateScreen = () => {
            // Reset screen/UI
            feedbackArea.classList.add('hidden');
            optionsContainer.innerHTML = '';
            nextBtn.disabled = false;

            // Set text content
            categoryBadge.innerText = currentQuestion.category;

            // Split scenario into situation and question parts
            const parts = currentQuestion.scenario.split('\n\n');
            if (parts.length > 1) {
                situationText.innerText = parts[0];
                questionText.innerText = parts[1];
            } else {
                situationText.innerText = currentQuestion.scenario;
                questionText.innerText = "";
            }

            // Upgrade progress bar/text
            progressText.innerText = `${currentQuestionIndex + 1} / ${quizData.length}`;
            progressFill.style.width = `${(currentQuestionIndex / quizData.length) * 100}%`;

            // Create option buttons
            currentQuestion.options.forEach((opt, i) => {
                const btn = document.createElement('button');
                btn.className = 'btn option-btn';
                btn.innerText = opt;
                btn.onclick = () => selectOption(i, btn);
                optionsContainer.appendChild(btn);
            });
        };

        // 2. Handle image loading
        if (currentQuestion.img) {
            // Indicate loading state to user (dim the current image)
            scenarioImg.style.opacity = '0.3';

            // Preload using a virtual image object
            const tempImg = new Image();
            tempImg.src = currentQuestion.img;

            // Code to execute when image loading is complete
            tempImg.onload = () => {
                scenarioImg.src = currentQuestion.img; // Update actual image source
                scenarioImg.style.display = 'block';
                scenarioImg.style.opacity = '1';       // Restore opacity

                updateScreen(); // Update text and buttons simutaneously
            };

            // Ensure quiz continues even if image loading fails
            tempImg.onerror = () => {
                scenarioImg.style.display = 'none'; // Hide image
                updateScreen(); // Show text content at least
            };

        } else {
            // Execute immediately if no image exists
            scenarioImg.style.display = 'none';
            updateScreen();
        }
    }

    function preloadImages() {
        quizData.forEach((question) => {
            // Create image objects to preload (invisible on screen)
            const img = new Image();
            img.src = question.img;
        });
    }

    // Execute this function once when page loads or quiz starts
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
            // Save score and redirect
            localStorage.setItem('quizScore', score);
            window.location.href = 'result.html';
        }
    };
}

// Result page logic
if (isResultPage) {
    // 1. Retrieve score
    const savedScore = localStorage.getItem('quizScore');
    const finalScore = savedScore ? parseInt(savedScore) : 0;

    // Display score on screen
    document.getElementById('final-score').innerText = finalScore;

    // 2. Calculate level
    let finalLevel = resultLevels[0]; // Set default to lowest level (Tourist)
    // Find matching level (compare from lowest score)
    for (let level of resultLevels) {
        if (finalScore >= level.minScore) {
            finalLevel = level;
        }
    }

    // 3. Update UI
    const levelTitle = document.getElementById("level-title");
    const levelDesc = document.getElementById("level-desc");

    if (levelTitle) levelTitle.textContent = finalLevel.title;
    if (levelDesc) levelDesc.textContent = finalLevel.description;

    // Level-specific image
    const levelImage = document.getElementById("level-image");
    if (levelImage && finalLevel.image) {
        levelImage.src = finalLevel.image;
    }

    // 3. Image save function (using html2canvas)
    const saveImgBtn = document.getElementById('save-img-btn');

    if (saveImgBtn) {
        saveImgBtn.onclick = () => {
            const captureArea = document.querySelector('.app-container');
            const shareBox = document.querySelector('.share-box');
            const restartBtn = document.getElementById('restart-btn');

            // Find currently active screen
            const activeScreen = document.querySelector('.screen.active');

            // Temporarily hide buttons
            if (shareBox) shareBox.style.display = 'none';
            if (restartBtn) restartBtn.style.display = 'none';

            // Force disable animation during capture
            if (activeScreen) {
                activeScreen.style.animation = 'none';
                activeScreen.style.opacity = '1';
            }

            // Start capture
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

                // Restore UI (show buttons again)
                if (shareBox) shareBox.style.display = 'block';
                if (restartBtn) restartBtn.style.display = 'block';

            }).catch(err => {
                console.error("Capture failed:", err);
                alert("Image save failed.");

                // Restore buttons even on error
                if (shareBox) shareBox.style.display = 'block';
                if (restartBtn) restartBtn.style.display = 'block';
            });
        };
    }

    // 4. Share function (uses finalLevel info)
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
                    // Use finalLevel.title directly
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

    // 5. Restart function
    const restartBtn = document.getElementById("restart-btn");
    if (restartBtn) {
        restartBtn.addEventListener("click", () => {
            localStorage.removeItem("quizScore");
            window.location.href = "index.html";
        });
    }
}
