var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();

// Звук
var fly = new Audio();
var scoreAudio = new Audio();

fly.src = "Audio/fly.mp3"
scoreAudio.src = "Audio/score.mp3"

bird.src = "img/bird.png";
bg.src = "img/bg.png";
fg.src = "img/fg.png";
pipeUp.src = "img/pipeUp.png";
pipeBottom.src = "img/pipeBottom.png";

var gap = 105;
var score = 0;
// При нажатии на кнопку
document.onkeydown = function checkcode(event){
  if(event.keyCode == 38) moveUp();
  if(event.keyCode ==40) moveDown();
}

function moveUp() {
  yPos -=25;
  fly.play();
}
function moveDown() {
  yPos +=20;
  fly.play();
}

// Создание блоков
var pipe = [];
pipe[0] = {
  x : cvs.width,
  y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
}
// Позиция птички
var xPos = 10;
var yPos = Math.floor(Math.random()*150)+100;
var grav = 1.2;

function draw() {
  ctx.drawImage(bg, 0, 0);

  for(var i = 0; i<pipe.length; i++){
    ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
    ctx.drawImage(pipeBottom, pipe[i].x , pipe[i].y + pipeUp.height + gap);

    pipe[i].x--;

    if(pipe[i].x == 125){
      pipe.push({
        x : cvs.width,
        y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
      });
    }

    if(xPos + bird.width >= pipe[i].x && xPos <=pipe[i].x + pipeUp.width &&
    (yPos <=pipe[i].y + pipeUp.height
     || yPos + bird.height >= pipe[i].y+pipeUp.height+gap) ||  yPos + bird.height >= cvs.height - fg.height) {
       location.reload();  // Перезагрузка страницы
     }

     if(pipe[i].x == 5){
       score++;
       scoreAudio.play();
     }
     if(score == 1){
       ctx.fillText("Вау, ты валишь", 50, cvs.height - cvs.height/2);
     }
     if(score == 2){
       ctx.fillText("Жозкий!!!!", 50, cvs.height - cvs.height/2);
     }
     if(score > 2){
       ctx.fillText("Шучу, ты конч))0)", 50, cvs.height - cvs.height/2);
     }

  }
  ctx.drawImage(fg, 0, cvs.height - fg.height);
  ctx.drawImage(bird, xPos, yPos);

  ctx.fillStyle = "#000";
  ctx.font = "24px Verdana";
  ctx.fillText("Счёт: " + score, 10, cvs.height -20);
  yPos += grav;
  requestAnimationFrame(draw);
}

setTimeout(draw, 2000);
setTimeout(closeWindow, 2000);

function closeWindow() {
    document.getElementById("startingWindow").style.display = "none";
}
