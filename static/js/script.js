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


if (game) {
    document.body.style.backgroundImage = "url('/static/img/wallpaper1.jpg')";
}

let grid = document.createElement('div');
grid.setAttribute('class', 'grid');
game.appendChild(grid);

for (let bricks of newBricks) {
    const brick = document.createElement('div');
    brick.classList.add('brick');
    brick.dataset.name = bricks.name;
    grid.appendChild(brick);
}


let paddle = document.createElement('div');
paddle.setAttribute('class', 'paddle');
paddle.classList.add('paddle');
grid.appendChild(paddle);


let ball = document.createElement('div');
ball.setAttribute('class', 'ball');
ball.classList.add('ball');
grid.appendChild(ball);


function moveBall() {
    let s = document.querySelector('.ball');
    let margin_top = 550;
    let margin_bottom = 0;
    let margin_left = 0;
    let margin_right = 0;
    let operand = '--';
    let id = setInterval(frame, 10);
      function frame() {
            //margin-left: -580
            //margin-right: -570
            //margin-top: 640
            if (margin_top === 640) {
                s.style.display = 'none';
              clearInterval(id);
            }
            if (margin_top === 0) {
                operand = '++'
            }
            else {
              margin_top--;
              s.style.marginTop = margin_top + 'px';
        }
    }
}


let paddleMarginLeft = 0;

function rightArrowPressed() {
    let paddle = document.querySelector('.paddle');

    paddleMarginLeft = paddleMarginLeft + 20;
    paddle.style.marginLeft = paddleMarginLeft + 'px';

    console.log(paddleMarginLeft)
}


function leftArrowPressed() {
    let paddle = document.querySelector('.paddle');

    paddleMarginLeft = paddleMarginLeft - 20;
    paddle.style.marginLeft = paddleMarginLeft + 'px';

    console.log(paddleMarginLeft)
}


document.addEventListener('keydown', (event) => {
  const keyName = event.key;

  if(keyName === 'ArrowLeft' && paddleMarginLeft >= -480) {
      leftArrowPressed()
  }
  if (keyName === 'ArrowRight' && paddleMarginLeft <=460){
    // movePaddle(keyName);
      rightArrowPressed()
  }
  }, false);


function startGame() {
    moveBall();
}