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
        problemElement.innerHTML = `y = ${problem.a.fn.replace(/x/g, `{${problem.b.fn}}`)}`;
    } else {
        problemElement.textContent = `${problem.a} ${problem.operator} ${problem.b}`;
    }
    MathJax.typesetClear([problemElement]);
    MathJax.typesetPromise([problemElement]).catch((err) => console.log(err.message));
}

function displayOptions(options) {
    options.forEach((option, index) => {
        const optionElem = document.getElementById(`option${index + 1}`);
        optionElem.textContent = option;
        optionElem.addEventListener("click", () => checkAnswer(option));
        if (gameMode === "chainRule") {
            optionElem.innerHTML = option;
            MathJax.typesetClear([optionElem]);
            MathJax.typesetPromise([optionElem]).catch((err) => console.log(err.message));
        }
    });
}

function checkAnswer(selectedOption) {
    if (selectedOption === currentAnswer) {
        correctAnswerElem.textContent = `Correct answer: ${currentAnswer}`;
        if (gameMode === "chainRule") {
            correctAnswerElem.innerHTML += `<br>Step-by-step solution (simplified):<br>\\(\\frac{dy}{dx} = ${currentAnswer}\\)`;
        }
        solutionDiv.style.display = "block";
        MathJax.typesetClear([correctAnswerElem]);
        MathJax.typesetPromise([correctAnswerElem]).catch((err) => console.log(err.message));
    }
}

let gameMode;
let currentProblem;
let currentAnswer;

