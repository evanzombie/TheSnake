import Layout from './layout';
import Settings from './settings';

// Create Snake
let snakeArr = [];
snakeArr[0] = {
	x: Settings.startX * 5,
	y: Settings.startY * 5
};
//Set snake length
let snakeSetup = (x, y) => {
	for (let i = Settings.unitSize * 3; i > 0; i = i - Settings.unitSize) {
		snakeArr.push({ x: Settings.startX * 5, y: Settings.startY * i });
	}
	return snakeArr;
};
//Draw snake
let createSnake = () => {
	for (let i = 0; i < snakeArr.length; i++) {
		Layout.ctx.fillStyle = Settings.snakeColor;
		Layout.ctx.fillRect(snakeArr[i].x, snakeArr[i].y, Settings.unitSize, Settings.unitSize);
		Layout.ctx.strokeStyle = 'white';
		Layout.ctx.strokeRect(snakeArr[i].x, snakeArr[i].y, Settings.unitSize, Settings.unitSize);
	}
};
//Snake bite itself
let bitten = (a, b, snakeArr) => {
	for (let i = 1; i < snakeArr.length; i++) {
		if (snakeArr[i].x === a && snakeArr[i].y === b) {
			return true;
		}
	}
	return false;
};

export default { snakeArr, snakeSetup, createSnake, bitten };
