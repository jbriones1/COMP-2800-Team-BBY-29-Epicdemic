import {CONSTANTS} from '../globalvars/CONSTANTS.js';
import {playerData} from '../globalvars/playerData.js';

let KEY = CONSTANTS.SCENES.THEATRE;

export class TheatreScene extends Phaser.Scene {
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
		
	}

	// Load game objects
	create () {

		// Return to Lobby
		this.theatreButton = this.add.text(
			CONSTANTS.UI.SCREEN_WIDTH - 300, 100, ' Return to Lobby')
			.setInteractive()
			.once('pointerdown', () => {
				this.scene.start(CONSTANTS.SCENES.LOBBY);
		});

		this.add.text(500, 360, KEY, {fill: '#0f0'})
	}

}