import {CONSTANTS} from '../globalvars/CONSTANTS.js';
import {playerData} from '../globalvars/playerData.js';

let KEY = CONSTANTS.SCENES.UI;
let uiText;

export class UIScene extends Phaser.Scene {
	constructor() {
		super({
			key: KEY
		});
	}

	init () {
		console.log("Loaded " + KEY);
	}

	// Load assets
	preload() {
		this.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
		this.load.image('nextPage', '../assets/images/arrow-down-left.png');
	}

	// Load game objects
	create () {
		uiText = this.add.text(0, 0, 'UI', {fontSize: '35px'});
	}

	update() {
		if (!this.scene.isActive(CONSTANTS.SCENES.OVERWORLD)) {
			this.scene.setVisible(true);
			uiText.setY(0);
		} else {
			this.scene.setVisible(true);
			uiText.setY(1080);
		}

		uiText.setText('$' + playerData.stats.money + '     Hunger: ' + playerData.stats.hunger + '     Happiness: ' + playerData.stats.happiness
			+ '\nDay ' + playerData.stats.day + ' - ' + playerData.stats.hour + ':' + playerData.stats.minuteStr);

		if (playerData.stats.day >= 6) {
			this.scene.pause(playerData.location);
		}
	}

}