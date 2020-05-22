import { playerData } from '/js/playerData.js';
import { CONSTANTS } from '/js/CONSTANTS.js';

// Used to disable all the buttons in a list
export function disableButtons (buttonList) {
	for (let i = 0; i < buttonList.length; i++) {
		buttonList[i].input.enabled = false;
	}
}

// Used to enable all the buttons in a list
export function enableButtons (buttonList) {
	for (let i = 0; i < buttonList.length; i++) {
		buttonList[i].input.enabled = true;
	}
}

export function drawUI (scene, yPos) {
	console.log(scene.key);

	// Money
	scene.add.text(300, yPos, '$' + playerData.stats.money, 
		{ fill: '#ffff00', fontSize: CONSTANTS.TEXT.FONT_SIZE }); // styling

	// Time
	scene.add.text(10, yPos, 'Day ' + playerData.stats.day + ' - ' + playerData.stats.hour + ':' + playerData.stats.minuteStr, 
		{ fontSize: CONSTANTS.TEXT.FONT_SIZE }); // styling
}