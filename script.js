const gameMenu = document.getElementById("game-menu");
const gameBoard = document.getElementById("game-board");
const solutionDiv = document.getElementById("solution");
const correctAnswerElem = document.getElementById("correct-answer");
const nextBtn = document.getElementById("next-btn");

document.getElementById("start-random").addEventListener("click", () => startGame("random"));
document.getElementById("start-chain-rule").addEventListener("click", () => startGame("chainRule"));
document.getElementById("start-integration").addEventListener("click", () => startGame("integration"));

function startGame(gameType) {
    gameMenu.style.display = "none";
    gameBoard.style.display = "block";
    gameMode = gameType;
    currentProblem = generateNewProblem();
}

function generateNewProblem() {
    solutionDiv.style.display = "none";
    let problem;
    switch (gameMode) {
        case "random":
            problem = generateRandomProblem();
            break;
        case "chainRule":
            problem = generateChainRuleProblem();
            break;
        case "integration":
            problem = generateIntegrationProblem();
            break;
        default:
            problem = generateRandomProblem();
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

function generateIntegrationProblem() {
    const functions = [
        { fn: 'x^2', integral: 'x^3/3' },
        { fn: 'sin(x)', integral: '-cos(x)' },
        { fn: 'cos(x)', integral: 'sin(x)' },
        { fn: 'e^x', integral: 'e^x' },
        { fn: 'ln(x)', integral: 'x(ln(x) - 1)' },
    ];
    const fn = functions[Math.floor(Math.random() * functions.length)];

    return { fn, operator: 'dx' };
}

function calculateAnswer(problem) {
    const { a, b, aFn, bFn, fn, operator } = problem;
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
            const derivative = `(${aFn.derivative})(${bFn.fn}) + (${aFn.fn})(${bFn.derivative})`;
            return derivative;
        case 'dx':
            const integral = `∫${fn.fn} ${fn.integral} dx`;
            return integral;
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
            let option;
            if (gameMode === "chainRule") {
                const a = functions[Math.floor(Math.random() * functions.length)];
                const b = functions[Math.floor(Math.random() * functions.length)];
                option = `(${a.derivative})(${b.fn}) + (${a.fn})(${b.derivative})`;
            } else if (gameMode === "integration") {
                const functionsCopy = [...functions];
                functionsCopy.splice(functions.indexOf(currentProblem.fn), 1);
                const fn1 = currentProblem.fn;
                const fn2 = functionsCopy[Math.floor(Math.random() * functionsCopy.length)].fn;
                option = `∫${fn1} dx + ∫${fn2} dx`;
            }
            options.add(option);
        }
    }
    return Array.from(options);
}

function displayProblem(problem) {
    const problemElement = document.getElementById("problem");
    if (problem.operator === "'") {
        problemElement.innerHTML = `y = \\(${problem.a.fn}\\)\\(${problem.b.fn}\\)`;
    } else if (problem.operator === "dx") {
        problemElement.innerHTML = `\\(${problem.fn.fn}\\)\\(${problem.operator}\\)`;
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
        } else if (gameMode === "integration") {
            optionElement.innerHTML = option;
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
        } else if (gameMode === "integration") {
            correctAnswerElem.innerHTML = `Correct answer: \\(${currentAnswer}\\)<br>Step-by-step solution:<br>\\(${currentProblem.fn.integral}\\)`;
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

