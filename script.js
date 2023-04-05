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
        { fn: 'x', derivative: '1' },
        { fn: 'x^2', derivative: '2x' },
        { fn: 'x^3', derivative: '3x^2' },
        { fn: 'x^4', derivative: '4x^3' },
        { fn: 'sin(ax)', derivative: 'a*cos(ax)' },
        { fn: 'cos(ax)', derivative: '-a*sin(ax)' },
        { fn: 'e^(ax)', derivative: 'a*e^(ax)' },
        { fn: 'ln(ax)', derivative: '1/(ax)' },
    ];
    const a = functions[Math.floor(Math.random() * functions.length)];
    let b;
    let operator;
    const numNestings = Math.floor(Math.random() * 10) + 1; // Choose a random number of nestings between 1 and 10
    let prevDerivative = a.derivative;
    let prevFn = a.fn;
    for (let i = 0; i < numNestings; i++) {
        const nextFn = functions[Math.floor(Math.random() * functions.length)].fn.replace(/x/g, `(${prevFn})`);
        let nextDerivative = `(${prevDerivative})(${nextFn}) + (${prevFn})(${functions[Math.floor(Math.random() * functions.length)].derivative})`;
        if (nextFn.includes('sin') || nextFn.includes('cos') || nextFn.includes('e^') || nextFn.includes('ln')) {
            const constant = Math.floor(Math.random() * 10) + 1;
            nextDerivative = nextDerivative.replace(/a/g, constant);
            nextFn = nextFn.replace(/a/g, constant);
        }
        prevFn = nextFn;
        prevDerivative = nextDerivative;
    }
    b = { fn: prevFn, derivative: prevDerivative };
    operator = "'";
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
