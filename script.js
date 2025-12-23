function choose(option) {
  let resultText = "";

  if (option === 3) {
    resultText = "✅ Correct! Waiting shows 눈치 and respect in group situations.";
  } else {
    resultText = "❌ Not ideal. Starting or asking directly can feel rude in Korean culture.";
  }

  document.getElementById("result").innerText = resultText;
}
