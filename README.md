# K-Nunchi-Survival
### "Are you a Tourist? or a Korean Local?"
A web-based survival quiz to help international students master Korean "Nunchi" (implicit rules).

<img width="1615" height="877" alt="image" src="https://github.com/user-attachments/assets/a03ba9b0-458e-4d70-aecb-2e7099fc548c" />

## 📖 About The Project
**K-Nunchi Survival** is an interactive web application designed to help foreign students and visitors understand the subtle **"Implicit Rules"** and **"Non-verbal Cues"** of Korean culture, often referred to as *"Nunchi."*

Many international students face difficulties not only because of language barriers but also because of cultural misunderstanding in daily life (e.g., public transport etiquette, dining manners). This project gamifies these situations into a "Survival Quiz" format to make learning Korean culture fun and engaging.

- Live Demo: https://symariechoi.github.io/K-Nunchi-Project/
- Project Period: 2025.12.23 ~ 2026.01.18

## 👥 Team Slang
- **최서연** (FE)
- **화라하** (FE)

## ✨ Key Features
#### 🧩 Scenario-Based Quizzes
Consists of 13 realistic scenarios covering university life, public transportation, and dining etiquette.
#### 💡 Contextual Guides
Provides detailed explanations for every answer (correct or incorrect) to help users understand the underlying cultural context.
#### 🏆 Leveling System
detailed scoring system that assigns one of 4 tiers based on the user's "Nunchi" level (Tourist, Loading Nunchi..., K-life Pro, Almost Korean).
#### 📤 Share & Save
Integrated KakaoTalk Sharing and Image Saving features to encourage viral sharing

## 🛠 Tech Stack
|**Category**|Technology|
|:------------:|:----------:|
|**Frontend**| HTML5, CSS3, JavaScript (ES6+, Vanilla JS)|
|**Styling**|CSS Variables, Flexbox, Animations, Responsive Design|
|**Libraries**|Kakao JavaScript SDK, html2canvas|
|**Deployment**|GitHub Pages|
|**Version Control**|Git, GitHub|

## 📂 Directory Structure
This project follows a flat structure for simplicity and ease of deployment on GitHub Pages.
```
K-Nunchi-Project/
├── images/             # Assets: Scenarios, Characters, Backgrounds
├── index.html          # Start Page & Intro Description
├── quiz.html           # Main Quiz Logic & Interface
├── result.html         # Score Calculation & Result/Sharing Page
├── style.css           # Global Styles & Responsive Layouts
├── data.js             # Quiz Data (JSON) & Leveling Logic
├── script.js           # Core Engine (Score, Shuffle, Sharing)
├── start.js            # Intro Animations (Door Opening Effect)
└── README.md           # Project Documentation
```

## 🚀 Troubleshooting & Optimization
Key technical challenges faced and resolved during development:
1. Image & Text Synchronization
- Issue: Network latency caused text to update before the corresponding scenario image loaded, resulting in a flickering effect.
- Solution: Implemented an Image Preloading strategy using the Image() object. The screen update logic is triggered only after the onload event confirms the image is fully ready.

2. Mobile Typography Layout
- Issue: Long titles were wrapping unexpectedly on narrow mobile screens, breaking the visual design.
- Solution: Applied CSS white-space: nowrap combined with the clamp() function. This ensures the font size scales fluidly based on the viewport width (vw) while remaining on a single line.

## 📦 How to Run Locally
1. Clone the repository:
   ```
   git clone https://github.com/symarieChoi/K-Nunchi-Project.git
   ```
2. Navigate to the project directory.
3. Open index.html in your browser (or use a VS Code Live Server extension).
