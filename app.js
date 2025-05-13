let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;

let btns = ["yellow", "red", "green", "purple"];
let h2 = document.querySelector("h2");

let highScore = localStorage.getItem("highScore") || 0;
const highScoreDisplay = document.getElementById("high-score");
highScoreDisplay.innerText = `High Score: ${highScore}`;

// Start game 
document.addEventListener("keypress", function () {
  if (!started) {
    started = true;
    levelUp();
  }
});

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(() => {
    btn.classList.remove("flash");
  }, 400);
}

// Animate user button
function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(() => {
    btn.classList.remove("userflash");
  }, 250);
}

// Go to next level
function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

  let randomIdx = Math.floor(Math.random() * btns.length);
  let randomColor = btns[randomIdx];
  let randomBtn = document.querySelector(`#${randomColor}`);

  gameSeq.push(randomColor);
  gameFlash(randomBtn);
}

// Reset game state
function resetGame() {
  gameSeq = [];
  userSeq = [];
  started = false;
  level = 0;
}

// Check user input vs game sequence
function checkAns() {
  let idx = userSeq.length - 1;

  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    if (level - 1 > highScore) {
      highScore = level - 1;
      localStorage.setItem("highScore", highScore);
    }

    h2.innerHTML = `❌ Game Over! Your score: <b>${level - 1}</b><br>Press any key to restart.`;
    highScoreDisplay.innerText = `High Score: ${highScore}`;
    
    document.body.classList.add("game-over");

    setTimeout(() => {
      document.body.classList.remove("game-over");
    }, 300);

    resetGame();
  }
}

// When user clicks a button
function btnPress() {
  let btn = this;
  userFlash(btn);

  let userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  checkAns();
}

// Event listeners on color buttons
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", btnPress);
});
