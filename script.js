const gameMenu = document.getElementById("game-menu");
const gameBoard = document.getElementById("game-board");
const solutionDiv = document.getElementById("solution");
const correctAnswerElem = document.getElementById("correct-answer");
const nextBtn = document.getElementById("next-btn");

document.getElementById("start-random").addEventListener("click", () => startGame("random"));
document.getElementById("start-chain-rule").addEventListener("click", () => startGame("chainRule"));

function startGame(gameType) {
    gameMenu.style.display = "none";
    gameBoard.style.display = "block";
    gameMode = gameType;
    currentProblem = generateNewProblem();
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

nextBtn.addEventListener("click", generateNewProblem);

function generateRandomProblem() {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    const operator = ['+', '-', '*', '/'][Math.floor(Math.random() * 4)];
    return { a, b, operator };
}

function generateChainRuleProblem() {
    const a = Math.floor(Math.random() * 5) + 1;
    const b = Math.floor(Math.random() * 5) + 1;
    return { a, b, operator: "'" };
}

function calculateAnswer(problem) {
    const { a, b, operator } = problem;
    switch (operator) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return a / b;
        case "'": return a * b;
    }
}

function generateOptions(answer) {
    const options = new Set([answer]);
    while (options.size < 4) {
        options.add(Math.floor(Math.random() * 100));
    }
    return Array.from(options);
}

function displayProblem(problem) {
    const problemElement = document.getElementById("problem");
    if (problem.operator === "'") {
        problemElement.textContent = `y = ${problem.a.fn}(${problem.b.fn})`;
    } else {
        problemElement.textContent = `${problem.a} ${problem.operator} ${problem.b}`;
    }
}

function displayOptions(options) {
    options.forEach((option, index) => {
        const optionElement = document.getElementById(`option${index + 1}`);
        optionElement.textContent = option;
        optionElement.onclick = () => checkAnswer(option);
    });
}

function checkAnswer(selectedOption) {
    if (selectedOption === currentAnswer) {
        correctAnswerElem.textContent = `${currentAnswer}`;
        if (gameMode === "chainRule") {
            correctAnswerElem.innerHTML += `<br>Step-by-step solution (simplified):<br>dy/dx = (${currentProblem.a.derivative})(${currentProblem.b.fn}) + (${currentProblem.a.fn})(${currentProblem.b.derivative})`;
        }
        solutionDiv.style.display = "block";
    }
}

let gameMode;
let currentAnswer;
