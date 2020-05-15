import { playerData } from '../globalvars/playerData.js';
import { CONSTANTS } from '../globalvars/CONSTANTS.js';

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
export function enableButtons (buttonList) {
	if (buttonList != undefined) {
		for (let i = 0; i < buttonList.length; i++) {
			buttonList[i].input.enabled = true;
		}
	}
}