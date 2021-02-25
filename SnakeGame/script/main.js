let screen = document.getElementById('Screen'),
  ctx = screen.getContext('2d'),
  grid = 16,
  count = 0,
  vel = 12;

const initialStats = {x:160,y:160,dx:grid,dy:0,com:[],comMax:4};
const snake = initialStats;
const apple  = {x:320,y:320};

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

function refresh() {
  requestAnimationFrame(refresh);
  if (++count < vel) {
    return;
  };
  count = 0;
  ctx.clearRect(0,0,screen.width,screen.height);
  snake.x += snake.dx;
  snake.y += snake.dy;
  if(snake.x < 0){
  	snake.x = screen.width - grid;
  };
  if (snake.x >= screen.width) {
  	snake.x = 0;
  };
  if (snake.y < 0) {
  	snake.y = screen.height - grid;
  };
  if (snake.y >= screen.height) {
  	snake.y = 0;
  };
  snake.com.unshift({x1:snake.x,y1:snake.y})
  if (snake.com.length > snake.comMax) {
  	snake.com.pop();
  };

  ctx.fillStyle = 'red';
  ctx.fillRect(apple.x,apple.y,grid -1,grid -1);

  ctx.fillStyle = 'white';
  snake.com.forEach(function(com, index){
   ctx.fillRect(com.x1,com.y1,grid -1, grid -1);
    if (com.x1 == apple.x && com.y1 == apple.y) {
      vel -= 0.2;
      snake.comMax += 1;
      apple.x = apple.y = getRandomInt(0, 25)*grid;
    };
    for(let i = index + 1, maxLength = snake.com.length; i < maxLength; i += 1) {
      if (com.x1 == snake.com[i].x1 && com.y1 == snake.com[i].y1) {
        snake.x = snake.y = 160
        snake.com = []
        snake.comMax = 4
        snake.dx = grid
        snake.dy = 0
        vel = 12;
      };
    };
  });
};

document.addEventListener('keydown', (event) => {
 // Tecla 'A', Esquerda
  if (event.which === 65 && snake.dx === 0) {
    snake.dx = -grid;
    snake.dy = 0;
  };
 // Tecla 'W', Cima
  if (event.which === 87 && snake.dy === 0) {
    snake.dy = -grid;
    snake.dx = 0;
  };
 // Tecla 'D', Direita
  if (event.which === 68 && snake.dx === 0) {
    snake.dx = grid;
    snake.dy = 0;
  };
 // Tecla 'S', Baixo
  if (event.which === 83 && snake.dy === 0) {
    snake.dy = grid;
    snake.dx = 0;
  }
});

requestAnimationFrame(refresh);
