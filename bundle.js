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

var _settings = __webpack_require__(3);

var _settings2 = _interopRequireDefault(_settings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cvs = document.getElementById('canvas');
var ctx = cvs.getContext('2d');

//Layout Canvas Size
cvs.width = cvs.height = _settings2.default.sideSize;

//Layout Score
var scoreID = document.getElementById('scoreID');
scoreID.innerHTML = _settings2.default.score;

//Layout Snake
_snake2.default.snakeSetup();

//Layout Fruit
var fruitImg = new Image();
var fruitArr = _settings2.default.fruitImage;

var pickFruit = function pickFruit(fruitArr) {
    var random = Math.floor(Math.random() * fruitArr.length);
    fruitImg.src = 'src/img/' + random + '.png';
};

pickFruit(_settings2.default.fruitImage);

var fruit = {
    x: Math.floor(Math.random() * (_settings2.default.sideSize / _settings2.default.unitSize)) * _settings2.default.unitSize,
    y: Math.floor(Math.random() * (_settings2.default.sideSize / _settings2.default.unitSize)) * _settings2.default.unitSize
};

//If fruit is on snake, recreate fruit
var createFruit = function createFruit() {
    for (var i = 0; i < _snake2.default.snakeArr.length; i++) {
        var snakeX = _snake2.default.snakeArr[i].x;
        var snakeY = _snake2.default.snakeArr[i].y;

        if (fruit.x === snakeX && fruit.y === snakeY) {
            fruit.x = Math.floor(Math.random() * (_settings2.default.sideSize / _settings2.default.unitSize)) * _settings2.default.unitSize;
            fruit.y = Math.floor(Math.random() * (_settings2.default.sideSize / _settings2.default.unitSize)) * _settings2.default.unitSize;
        }
    }
};

exports.default = {
    createFruit: createFruit,
    scoreID: scoreID,
    Settings: _settings2.default,
    pickFruit: pickFruit,
    ctx: ctx,
    fruitImg: fruitImg,
    fruit: fruit
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

var _settings = __webpack_require__(3);

var _settings2 = _interopRequireDefault(_settings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Create Snake
var snakeArr = [];
snakeArr[0] = {
	x: _settings2.default.startX * 5,
	y: _settings2.default.startY * 5
};
//Set snake length
var snakeSetup = function snakeSetup(x, y) {
	for (var i = _settings2.default.unitSize * 3; i > 0; i = i - _settings2.default.unitSize) {
		snakeArr.push({ x: _settings2.default.startX * 5, y: _settings2.default.startY * i });
	}
	return snakeArr;
};
//Draw snake
var createSnake = function createSnake() {
	for (var i = 0; i < snakeArr.length; i++) {
		_layout2.default.ctx.fillStyle = _settings2.default.snakeColor;
		_layout2.default.ctx.fillRect(snakeArr[i].x, snakeArr[i].y, _settings2.default.unitSize, _settings2.default.unitSize);
		_layout2.default.ctx.strokeStyle = 'white';
		_layout2.default.ctx.strokeRect(snakeArr[i].x, snakeArr[i].y, _settings2.default.unitSize, _settings2.default.unitSize);
	}
};
//Snake bite itself
var bitten = function bitten(a, b, snakeArr) {
	for (var i = 1; i < snakeArr.length; i++) {
		if (snakeArr[i].x === a && snakeArr[i].y === b) {
			return true;
		}
	}
	return false;
};

exports.default = { snakeArr: snakeArr, snakeSetup: snakeSetup, createSnake: createSnake, bitten: bitten };

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _layout = __webpack_require__(0);

var _layout2 = _interopRequireDefault(_layout);

var _snake = __webpack_require__(1);

var _snake2 = _interopRequireDefault(_snake);

var _settings = __webpack_require__(3);

var _settings2 = _interopRequireDefault(_settings);

var _game = __webpack_require__(4);

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var init = function init() {
	_game2.default.showResult();
	_game2.default.startGame();
};

init();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
// Game Settings
exports.default = {
    snakeColor: '#ffefeb',
    fruitColor: 'transparent',
    fruitImage: ['0.png', '1.png', '2.png', '3.png'],
    sideSize: 500,
    unitSize: 25,
    startX: 25,
    startY: 25,
    score: 0,
    timeInterval: 140, //ms,
    direction: 'down'
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _layout = __webpack_require__(0);

var _layout2 = _interopRequireDefault(_layout);

var _snake = __webpack_require__(1);

var _snake2 = _interopRequireDefault(_snake);

var _settings = __webpack_require__(3);

var _settings2 = _interopRequireDefault(_settings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var show = document.getElementById('startBtn');
var cover = document.getElementById('coverID');

var showResult = function showResult() {
    if (cover.classList.contains('hide')) {
        console.log('yes');
        cover.classList.remove('hide');
    } else {
        console.log('no');
        cover.classList.add('hide');
    }
};

var gameSpeed = _settings2.default.timeInterval;
//Turn the snake
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
//Snake Key Control
var d = _settings2.default.direction;
var paint = function paint() {
    _layout2.default.ctx.fillStyle = '#fcd9d1';
    _layout2.default.ctx.fillRect(0, 0, _settings2.default.sideSize, _settings2.default.sideSize);

    _snake2.default.createSnake();
    // createFruit();
    _layout2.default.ctx.drawImage(_layout2.default.fruitImg, _layout2.default.fruit.x, _layout2.default.fruit.y);

    //Head Start Position
    var headX = _snake2.default.snakeArr[0].x;
    var headY = _snake2.default.snakeArr[0].y;

    //Lose Game
    if (headX == -_settings2.default.unitSize || headY == -_settings2.default.unitSize || headX == _settings2.default.sideSize || headY == _settings2.default.sideSize || _snake2.default.bitten(headX, headY, _snake2.default.snakeArr)) {
        reset();
        showResult();
        console.log('Game over... Your score is ' + _settings2.default.score);
        return;
    }

    //Direction
    switch (d) {
        case 'left':
            headX -= _settings2.default.unitSize;
            break;

        case 'up':
            headY -= _settings2.default.unitSize;
            break;

        case 'right':
            headX += _settings2.default.unitSize;
            break;

        case 'down':
            headY += _settings2.default.unitSize;
            break;
    }

    // Eat Fruit
    if (headX == _layout2.default.fruit.x && headY == _layout2.default.fruit.y) {
        var tail = { x: headX, y: headY };
        //Score + 1
        scoreID.innerHTML = ++_settings2.default.score;

        //Create New Fruit
        _layout2.default.fruit.x = Math.floor(Math.random() * (_settings2.default.sideSize / _settings2.default.unitSize)) * _settings2.default.unitSize;
        _layout2.default.fruit.y = Math.floor(Math.random() * (_settings2.default.sideSize / _settings2.default.unitSize)) * _settings2.default.unitSize;
        _layout2.default.createFruit();
        _layout2.default.pickFruit(_settings2.default.fruitImage);
        _layout2.default.ctx.drawImage(_layout2.default.fruitImg, _layout2.default.fruit.x, _layout2.default.fruit.y);

        //Add Tail
        _snake2.default.snakeArr.unshift(tail);
    } else {
        //Add Tail
        var _tail = _snake2.default.snakeArr.pop();
        _tail.x = headX;
        _tail.y = headY;
        _snake2.default.snakeArr.unshift(_tail);
    }
};

//Start Game Interval
var gameStart = setInterval(paint, gameSpeed);

var startGame = function startGame() {
    document.addEventListener('keydown', turn);
};

//Recet Game
var reset = function reset() {
    clearInterval(gameStart);
    _layout2.default.ctx.clearRect(0, 0, _settings2.default.sideSize, _settings2.default.sideSize);
};

exports.default = { startGame: startGame, showResult: showResult };

/***/ })
/******/ ]);