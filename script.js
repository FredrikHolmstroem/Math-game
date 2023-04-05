const gameMenu = document.getElementById("game-menu");
const gameBoard = document.getElementById("game-board");
const solutionDiv = document.getElementById("solution");
const correctAnswerElem = document.getElementById("correct-answer");
const nextBtn = document.getElementById("next-btn");

document.getElementById("start-random").addEventListener("click", () => startGame("random"));
document.getElementById("start-chain-rule").addEventListener("click", () => startGame("chainRule"));
document.getElementById("start-chain-rule-2").addEventListener("click", () => startGame("chainRule2"));

function startGame(gameType) {
    gameMenu.style.display = "none";
    gameBoard.style.display = "block";
    gameMode = gameType;
    currentProblem = generateNewProblem();
}

function generateNewProblem() {
    solutionDiv.style.display = "none";
    let problem;
    if (gameMode === "random") {
        problem = generateRandomProblem();
    } else if (gameMode === "chainRule") {
        problem = generateChainRuleProblem(false);
    } else if (gameMode === "chainRule2") {
        problem = generateChainRuleProblem(true);
    }
    currentAnswer = calculateAnswer(problem);
    const options = generateOptions(currentAnswer);
    displayProblem(problem);
    displayOptions(options.sort(() => Math.random() - 0.5));
}

nextBtn.addEventListener("click", generateNewProblem);

function generateRandomProblem() {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    const operator = ['+', '-', '*', '/'][Math.floor(Math.random() * 4)];
    return { a, b, operator };
}

function generateChainRuleProblem(isLevel2) {
    const functions = [
        { fn: 'x^2', derivative: '2x' },
        { fn: 'sin(x)', derivative: 'cos(x)' },
        { fn: 'cos(x)', derivative: '-sin(x)' },
        { fn: 'e^x', derivative: 'e^x' },
        { fn: 'ln(x)', derivative: '1/x' },
    ];
    if (isLevel2) {
        functions.push({ fn: 'sin(x+1)', derivative: 'cos(x+1)' });
        functions.push({ fn: 'cos(x+1)', derivative: '-sin(x+1)' });
        functions.push({ fn: 'x^2+1', derivative: '2x' });
    }
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
        case "'": return `(${a.derivative})(${b.fn}) + (${a.fn})(${b.derivative})`; // Return the derivative expression for chain rule problems
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
if (gameMode === "chainRule2") {
functions.push({ fn: 'sin(x+1)', derivative: 'cos(x+1)' });
functions.push({ fn: 'cos(x+1)', derivative: '-sin(x+1)' });
functions.push({ fn: 'x^2+1', derivative: '2x' });
}
while (options.size < 4) {
const a = functions[Math.floor(Math.random() * functions.length)];
const b = functions[Math.floor(Math.random() * functions.length)];
options.add((${a.derivative})(${b.fn}) + (${a.fn})(${b.derivative}));
}
}
return Array.from(options);
}

function displayProblem(problem) {
const problemElement = document.getElementById("problem");
if (problem.operator === "'") {
problemElement.innerHTML = y = \\(${problem.a.fn}\\)\\(${problem.b.fn}\\);
} else {
problemElement.innerHTML = \\(${problem.a} ${problem.operator} ${problem.b}\\);
}
MathJax.typeset(); // Update the LaTeX rendering
}

function displayOptions(options) {
options.forEach((option, index) => {
const optionElement = document.getElementById(option${index + 1});
if (gameMode === "chainRule" || gameMode === "chainRule2") {
optionElement.innerHTML = \\(${option}\\);
} else {
optionElement.textContent = option;
}
optionElement.onclick = () => checkAnswer(option);
});
MathJax.typeset(); // Update the LaTeX rendering
}

function checkAnswer(selectedOption) {
if (selectedOption === currentAnswer) {
if (gameMode === "chainRule" || gameMode === "chainRule2") {
correctAnswerElem.innerHTML = Correct answer: \\(${currentAnswer}\\)<br>Step-by-step solution (simplified):<br>dy/dx = \\(${currentAnswer}\\);
} else {
correctAnswerElem.textContent = Correct answer: ${currentAnswer};
}
solutionDiv.style.display = "block";
MathJax.typeset(); // Update the LaTeX rendering
}
}

let gameMode;
let currentProblem;
let currentAnswer;
