document.addEventListener("DOMContentLoaded", () => {
    // Select elements
    const showIntroBtn = document.getElementById("showIntroBtn"); // Start screen button
    const realStartBtn = document.getElementById("realStartBtn"); // Intro screen button

    const mainScreen = document.getElementById("main-screen");
    const introScreen = document.getElementById("intro-screen");

    const leftDoor = document.querySelector(".door-left");
    const rightDoor = document.querySelector(".door-right");

    // 1. First button click: Switch from main to intro screen
    if (showIntroBtn) {
        showIntroBtn.addEventListener("click", () => {
            mainScreen.classList.remove("active");
            introScreen.classList.add("active");
        });
    }

    // 2. Second button click: Switch from intro page to quiz
    if (realStartBtn) {
        realStartBtn.addEventListener("click", () => {
            // Start door opening animation
            if (leftDoor && rightDoor) {
                leftDoor.classList.add("open-left");
                rightDoor.classList.add("open-right");
            }

            // Navigate to page after 1 second
            setTimeout(() => {
                window.location.href = "quiz.html";
            }, 1000);
        });
    }
});