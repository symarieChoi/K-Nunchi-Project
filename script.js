let current = 0;

const scenarios = [
  {
    text: "You are eating with Korean coworkers. The food arrives, but no one starts eating.",
    correct: 3,
    explanation: "Waiting shows 눈치 and respect in group situations."
  },
  {
    text: "Your professor says: 'Feel free to share your honest opinion.'",
    correct: 3,
    explanation: "Sharing a soft, indirect opinion is safest in Korean culture."
  },
  {
    text: "A senior student gives wrong information during a meeting.",
    correct: 3,
    explanation: "Asking a gentle question avoids embarrassing the senior."
  }
];

function choose(option) {
  const result = document.getElementById("result");

  if (option === scenarios[current].correct) {
    result.innerText = "✅ Correct! " + scenarios[current].explanation;
  } else {
    result.innerText = "❌ Not ideal. " + scenarios[current].explanation;
  }
}

function nextScenario() {
  current++;

  if (current >= scenarios.length) {
    document.getElementById("scenario").innerText =
      "🎉 You finished K-Nunchi Survival!";
    document.getElementById("result").innerText = "";
    return;
  }

  document.getElementById("scenario").innerText = scenarios[current].text;
  document.getElementById("result").innerText = "";
}
