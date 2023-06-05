let difficulty;
let correctAnswer;

function startGame(level) {
    difficulty = level;
    document.getElementById('difficulty').style.display = 'none';
    document.getElementById('game').style.display = 'block';
    generateProblem();
}

function generateProblem() {
    let base = Math.ceil(Math.random() * 10);
    let exponent = Math.ceil(Math.random() * difficulty);
    document.getElementById('problem').innerText = `${base} ^ ${exponent}`;
    correctAnswer = Math.pow(base, exponent);
}

function checkAnswer() {
    let userAnswer = document.getElementById('answer').value;
    if (userAnswer == correctAnswer) {
        document.getElementById('feedback').innerText = 'Rätt svar! Det korrekta svaret var: ' + correctAnswer;
    } else {
        document.getElementById('feedback').innerText = 'Fel svar. Det korrekta svaret var: ' + correctAnswer;
    }
    generateProblem();
}
