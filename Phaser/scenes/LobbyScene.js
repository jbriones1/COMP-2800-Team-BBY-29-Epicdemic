import {CONSTANTS} from '../globalvars/CONSTANTS.js';
import {playerData} from '../globalvars/playerData.js';

let KEY = CONSTANTS.SCENES.LOBBY;

export class LobbyScene extends Phaser.Scene {
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
		this.load.image('nextPage', '../assets/images/arrow-down-left.png');
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

		this.add.text(500, 360, KEY, {fill: '#0f0'});

		this.theatreButton = this.add.text(100, 100, 'Theatre')
		.setInteractive()
		.once('pointerdown', 		() => {
			this.scene.start(CONSTANTS.SCENES.THEATRE);
		});

	}



}