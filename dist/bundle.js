/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _snake = __webpack_require__(1);

var _snake2 = _interopRequireDefault(_snake);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cvs = document.getElementById('canvas');
var ctx = cvs.getContext('2d');
var startBtn = document.getElementById('startBtn');

var fruitImg = new Image();
fruitImg.src = 'img/fruit.png';

// Game Settings
var settings = {
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
var scoreID = document.getElementById('scoreID');
scoreID.innerHTML = settings.score;

//Recet
var reset = function reset() {
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    // clearInterval();
};

// Create Snake
var snakeArr = [];
snakeArr[0] = {
    x: settings.startX,
    y: settings.startY
};

var snakeSetup = function snakeSetup(x, y) {
    for (var i = settings.snakeLength * 5; i >= 0; i = i - settings.snakeLength) {
        snakeArr.push({ x: settings.startX, y: i });
    }
    console.log(snakeArr.length);
};

var createSnake = function createSnake() {
    for (var i = 0; i < snakeArr.length; i++) {
        ctx.fillStyle = settings.snakeColor;
        ctx.fillRect(snakeArr[i].x, snakeArr[i].y, settings.snakeLength, settings.snakeLength);
        ctx.strokeStyle = 'white';
        ctx.strokeRect(snakeArr[i].x, snakeArr[i].y, settings.snakeLength, settings.snakeLength);
    }
};

//Create Fruit
var fruit = {
    x: Math.floor(Math.random() * (settings.sideSize / settings.unitSize)) * settings.unitSize,
    y: Math.floor(Math.random() * (settings.sideSize / settings.unitSize)) * settings.unitSize
};

// let fruitSetup = (x, y) => {
//     // ctx.drawImage(fruitImg, 90, 90);
//     ctx.fillStyle = settings.fruitColor;
//     ctx.fillRect(x * settings.snakeLength, y * settings.snakeLength, settings.snakeLength, settings.snakeLength);
// };

var createFruit = function createFruit() {
    ctx.fillStyle = settings.fruitColor;
    ctx.fillRect(fruit.x, fruit.y, settings.unitSize, settings.unitSize);
    // ctx.beginPath();
    // ctx.arc(fruit.x + settings., fruit.y,)

    for (var i = 0; i > settings.snakelength; i++) {
        var snakeX = snakeArr[i].x;
        var snakeY = snakeArr[i].y;

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
var d = settings.direction;
var paint = function paint() {
    ctx.fillStyle = '#fcd9d1';
    ctx.fillRect(0, 0, settings.sideSize, settings.sideSize);

    createSnake();
    createFruit();
    //Head Start Position
    var headX = snakeArr[0].x;
    var headY = snakeArr[0].y;

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
    if (headX < -10 || headY < -10 || headX > settings.sideSize || headY > settings.sideSize || _snake2.default.bitten(headX, headY, snakeArr + 1)) {
        reset();
        gameStop();
        alert('Game over... Your score is ' + settings.score);
        return;
    }

    // Eat Fruit
    if (headX == fruit.x && headY == fruit.y) {
        var tail = { x: headX, y: headY };
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
        var _tail = snakeArr.pop();
        _tail.x = headX;
        _tail.y = headY;
        snakeArr.unshift(_tail);
    }
};

var gameStart = setInterval(paint, settings.timeInterval);
var gameStop = function gameStop() {
    clearInterval(gameStart);
};

var turn = function turn(e) {
    var key = e.keyCode;

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

var startGame = function startGame() {
    startBtn.addEventListener('click', reStart);
    document.addEventListener('keydown', turn);
};

// let startGame = () => {
//     setupControl();
// };

var reStart = function reStart() {
    // alert('??');
    // reset();

    // d = 'down';
    paint();
};

exports.default = {
    snakeArr: snakeArr,
    createSnake: createSnake,
    createFruit: createFruit,
    scoreID: scoreID,
    paint: paint,
    settings: settings,
    gameStart: gameStart,
    snakeSetup: snakeSetup,
    turn: turn,
    startGame: startGame
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _layout = __webpack_require__(0);

var _layout2 = _interopRequireDefault(_layout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var direction = void 0;

// let move = () => {
// 	document.addEventListener('keydown', turn);
// };

var turn = function turn(e) {
	var key = e.keyCode;

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

var bitten = function bitten(x, y, arr) {
	for (var i = 0; i < arr.length; i++) {
		if (arr[i].x === x && arr[i].y === y) {
			return true;
		} else {
			return false;
		}
	}
};

exports.default = { turn: turn, direction: direction, bitten: bitten };

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _layout = __webpack_require__(0);

var _layout2 = _interopRequireDefault(_layout);

var _snake = __webpack_require__(1);

var _snake2 = _interopRequireDefault(_snake);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const startBtn = document.getElementById('startBtn');
// startBtn.addEventListener('click', startGame);

var init = function init() {
	_layout2.default.startGame();
};

init();

/***/ })
/******/ ]);