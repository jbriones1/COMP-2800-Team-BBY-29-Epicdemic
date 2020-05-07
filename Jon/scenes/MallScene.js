import {CONSTANTS} from '../globalvars/CONSTANTS.js';
import {playerData} from '../globalvars/playerData.js';

let KEY = CONSTANTS.SCENES.MALL;

export class MallScene extends Phaser.Scene {
	constructor() {
		super({
			key: KEY
		});
	}

	init () {
		console.log("Loaded " + KEY);
		playerData.location = KEY;


		console.log(playerData);
	}

	// Load assets
	preload() {
		this.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
	}

	// Load game objects
	create () {

		// Return to Overworld
		this.theatreButton = this.add.text(
			CONSTANTS.UI.SCREEN_WIDTH - 300, 100, ' Return to Overworld')
		.setInteractive()
		.once('pointerdown', 		() => {
			this.scene.start(CONSTANTS.SCENES.OVERWORLD);
		});

		this.add.text(500, 360, KEY, {fill: '#0f0'})

		this.foodCourtButton = this.add.text(300, 100, 'Food Court')
		.setInteractive()
		.on('pointerdown', () => this.scene.start(CONSTANTS.SCENES.FOODCOURT));

		this.musicStoreButton = this.add.text(100, 200, 'Music Store')
		.setInteractive()
		.on('pointerdown', () => this.scene.start(CONSTANTS.SCENES.MUSICSTORE));
	}

}