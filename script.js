const operators = ['^'];
const variables = ['a', 'b', 'c', 'x', 'y', 'z'];

function TreeNode(left, right, operator) {
  this.left = left;
  this.right = right;
  this.operator = operator;

  this.toLatex = function() {
    return `(${left} ${operator} ${right})`;
  }
}

function randomNumberRange(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function randomVariable() {
  return variables[randomNumberRange(0, variables.length)];
}

function buildTree(numNodes) {
  if (numNodes === 1)
    return randomVariable();

  const numLeft = Math.floor(numNodes / 2);
  const leftSubTree = buildTree(numLeft);
  const numRight = Math.ceil(numNodes / 2);
  const rightSubTree = buildTree(numRight);
  const operator = operators[randomNumberRange(0, operators.length)];

  return new TreeNode(leftSubTree, rightSubTree, operator);
}

document.getElementById('easy').addEventListener('click', function() {
  const expression = buildTree(2);
  document.getElementById('instruction').innerText = 'Förenkla följande uttryck:';
  document.getElementById('question').innerText = `$$${expression.toLatex()}$$`;
  MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
});

document.getElementById('medium').addEventListener('click', function() {
  const expression = buildTree(3);
  document.getElementById('instruction').innerText = 'Förenkla följande uttryck:';
  document.getElementById('question').innerText = `$$${expression.toLatex()}$$`;
  MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
});

document.getElementById('hard').addEventListener('click', function() {
  const expression = buildTree(4);
  document.getElementById('instruction').innerText = 'Förenkla följande uttryck:';
  document.getElementById('question').innerText = `$$${expression.toLatex()}$$`;
  MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
});

document.getElementById('submit').addEventListener('click', function() {
  const answer = document.getElementById('answer').value;
  // Rätt svar beräkning logik här
});
