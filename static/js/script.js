const newBricks = [
    {
        name: "brick1",
        img: "/static/img/brick.png"
    },
    {
        name: "brick2",
        img: "/static/img/brick.png"
    },
    {
        name: "brick3",
        img: "/static/img/brick.png"
    },
    {
        name: "brick4",
        img: "/static/img/brick.png"
    },
    {
        name: "brick5",
        img: "/static/img/brick.png"
    },
];


let game = document.getElementById('game');


let grid = document.createElement('div');
grid.setAttribute('class', 'grid');
game.appendChild(grid);


// Creating bricks
let i = 1;
for (let bricks of newBricks) {
    const brick = document.createElement('div');
    brick.classList.add('brick' + i);
    brick.style.display = 'flex';
    brick.dataset.name = bricks.name;
    grid.appendChild(brick);
    i++
}


let paddle = document.createElement('div');
paddle.setAttribute('class', 'paddle');
paddle.classList.add('paddle');
grid.appendChild(paddle);


let ball = document.createElement('div');
ball.setAttribute('class', 'ball');
ball.classList.add('ball');
grid.appendChild(ball);


const gridTopEdge = 0;
const gridBottomEdge = 645;
const gridLeftEdge = 0;
const gridRightEdge = 570;


const ballSize = 20;
let y_ball_position = 550;
let x_ball_position = 305;
let x_speed = 10;
let y_speed = -3;


let paddleMarginLeft = 260;


if (game) {
    document.body.style.backgroundImage = "url('/static/img/wallpaper1.jpg')";
}


function rightArrowPressed(movePaddle) {
    paddleMarginLeft = paddleMarginLeft + movePaddle;
    paddle.style.marginLeft = paddleMarginLeft + 'px';
}


function leftArrowPressed(movePaddle) {
    paddleMarginLeft = paddleMarginLeft - movePaddle;
    paddle.style.marginLeft = paddleMarginLeft + 'px';
}


document.addEventListener('keydown', (event) => {
    const keyName = event.key;
    const movePaddle = 20;

    if (keyName === 'ArrowLeft' && paddleMarginLeft >= gridLeftEdge + movePaddle) {
        leftArrowPressed(movePaddle)
    }
    else if (keyName === 'ArrowRight' && paddleMarginLeft <= gridRightEdge - 100) {
        rightArrowPressed(movePaddle)
    }
}, false);


function changeBallPosition() {

    y_ball_position += y_speed;
    x_ball_position += x_speed;
}


function updateBallPosition() {
    ball.style.marginTop = y_ball_position + 'px';
    ball.style.marginLeft = x_ball_position + 'px';
}


function checkPaddlePosition() {
    const y_paddlePosition = 550;
    const paddleHeight = 20;

    if (x_ball_position > paddleMarginLeft - 60 &&
        x_ball_position < paddleMarginLeft + 60 &&
        y_ball_position > y_paddlePosition &&
        y_ball_position < y_paddlePosition+paddleHeight) {
        y_speed = -3;
    }
}


function checkGridEdges() {

    if (y_ball_position < gridTopEdge) {
        y_speed = 3;
    }
    else if (x_ball_position > gridRightEdge) {
        x_speed = -10;
    }
    else if (x_ball_position < gridLeftEdge) {
        x_speed = 10;
    }
    else if (y_ball_position > gridBottomEdge) {
        y_speed = -3;
        // ball.style.display = 'none';
    }
}


//https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript/Track_the_score_and_win
function checkCollision(handle) {

    let brick1 = document.getElementsByClassName('brick1')[0];
    let brick2 = document.getElementsByClassName('brick2')[0];
    let brick3 = document.getElementsByClassName('brick3')[0];
    let brick4 = document.getElementsByClassName('brick4')[0];
    let brick5 = document.getElementsByClassName('brick5')[0];

    let brick1_position_x = 60;
    let brick2_position_x = 170;
    let brick3_position_x = 280;
    let brick4_position_x = 390;
    let brick5_position_x = 500;

    let brickSize = 50;

    let y_brickPosition = 130;
    let brickHeight = 10;


    if (x_ball_position + ballSize > brick1_position_x &&
        x_ball_position < brick1_position_x + brickSize &&
        y_ball_position > y_brickPosition &&
        y_ball_position < y_brickPosition+brickHeight
        && brick1.style.display === 'flex'
    ) {
        y_speed = 3;
        brick1.style.display = 'block';
        brick1.classList.add('hide');
    }

    else if (x_ball_position + ballSize > brick2_position_x &&
        x_ball_position < brick2_position_x + brickSize &&
        y_ball_position > y_brickPosition &&
        y_ball_position < y_brickPosition+brickHeight
        && brick2.style.display === 'flex'
    ) {
        y_speed = 3;
        brick2.style.display = 'block';
        brick2.classList.add('hide');
    }

    else if (x_ball_position + ballSize > brick3_position_x &&
        x_ball_position < brick3_position_x + brickSize &&
        y_ball_position > y_brickPosition &&
        y_ball_position < y_brickPosition+brickHeight
        && brick3.style.display === 'flex'
    ) {
        y_speed = 3;
        brick3.style.display = 'block';
        brick3.classList.add('hide');
    }

    else if (x_ball_position + ballSize > brick4_position_x &&
        x_ball_position < brick4_position_x + brickSize &&
        y_ball_position > y_brickPosition &&
        y_ball_position < y_brickPosition+brickHeight
        && brick4.style.display === 'flex'
    ) {
        y_speed = 3;
        brick4.style.display = 'block';
        brick4.classList.add('hide');
    }

    else if (x_ball_position + ballSize > brick5_position_x &&
        x_ball_position < brick5_position_x + brickSize &&
        y_ball_position > y_brickPosition &&
        y_ball_position < y_brickPosition+brickHeight
        && brick5.style.display === 'flex'
    ) {
        y_speed = 3;
        brick5.style.display = 'block';
        brick5.classList.add('hide');
    }

}


function moveBall() {
    changeBallPosition();
    updateBallPosition();
    checkGridEdges();
    checkPaddlePosition();
    checkCollision();
}


function startGame() {
    setInterval(moveBall, 30);
}