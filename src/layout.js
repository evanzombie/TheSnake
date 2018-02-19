import Snake from './snake';

const cvs = document.getElementById('canvas');
const ctx = cvs.getContext('2d');

const fruitImg = new Image();
fruitImg.src = 'img/fruit.png';

// Game Settings
let settings = {
    fruitColor: 'red',
    snakeColor: 'black',
    sideSize: 500,
    unitSize: 10,
    snakeLength: 10,
    startX: 10,
    startY: 10,
    score: 0,
    timeInterval: 100 //ms
};
let direction;

//Set Canvas Size
cvs.width = cvs.height = settings.sideSize;

//Set Score
let scoreID = document.getElementById('scoreID');
scoreID.innerHTML = settings.score;

//Recet
let reset = () => {
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    clearInterval();
};

// Create Snake
let snakeArr = [];
snakeArr[0] = {
    x: settings.startX,
    y: settings.startY
};

let snakeSetup = (x, y) => {
    for (let i = settings.snakeLength * 2; i >= 0; i--) {
        snakeArr.push({ x: 10, y: i });
    }
};

let createSnake = () => {
    // snakeSetup();

    for (let i = 0; i < snakeArr.length; i++) {
        ctx.fillStyle = settings.snakeColor;
        ctx.fillRect(snakeArr[i].x, snakeArr[i].y, settings.snakeLength, settings.snakeLength);
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
let paint = () => {
    ctx.fillStyle = '#fcd9d1';
    ctx.fillRect(0, 0, settings.sideSize, settings.sideSize);

    createSnake();
    createFruit();
    //Head Start Position
    let headX = snakeArr[0].x;
    let headY = snakeArr[0].y;

    //Direction
    switch (direction) {
        case 'left':
            headX -= settings.unitSize;
            console.log(headX);

            break;

        case 'up':
            headY -= settings.unitSize;
            console.log(headY);
            break;

        case 'right':
            headX += settings.unitSize;
            console.log(headX);
            break;

        case 'down':
            headY += settings.unitSize;
            console.log(headY);
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
        // score + 1
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

let move = () => {
    document.addEventListener('keydown', turn);
};

let turn = e => {
    let key = e.keyCode;

    switch (key) {
        case 37:
            if (direction != 'right') {
                direction = 'left';
                console.log(direction);
                return direction;
            }
            break;
        case 38:
            if (direction != 'down') {
                direction = 'up';
                console.log(direction);
                return direction;
            }
            break;
        case 39:
            if (direction != 'left') {
                direction = 'right';
                console.log(direction);
                return direction;
            }
            break;
        case 40:
            if (direction != 'up') {
                direction = 'down';
                console.log(direction);
                return direction;
            }
            break;
    }
};
move();
export default { snakeArr, createSnake, createFruit, scoreID, paint, settings, gameStart };
