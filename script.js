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
        { fn: 'sin(x)', derivative: 'cos(x)' },
        { fn: 'cos(x)', derivative: '-sin(x)' },
        { fn: 'e^x', derivative: 'e^x' },
        { fn: 'ln(x)', derivative: '1/x' },
    ];
    const a = functions[Math.floor(Math.random() * functions.length)];
    let b;
    let operator;
    if (Math.random() < 0.25) {
        // Generate a chain rule problem with one level of nesting
        b = functions[Math.floor(Math.random() * functions.length)];
        operator = "'";
    } else if (Math.random() < 0.5) {
        // Generate a chain rule problem with two levels of nesting
        const c = functions[Math.floor(Math.random() * functions.length)];
        b = { fn: `(${c.fn})^2`, derivative: `2(${c.fn})(${c.derivative})` };
        operator = "'";
    } else if (Math.random() < 0.75) {
        // Generate a chain rule problem with three levels of nesting
        const d = functions[Math.floor(Math.random() * functions.length)];
        const e = functions[Math.floor(Math.random() * functions.length)];
        b = { fn: `(${d.fn})(${e.fn})`, derivative: `(${d.derivative})(${e.fn}) + (${d.fn})(${e.derivative})` };
        operator = "'";
    } else {
        // Generate a chain rule problem with four levels of nesting
        const f = functions[Math.floor(Math.random() * functions.length)];
        const g = functions[Math.floor(Math.random() * functions.length)];
        const h = functions[Math.floor(Math.random() * functions.length)];
        b = {
            fn: `(${f.fn})(${g.fn})(${h.fn})`,
            derivative: `(${f.derivative})(${g.fn})(${h.fn}) + (${f.fn})(${g.derivative})(${h.fn}) + (${f.fn})(${g.fn})(${h.derivative})`
        };
        operator = "'";
    }

    return { a, b, operator };
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
            correctAnswerElem.innerHTML = `Correct answer: \\(${currentAnswer}\\)<br>Step-by-step solution (simplified):<br>dy/dx = \\(${currentAnswer}\\)`;
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
