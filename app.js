const score = document.querySelector(".score");
const startScreen = document.querySelector(".startScreen");
const gameArea = document.querySelector(".gameArea");

let player = {
    speed:5,score:0
};

function colorChange(){
    var playerCar = document.querySelector(".car")

    if(document.getElementById("green").checked){
        playerCar.style.backgroundColor ='lime';
    }else if(document.getElementById("blue").checked){
        playerCar.style.backgroundColor = 'blue'; 
    }else if(document.getElementById("yellow").checked){
        playerCar.style.backgroundColor = 'yellow';
    }else if(document.getElementById("pink").checked){
        playerCar.style.backgroundColor = '#ED069E';
    }
}

window.addEventListener("keydown",function(e){
    var a = e.key
    
    if(a==1 || a=='a'){
        document.getElementById("easy").checked = true;
        player.speed = 5;
    }else if(a==2 || a=='w'){
        document.getElementById("medium").checked = true;
        player.speed = 10;
    }else if(a==3 || a=='d'){
        document.getElementById("difficult").checked = true;
        player.speed = 15;
    }else if(a==4 || a=='s'){
        document.getElementById("impossible").checked = true;
        player.speed = 25;
    }else{
        return 0;
    }

})

function levelChange(){
    if(document.getElementById("medium").checked){
        player.speed = 10;
    }else if(document.getElementById("difficult").checked){
        player.speed = 15;
    }else if(document.getElementById("impossible").checked){
        player.speed = 25;
    }else{
        player.speed = 5;
    }
}



let keys={
    ArrowUp:false,
    ArrowDown:false,
    ArrowLeft:false,
    ArrowRight:false
};

startScreen.addEventListener("click",start);

document.addEventListener("keydown",pressOn);
document.addEventListener("keyup",pressOff);

function moveLines(){

    let lines = document.querySelectorAll(".line");
    lines.forEach(function(item){

          if(item.y >= 1500){
              item.y-=1500;
          }
          item.y += player.speed;
          item.style.top = item.y + "px";        

    })  
    
}


function isCollide(a,b){

    let aRect = a.getBoundingClientRect();
    let bRect = b.getBoundingClientRect();

    return !(
        (aRect.bottom < bRect.top) ||
        (aRect.top > bRect.bottom) ||
        (aRect.right < bRect.left) ||
        (aRect.left > bRect.right)
    )

}

function moveEnemy(car){

    let ele = document.querySelectorAll(".enemy");
    ele.forEach(function(item){

        if(isCollide(car,item)){
            endGame();
        }

          if(item.y >= 1500){
              item.y = -600;
              item.style.left = Math.floor(Math.random()*350) + "px";
          }
          item.y += player.speed;
          item.style.top = item.y + "px";        

    })
    
}

function playGame(){

    let car = document.querySelector(".car");

    moveLines();
    moveEnemy(car);

    let road = gameArea.getBoundingClientRect();

    if(player.start){

       if(keys.ArrowUp && player.y > road.top)
         {
             player.y -= player.speed; 
         }
       if(keys.ArrowDown && player.y < road.bottom)
         { 
             player.y += player.speed; 
         }
       if(keys.ArrowLeft && player.x > 0)
         { 
           player.x -= player.speed; 
         }
       if(keys.ArrowRight && player.x < (road.width-50))
         { 
           player.x += player.speed; 
         }

       car.style.left = player.x + 'px';
       car.style.top = player.y + 'px';

       window.requestAnimationFrame(playGame);

       player.score++;
       score.innerText = "Score: "+player.score;

    } 

}

function pressOn(e){

    e.preventDefault(); //to disable default function of arrowkeys
    keys[e.key] = true; //to know which key is pressed

}

function pressOff(e){

    e.preventDefault();
    keys[e.key] = false; //to assign keys default value back after releasing arrow keys

}

function endGame(){

     player.start = false;
     score.innerHTML = "Game Over<br>Score was " + player.score;
     startScreen.classList.remove("hide");

}

function start(){

    startScreen.classList.add("hide");
    /* gameArea.classList.remove("hide"); */
    gameArea.innerHTML="";

    player.start = true;
    player.score = 0;

    document.getElementById("easy").checked = true;//to make gear to 1 when restarting game
    player.speed = 5;



    for(let x=0;x<10;x++){
        let div = document.createElement("div");
        div.classList.add("line");
        div.y = x * 150;
        div.style.top = (x*150) + "px";
        gameArea.appendChild(div);
    }

    window.requestAnimationFrame(playGame);

    let car = document.createElement("div"); //creating a div inside gameArea div
    // car.innerText = "Car";
    car.setAttribute("class","car"); //adding class car to car div bcz car div has no other classes
    gameArea.appendChild(car);

    player.x = car.offsetLeft;
    player.y = car.offsetTop;

    colorChange(); //to change color of car    
    
    for(let x=0;x<3;x++){
        let enemy = document.createElement("div");
        enemy.classList.add("enemy");
        enemy.y = ((x+1)*600)*-1;
        enemy.style.top = enemy.y + "px";
        enemy.style.left = Math.floor(Math.random()*350) + "px";
        enemy.style.backgroundColor="red";
        gameArea.appendChild(enemy);
    }

}

