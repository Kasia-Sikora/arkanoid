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

let y= 550;
let x = 0;

function moveBall() {
    let id = setInterval(frame, 1000);
    function frame() {
        //margin-left: -580
        //margin-right: -570
        //margin-top: 640
        if (y >= 640) {
            ball.style.display = 'none';
            clearInterval(id);
        }
        if (y === 1) {
           moveBallDown()
            // y += 1;
            // ball.style.marginTop = y + 'px';
            // console.log(ball.style.marginTop)
        }

        if (y <= 550) {
            setInterval(moveBallUp, 100)
            // y -= 1;
            // ball.style.marginTop = y + 'px';
            // console.log(ball.style.marginTop)
        }
    }
}

function moveBallUp() {
    while (y > 1){
        console.log('up', y);
        y -= 1;
        ball.style.marginTop = y + 'px';
        console.log(ball.style.marginTop)
    }
}


function moveBallDown(){
    while (y <= 630){
        console.log('down',y);
        y+=1;
        ball.style.marginTop = y + 'px';
        console.log(ball.style.marginTop)
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
      rightArrowPressed()
  }
  }, false);


function startGame() {
    moveBall();
}