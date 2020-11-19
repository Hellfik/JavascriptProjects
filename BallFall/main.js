const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


const platformW = canvas.width;
const platformH = 5;
const holeSize = 30;
let spaceBetween = 80;
let interval = (scoreInterval = null);
const canvasW = canvas.width;
const canvasH = canvas.height;
let ballX = canvas.width / 2;
let ballY = 20;
const radius = 10;
let score = 0;


let platforms = [{
    x: 0,
    y: 400,
    holeX: Math.floor(Math.random() * ((canvas.width - holeSize))),
}];

let ball = { x: ballX, y: ballY, ballDropSpeed: 7 };


drawPlateform();
movePlatform();
moveBall();


function drawPlateform() {
    platforms.forEach(platform => {
        ctx.beginPath();
        ctx.rect(platform.x, platform.y, platformW, platformH);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();
        //Draw the hole for each platforms
        ctx.beginPath();
        ctx.rect(platform.holeX, platform.y, holeSize, platformH);

        ctx.fillStyle = "#fff";
        ctx.fill();
        ctx.closePath();

    });
}

function addPlatforms() {
    if (platforms.length > 0 && platforms[platforms.length - 1].y < canvasH) {
        platforms.push({
            x: 0,
            y: platforms[platforms.length - 1].y + spaceBetween,
            holeX: Math.floor(Math.random() * ((canvas.width - holeSize)))
        });
    }
}

function movePlatform() {
    scoreInterval = setInterval(() => {
        score++;
    }, 1000);
    interval = setInterval(() => {
        gameOver();
        dropBall(detectCollision());
        addPlatforms();
        platforms.forEach(platform => {
            if (platform.y + platformH < 0) {
                platforms.shift();
            }
            platform.y -= 2;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawPlateform();
            drawBall();
            drawScore();
        });

    }, 18);
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = "brown";
    ctx.fill();
    ctx.closePath();
}

function moveBall() {
    document.addEventListener('keydown', function(e) {
        if (e.key === "ArrowRight" && ball.x + radius < canvasW) {
            ball.x += 10;
        }
        if (e.key === "ArrowLeft" && ball.x - radius > 0) {
            ball.x -= 10;
        }
    });
}

function detectCollision() {
    const closestPlatform = platforms.find(
        (platform) => platform.y > ball.y);
    return closestPlatform;

}

function dropBall(closestPl) {
    if (closestPl) {
        if (ball.y < closestPl.y - radius || (ball.x > closestPl.holeX && ball.x < (closestPl.holeX + holeSize))) {
            ball.y += ball.ballDropSpeed;
        } else {
            ball.y = closestPl.y - radius;
        }
    } else {
        ball.y = canvasH - radius;
    }
}

function gameOver() {
    if (ball.y - radius < 0) {
        alert('Game Over');
        resetGame();
    }
}

function resetGame() {
    ball.x = canvas.width / 2;
    ball.y = 20;
    platforms = [{
        x: 0,
        y: 400,
        holeX: Math.floor(Math.random() * ((canvas.width - holeSize))),
    }];
    clearInterval(interval);
    clearInterval(scoreInterval);
    interval = scoreInterval = null;
    score = 0;
    movePlatform();
}

function drawScore() {
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.fillText('Score: ' + score, 10, 10);
    ctx.closePath();
}