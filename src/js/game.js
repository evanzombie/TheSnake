import Layout from './layout';
import Snake from './snake';
import Settings from './settings';

const show = document.getElementById('startBtn');
const cover = document.getElementById('coverID');

let showResult = () => {
    if (cover.classList.contains('hide')) {
        console.log('yes');
        cover.classList.remove('hide');
    } else {
        console.log('no');
        cover.classList.add('hide');
    }
};

let gameSpeed = Settings.timeInterval;
//Turn the snake
let turn = e => {
    let key = e.keyCode;

    switch (key) {
        case 37:
            if (d != 'right') {
                d = 'left';
                return d;
            }
            break;
        case 38:
            if (d != 'down') {
                d = 'up';
                return d;
            }
            break;
        case 39:
            if (d != 'left') {
                d = 'right';
                return d;
            }
            break;
        case 40:
            if (d != 'up') {
                d = 'down';
                return d;
            }
            break;
    }
};
//Snake Key Control
let d = Settings.direction;
let paint = () => {
    Layout.ctx.fillStyle = '#fcd9d1';
    Layout.ctx.fillRect(0, 0, Settings.sideSize, Settings.sideSize);

    Snake.createSnake();
    // createFruit();
    Layout.ctx.drawImage(Layout.fruitImg, Layout.fruit.x, Layout.fruit.y);

    //Head Start Position
    let headX = Snake.snakeArr[0].x;
    let headY = Snake.snakeArr[0].y;

    //Lose Game
    if (
        headX == -Settings.unitSize ||
        headY == -Settings.unitSize ||
        headX == Settings.sideSize ||
        headY == Settings.sideSize ||
        Snake.bitten(headX, headY, Snake.snakeArr)
    ) {
        reset();
        showResult();
        console.log('Game over... Your score is ' + Settings.score);
        return;
    }

    //Direction
    switch (d) {
        case 'left':
            headX -= Settings.unitSize;
            break;

        case 'up':
            headY -= Settings.unitSize;
            break;

        case 'right':
            headX += Settings.unitSize;
            break;

        case 'down':
            headY += Settings.unitSize;
            break;
    }

    // Eat Fruit
    if (headX == Layout.fruit.x && headY == Layout.fruit.y) {
        let tail = { x: headX, y: headY };
        //Score + 1
        scoreID.innerHTML = ++Settings.score;

        //Create New Fruit
        Layout.fruit.x = Math.floor(Math.random() * (Settings.sideSize / Settings.unitSize)) * Settings.unitSize;
        Layout.fruit.y = Math.floor(Math.random() * (Settings.sideSize / Settings.unitSize)) * Settings.unitSize;
        Layout.createFruit();
        Layout.pickFruit(Settings.fruitImage);
        Layout.ctx.drawImage(Layout.fruitImg, Layout.fruit.x, Layout.fruit.y);

        //Add Tail
        Snake.snakeArr.unshift(tail);
    } else {
        //Add Tail
        let tail = Snake.snakeArr.pop();
        tail.x = headX;
        tail.y = headY;
        Snake.snakeArr.unshift(tail);
    }
};

//Start Game Interval
let gameStart = setInterval(paint, gameSpeed);

let startGame = () => {
    document.addEventListener('keydown', turn);
};

//Recet Game
let reset = () => {
    clearInterval(gameStart);
    Layout.ctx.clearRect(0, 0, Settings.sideSize, Settings.sideSize);
};

export default { startGame, showResult };
