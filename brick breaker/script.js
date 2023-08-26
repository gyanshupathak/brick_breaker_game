const canvas = document.getElementById("gameCanvas");

// Get the canvas rendering context
const ctx = canvas.getContext("2d");
let score = 0;

// Ball object
const ball = {
    x: canvas.width / 2,
    y: canvas.height - 30,
    radius: 10,
    dx: 3,
    dy: -3
};

// Paddle object
const paddle = {
    width: 75,
    height: 10,
    x: (canvas.width - 75) / 2,
    y: canvas.height - 10,
    dx: 5
};

// Draw the ball
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

// Draw the paddle
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

// Main game loop
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawbricks();

    drawBall();
    drawPaddle();
    collisionDetection();

    if (ball.y + ball.dy > canvas.height) {
        gameOver = true;
    }
    drawScore();

    

    // Update ball position
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Ball collision with walls
    if (ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
        ball.dx = -ball.dx;
    }
    if (ball.y + ball.dy < ball.radius) {
        ball.dy = -ball.dy;
    }
    else if (ball.y + ball.dy > canvas.height - ball.radius) {
    if (ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
        ball.dy = -ball.dy;
    }
    else {
            // Game over logic
            drawGameOver();
           
        clearInterval(interval);
        const gameOverSound = document.getElementById("gameoversound");
        gameOverSound.play();
        }
    }

    // Paddle movement
    if (rightPressed && paddle.x < canvas.width - paddle.width) {
        paddle.x += paddle.dx;
    } else if (leftPressed && paddle.x > 0) {
        paddle.x -= paddle.dx;
    }
}

// Keyboard event listeners for paddle movement
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

// Initialize keyboard states
let rightPressed = false;
let leftPressed = false;

//keydown handler
function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
    }
    else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
    }k
}

//Keyup handler
function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
    }
    else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
    }
}


//Adding bricks
const brickRowCount = 4;
const brickColumnCount = 8;
const brickWidth = 84;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

const bricks = [];
for (let col = 0; col < brickColumnCount; col++) {
    bricks[col] = [];
    for (let row = 0; row < brickRowCount; row++){
        bricks[col][row] = { x: 0, y: 0, status: 1 };
    }
}


function drawbricks() {
    for (let col = 0; col < brickColumnCount; col++) {
        for (let row = 0; row < brickRowCount; row++) {
            if (bricks[col][row].status === 1) {
                const brickX = col * (brickWidth + brickPadding) + brickOffsetLeft;
                const brickY = row * (brickHeight + brickPadding) + brickOffsetTop;

            
                bricks[col][row].x = brickX;
                bricks[col][row].y = brickY;

                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095dd";
                ctx.fill();
                ctx.closePath();

            }
        }
    }
}

//Implementing collision detection with bricks

function collisionDetection() {
    for (let col = 0; col < brickColumnCount; col++) {
        for (let row = 0; row < brickRowCount; row++) {
            const brick = bricks[col][row];

            if (brick.status == 1) {
                if (ball.x > brick.x && ball.x < brick.x + brickWidth  && ball.y>brick.y && ball.y<brick.y +brickHeight) {
                    ball.dy = -ball.dy;
                    brick.status = 0;
                    score += 1;
                    const collisionSound = document.getElementById("collisionSound");
                    collisionSound.play();
               } 
            }
        }
    }
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095dd";
    ctx.fillText("Score:" + score, 8, 20);
}

function drawGameOver() {
    ctx.font = "50px Arial";
    ctx.fillStyle = "#0095dd";
    ctx.fillText("GameOver!", canvas.width/2-125, canvas.height/2);
}


// Set up the game loop
const interval = setInterval(draw, 10);

