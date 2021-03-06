import {CONSTANTS} from '/js/CONSTANTS.js';
import {playerData} from '/js/playerData.js';

let KEY = CONSTANTS.SCENES.FOODCOURT;

/**************************************
 * UNUSED                             *
 * Removed from the game due to scope *
 **************************************/
export class FoodCourtScene extends Phaser.Scene {
	constructor() {
		super({
			key: KEY
		});
	}

	init (data) {
		this.playerData = data.playerData;
		console.log("Loaded " + KEY);
		playerData.location = KEY;


		console.log(playerData);
	}

	// Load assets
	preload() {
		this.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
		this.load.image('nextPage', '/assets/images/arrow-down-left.png');
	}

	// Load game objects
	create () {

		// Return to Mall
		this.theatreButton = this.add.text(
			CONSTANTS.UI.SCREEN_WIDTH - 300, 100, ' Return to Mall')
		.setInteractive()
		.once('pointerdown', () => {
			this.scene.start(CONSTANTS.SCENES.MALL, {playerData: this.playerData});
		});

		this.add.text(500, 360, KEY, {fill: '#0f0'})
	}

}