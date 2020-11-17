const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


const platformW = canvas.width;
const platformH = 5;
const holeSize = 30;
let spaceBetween = 80;
let interval = null;
const canvasW = canvas.width;
const canvasH = canvas.height;
let ballX = canvas.width / 2;
let ballY = 10;
const radius = 10;

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
    interval = setInterval(() => {
        dropBall();
        addPlatforms();
        detectCollision();
        platforms.forEach(platform => {
            if (platform.y + platformH < 0) {
                platforms.shift();
            }
            platform.y -= 1;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawPlateform();
            drawBall();
        });

    }, 20);
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
        if (e.key === "ArrowRight") {
            ball.x += 10;
        }
        if (e.key === "ArrowLeft") {
            ball.x -= 10;
        }
        if (e.key === "ArrowDown") {
            ball.y += 10;
        }
        if (e.key === "ArrowUp") {
            ball.y -= 10;
        }
    });
}

function detectCollision() {
    platforms.forEach(plateform => {
        if (ball.y - radius > 0 && ball.y < plateform.y) {
            if (plateform.holeX <= ball.x && ball.x <= plateform.holeX + holeSize) {
                return;
            } else if (plateform.y < ball.y + radius) {
                ball.y = plateform.y - radius;
                console.log(ball.y, plateform.y);
            }
        };
    });
}

function dropBall() {
    if (ball.y < platforms[0].y - radius) {
        ball.y += ball.ballDropSpeed;
    } else {
        ball.y = platforms[0].y - radius;
    }
}