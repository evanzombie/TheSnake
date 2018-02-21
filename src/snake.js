import Layout from './layout';

// let direction;

// let move = () => {
// 	document.addEventListener('keydown', turn);
// };

// let turn = e => {
// 	let key = e.keyCode;

// 	switch (key) {
// 		case 37:
// 			if (direction != 'right') {
// 				direction = 'left';
// 				console.log(direction);
// 				return direction;
// 			}
// 			break;
// 		case 38:
// 			if (direction != 'down') {
// 				direction = 'up';
// 				console.log(direction);
// 				return direction;
// 			}
// 			break;
// 		case 39:
// 			if (direction != 'left') {
// 				direction = 'right';
// 				console.log(direction);
// 				return direction;
// 			}
// 			break;
// 		case 40:
// 			if (direction != 'up') {
// 				direction = 'down';
// 				console.log(direction);
// 				return direction;
// 			}
// 			break;
// 	}
// };

let bitten = (a, b, arr) => {
	for (let i = 1; i < arr.length; i++) {
		if (arr[i].x === a && arr[i].y === b) {
			return true;
		}
	}
	return false;
};

export default { bitten };
