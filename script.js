document.addEventListener("DOMContentLoaded", function () {
  const questionEl = document.getElementById("question");
  const scoreEl = document.getElementById("score");
  const solutionEl = document.getElementById("solution");
  const answerContainer = document.getElementById("answer-container");

  const difficulties = ["easy", "medium", "hard"];
  let currentProblem = null;
  let currentScore = 0;

  const problemSet = {
    easy: [
      {
        question: "\\frac{d}{dx}(x^2 + 2x)",
        correctAnswer: "2x + 2",
        solution: [
          "Step 1: Identify each term: x^2 and 2x.",
          "Step 2: Use the power rule on x^2: 2x.",
          "Step 3: Use the power rule on 2x: 2.",
          "Step 4: Combine the results: 2x + 2.",
        ],
        wrongAnswers: ["3x + 2", "x^2 + 2x", "2x^2 + 2x"],
      },
    ],
    medium: [
      {
        question: "\\frac{d}{dx}(3x^2(2x+1)^3)",
        correctAnswer: "6x(2x+1)^2(7x+3)",
        solution: [
          "Step 1: Identify the functions: u = 3x^2 and v = (2x+1)^3.",
          "Step 2: Find the derivatives of u and v: u' = 6x, v' = 3(2x+1)^2(2).",
          "Step 3: Apply the product rule: uv' + vu' = 6x(2x+1)^2(7x+3).",
        ],
        wrongAnswers: ["9x^2(2x+1)^2", "12x(2x+1)^3", "6x^3(2x+1)^3"],
      },
    ],
    hard: [
      {
        question: "\\frac{d}{dx}(\\frac{3x^2+2x}{x^3+2})",
        correctAnswer: "\\frac{-3x^4-12x^3+8x+6}{(x^3+2)^2}",
        solution: [
          "Step 1: Identify the functions: u = 3x^2+2x, v = x^3+2.",
          "Step 2: Find the derivatives of u and v: u' = 6x+2, v' = 3x^2.",
          "Step 3: Apply the quotient rule: \\frac{u'v-uv'}{v^2} = \\frac{-3x^4-12x^3+8x+6}{(x^3+2)^2}.",
        ],
        wrongAnswers: ["\\frac{5x+2}{(x^3+2)^2}", "\\frac{6x^2+2x}{x^3+2}", "\\frac{12x^3+2x^2}{x^3+2}"],
      },
    ],
  };

  function generateProblem(difficulty) {
    const problems = problemSet[difficulty];
    return problems[Math.floor(Math.random() * problems.length)];
  }

  function displayProblem(problem) {
    questionEl.innerHTML = '\\(' + problem.question +   '\\)';
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
}

function displaySolution(solution) {
  solutionEl.style.display = "block";
  solutionEl.querySelector(".latex-solution").innerHTML = solution.map(step => '\\(' + step + '\\)').join("<br>");
  const nextButton = document.createElement("button");
  nextButton.textContent = "Next Problem";
  nextButton.onclick = function () {
    solutionEl.style.display = "none";
    solutionEl.querySelector(".latex-solution").innerHTML = "";
    solutionEl.removeChild(nextButton);
    answerContainer.innerHTML = "";
    answerContainer.style.display = "flex";
    initGame();
  };
  solutionEl.appendChild(nextButton);
  MathJax.typeset();
}

function initGame() {
  const difficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
  currentProblem = generateProblem(difficulty);
  displayProblem(currentProblem);
  generateAnswers(currentProblem);
}

initGame();
});

