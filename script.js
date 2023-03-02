const score = document.querySelector('.score');
const start = document.querySelector('.startScreen');
const game = document.querySelector('.gameArea');
// const scoreId = document.querySelector('#score-id');

console.log(gameArea);

startScreen.addEventListener('click', start);

let player = { speed : 5, score : 0 };

let keys ={
    ArrowUp : false,
    ArrowDown : false,
    ArrowLeft : false,
    ArrowRight : false
}

//whenever user PRESS any key this line will help us to know 
document.addEventListener('keydown', keyDown);

//whenever user RELEASE any key this line will help us to know 
document.addEventListener('keyup', keyUp);

// defining function for PRESSING any key
function keyDown(e){ //e is basically used for by default js function
    e.preventDefault(); // preventDefault will help us not to use that by default function 
    keys[e.key] = true;
   // console.log(e.key);
    //console.log(keys);
}

//defining function for RELEASING any key
function keyUp(e){
    e.preventDefault();
    keys[e.key] = false;
    //console.log(e.key);
   // console.log(keys);
}
 
function isCollide(a,b){
    aRect = a.getBoundingClientRect();
    bRect = b.getBoundingClientRect();

    return !((aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) || (aRect.right < bRect.left) || (aRect.left > bRect.right))
}

function moveLines(){
    let lines = document.querySelectorAll('.lines');

    lines.forEach(function(item){

        if(item.y >= 700){
            item.y -= 750
        }

       item.y += player.speed;
       item.style.top = item.y + "px"; 
    })
}

function endgame(){
    player.start = false;
    startScreen.ClassList.remove('hide');
    StartScreen.innerHTML ="Game Over <br> You final score is " + player.score + "  <br> Press here to restart the Game.";
}
 
function moveEnemy(car){
    let enemy= document.querySelectorAll('.enemy');

    enemy.forEach(function(item){

       if(isCollide(car, item)){
        console.log("Boom Hit");
       }

        if(item.y >= 750){
            item.y = -300
            enemyCar.style.left = Math.floor(Math.random() * 350 ) + "px";//Creating Enemy Car at RANDOM position
        }

       item.y += player.speed;
       item.style.top = item.y + "px"; 
    })
}

// Start the Game 

function gamePlay(){
    //console.log("Game Is On");
     let car = document.querySelector('.car');
     let road = gameArea.getBoundingClientRect();// to get the size of the element(road) and positions relative to the viewport

     //console.log(road);


    if(player.start){

    moveLines();
    moveEnemy(car);


        if(keys.ArrowUp && player.y > road.top + 70){
            player.y -= player.speed;
        }
        if(keys.ArrowDown && player.y < (road.bottom - 85 )){
            player.y += player.speed;
        }
        if(keys.ArrowLeft && player.x > 0){
            player.x -= player.speed;
        }
        if(keys.Arrowright && player.x < (road.width - 50) ) {
            player.y += player.speed;
        }

        car.style.top = player.y + "px";
        car.style.left= player.x + "px";

        window.requestAnimationFrame(gamePlay);// this will repeatedly continue the animation of the game part 
        
        console.log(player.score++);

        player.score++;
        let ps = player.score - 1;
        score.innerHTML = "Score: " + ps;
    } 
}

function start(){
    // gameArea.classList.remove('hide');
    startScreen.classList.add('hide');
    gameArea.innerHTML = "";
    player.start = true;
    player.score = 0;
    window.requestAnimationFrame(gamePlay);
    

    // Creating road Lines
    for(x=0; x<5; x++){
        let roadLine = document.createElement('div');
        roadLine.setAttribute('class', 'lines');
        roadLine.y = (x*150);
        roadLine.style.top =(x*150) + "px";
        gameArea.appendChild(roadLine);
    }


    let car = document.createElement('div');// creating a div(car) into the gameArea div
    car.setAttributeNS('class','car');
  //  car.innerText ="Hey, This is your Car";
    gameArea.appendChild(car);// adding a div(car) into the gameArea div

 player.x = car.offsetLeft;
 player.y = car.offsetTop;

    //what is the position of car
   // console.log("top position " +car.offsetTop);
    //console.log("left position " +car.offsetLeft);

    // Creating Enemy Car
    for(x=0; x<3; x++){
        let enemyCar = document.createElement('div');
        enemyCar.setAttribute('class', 'enemy');
        enemyCar.y = ((x+1) * 350) * -1;
        enemyCar.style.top =(x*150) + "px";
        enemyCar.style.backgroundColor= randomColor();
        enemyCar.style.left = Math.floor(Math.random() * 350 ) + "px";//Creating Enemy Car at RANDOM position
        gameArea.appendChild(enemyCar);
    }

}
function randomColor(){
    function c(){
        let hex = Math.floor(Math.random() * 256).toString(16);
        return ("0" + String(hex)).substr(-2);
    
    }
    return "#"+c()+c()+c();
}