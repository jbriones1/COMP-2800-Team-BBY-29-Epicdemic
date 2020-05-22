import {CONSTANTS} from '/js/CONSTANTS.js';
import {playerData} from '/js/playerData.js';

let KEY = CONSTANTS.SCENES.UI;
let uiText;
let stats;

/*****************************************************************
 * UI Scene                                                      *
 * Used to overlay stats for the player at the top of the screen *
 *****************************************************************/
export class UIScene extends Phaser.Scene {
	constructor() {
		super({
			key: KEY
		});
	}

	init (data) {
		this.playerData = data.playerData;

		this.scene.launch(CONSTANTS.SCENES.END, {playerData: this.playerData})
		stats = this.playerData.stats;
	}

	// Load assets
	preload() {
		this.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
	}

	// Load game objects
	create () {
		uiText = this.add.text(0, 0, 'UI', {fontSize: '35px'});
	}

	/********************
	 * Runs every frame *
	 ********************/
	update() {

		this.checkStatsLimits();

		// Updates the UI on the screen
		uiText.setText('$' + stats.money + '     Hunger: ' + this.playerData.stats.hunger + '     Happiness: ' + this.playerData.stats.happiness
		+ '\nDay ' + this.playerData.stats.day + ' - ' + this.playerData.stats.hour + ':' + this.playerData.stats.minuteStr);
	}

	/*********************************************************************
	 * Checks whether the player's stats don't exceed certain boundaries *
	 *********************************************************************/
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

		if (stats.last_meal < 0) {
			stats.last_meal = 0;
		}
	}

}