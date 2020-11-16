//TODO : Create a score functionnality
//TODO : Create a reset functionnality after loosing a game
//TODO : Disable backward movement of the snake
//TODO : Increase speed of the snake after a while of playing
//TODO : Refactoring/OOP

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const snakeW = snakeH = 5;

let snake = [
    { x: 50, y: 50 },
];

let foodX = generateRandomPosition();
let foodY = generateRandomPosition();

let rightPressed, leftPressed, upPressed, downPressed;

let interval = null;

drawSnake();
moveSnake();
navigation();

function drawSnake() {
    snake.forEach(rect => {
        ctx.beginPath();
        ctx.rect(rect.x, rect.y, snakeW, snakeH);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();
    });
}

function moveSnake() {
    let direction = "x";
    let dx = snakeW;
    let dy = 0;
    interval = setInterval(() => {
        collisionDetection();
        if (rightPressed) {
            direction = "x";
            dx = snakeW;
            dy = 0;
        }
        if (leftPressed) {
            direction = "x";
            dx = -snakeW;
            dy = 0;
        }
        if (downPressed) {
            direction = "y";
            dx = 0;
            dy = snakeH;
        }
        if (upPressed) {
            direction = "y";
            dx = 0;
            dy = -snakeH;
        }

        const head = { x: snake[0].x + dx, y: snake[0].y + dy };
        snake.unshift(head);
        snake.pop();

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawSnake();
        drawFood();
        growSnake();
    }, 100);
}

function navigation() {
    document.addEventListener('keydown', function(e) {
        if (e.key === "ArrowRight") {
            rightPressed = true;
        }
        if (e.key === "ArrowLeft") {
            leftPressed = true;
        }
        if (e.key === "ArrowDown") {
            downPressed = true;
        }
        if (e.key === "ArrowUp") {
            upPressed = true;
        }
    });
    document.addEventListener('keyup', function(e) {
        if (e.key === "ArrowRight") {
            rightPressed = false;
        }
        if (e.key === "ArrowLeft") {
            leftPressed = false;
        }
        if (e.key === "ArrowDown") {
            downPressed = false;
        }
        if (e.key === "ArrowUp") {
            upPressed = false;
        }
    });
}

function collisionDetection() {
    if (snake[0].x < 0) {
        alert('Left Wall collision');
        clearInterval(interval);
    }
    if (snake[0].x + snakeW > canvas.width) {
        alert('Right Wall collision');
        clearInterval(interval);
    }
    if (snake[0].y < 0) {
        alert('Top Wall collision');
        clearInterval(interval);
    }
    if (snake[0].y + snakeH > canvas.height) {
        alert('Bottom Wall collision');
        clearInterval(interval);
    }
}

function drawFood() {
    ctx.beginPath();
    ctx.rect(foodX, foodY, snakeW, snakeH);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
}

function growSnake() {
    if (snake[0].x == foodX && snake[0].y == foodY) {
        snake.push({ x: foodX, y: foodY });
        foodX = generateRandomPosition();
        foodY = generateRandomPosition();
    }
}

function generateRandomPosition() {
    let position = Math.floor(Math.random() * 295 / snakeW) * snakeW;
    return position;
}