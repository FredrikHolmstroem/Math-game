document.addEventListener("DOMContentLoaded", function () {
  const mainMenu = document.getElementById("main-menu");
  const ruleContainer = document.getElementById("rule-container");
  const difficultyContainer = document.getElementById("difficulty-container");
  const startButton = document.getElementById("start-button");

  const gameContainer = document.getElementById("game-container");
  const questionEl = document.getElementById("question");
  const scoreEl = document.getElementById("score");
  const solutionEl = document.getElementById("solution");
  const answerContainer = document.getElementById("answer-container");

  const rules = ["Product Rule", "Chain Rule", "Quotient Rule"];
  let selectedRule = rules[0];

  const difficulties = ["1", "2", "3"];
  let selectedDifficulty = difficulties[0];

  function createRuleButtons() {
    for (const rule of rules) {
      const button = document.createElement("button");
      button.textContent = rule;
      button.onclick = function () {
        selectedRule = rule;
        ruleContainer.querySelectorAll("button").forEach((btn) => {
          btn.classList.remove("selected");
        });
        button.classList.add("selected");
      };
      if (selectedRule === rule) {
        button.classList.add("selected");
      }
      ruleContainer.appendChild(button);
    }
  }

  function createDifficultyButtons() {
    for (const difficulty of difficulties) {
      const button = document.createElement("button");
      button.textContent = difficulty;
      button.onclick = function () {
        selectedDifficulty = difficulty;
        difficultyContainer.querySelectorAll("button").forEach((btn) => {
          btn.classList.remove("selected");
        });
        button.classList.add("selected");
      };
      if (selectedDifficulty === difficulty) {
        button.classList.add("selected");
      }
      difficultyContainer.appendChild(button);
    }
  }

  startButton.onclick = function () {
    mainMenu.style.display = "none";
    gameContainer.style.display = "block";
    initGame();
  };

  createRuleButtons();
  createDifficultyButtons();

  let currentScore = 0;
  let currentProblem;

  function displayProblem(problem) {
    questionEl.innerHTML = '\\(' + problem.expression + '\\)';
    MathJax.typeset();
  }

  function generateAnswers(problem) {
    const correctAnswerIndex = Math.floor(Math.random() * 4);
    const wrongAnswers = [...problem.wrongAnswers];

    for (let i = 0; i < 4; i++) {
      const button = document.createElement("button");
      if (i === correctAnswerIndex) {
       button.textContent = problem.correctAnswer;
} else {
const wrongIndex = Math.floor(Math.random() * wrongAnswers.length);
button.textContent = wrongAnswers[wrongIndex];
wrongAnswers.splice(wrongIndex, 1);
}

  button.innerHTML = '\\(' + button.textContent + '\\)';
  button.onclick = function () {
    if (i === correctAnswerIndex) {
      currentScore++;
      scoreEl.textContent = "Score: " + currentScore;
      displaySolution(problem.solution);
      answerContainer.style.display = "none";
    }
  };
  answerContainer.appendChild(button);
  MathJax.typeset();
}

