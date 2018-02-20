import Snake from './snake';
import Settings from './settings';

const cvs = document.getElementById('canvas');
const ctx = cvs.getContext('2d');

//Layout Canvas Size
cvs.width = cvs.height = Settings.sideSize;

//Layout Score
let scoreID = document.getElementById('scoreID');
scoreID.innerHTML = Settings.score;

//Layout Snake
Snake.snakeSetup();

//Layout Fruit
const fruitImg = new Image();
const fruitArr = Settings.fruitImage;

let pickFruit = fruitArr => {
    let random = Math.floor(Math.random() * fruitArr.length);
    fruitImg.src = 'src/img/' + random + '.png';
};

pickFruit(Settings.fruitImage);

let fruit = {
    x: Math.floor(Math.random() * (Settings.sideSize / Settings.unitSize)) * Settings.unitSize,
    y: Math.floor(Math.random() * (Settings.sideSize / Settings.unitSize)) * Settings.unitSize
};

//If fruit is on snake, recreate fruit
let createFruit = () => {
    for (let i = 0; i < Snake.snakeArr.length; i++) {
        let snakeX = Snake.snakeArr[i].x;
        let snakeY = Snake.snakeArr[i].y;

        if (fruit.x === snakeX && fruit.y === snakeY) {
            fruit.x = Math.floor(Math.random() * (Settings.sideSize / Settings.unitSize)) * Settings.unitSize;
            fruit.y = Math.floor(Math.random() * (Settings.sideSize / Settings.unitSize)) * Settings.unitSize;
        }
    }
};

export default {
    createFruit,
    scoreID,
    Settings,
    pickFruit,
    ctx,
    fruitImg,
    fruit
};
