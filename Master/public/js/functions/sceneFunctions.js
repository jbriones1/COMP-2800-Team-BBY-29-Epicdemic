import { playerData, changeTime } from '/js/playerData.js';
import { CONSTANTS } from '/js/CONSTANTS.js';

// Used to disable all the buttons in a list
export function disableButtons (buttonList) {
	console.log(buttonList)
	if (buttonList != undefined) {
		for (let i = 0; i < buttonList.length; i++) {
			buttonList[i].input.enabled = false;
		}
	}
}

// Used to enable all the buttons in a list
export function enableButtons(buttonList) {
	if (buttonList != undefined) {
		for (let i = 0; i < buttonList.length; i++) {
			buttonList[i].input.enabled = true;
		}
	}
}

export function checkDistance(data, finishScene) {
	if (data.location != finishScene && data.location != null) {
		changeTime(data, 30);
	}
}