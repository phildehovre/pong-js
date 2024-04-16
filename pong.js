
// board
let board;
let boardWidth = 600;
let boardHeight = 400;
let context;

// ball
ballWidth = 10;
ballHeight = 10;
let ball = {
    x: boardWidth / 2,
    y: boardHeight / 2,
    width: ballWidth,
    height: ballHeight,
    dx: 4,
    dy: Math.random() * 10 - 5
};

// paddle
let paddle;
paddleWidth = 10;
paddleHeight = 50;

// adversary
let adversary;
adversaryWidth = 10;
adversaryHeight = 50;

let gameOver = false;
let score = [0, 0]


// physics

 window.onload = function() {
    board = document.getElementById('board');
    context = board.getContext("2d");

    board.width = boardWidth;
    board.height = boardHeight;

       
    paddle = {
        x: 10,
        y: boardHeight / 2 - paddleHeight / 2,
        width: paddleWidth,
        height: paddleHeight
    };
    adversary = {
        x: 10,
        y: boardHeight / 2 - adversaryHeight / 2,
        width: adversaryWidth,
        height: adversaryHeight
    };


    requestAnimationFrame(gameLoop);
    document.addEventListener('keydown', movePaddle);
 }

 function gameLoop() {
    requestAnimationFrame(gameLoop);

    if (score.some(score => score == 10)) {
        gameOver = true;
        // alert("Game Over");
        return;
    }

    if (gameOver) {
        return;
    }

    context.clearRect(0, 0, boardWidth, boardHeight);

    //draw paddle
    context.fillStyle = "white";
    context.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);

    // draw adversary
    context.fillStyle = "white";
    context.fillRect(boardWidth - 20, ball.y - adversaryHeight /2, adversary.width, adversary.height);
    
    // draw ball
    context.fillStyle = "white";
    ball.x += -ball.dx;
    ball.y += ball.dy;
    context.fillRect(ball.x, ball.y, ball.width, ball.height);

    if (ball.y + ballHeight > boardHeight || ball.y < 0) {
        ball.dy = -ball.dy;
    }

    if (ball.x + ballHeight > boardWidth) {
        score = [score[0] +1 , score[1]];
        reset()
    } else if (ball.x < 0) {
        score = [score[0], score[1] +1];
        reset()
    }

    if (detectCollision(ball, paddle)) {
        if (ball.x <= paddle.x + paddle.width)
        ball.dx = -ball.dx;
    } else if (detectCollision(ball, adversary)) {
        if (ball.dx > 0 && ball.x + ballWidth >= adversary.x) { // Ball moving right and right side of ball touches left side of adversary
            ball.dx = -ball.dx;   // Flip x direction
        }
    }

    // display score
    context.font = "30px Arial";
    context.fillText(score[0], 200, 50);
    context.fillText(score[1], 400, 50);

 }

 function movePaddle(e) {
    switch(e.code) {
        case 'ArrowUp':
            if(paddle.y > 0) {
                paddle.y -= 10;
            }
            break;
        case 'ArrowDown':
            if(paddle.y < boardHeight - paddle.height) {
                paddle.y += 10;
            }
            break;
    }
 }

 function reset() {
    gameOver = false;
    ball.x = boardWidth / 2;
    ball.y = boardHeight / 2;
    ball.dx = 4;
    ball.dy = Math.random() * 10 - 5;
    paddle.y = boardHeight / 2 - paddleHeight / 2;
    adversary.y = boardHeight / 2 - adversaryHeight / 2;
 }

 function detectCollision(a, b) {
    return a.x < b.x + b.width && 
    a.x + a.width > b.x && 
    a.y < b.y + b.height && 
    a.y + a.height > b.y;
 }