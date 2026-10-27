const questions = [
  {
    q: "What is the correct way to declare a variable in modern JavaScript?",
    options: ["var x = 5;", "let x = 5;", "int x = 5;", "variable x = 5;"],
    correct: 1,
    explanation: "`let` (and `const`) are block-scoped and preferred over `var` in modern JS."
  },
  {
    q: "Which method converts a JSON string into a JavaScript object?",
    options: ["JSON.parse()", "JSON.stringify()", "JSON.toObject()", "JSON.convert()"],
    correct: 0,
    explanation: "`JSON.parse()` converts a JSON string → object. `JSON.stringify()` does the opposite."
  },
  {
    q: "What does `===` check that `==` does not?",
    options: ["Only value", "Only type", "Both value and type", "Neither"],
    correct: 2,
    explanation: "`===` is strict equality (value + type). `==` performs type coercion."
  },
  {
    q: "Which of the following is NOT a primitive type in JavaScript?",
    options: ["string", "number", "object", "boolean"],
    correct: 2,
    explanation: "`object` is a reference type. Primitives are: string, number, boolean, null, undefined, symbol, bigint."
  },
  {
    q: "What will `typeof null` return?",
    options: ["\"null\"", "\"object\"", "\"undefined\"", "\"number\""],
    correct: 1,
    explanation: "A long-standing quirk: `typeof null` returns `\"object\"`."
  },
  {
    q: "How do you create a promise that resolves after 2 seconds?",
    options: [
      "new Promise(r => setTimeout(r, 2000))",
      "Promise.timeout(2000)",
      "setTimeout(Promise.resolve, 2000)",
      "Promise.delay(2000)"
    ],
    correct: 0,
    explanation: "Pass a function to the Promise constructor that calls `resolve` when ready."
  },
  {
    q: "What is the output of: `console.log(typeof NaN)`?",
    options: ["\"NaN\"", "\"number\"", "\"undefined\"", "\"object\""],
    correct: 1,
    explanation: "`NaN` is of type `number`."
  },
  {
    q: "Which array method creates a new array with the results of calling a function on every element?",
    options: ["forEach()", "map()", "filter()", "reduce()"],
    correct: 1,
    explanation: "`map()` returns a new array. `forEach()` only iterates."
  },
  {
    q: "What does the `this` keyword refer to in an arrow function?",
    options: [
      "The global object",
      "The object that called the function",
      "The lexical (surrounding) scope",
      "Always undefined"
    ],
    correct: 2,
    explanation: "Arrow functions inherit `this` from the enclosing scope."
  },
  {
    q: "Which statement is used to handle errors in asynchronous code with async/await?",
    options: ["catch()", "try...catch", "error()", "handle()"],
    correct: 1,
    explanation: "Wrap `await` calls inside a normal `try...catch` block."
  },
  {
    q: "What is the purpose of the `use strict` directive?",
    options: [
      "Makes code run faster",
      "Enables strict mode (catches common errors)",
      "Imports modules",
      "Declares variables automatically"
    ],
    correct: 1,
    explanation: "Strict mode throws more errors and prevents some unsafe actions."
  },
  {
    q: "Which method adds one or more elements to the end of an array?",
    options: ["push()", "pop()", "shift()", "unshift()"],
    correct: 0,
    explanation: "`push()` adds to the end, `pop()` removes from the end."
  },
  {
    q: "What will this code output?\nconsole.log(0.1 + 0.2 === 0.3);",
    options: ["true", "false", "undefined", "NaN"],
    correct: 1,
    explanation: "Floating-point precision: 0.1 + 0.2 is approximately 0.30000000000000004."
  },
  {
    q: "How do you check if a value is an array?",
    options: [
      "typeof value === \"array\"",
      "value instanceof Array",
      "Array.isArray(value)",
      "Both B and C"
    ],
    correct: 3,
    explanation: "Both `Array.isArray()` (preferred) and `instanceof Array` work in most cases."
  },
  {
    q: "What does the spread operator `...` do?",
    options: [
      "Creates a deep copy only",
      "Expands an iterable into individual elements",
      "Converts objects to arrays",
      "Removes duplicates"
    ],
    correct: 1,
    explanation: "It expands arrays/objects/strings into individual items."
  },
  {
    q: "Which of these is a correct way to export a function in ES modules?",
    options: [
      "export function foo() {}",
      "module.exports = foo",
      "exports.foo = function() {}",
      "All of the above"
    ],
    correct: 0,
    explanation: "`export` is ES module syntax. The others are CommonJS."
  },
  {
    q: "What is a closure in JavaScript?",
    options: [
      "A function that has access to its outer function's scope",
      "A way to close a browser tab",
      "A method to end a loop",
      "A special type of object"
    ],
    correct: 0,
    explanation: "A closure remembers and can access variables from its outer scope."
  },
  {
    q: "What does `event.preventDefault()` do?",
    options: [
      "Stops the event from bubbling",
      "Prevents the browser's default action for that event",
      "Removes the event listener",
      "Stops all JavaScript execution"
    ],
    correct: 1,
    explanation: "Stops the default browser behavior (form submit, link click, etc.)."
  },
  {
    q: "Which method is used to remove the last element from an array?",
    options: ["pop()", "shift()", "splice()", "slice()"],
    correct: 0,
    explanation: "`pop()` removes and returns the last element."
  },
  {
    q: "What is the difference between `null` and `undefined`?",
    options: [
      "They are exactly the same",
      "`null` is intentional absence, `undefined` means not assigned",
      "`undefined` is intentional absence, `null` means not assigned",
      "Both mean the same as empty string"
    ],
    correct: 1,
    explanation: "`undefined` = not assigned. `null` = explicitly set to no value."
  },
  {
    q: "How can you make an object immutable?",
    options: [
      "Object.freeze(obj)",
      "Object.seal(obj)",
      "const obj = {}",
      "All of the above (to different degrees)"
    ],
    correct: 3,
    explanation: "`Object.freeze` prevents changes to an object's own properties (shallowly). `Object.seal` prevents adding/removing properties. `const` only prevents reassignment."
  },
  {
    q: "What does the `async` keyword before a function do?",
    options: [
      "Makes the function run in a separate thread",
      "Makes the function always return a Promise",
      "Speeds up the function",
      "Allows the use of `await` only"
    ],
    correct: 1,
    explanation: "An `async` function always returns a Promise and allows `await`."
  },
  {
    q: "Which of the following is truthy?",
    options: ["0", "\"\"", "null", "\"false\""],
    correct: 3,
    explanation: "Any non-empty string is truthy, including the string `\"false\"`."
  },
  {
    q: "What is the purpose of the `bind()` method?",
    options: [
      "To permanently set the `this` value of a function",
      "To call a function immediately",
      "To create a new array",
      "To stop event propagation"
    ],
    correct: 0,
    explanation: "`bind()` returns a new function with `this` permanently bound."
  },
  {
    q: "Which loop is best when you know the exact number of iterations?",
    options: ["while", "do...while", "for", "for...in"],
    correct: 2,
    explanation: "A classic `for` loop is ideal when the number of iterations is known."
  }
];

let currentIndex = 0;
let score = 0;
let timer = null;
let timeLeft = 30;
let answered = false;
let wrongAnswers = [];

const progressEl = document.getElementById('progress');
const scoreEl = document.getElementById('score');
const timerEl = document.getElementById('timer');
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const explanationEl = document.getElementById('explanation');
const nextBtn = document.getElementById('nextBtn');
const quizArea = document.getElementById('quizArea');
const resultScreen = document.getElementById('resultScreen');
const reviewScreen = document.getElementById('reviewScreen');

function startTimer() {
  timeLeft = 30;
  timerEl.textContent = timeLeft + 's';
  timerEl.classList.remove('warning');
  clearInterval(timer);

  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft + 's';
    if (timeLeft <= 5) timerEl.classList.add('warning');
    if (timeLeft <= 0) {
      clearInterval(timer);
      autoLock();
    }
  }, 1000);
}

function autoLock() {
  if (answered) return;
  answered = true;

  const q = questions[currentIndex];
  const options = optionsEl.querySelectorAll('.option');

  options.forEach((opt, i) => {
    opt.classList.add('locked');
    if (i === q.correct) opt.classList.add('correct');
  });

  explanationEl.style.display = 'block';
  explanationEl.innerHTML = `<strong>Time's up!</strong> Correct answer: <em>${q.options[q.correct]}</em><br>${q.explanation}`;
  nextBtn.disabled = false;

  wrongAnswers.push({
    question: q.q,
    yourAnswer: "No answer (timeout)",
    correctAnswer: q.options[q.correct],
    explanation: q.explanation
  });
}

function showQuestion() {
  answered = false;
  const q = questions[currentIndex];

  progressEl.textContent = `Q ${currentIndex + 1}/${questions.length}`;
  questionEl.textContent = q.q;
  optionsEl.innerHTML = '';
  explanationEl.style.display = 'none';
  nextBtn.disabled = true;

  q.options.forEach((opt, i) => {
    const div = document.createElement('div');
    div.className = 'option';
    div.textContent = opt;
    div.onclick = () => selectOption(i);
    optionsEl.appendChild(div);
  });

  startTimer();
}

function selectOption(selected) {
  if (answered) return;
  answered = true;
  clearInterval(timer);

  const q = questions[currentIndex];
  const options = optionsEl.querySelectorAll('.option');

  options.forEach((opt, i) => {
    opt.classList.add('locked');
    if (i === q.correct) opt.classList.add('correct');
    if (i === selected && selected !== q.correct) opt.classList.add('wrong');
  });

  if (selected === q.correct) {
    score++;
    scoreEl.textContent = `Score: ${score}`;
  } else {
    wrongAnswers.push({
      question: q.q,
      yourAnswer: q.options[selected],
      correctAnswer: q.options[q.correct],
      explanation: q.explanation
    });
  }

  explanationEl.style.display = 'block';
  explanationEl.innerHTML = q.explanation;
  nextBtn.disabled = false;
}

function nextQuestion() {
  currentIndex++;
  if (currentIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  clearInterval(timer);
  quizArea.classList.add('hidden');
  resultScreen.style.display = 'block';
  reviewScreen.style.display = 'none';

  document.getElementById('finalScore').textContent = `${score}/${questions.length}`;

  const percent = (score / questions.length) * 100;
  let rating = '';
  if (percent >= 90) rating = 'Excellent! JavaScript Master!';
  else if (percent >= 75) rating = 'Great job! Strong knowledge.';
  else if (percent >= 50) rating = 'Good effort. Keep practicing!';
  else if (percent >= 30) rating = 'Needs improvement. Review the concepts.';
  else rating = "Don't give up! Start from the basics.";

  document.getElementById('ratingMsg').textContent = rating;
}

function showReview() {
  resultScreen.style.display = 'none';
  reviewScreen.style.display = 'block';

  const list = document.getElementById('reviewList');
  list.innerHTML = '';

  if (wrongAnswers.length === 0) {
    list.innerHTML = '<p style="color:#2e7d32;font-size:1.15rem;">Perfect score! No wrong answers.</p>';
    return;
  }

  wrongAnswers.forEach((item, idx) => {
    const div = document.createElement('div');
    div.className = 'review-item';
    div.innerHTML = `
      <div class="q">${idx + 1}. ${item.question}</div>
      <div class="your">Your answer: ${item.yourAnswer}</div>
      <div class="correct-ans">Correct: ${item.correctAnswer}</div>
      <div style="margin-top:6px;font-size:0.9rem;color:#555;">${item.explanation}</div>
    `;
    list.appendChild(div);
  });
}

function restart() {
  currentIndex = 0;
  score = 0;
  wrongAnswers = [];
  scoreEl.textContent = 'Score: 0';
  quizArea.classList.remove('hidden');
  resultScreen.style.display = 'none';
  reviewScreen.style.display = 'none';
  showQuestion();
}

// Event listeners
nextBtn.addEventListener('click', nextQuestion);
document.getElementById('restartBtn').addEventListener('click', restart);
document.getElementById('restartBtn2').addEventListener('click', restart);
document.getElementById('restartBtn3').addEventListener('click', restart);
document.getElementById('reviewBtn').addEventListener('click', showReview);
document.getElementById('backToResult').addEventListener('click', () => {
  reviewScreen.style.display = 'none';
  resultScreen.style.display = 'block';
});

// Start the quiz
showQuestion();
