export default class inputHandler{
    constructor(pl){
        document.addEventListener('keydown', (event) => {
            switch (event.keyCode){
                case 65:
                    pl.moveLeft();
                    break;
                case 87:
                    pl.moveUp();
                    break;
                case 68:
                    pl.moveRight();
                    break;
                case 83:
                    pl.moveDown();
                    break;
            }
        })

        document.addEventListener('keyup', (event) => {
            switch (event.keyCode){
                case 65:
                    if (pl.speed.x < 0) pl.stopX();
                    break;
                case 87:
                    if (pl.speed.y < 0) pl.stopY();
                    break;
                case 68:
                    if (pl.speed.x > 0) pl.stopX();
                    break;
                case 83:
                    if (pl.speed.y > 0) pl.stopY();
                    break;
            }
        })
    }
}