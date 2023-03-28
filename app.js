const grid = document.querySelector('.grid');
const scoreDisplaay = document.querySelector('#score')
const blockWidth = 100;
const blockHeight = 20;
const ballDiameter = 20
const boardWidth = 570;
const boardHeight = 300;

let timerId;
let yDirection = 2;
let xDirection = -2;
let score = 0;


const userStart = [230, 10];
let userPosition = userStart

const ballStart = [230, 40];
let ballPosition = ballStart

class block {
  constructor(xAxis, yAxis) {
    this.bottomLeft = [xAxis, yAxis];
    this.bottomRight = [xAxis + blockWidth, yAxis];
    this.topLeft = [xAxis, yAxis + blockHeight];
    this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
  }
}

//All Blocks
const blocks = [
  new block(10, 270),
  new block(120, 270),
  new block(230, 270),
  new block(340, 270),
  new block(450, 270),
  new block(10, 240),
  new block(120, 240),
  new block(230, 240),
  new block(340, 240),
  new block(450, 240),
  new block(10, 210),
  new block(120, 210),
  new block(230, 210),
  new block(340, 210),
  new block(450, 210),
]

alert(`Welcome to Breakout by Dinny, 
Your mission should you choose to accept it, 
is to get rids of all blocks on screen Goodluck 😎!`)

//draw a block
function addBlocks() {
  for (let i = 0; i < blocks.length; i++) {
    const block = document.createElement('div');
    block.classList.add('block');
    block.style.left = blocks[i].bottomLeft[0] + 'px';
    block.style.bottom = blocks[i].bottomLeft[1] + 'px';
    grid.appendChild(block);
  }
}

addBlocks()

//add user
const user = document.createElement('div');
user.classList.add('user');
drawUser()
grid.appendChild(user);

//draw the user
function drawUser() {
  user.style.left = userPosition[0] + 'px';
  user.style.bottom = userPosition[1] + 'px';
}
//draw ball
function drawBall() {
  ball.style.left = ballPosition[0] + 'px'
  ball.style.bottom = ballPosition[1] + 'px'
}

///move user
function moveUser(e) {
  switch (e.key) {
    case 'ArrowLeft':
      if (userPosition[0] > 0) {
        userPosition[0] -= 10;
        drawUser( )
      }
      break;
      case 'ArrowRight':
        if (userPosition[0] < boardWidth - blockWidth) {
          userPosition[0] += 10;
          drawUser()
      }
      break
    }
  } 

  document.addEventListener('keydown', moveUser);
  
  //create ball
  
const ball = document.createElement('div');
ball.classList.add('ball');
drawBall()
grid.appendChild(ball);

//move ball
function moveBall() {
  ballPosition[0] += xDirection;
  ballPosition[1] += yDirection;
  drawBall();
  checkCollisions()
}





console.log(blocks[0].bottomLeft)
timerId = setInterval(moveBall, 30); 

//check for collisions
function checkCollisions() {
  // Check for  Block Collisions
  for (let i = 0; i < blocks.length; i++) {
    if (
      (ballPosition[0] > blocks[i].bottomLeft[0] && ballPosition[0] < blocks[i].bottomRight[0]) &&
      (ballPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] && ballPosition[1] < blocks[i].topLeft[1]
      ) {
        const allBlocks = Array.from(document.querySelectorAll('.block'));
        allBlocks[i].classList.remove('block');
        blocks.splice(i, 1);
        score ++;
        scoreDisplaay.innerHTML = score;
        changeDirection()

        //check for win  
        if (blocks.length === 0) {
          scoreDisplaay.textContent = 'YOU WIN 🎉🥳';
          clearInterval(timerId)
          document.addEventListener('keydown', moveUser);
        }
      }
    }
    //wall collisions
    if (
      ballPosition[0] >= (boardWidth - ballDiameter) || 
      ballPosition[1] >=  (boardHeight - ballDiameter ) ||
      ballPosition[0] <= 0
      ) {
        console.log('Ball current position: ' + ballPosition[0] + ' ' + ballPosition[1])
        changeDirection()
    }
    
    //check for floor collision
    if(ballPosition[1] <= 0 ) {
      clearInterval(timerId)
      scoreDisplaay.innerHTML = 'You Lose 👎 - Refresh to replay';
      document.removeEventListener('keydown', moveUser)
    }
  
    //collision with user
    if( 
      (ballPosition[0] > userPosition[0] && ballPosition[0] < (userPosition[0] + blockWidth)) &&
      (ballPosition[1] < (userPosition[1] + blockHeight))
      ) {
        console.log('ball hit user')
        changeDirection()
      }
}

function changeDirection() {
  if (xDirection === 2 && yDirection === 2) {
    // console.log('x direction is: ' + xDirection , ' y direction is:' + yDirection)
    yDirection = -2;
    return
  }
  if (xDirection === 2 && yDirection === -2) {
    // console.log('x direction is: ' + xDirection , ' y direction is:' + yDirection)
    xDirection = -2;
    yDirection = -2;
    return
  }
  if (xDirection === -2 && yDirection === -2) {
    // console.log('x direction is: ' + xDirection , ' y direction is:' + yDirection)
    yDirection = 2;
    return
  }
  if (xDirection === -2 && yDirection === 2){
    // console.log('x direction is: ' + xDirection , ' y direction is:' + yDirection)
    xDirection = 2;
    return
  }
}


