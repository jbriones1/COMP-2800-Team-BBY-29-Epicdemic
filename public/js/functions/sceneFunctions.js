import { changeTime } from '/js/playerData.js';

// Used to disable all the buttons in a list
export function disableButtons (buttonList) {
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

// Checks if the user moved away from their current location to another one,
// incrementing time by 30 minutes if they do.
export function checkDistance(data, finishScene) {
	if (data.location != finishScene && data.location != null) {
		changeTime(data, 30);
	}
}