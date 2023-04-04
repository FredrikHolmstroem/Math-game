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

function generateNewProblem() {
    solutionDiv.style.display = "none";
    const problem = gameMode === "random" ? generateRandomProblem() : generateChainRuleProblem();
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

function generateChainRuleProblem() {
        const functions = [
        { fn: 'x^2', derivative: '2x' },
        { fn: '\\sin(x)', derivative: '\\cos(x)' },
        { fn: '\\cos(x)', derivative: '-\\sin(x)' },
        { fn: 'e^x', derivative: 'e^x' },
        { fn: '\\ln(x)', derivative: '\\frac{1}{x}' },
    ];
    const a = functions[Math.floor(Math.random() * functions.length)];
    const b = functions[Math.floor(Math.random() * functions.length)];
    const operator = "'";
    return { a, b, operator };
}

function calculateAnswer(problem) {
    const { a, b, operator } = problem;
    switch (operator) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return a / b;
        case "'": return `(${a.derivative})(${b.fn}) + (${a.fn})(${b.derivative})`;
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
            { fn: '\\sin(x)', derivative: '\\cos(x)' },
            { fn: '\\cos(x)', derivative: '-\\sin(x)' },
            { fn: 'e^x', derivative: 'e^x' },
            { fn: '\\ln(x)', derivative: '\\frac{1}{x}' },
        ];
        while (options.size < 4) {
            const a = functions[Math.floor(Math.random() * functions.length)];
            const b = functions[Math.floor(Math.random() * functions.length)];
            options.add(`(${a.derivative})(${b.fn}) + (${a.fn})(${b.derivative})`);
        }
    }
    return Array.from(options);
}

function displayProblem(problem) {
    const problemElement = document.getElementById("problem");
    if (problem.operator === "'") {
        problemElement.textContent = `y = ${problem.a.fn.replace(/x/g, `(${problem.b.fn})`)}`;
    } else {
        problemElement.textContent = `${problem.a} ${problem.operator} ${problem.b}`;
    }
    katex.render(problemElement.textContent, problemElement, { throwOnError: false });
}

function displayOptions(options) {
    options.forEach((option, index) => {
        const optionElem = document.getElementById(`option${index + 1}`);
        optionElem.textContent = option;
        optionElem.onclick = () => checkAnswer(option);
        katex.render(optionElem.textContent, optionElem, { throwOnError: false });
    });
}

function checkAnswer(selectedOption) {
    if (selectedOption === currentAnswer) {
        correctAnswerElem.textContent = `Correct answer: ${currentAnswer}`;
        if (gameMode === "chainRule") {
            correctAnswerElem.textContent += `\nStep-by-step solution (simplified):\n\\(\\frac{dy}{dx} = ${currentAnswer}\\)`;
        }
        solutionDiv.style.display = "block";
        katex.render(correctAnswerElem.textContent, correctAnswerElem, { throwOnError: false });
    }
}

let gameMode;
let currentProblem;
let currentAnswer;

