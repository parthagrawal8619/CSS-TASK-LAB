const TARGET = 12;
const MAX_WICKETS = 2;
const TOTAL_BALLS = 6;

const speeds = {
  easy: 2000,   
  medium: 1300,
  hard: 800
};

let difficulty = 'easy';
let need = TARGET;
let ballsLeft = TOTAL_BALLS;
let wickets = 0;
let ballIndex = 0;
let isBowling = false;
let animId = null;
let gameOver = false;
let ballPos = 12;          

const ball = document.getElementById('ball');
const track = document.getElementById('track');
const hitBtn = document.getElementById('hitBtn');
const commentary = document.getElementById('commentary');
const overlay = document.getElementById('overlay');
const resultBox = document.getElementById('resultBox');
const resultTitle = document.getElementById('resultTitle');
const resultMsg = document.getElementById('resultMsg');

const commentaries = {
  6: ["That's gone into the stands!", "Maximum! What a shot!", "Straight down the ground for six!", "Huge! Into the crowd!"],
  4: ["Driven through the covers for four!", "Beautifully timed for four!", "Races away to the boundary!", "Four runs! Great placement."],
  1: ["Pushed for a single.", "Quick single taken.", "Just a single this time."],
  0: ["Dot ball. Pressure building.", "Beaten! No run.", "Solid defensive shot."],
  W: ["OUT! Clean bowled!", "Caught! What a catch!", "Edge and taken! Wicket!", "Bowled him! Timber!"]
};

function setDifficulty(diff) {
  if (isBowling || gameOver) return;
  difficulty = diff;
  document.querySelectorAll('.diff-btns button').forEach(b => b.classList.remove('active'));
  const id = diff === 'easy' ? 'easyBtn' : diff === 'medium' ? 'medBtn' : 'hardBtn';
  document.getElementById(id).classList.add('active');
}

document.getElementById('easyBtn').onclick = () => setDifficulty('easy');
document.getElementById('medBtn').onclick  = () => setDifficulty('medium');
document.getElementById('hardBtn').onclick = () => setDifficulty('hard');

function updateUI() {
  document.getElementById('need').textContent = need;
  document.getElementById('ballsLeft').textContent = ballsLeft;
  document.getElementById('wickets').textContent = wickets;
  document.getElementById('ballNum').textContent = Math.min(ballIndex + 1, TOTAL_BALLS);
}

function resetBall() {
  ballPos = 12;
  ball.style.left = '12px';
  ball.style.transition = 'none';
}

function bowl() {
  if (isBowling || gameOver) return;
  isBowling = true;
  document.querySelectorAll('.diff-btns button').forEach(b => b.disabled = true);

  resetBall();

  const duration = speeds[difficulty];
  const trackWidth = track.offsetWidth - 30;   
  const startTime = performance.now();

  function animate(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);

    ballPos = 12 + progress * (trackWidth - 24);
    ball.style.left = ballPos + 'px';

    if (progress < 1) {
      animId = requestAnimationFrame(animate);
    } else {
    
      processShot('miss');
    }
  }
  animId = requestAnimationFrame(animate);
}

function processShot(forceMiss = false) {
  if (!isBowling) return;

  cancelAnimationFrame(animId);
  isBowling = false;
  hitBtn.disabled = true;

  const trackWidth = track.offsetWidth - 30;
  const hitZoneLeft  = trackWidth - 110;   
  const hitZoneRight = trackWidth - 40;    
  let score;

  if (forceMiss) {
    score = 'miss';
  } else {
   
    if (ballPos >= hitZoneLeft && ballPos <= hitZoneRight) {
      score = 6;
    }
   
    else if (ballPos >= hitZoneLeft - 35 && ballPos < hitZoneLeft) {
      score = 4;      
    } else if (ballPos > hitZoneRight && ballPos <= hitZoneRight + 30) {
      score = 4;         
    }
   
    else if (ballPos >= hitZoneLeft - 70 && ballPos < hitZoneLeft - 35) {
      score = 1;
    } else if (ballPos > hitZoneRight + 30 && ballPos <= hitZoneRight + 60) {
      score = 1;
    }
   
    else {
      score = 'miss';
    }
  }

  let runs = 0;
  let isWicket = false;
  let display = '0';

  if (score === 6) {
    runs = 6;
    display = '6';
  } else if (score === 4) {
    runs = 4;
    display = '4';
  } else if (score === 1) {
    runs = 1;
    display = '1';
  } else {
  
    const chance = difficulty === 'hard' ? 0.55 : difficulty === 'medium' ? 0.4 : 0.25;
    if (Math.random() < chance) {
      isWicket = true;
      display = 'W';
    } else {
      runs = 0;
      display = '0';
    }
  }

  need = Math.max(0, need - runs);
  ballsLeft--;
  if (isWicket) wickets++;

  const circle = document.getElementById('r' + ballIndex);
  circle.textContent = display;
  circle.classList.remove('scored', 'wicket', 'dot');
  if (display === 'W') circle.classList.add('wicket');
  else if (display === '0') circle.classList.add('dot');
  else circle.classList.add('scored');

  const key = isWicket ? 'W' : runs;
  let text = commentaries[key][Math.floor(Math.random() * commentaries[key].length)];
  if (need > 0 && ballsLeft > 0 && !isWicket) {
    text += ` ${need} needed off ${ballsLeft}.`;
  }
  commentary.textContent = text;

  ballIndex++;
  updateUI();

  // End game?
  if (need <= 0) {
    endGame(true);
  } else if (wickets >= MAX_WICKETS || ballsLeft <= 0) {
    endGame(false);
  } else {
   
    setTimeout(() => {
      resetBall();
      hitBtn.disabled = false;
      document.querySelectorAll('.diff-btns button').forEach(b => b.disabled = false);
    }, 800);
  }
}

function endGame(won) {
  gameOver = true;
  hitBtn.disabled = true;
  document.querySelectorAll('.diff-btns button').forEach(b => b.disabled = true);

  resultBox.className = 'result-box ' + (won ? 'win' : 'lose');
  resultTitle.textContent = won ? 'You Win! 🏆' : 'You Lose';
  if (won) {
    resultMsg.textContent = `Chased successfully with ${ballsLeft} ball${ballsLeft !== 1 ? 's' : ''} left!`;
  } else if (wickets >= MAX_WICKETS) {
    resultMsg.textContent = `All out! Still needed ${need} more runs.`;
  } else {
    resultMsg.textContent = `Not enough! Needed ${need} more off the last ball.`;
  }
  overlay.classList.add('show');
}

function resetGame() {
  need = TARGET;
  ballsLeft = TOTAL_BALLS;
  wickets = 0;
  ballIndex = 0;
  isBowling = false;
  gameOver = false;
  cancelAnimationFrame(animId);

  for (let i = 0; i < 6; i++) {
    const c = document.getElementById('r' + i);
    c.textContent = '–';
    c.classList.remove('scored', 'wicket', 'dot');
  }

  commentary.textContent = 'Press HIT or Space when the ball enters the Hit zone!';
  resetBall();
  updateUI();
  hitBtn.disabled = false;
  document.querySelectorAll('.diff-btns button').forEach(b => b.disabled = false);
  overlay.classList.remove('show');
}

hitBtn.addEventListener('click', () => {
  if (!isBowling && !gameOver) bowl();
  else if (isBowling) processShot();
});

document.addEventListener('keydown', e => {
  if (e.code === 'Space') {
    e.preventDefault();
    if (!isBowling && !gameOver) bowl();
    else if (isBowling) processShot();
  }
});

document.getElementById('playAgain').onclick = resetGame;

updateUI();
