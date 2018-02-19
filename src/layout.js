import Snake from './snake';

const cvs = document.getElementById('canvas');
const ctx = cvs.getContext('2d');
const startBtn = document.getElementById('startBtn');

const fruitImg = new Image();
fruitImg.src = 'img/fruit.png';

// Game Settings
let settings = {
    fruitColor: '#B67766',
    snakeColor: '#ffefeb',
    sideSize: 500,
    unitSize: 10,
    snakeLength: 10,
    startX: 10,
    startY: 10,
    score: 0,
    timeInterval: 80, //ms,
    direction: ''
};

//Set Canvas Size
cvs.width = cvs.height = settings.sideSize;

//Set Score
let scoreID = document.getElementById('scoreID');
scoreID.innerHTML = settings.score;

//Recet
let reset = () => {
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    // clearInterval();
};

// Create Snake
let snakeArr = [];
snakeArr[0] = {
    x: settings.startX,
    y: settings.startY
};

let snakeSetup = (x, y) => {
    for (let i = settings.snakeLength * 5; i >= 0; i = i - settings.snakeLength) {
        snakeArr.push({ x: settings.startX, y: i });
    }
    console.log(snakeArr.length);
};

let createSnake = () => {
    for (let i = 0; i < snakeArr.length; i++) {
        ctx.fillStyle = settings.snakeColor;
        ctx.fillRect(snakeArr[i].x, snakeArr[i].y, settings.snakeLength, settings.snakeLength);
        ctx.strokeStyle = 'white';
        ctx.strokeRect(snakeArr[i].x, snakeArr[i].y, settings.snakeLength, settings.snakeLength);
    }
};

//Create Fruit
let fruit = {
    x: Math.floor(Math.random() * (settings.sideSize / settings.unitSize)) * settings.unitSize,
    y: Math.floor(Math.random() * (settings.sideSize / settings.unitSize)) * settings.unitSize
};

// let fruitSetup = (x, y) => {
//     // ctx.drawImage(fruitImg, 90, 90);
//     ctx.fillStyle = settings.fruitColor;
//     ctx.fillRect(x * settings.snakeLength, y * settings.snakeLength, settings.snakeLength, settings.snakeLength);
// };

let createFruit = () => {
    ctx.fillStyle = settings.fruitColor;
    ctx.fillRect(fruit.x, fruit.y, settings.unitSize, settings.unitSize);
    // ctx.beginPath();
    // ctx.arc(fruit.x + settings., fruit.y,)

    for (let i = 0; i > settings.snakelength; i++) {
        let snakeX = snakeArr[i].x;
        let snakeY = snakeArr[i].y;

        console.log(snakeX);

        if (fruit.x === snakeX && fruit.y === snakeY) {
            alert('same!!');

            fruit.x = Math.floor(Math.random() * (settings.sideSize / settings.unitSize)) * settings.unitSize;
            fruit.y = Math.floor(Math.random() * (settings.sideSize / settings.unitSize)) * settings.unitSize;

            ctx.fillStyle = settings.fruitColor;
            ctx.fillRect(fruit.x, fruit.y, settings.unitSize, settings.unitSize);
        }
    }
};

//Snake Key Control
let d = settings.direction;
let paint = () => {
    ctx.fillStyle = '#fcd9d1';
    ctx.fillRect(0, 0, settings.sideSize, settings.sideSize);

    createSnake();
    createFruit();
    //Head Start Position
    let headX = snakeArr[0].x;
    let headY = snakeArr[0].y;

    //Direction
    switch (d) {
        case 'left':
            headX -= settings.unitSize;
            break;

        case 'up':
            headY -= settings.unitSize;
            break;

        case 'right':
            headX += settings.unitSize;
            break;

        case 'down':
            headY += settings.unitSize;
            break;
    }

    //Lose Game
    if (
        headX < -10 ||
        headY < -10 ||
        headX > settings.sideSize ||
        headY > settings.sideSize ||
        Snake.bitten(headX, headY, snakeArr + 1)
    ) {
        reset();
        gameStop();
        alert('Game over... Your score is ' + settings.score);
        return;
    }

    // Eat Fruit
    if (headX == fruit.x && headY == fruit.y) {
        let tail = { x: headX, y: headY };
        //Score + 1
        scoreID.innerHTML = ++settings.score;
        //Create New Fruit
        fruit.x = Math.floor(Math.random() * (settings.sideSize / settings.unitSize)) * settings.unitSize;
        fruit.y = Math.floor(Math.random() * (settings.sideSize / settings.unitSize)) * settings.unitSize;
        createFruit();
        //Add Tail
        snakeArr.unshift(tail);
    } else {
        //Add Tail
        let tail = snakeArr.pop();
        tail.x = headX;
        tail.y = headY;
        snakeArr.unshift(tail);
    }
};

let gameStart = setInterval(paint, settings.timeInterval);
let gameStop = () => {
    clearInterval(gameStart);
};

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

let startGame = () => {
    startBtn.addEventListener('click', reStart);
    document.addEventListener('keydown', turn);
};

// let startGame = () => {
//     setupControl();
// };

let reStart = () => {
    // alert('??');
    // reset();

    // d = 'down';
    paint();
};

export default {
    snakeArr,
    createSnake,
    createFruit,
    scoreID,
    paint,
    settings,
    gameStart,
    snakeSetup,
    turn,
    startGame
};
