const dino = document.getElementById("dino");
const obstacle = document.getElementById("obstacle");
const scoreDisplay = document.getElementById("score");
const livesDisplay = document.getElementById("lives");

let isJumping = false;
let isGameOver = false;
let score = 0;
let lives = 3;

document.addEventListener("keydown", startGame);
document.addEventListener("touchstart", startGame);

function startGame(event) {
    if ((event.keyCode === 32 || event.type === "touchstart") && !isJumping && !isGameOver) {
        jump();
    }
}

function jump() {
    if (isJumping) return;

    isJumping = true;

    let position = 0;
    let jumpInterval = setInterval(() => {
        if (position >= 150) {
            clearInterval(jumpInterval);
            let fallInterval = setInterval(() => {
                if (position === 0) {
                    clearInterval(fallInterval);
                    isJumping = false;
                } else {
                    position -= 5;
                    dino.style.bottom = position + "px";
                }
            }, 20);
        } else {
            position += 5;
            dino.style.bottom = position + "px";
        }
    }, 20);
}

function randomizeObstaclePosition() {
    const randomHeight = Math.floor(Math.random() * 150); // 随机高度
    obstacle.style.bottom = randomHeight + "px";
}

function checkCollision() {
    const dinoBottom = parseInt(window.getComputedStyle(dino).getPropertyValue("bottom"));
    const obstacleRight = parseInt(window.getComputedStyle(obstacle).getPropertyValue("right"));

    if (obstacleRight < 50 && obstacleRight > 0 && dinoBottom <= 0) {
        lives--;
        livesDisplay.textContent = "生命: " + lives;
        if (lives === 0) {
            gameOver();
        }
    }
}

function gameOver() {
    isGameOver = true;
    const userChoice = confirm("杰哥被明月家暴致死了！\n总分： " + score + "\n是否再次调戏明月 ?");
    
    if (userChoice) {
        // 如果用户点击确定，刷新页面以重新开始游戏
        location.reload();
    }
}

setInterval(() => {
    if (!isGameOver) {
        checkCollision();
        if (parseInt(window.getComputedStyle(obstacle).getPropertyValue("right")) <= 0) {
            score++;
            scoreDisplay.textContent = "总分: " + score;
            randomizeObstaclePosition(); // 随机生成障碍物位置
        }
    }
}, 10);

// 初始随机生成障碍物位置
randomizeObstaclePosition();
