export default class Player{
    constructor(GAME_HEIGHT,GAME_WIDTH){
        this.gameWidth = GAME_WIDTH;
        this.gameHeight = GAME_HEIGHT;
        this.aniIndex = 0;
        this.playerSize = 64;
        this.position = {
            x: GAME_WIDTH/2 - this.playerSize/2,
            y: GAME_HEIGHT/2 - this.playerSize/2
        }

        this.plCurrentImg = document.getElementById("s_PlayerFront");

        this.speed = {
            x: 0,
            y: 0
        }
        this.maxSpeed = 50;

        this.aMov = {
            a: false,
            w: false,
            d: false,
            s: false
        }
        this.AnimationRight = this.loadAni("s_PlayerWalkRight");
        this.AnimationLeft = this.loadAni("s_PlayerWalkingLeft");
        this.AnimationUp = this.loadAni("s_PlayerWalkingUp");
        this.AnimationDown = this.loadAni("s_PlayerWalkingDown");
    }

    update(deltaTime){
        this.position.x += this.speed.x / deltaTime;
        this.position.y += this.speed.y / deltaTime;

        //check border
        if (this.position.x < 0) this.position.x = 0;
        if (this.position.x + this.playerSize > this.gameWidth) this.position.x = this.gameWidth - this.playerSize;
        if (this.position.y < 0) this.position.y = 0;
        if (this.position.y + this.playerSize > this.gameHeight) this.position.y = this.gameHeight - this.playerSize;

        //check direction
        if (this.speed.y > 0 && this.speed.x == 0){
            this.plCurrentImg = this.AnimationDown[this.aniIndex];
        }
        else if (this.speed.y < 0 && this.speed.x == 0){
            this.plCurrentImg = this.AnimationUp[this.aniIndex];
        }
        this.checkXAni();
    }

    //override direction
    checkXAni(){
        if (this.speed.x > 0){
            this.plCurrentImg = this.AnimationRight[this.aniIndex];
        }
        else if (this.speed.x < 0){
            this.plCurrentImg = this.AnimationLeft[this.aniIndex];
        }
    }
    //check aniIndex limit
    checkAniIndex(){
        if (this.aniIndex > 5) this.aniIndex = 0;
    }

    draw(ctx){
        ctx.drawImage(this.plCurrentImg,this.position.x,this.position.y,this.playerSize,this.playerSize);
    }

    moveLeft(){
            this.speed.x = -this.maxSpeed;
            if (!this.aMov.a){
                this.aniIndex += 1;
                this.checkAniIndex();
                setTimeout(() => {
                    this.aniIndex += 1;
                    this.checkAniIndex();
                }, 50);
                this.lInter = setInterval(() => {
                    this.aMov.a = true;
                    this.aniIndex += 1;
                    this.checkAniIndex();
                }, 100);
            }
        }
    moveRight(){
            this.speed.x = this.maxSpeed;
            if (!this.aMov.d){
                this.aniIndex += 1;
                this.checkAniIndex();
                setTimeout(() => {
                    this.aniIndex += 1;
                    this.checkAniIndex();
                }, 50);
                this.rInter = setInterval(() => {
                    this.aMov.d = true;
                    this.aniIndex += 1;
                    this.checkAniIndex();
                }, 100);
            }
        }
    moveUp(){
            this.speed.y = -this.maxSpeed;
            if (!this.aMov.w){
                this.aniIndex += 1;
                this.checkAniIndex();
                setTimeout(() => {
                    this.aniIndex += 1;
                    this.checkAniIndex();
                }, 50);
                this.uInter = setInterval(() => {
                    this.aMov.w = true;
                    this.aniIndex += 1;
                    this.checkAniIndex();
                }, 100);
            }
        }
    moveDown(){
            this.speed.y = this.maxSpeed;
            if (!this.aMov.s){
                this.aniIndex += 1;
                this.checkAniIndex();
                setTimeout(() => {
                    this.aniIndex += 1;
                    this.checkAniIndex();
                }, 50);
                this.sInter = setInterval(() => {
                    this.aMov.s = true;
                    this.aniIndex += 1;
                    this.checkAniIndex();
                }, 100);
            }
        }

    stopX(){
            if (this.speed.x > 0){
                this.plCurrentImg = document.getElementById("s_PlayerRight");
            }
            else this.plCurrentImg = document.getElementById("s_PlayerLeft");
            this.speed.x = 0;
            this.aniIndex = 0;
            clearInterval(this.rInter);
            clearInterval(this.lInter);
            this.aMov.d = false;
            this.aMov.a = false;
        }
    stopY(){
            if (this.speed.y > 0){
                this.plCurrentImg = document.getElementById("s_PlayerFront");
            }
            else this.plCurrentImg = document.getElementById("s_PlayerBack");
            this.speed.y = 0;
            this.aniIndex = 0;
            clearInterval(this.uInter);
            clearInterval(this.sInter);
            this.aMov.w = false;
            this.aMov.s = false;
        }

    //loadAni
    loadAni(idBase){
        let tmpArray = [];
        for (let i=0; i<6; i+=1){
            let y=i+1;
            let tmpId = idBase + y.toString();
            tmpArray[i] = document.getElementById(tmpId);
        }

        return tmpArray;
    }
}