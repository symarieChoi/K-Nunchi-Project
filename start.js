document.addEventListener("DOMContentLoaded", () => {
    // 요소 가져오기
    const showIntroBtn = document.getElementById("showIntroBtn"); // 첫 화면 버튼
    const realStartBtn = document.getElementById("realStartBtn"); // 설명 화면 버튼
    
    const mainScreen = document.getElementById("main-screen");
    const introScreen = document.getElementById("intro-screen");
    
    const leftDoor = document.querySelector(".door-left");
    const rightDoor = document.querySelector(".door-right");
  
    // 1. 첫 번째 버튼 클릭: 메인 -> 설명 페이지로 전환
    if (showIntroBtn) {
        showIntroBtn.addEventListener("click", () => {
            mainScreen.classList.remove("active");
            introScreen.classList.add("active");
        });
    }
  
    // 2. 두 번째 버튼 클릭: 설명 페이지 -> 대문 열림 -> 퀴즈 이동
    if (realStartBtn) {
        realStartBtn.addEventListener("click", () => {
            // 문 열림 효과 시작
            if (leftDoor && rightDoor) {
                leftDoor.classList.add("open-left");
                rightDoor.classList.add("open-right");
            }
  
            // 1초 뒤 페이지 이동
            setTimeout(() => {
                window.location.href = "quiz.html";
            }, 1000);
        });
    }
});