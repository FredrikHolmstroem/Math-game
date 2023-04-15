document.addEventListener("DOMContentLoaded", function () {
  const mainMenu = document.querySelector(".main-menu");
  const gameEl = document.querySelector(".game");
  const problemEl = document.querySelector(".problem");
  const answerContainer = document.querySelector(".answers");
  const solutionEl = document.querySelector(".solution");
  const scoreEl = document.querySelector(".score");

  const ruleBtns = document.querySelectorAll(".rule-btn");
  const difficultyBtns = document.querySelectorAll(".difficulty-btn");
  const startGameBtn = document.getElementById("start-game");

  let selectedRule = null;
  let selectedDifficulty = null;
  let currentProblem = null;
  let score = 0;

  ruleBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      ruleBtns.forEach((b) => b.classList.remove("selected"));
      btn.classList.add("selected");
      selectedRule = btn.textContent.trim();
    });
  });

  difficultyBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      difficultyBtns.forEach((b) => b.classList.remove("selected"));
      btn.classList.add("selected");
      selectedDifficulty = parseInt(btn.textContent.trim(), 10);
    });
  });

  startGameBtn.addEventListener("click", function () {
    if (selectedRule && selectedDifficulty) {
      mainMenu.style.display = "none";
      gameEl.style.display = "block";
      generateProblem();
    }
  });

  function generateProblem(rule, difficulty) {
  const productRuleProblems = {
    1: [
      {
        expression: "x^2 (2x)",
        correctAnswer: "2x^3 + 4x^2",
        wrongAnswers: ["2x^5", "6x^2", "x^3"],
        solution: [
          {
            latex: "x^2 \\cdot 2x",
            text: "Apply the product rule (uv)' = u'v + uv'"
          },
          {
            latex: "u = x^2 \\Rightarrow u' = 2x",
            text: "Derivative of x^2"
          },
          {
            latex: "v = 2x \\Rightarrow v' = 2",
            text: "Derivative of 2x"
          },
          {
            latex: "(x^2)'(2x) + (x^2)(2x)'",
            text: "Substitute u, u', v, and v' into the product rule formula"
          },
          {
            latex: "2x(2x) + x^2(2)",
            text: "Simplify the expression"
          },
          {
            latex: "2x^3 + 4x^2",
            text: "Final result"
          }
        ]
      },
      {
        expression: "x^3 (3x^2)",
        correctAnswer: "6x^5 + 9x^4",
        wrongAnswers: ["3x^5", "12x^5", "9x^3"],
        solution: [
          // Fill in the solution steps for this problem
        ]
      }
    ],
    2: [
      // Add more problems for product rule with difficulty 2
    ],
    3: [
      // Add more problems for product rule with difficulty 3
    ]
  };

  const chainRuleProblems = {
    1: [
      // Add problems for chain rule with difficulty 1
    ],
    2: [
      // Add problems for chain rule with difficulty 2
    ],
    3: [
      // Add problems for chain rule with difficulty 3
    ]
  };

  const quotientRuleProblems = {
    1: [
      // Add problems for quotient rule with difficulty 1
    ],
    2: [
      // Add problems for quotient rule with difficulty 2
    ],
    3: [
      // Add problems for quotient rule with difficulty 3
    ]
  };

  let problems;
  if (rule === "Product Rule") {
    problems = productRuleProblems[difficulty];
  } else if (rule === "Chain Rule") {
    problems = chainRuleProblems[difficulty];
  } else {
    problems = quotientRuleProblems[difficulty];
  }

  return problems[Math.floor(Math.random() * problems.length)];
}


    renderProblem();
  }

  function renderProblem() {
    problemEl.textContent = currentProblem.text;
    answerContainer.innerHTML = "";

    currentProblem.choices.forEach((choice, index) => {
      const btn = document.createElement("button");
      btn.classList.add("answer-btn");
      btn.textContent = choice;
      btn.addEventListener("click", () => handleAnswer(index));
      answerContainer.appendChild(btn);
    });

    solutionEl.style.display = "none";
  }

  function handleAnswer(index) {
    if (index === currentProblem.correctIndex) {
      score++;
      scoreEl.textContent = "Score: " + score;
      solutionEl.style.display = "block";
      solutionEl.querySelector(".latex-solution").innerHTML = currentProblem.solution;
      setTimeout(() => {
        generateProblem();
      }, 5000);
    }
  }
});
