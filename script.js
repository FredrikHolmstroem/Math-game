const questionEl = document.getElementById('question');
const scoreEl = document.getElementById('score');
const solutionEl = document.getElementById('solution');
const answerContainer = document.querySelector('.answer-container');

const difficulties = ['easy', 'medium', 'hard'];
let currentProblem = null;
let currentScore = 0;

// A simple example of a problem set
const problemSet = {
  easy: [
    { 
      question: '\\frac{d}{dx}(x^2 + 2x)',
      correctAnswer: '2x + 2',
      solution: 'Using the power rule, the derivative of x^2 is 2x. The derivative of 2x is 2. So, the final derivative is 2x + 2.'
    }
  ],
  medium: [
    {
      question: '\\frac{d}{dx}(3x^2(2x+1)^3)',
      correctAnswer: '6x(2x+1)^2(7x+3)',
      solution: 'Using the chain rule, the derivative is 6x(2x+1)^2(7x+3).'
    }
  ],
  hard: [
    {
      question: '\\frac{d}{dx}(\\frac{3x^2+2x}{x^3+2})',
      correctAnswer: '\\frac{-3x^4-12x^3+8x+6}{(x^3+2)^2}',
      solution: 'Using the quotient rule, the derivative is \\frac{-3x^4-12x^3+8x+6}{(x^3+2)^2}.'
    }
  ],
};

function generateProblem(difficulty) {
  const problems = problemSet[difficulty];
  return problems[Math.floor(Math.random() * problems.length)];
}

function displayProblem(problem) {
  questionEl.innerHTML = '\\(' + problem.question + '\\)';
  MathJax.typeset();
}

function generateAnswers(problem) {
  const correctAnswerIndex = Math.floor(Math.random() * 4);
  for (let i = 0; i < 4; i++) {
    const button = document.createElement('button');
    button.textContent = i === correctAnswerIndex ? problem.correctAnswer : `Wrong Answer ${i + 1}`;
    button.onclick = function () {
      if (i === correctAnswerIndex) {
        currentScore++;
        scoreEl.textContent = 'Score: ' + currentScore;
        displaySolution(problem.solution);
      }
    };
    answerContainer.appendChild(button);
  }
}

function displaySolution(solution) {
  solutionEl.style.display = 'block';
  solutionEl.querySelector('.latex-solution').innerHTML = '\\(' + solution + '\\)';
  MathJax.typeset();
}

function initGame() {
  const difficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
  currentProblem = generateProblem(difficulty);
  displayProblem(currentProblem);
  generateAnswers(currentProblem); // Call the generateAnswers() function here
}

initGame();
