const gameMenu = document.getElementById("game-menu");
const gameBoard = document.getElementById("game-board");
const solutionDiv = document.getElementById("solution");
const correctAnswerElem = document.getElementById("correct-answer");
const nextBtn = document.getElementById("next-btn");

document.getElementById("start-random").addEventListener("click", () => startGame("random"));
document.getElementById("start-chain-rule").addEventListener("click", () => startGame("chainRule"));

let gameMode;
let currentProblem;
let currentAnswer;

function startGame(gameType) {
  gameMenu.style.display = "none";
  gameBoard.style.display = "block";
  gameMode = gameType;
  currentProblem = generateNewProblem();
}

function generateNewProblem() {
  solutionDiv.style.display = "none";
  const problem = gameMode === "random" ? generateRandomProblem() : generateChainRuleProblem();
  currentAnswer = calculateAnswer(problem);
  const options = generateOptions(currentAnswer);
  displayProblem(problem);
  displayOptions(options.sort(() => Math.random() - 0.5));
}

function generateRandomProblem() {
  const a = Math.floor(Math.random() * 10) + 1;
  const b = Math.floor(Math.random() * 10) + 1;
  const operator = ['+', '-', '*', '/'][Math.floor(Math.random() * 4)];
  return { a, b, operator };
}

function generateChainRuleProblem() {
  const functions = [
    { fn: 'x^2', derivative: '2x' },
    { fn: 'sin(x)', derivative: 'cos(x)' },
    { fn: 'cos(x)', derivative: '-sin(x)' },
    { fn: 'e^x', derivative: 'e^x' },
    { fn: 'ln(x)', derivative: '1/x' },
  ];
  const a = functions[Math.floor(Math.random() * functions.length)];
  const b = functions[Math.floor(Math.random() * functions.length)];

  return { a, b, operator: "'" };
}

function calculateAnswer(problem) {
  const { a, b, operator } = problem;

  switch (operator) {
    case '+': 
      return a + b;
    case '-': 
      return a - b;
    case '*': 
      return a * b;
    case '/': 
      return a / b;
    case "'": 
      const aDerivative = a.derivative.replace('x', `(${b.fn})`);
      const bDerivative = b.derivative.replace('x', `(${a.fn})`);
      const derivativeExpression = `(${aDerivative})(${b.fn}) + (${bDerivative})(${a.fn})`;
      return derivativeExpression;
  }
}

function generateOptions(answer) {
  const options = new Set([answer]);

  if (gameMode === "random") {
    while (options.size < 4) {
      options.add(Math.floor(Math.random() * 100));
    }
  } else {
    const functions = [
      { fn: 'x^2', derivative: '2x' },
      { fn: 'sin(x)', derivative: 'cos(x)' },
      { fn: 'cos(x)', derivative: '-sin(x)' },
      { fn: 'e^x', derivative: 'e^x' },
      { fn: 'ln(x)', derivative: '1/x' },
    ];

    while (options.size < 4) {
      const a = functions[Math.floor(Math.random() * functions.length)];
      const b = functions[Math.floor(Math.random() * functions.length)];

      const aDerivative = a.derivative.replace('x', `(${b.fn})`);
      const bDerivative = b.derivative.replace('x', `(${a.fn})`);
      const derivativeExpression = `(${aDerivative})(${b.fn}) + (${bDerivative})(${a.fn})`;
      options.add(derivativeExpression);
    }
  }

  return Array.from(options);
}

function displayProblem(problem) {
  const problemElement = document.getElementById("problem");

  if (problem.operator === "'") {
    problemElement.innerHTML = `y = \\(${problem.a.fn}\\)\\(${problem.b.fn}\\)`;
  } else {
    problemElement.innerHTML = `\\(${problem.a} ${problem.operator} ${problem.b}\\)`;
  }

  MathJax.typeset(); // Update the LaTeX rendering
}

function displayOptions(options) {
  options.forEach((option, index) => {
    const optionElement = document.getElementById(`option${index + 1}`);

    if (gameMode === "chainRule") {
      optionElement.innerHTML = `\\(${option}\\)`;
    } else {
      optionElement.textContent = option;
    }

    optionElement.onclick = () => checkAnswer(option);
  });

  MathJax.typeset(); // Update the LaTeX rendering
}

function checkAnswer(selectedOption) {
  if (selectedOption === currentAnswer) {
    if (gameMode === "chainRule") {
      const steps = [];

      steps.push(`Start with the derivative formula for the chain rule: (f(g(x)))' = f'(g(x)) * g'(x)`);
      steps.push(`Let f(x) = ${currentProblem.a.fn} and g(x) = ${currentProblem.b.fn}`);
      steps.push(`Calculate f'(x) and g'(x) using the derivative formulas:`);
      steps.push(`f'(x) = ${currentProblem.a.derivative} and g'(x) = ${currentProblem.b.derivative}`);
      steps.push(`Substitute the values into the chain rule formula to get the derivative of the function:`);
      steps.push(`(f(g(x)))' = (${currentProblem.a.derivative})(${currentProblem.b.fn}) + (${currentProblem.b.derivative})(${currentProblem.a.fn})`);
      steps.push(`Simplify the expression to get the final answer:`);
      steps.push(`(f(g(x)))' = ${currentAnswer}`);

      correctAnswerElem.innerHTML = `Correct answer: \\(${currentAnswer}\\)<br><br>Step-by-step solution:<br>`;
      steps.forEach((step, index) => {
        correctAnswerElem.innerHTML += `<br>${index + 1}. ${step}`;
      });

    } else {
      correctAnswerElem.textContent = `Correct answer: ${currentAnswer}`;
    }

   solutionDiv.style.display = "block";
MathJax.typeset(); // Update the LaTeX rendering
      
      
}
}

let gameMode;
let currentProblem;
let currentAnswer;

document.getElementById("start-random").addEventListener("click", () => startGame("random"));
document.getElementById("start-chain-rule").addEventListener("click", () => startGame("chainRule"));

const gameMenu = document.getElementById("game-menu");
const gameBoard = document.getElementById("game-board");
const solutionDiv = document.getElementById("solution");
const correctAnswerElem = document.getElementById("correct-answer");
const nextBtn = document.getElementById("next-btn");

function startGame(gameType) {
gameMenu.style.display = "none";
gameBoard.style.display = "block";
gameMode = gameType;
currentProblem = generateNewProblem();
}

function generateNewProblem() {
solutionDiv.style.display = "none";
const problem = gameMode === "random" ? generateRandomProblem() : generateChainRuleProblem();
currentAnswer = calculateAnswer(problem);
const options = generateOptions(currentAnswer);
displayProblem(problem);
displayOptions(options.sort(() => Math.random() - 0.5));
}

function generateRandomProblem() {
const a = Math.floor(Math.random() * 10) + 1;
const b = Math.floor(Math.random() * 10) + 1;
const operator = ['+', '-', '*', '/'][Math.floor(Math.random() * 4)];
return { a, b, operator };
}

function generateChainRuleProblem() {
const functions = [
{ fn: 'x^2', derivative: '2x' },
{ fn: 'sin(x)', derivative: 'cos(x)' },
{ fn: 'cos(x)', derivative: '-sin(x)' },
{ fn: 'e^x', derivative: 'e^x' },
{ fn: 'ln(x)', derivative: '1/x' },
];
const a = functions[Math.floor(Math.random() * functions.length)];
const b = functions[Math.floor(Math.random() * functions.length)];

return { a, b, operator: "'" };
}

function calculateAnswer(problem) {
const { a, b, operator } = problem;

switch (operator) {
case '+': return a + b;
case '-': return a - b;
case '*': return a * b;
case '/': return a / b;
case "'": {
const aDerivative = a.derivative.replace('x', (${b.fn}));
const bDerivative = b.derivative.replace('x', (${a.fn}));
return (${aDerivative})(${b.fn}) + (${bDerivative})(${a.fn});
}
}
}

nextBtn.addEventListener("click", generateNewProblem);
