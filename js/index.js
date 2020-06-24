let canv = document.getElementById("gameScreen");;
let ctx = canv.getContext("2d");
let GAME_HEIGHT = canv.clientHeight;
let GAME_WIDTH = canv.clientWidth;
let lastTime = 0;
let backTile = document.getElementById("m_Path_Cross");
let grassTile = document.getElementById("m_Grass");

let mapIndex = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0],
    [0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1],
    [0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0],
    [0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0],
    [0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
]

import Player from "./player.js";
import inputHandler from "./input.js";

let MyPlayer = new Player(GAME_HEIGHT,GAME_WIDTH);
new inputHandler(MyPlayer);

window.onload = function(){
    let screenW = document.getElementById("body").clientWidth;
    let marg = screenW/2 - canv.clientWidth/2;
    canv.style.marginLeft = marg + "px";
}

function gameLoop(timestamp){
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    ctx.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT);
    drawTiles(mapIndex);

    MyPlayer.update(deltaTime);
    MyPlayer.draw(ctx);
    requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);

function drawTiles(tmpArray){
    for (let i=0; i < 10; i = i + 1){
        let tmpArray2 = tmpArray[i];
        for (let j=0; j < 20; j = j + 1){
            if (tmpArray2[j] == 0){
                ctx.drawImage(grassTile,j*64,i*64,64,64);
            }
            else{
                ctx.drawImage(backTile,j*64,i*64,64,64);
            }
        }
    }
}