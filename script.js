let score = 0;
let level = 1;
let timeLeft = 5;
let timer;
let moveSpeed = 1000;

const scoreEl = document.getElementById("score");
const levelEl = document.getElementById("level");
const timeEl = document.getElementById("time");
const target = document.getElementById("target");
const gameArea = document.getElementById("gameArea");
const message = document.getElementById("message");
const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");

function startGame() {
  score = 0;
  level = 1;
  moveSpeed = 1000;
  startLevel();

  startBtn.classList.add("hidden");
  restartBtn.classList.remove("hidden");
}

function startLevel() {
  timeLeft = Math.max(5 - level + 1, 2);
  updateUI();

  target.classList.remove("hidden");
  message.textContent = "";

  moveTarget();
  startTimer();
}

function moveTarget() {
  const maxX = gameArea.clientWidth - 60;
  const maxY = gameArea.clientHeight - 60;

  const newX = Math.random() * maxX;
  const newY = Math.random() * maxY;

  target.style.left = newX + "px";
  target.style.top = newY + "px";

  const angle = Math.random() * 360;
  target.style.transform = `rotate(${angle}deg)`;

  // keep moving continuously
  setTimeout(moveTarget, moveSpeed);
}

function startTimer() {
  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    updateUI();

    if (timeLeft <= 0) {
      loseGame();
    }
  }, 1000);
}

function updateUI() {
  scoreEl.textContent = score;
  levelEl.textContent = level;
  timeEl.textContent = timeLeft;
}

function winRound() {
  score++;
  level++;
  moveSpeed *= 0.75; // faster each level
  startLevel();
}

function loseGame() {
  clearInterval(timer);
  target.classList.add("hidden");
  message.textContent = "Sneaky mouse 🐭";
}

target.addEventListener("click", winRound);
startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", startGame);
