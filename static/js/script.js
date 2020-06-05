const newBricks = [
    {
        name: "brick1",
        img: "/static/img/brick.png",
        x_position: 60,
    },
    {
        name: "brick2",
        img: "/static/img/brick.png",
        x_position: 170,
    },
    {
        name: "brick3",
        img: "/static/img/brick.png",
        x_position: 280,
    },
    {
        name: "brick4",
        img: "/static/img/brick.png",
        x_position: 390,
    },
    {
        name: "brick5",
        img: "/static/img/brick.png",
        x_position: 500,
    },
];

let isGameStarted = false;


let score = 5;

let game = document.getElementById('game');


let grid = document.createElement('div');
grid.setAttribute('id', 'grid');
game.appendChild(grid);


// Creating bricks
let i = 1;
for (let bricks of newBricks) {
    const brick = document.createElement('div');
    brick.classList.add('brick' + i);
    brick.style.display = 'flex';
    brick.dataset.name = bricks.name;
    brick.dataset.position = bricks.x_position;
    grid.appendChild(brick);
    i++
}


let paddle = document.createElement('div');
paddle.setAttribute('id', 'paddle');
paddle.classList.add('paddle');
grid.appendChild(paddle);


let ball = document.createElement('div');
ball.setAttribute('id', 'ball');
ball.classList.add('ball');
grid.appendChild(ball);


const gridTopEdge = 0;
const gridBottomEdge = 645;
const gridLeftEdge = 0;
const gridRightEdge = 570;


const ballSize = 20;
let y_ball_position = 550;
let x_ball_position = 305;
let x_ball_speed = 10;
let y_ball_speed = -3;


let paddleMarginLeft = 260;
let paddleWidth = 110;


if (game) {
    document.body.style.backgroundImage = "url('/static/img/eve-online-space-spaceship-black-wallpaper-preview.jpg')";
}


function rightArrowPressed(movePaddle) {
    paddleMarginLeft = paddleMarginLeft + movePaddle;
    paddle.style.marginLeft = paddleMarginLeft + 'px';
}


function leftArrowPressed(movePaddle) {
    paddleMarginLeft = paddleMarginLeft - movePaddle;
    paddle.style.marginLeft = paddleMarginLeft + 'px';
}

function checkIsGameStarted(){
    if (!isGameStarted){
        startGame()
    }
}

document.addEventListener('keydown', (event) => {
    const keyName = event.key;
    const movePaddle = 20;


    if (keyName === 'ArrowLeft' && paddleMarginLeft >= gridLeftEdge + movePaddle) {
        checkIsGameStarted();
        leftArrowPressed(movePaddle)
    }
    else if (keyName === 'ArrowRight' && paddleMarginLeft <= gridRightEdge - paddleWidth) {
        checkIsGameStarted();
        rightArrowPressed(movePaddle)
    }
}, false);


function changeBallPosition() {

    y_ball_position += y_ball_speed;
    x_ball_position += x_ball_speed;
}


function updateBallPosition() {
    ball.style.marginTop = y_ball_position + 'px';
    ball.style.marginLeft = x_ball_position + 'px';
}


function checkPaddleCollision() {
    const y_paddlePosition = 550;
    const paddleHeight = 20;

    if (x_ball_position > paddleMarginLeft - ballSize &&
        x_ball_position < paddleMarginLeft + paddleWidth &&
        y_ball_position > y_paddlePosition &&
        y_ball_position < y_paddlePosition + paddleHeight) {
        y_ball_speed = -3;
    }
}


function looseGame(){
    alert('You loose');
    y_ball_speed = 0;
    ball.style.display = 'none';
    y_ball_position = 550;
}

function checkGridEdgesCollision() {

    if (y_ball_position < gridTopEdge) {
        y_ball_speed = 3;
    }
    else if (x_ball_position > gridRightEdge) {
        x_ball_speed = -10;
    }
    else if (x_ball_position < gridLeftEdge) {
        x_ball_speed = 10;
    }
    else if (y_ball_position > gridBottomEdge) {
        looseGame()
    }
}

function hideBrick(brick){
    brick.style.display = 'block';
    brick.classList.add('hide');
}


function brickCollision(brickPosition){

    let brickSize = 50;
    let y_brickPosition = 120;
    let brickHeight = 20;

    return x_ball_position + ballSize > brickPosition &&
    x_ball_position < brickPosition + brickSize &&
    y_ball_position > y_brickPosition &&
    y_ball_position < y_brickPosition + brickHeight
}


function canBrickBounce(brick){
    return brick.style.display === 'flex'
}


function updateBallMovement(brick, brickPosition){
    if (brickCollision(brickPosition) && canBrickBounce(brick)
    ) {
        score --;
        y_ball_speed = 3;
        hideBrick(brick);
    }
}


function checkBrickCollision(handle) {

    for (let i=0; i < newBricks.length; i++){
        let brick = document.getElementsByClassName(`${newBricks[i].name}`)[0];
        updateBallMovement(brick, newBricks[i].x_position );
        }
    }


function checkIfWinGame() {
    if (score === 0) {
        alert('You win!');
        y_ball_speed = 0;
        ball.style.display = 'none';
        y_ball_position = 550;
        score -= 1;
    }
}

function moveBall() {
    checkIfWinGame();
    changeBallPosition();
    updateBallPosition();
    checkGridEdgesCollision();
    checkPaddleCollision();
    checkBrickCollision();
}


function startGame() {
    setInterval(moveBall, 30);
    isGameStarted = true;
}