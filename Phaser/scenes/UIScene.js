import {CONSTANTS} from '../globalvars/CONSTANTS.js';
import {playerData} from '../globalvars/playerData.js';

let KEY = CONSTANTS.SCENES.UI;
let uiText;
let stats = playerData.stats;

export class UIScene extends Phaser.Scene {
	constructor() {
		super({
			key: KEY
		});
	}

	init () {
		console.log("Loaded " + KEY);
		this.scene.launch(CONSTANTS.SCENES.END)
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
		if (this.scene.isActive(CONSTANTS.SCENES.MINIGAME)) {
			this.scene.setVisible(false);
		} else if (!this.scene.isActive(CONSTANTS.SCENES.OVERWORLD)) {
			this.scene.setVisible(true);
			uiText.setY(0);
		} else {
			this.scene.setVisible(true);
			uiText.setY(1080);
		}

		this.checkStatsLimits();

		// Updates the UI on the screen
		uiText.setText('$' + stats.money + '     Hunger: ' + playerData.stats.hunger + '     Happiness: ' + playerData.stats.happiness
		+ '\nDay ' + playerData.stats.day + ' - ' + playerData.stats.hour + ':' + playerData.stats.minuteStr);
	}

	checkStatsLimits() {
		if (stats.health < 0) {
			stats.health = 0;
		}
		if (stats.health > 10) {
			stats.health = 10;
		}

		if (stats.hunger < 0) {
			stats.hunger = 0;
		}
		if (stats.hunger > 10) {
			stats.hunger = 10;
		}

		if (stats.happiness < 0) {
			stats.happiness = 0;
		}

		if (stats.happiness > 10) {
			stats.happiness = 10;
		}
	}

}