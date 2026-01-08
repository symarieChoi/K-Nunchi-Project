document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("startBtn");
  const leftDoor = document.querySelector(".door-left");
  const rightDoor = document.querySelector(".door-right");

  startBtn.addEventListener("click", () => {
    // Add animation classes
    leftDoor.classList.add("open-left");
    rightDoor.classList.add("open-right");

    // Go to quiz page after animation
    setTimeout(() => {
      window.location.href = "quiz.html";
    }, 1000); // must match animation duration
  });
});
