var ball_x, ball_y, ball_dx, ball_dy, ball_radius, paddle_x, paddle_y, paddle_width, paddle_height, paddle_dx, score = 0, gameOver = 0, lives = 3;

var brickRows = 4, brickColumns = 4, brickWidth = 75, brickHeight = 20, brickpadding = 10, brickOffsetTop = 10, brickOffsetLeft = 30;

var bricks = [];

for (var c = 0; c < brickColumns; c++) {
  bricks[c] = [];
  for (var r = 0; r < brickRows; r++) {
    bricks[c][r] = { 
      x: 0, 
      y: 0, 
      hidden: 0 
    };
  }
}

function setup() {
  createCanvas(400, 400);
  ball_x = width / 2;
  ball_y = height / 2;
  ball_radius = 25 / 2;
  ball_dx = 3;
  ball_dy = 4;
  paddle_width = 80;
  paddle_height = 15;
  paddle_x = width / 2 - paddle_width / 2 + 100;
  paddle_y = height - 30;
  paddle_dx = 4;
}


function createBricks() {
  for (var r = 0; r < brickRows; r++) {
    for (var c = 0; c < brickColumns; c++) {
      if (bricks[c][r].hidden == 0) {
        var brickx = brickOffsetLeft + c * (brickpadding + brickWidth);
        var bricky = brickOffsetTop + r * (brickpadding + brickHeight);
        fill('silver');
        bricks[c][r].x = brickx;
        bricks[c][r].y = bricky;
        rect(brickx, bricky, brickWidth, brickHeight);
      }
    }
  }
}

function draw() {
  clear();
  background(589);
  checkCollision();
  createBricks();
  fill("black");
  circle(ball_x, ball_y, ball_radius * 2);
  rect(paddle_x, paddle_y, paddle_width, paddle_height);
  if(gameOver==0){
      ball_x = ball_x + ball_dx;
      ball_y = ball_y + ball_dy;
    }
  else{
      fill ('red');
      textSize(40);
      var out = " GAME OVER";
      text(out, 90, 180);
    }
  if (ball_x >= width - ball_radius) {
    ball_dx = -ball_dx;
  }
  if (ball_y >= height - ball_radius) {
    ball_dy = -ball_dy;
    if(!gameOver)lives--;
    if(lives==0){
        gameOver = 1;
    }
    else{
        ball_x = width / 2;
        ball_y = height / 2;
      }
  }
  if (ball_x <= ball_radius) {
    ball_dx = -ball_dx;
  }
  if (ball_y <= ball_radius) {
    ball_dy = -ball_dy;
  }
  if (keyIsDown(LEFT_ARROW)) {
    paddle_x = paddle_x - paddle_dx;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    paddle_x = paddle_x + paddle_dx;
  }
  if (ball_x + ball_radius >= paddle_x && ball_x + ball_radius <= paddle_x + paddle_width && ball_y + ball_radius >= paddle_y) {
    ball_dy = -ball_dy;
  }
  fill('red');
  textSize(18);
  var pointsText = "Score "+ score;
  text(pointsText, 13, 399);
  fill('green');
  textSize(18);
  var live_remain_Text = "Lives "+ lives
  text(live_remain_Text, 335, 399);
}

function checkCollision(){
  for (var c = 0; c < brickColumns; c++) {
  for (var r = 0; r < brickRows; r++) { 
    if (ball_x + ball_radius >= bricks[c][r].x && ball_x + ball_radius <= bricks[c][r].x + brickWidth && ball_y + ball_radius >= bricks[c][r].y && ball_y - ball_radius <= bricks[c][r].y + brickHeight ) {
      if(bricks[c][r].hidden == 0)
        {
          ball_dy = -ball_dy;
          bricks[c][r].hidden = 1;
          score++;
        }
   }
  }
}
}
