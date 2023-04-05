const gameMenu = document.getElementById("game-menu");
const gameBoard = document.getElementById("game-board");
const solutionDiv = document.getElementById("solution");
const correctAnswerElem = document.getElementById("correct-answer");
const nextBtn = document.getElementById("next-btn");

document.getElementById("start-random").addEventListener("click", () => startGame("random"));
document.getElementById("start-chain-rule").addEventListener("click", () => startGame("chainRule"));
document.getElementById("start-chain-rule-level2").addEventListener("click", () => startGame("chainRuleLevel2"));

function startGame(gameType) {
    gameMenu.style.display = "none";
    gameBoard.style.display = "block";
    gameMode = gameType;
    generateNewProblem();
}

function generateChainRuleLevel2Problem() {
    const functions = [
        { fn: 'x^2', derivative: '2x' },
        { fn: 'sin(x)', derivative: 'cos(x)' },
        { fn: 'cos(x)', derivative: '-sin(x)' },
        { fn: 'e^x', derivative: 'e^x' },
        { fn: 'ln(x)', derivative: '1/x' },
        { fn: 'tan(x)', derivative: 'sec^2(x)' },
        { fn: 'sec(x)', derivative: 'sec(x)tan(x)' },
    ];

    const a = functions[Math.floor(Math.random() * functions.length)];
    const b = functions[Math.floor(Math.random() * functions.length)];
    const c = functions[Math.floor(Math.random() * functions.length)];

    const k1 = Math.floor(Math.random() * 5) + 1;
    const k2 = Math.floor(Math.random() * 5) + 1;
    const k3 = Math.floor(Math.random() * 5) + 1;

    // Generate a nested chain rule problem with constants
    return { a, b, c, operator: "''", k1, k2, k3 };
}

function calculateAnswer(problem) {
    const { a, b, c, operator, k1, k2, k3 } = problem;
    switch (operator) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return a / b;
        case "'": return `(${a.derivative})(${b.fn}) + (${a.fn})(${b.derivative})`;
        case "''": return `(${k1 * a.derivative})(${k2 * b.fn})(${k3 * c.fn}) + (${k1 * a.fn})(${k2 * b.derivative})(${k3 * c.fn}) + (${k1 * a.fn})(${k2 * b.fn})(${k3 * c.derivative})`; // Nested chain rule with constants
    }
}

function generateNewProblem() {
    solutionDiv.style.display = "none";
    let problem;
    if (gameMode === "random") {
        problem = generateRandomProblem();
    } else if (gameMode === "chainRule") {
        problem = generateChainRuleProblem();
    } else if (gameMode === "chainRuleLevel2") {
        problem = generateChainRuleLevel2Problem();
    }
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
    if (problem.operator === "'" || problem.operator === "''") {
        problemElement.innerHTML = `y = \\(${problem.k1 * problem.a.fn}\\)\\(${problem.k2 * problem.b.fn}\\)\\(${problem.k3 * problem.c.fn}\\)`;
    } else {
        problemElement.innerHTML = `\\(${problem.a} ${problem.operator} ${problem.b}\\)`;
    }
    MathJax.typeset(); // Update the LaTeX rendering
}

function displayOptions(options) {
    options.forEach((option, index) => {
        const optionElement = document.getElementById(`option${index + 1}`);
        if (gameMode === "chainRule" || gameMode === "chainRuleLevel2") {
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
        if (gameMode === "chainRule" || gameMode === "chainRuleLevel2") {
            correctAnswerElem.innerHTML = `Correct answer: \\(${currentAnswer}\\)<br>Step-by-step solution (simplified):<br>dy/dx = \\(${currentAnswer}\\)`;
        } else {
            correctAnswerElem.textContent = `Correct answer: ${currentAnswer}`;
        }
        solutionDiv.style.display = "block";
        MathJax.typeset(); // Update the LaTeX rendering
    }
}

let gameMode;
let currentProblem
let currentAnswer;

nextBtn.addEventListener("click", generateNewProblem);

// MathJax configuration
MathJax = {
tex: {
inlineMath: [['$', '$'], ['\(', '\)']]
},
svg: {
fontCache: 'global'
}
};
