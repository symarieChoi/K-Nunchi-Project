document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("startBtn");
  const leftDoor = document.querySelector(".door-left");
  const rightDoor = document.querySelector(".door-right");

  if (!startBtn || !leftDoor || !rightDoor) {
    console.error("Start page elements not found");
    return;
  }

  startBtn.addEventListener("click", () => {
    leftDoor.classList.add("open-left");
    rightDoor.classList.add("open-right");

    setTimeout(() => {
      window.location.href = "quiz.html";
    }, 1000);
  });
});
