function generateProblem() {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    const operator = ['+', '-', '*', '/'][Math.floor(Math.random() * 4)];
    return { a, b, operator };
}

function calculateAnswer(problem) {
    const { a, b, operator } = problem;
    switch (operator) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return a / b;
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
    const problemElement = document.getElementById('problem');
    problemElement.textContent = `${problem.a} ${problem.operator} ${problem.b}`;
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
        startGame();
    }
}

function startGame() {
    const problem = generateProblem();
    currentAnswer = calculateAnswer(problem);
    const options = generateOptions(currentAnswer);
    displayProblem(problem);
    displayOptions(options.sort(() => Math.random() - 0.5));
}

let currentAnswer;
startGame();
