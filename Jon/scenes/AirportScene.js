import {CONSTANTS}  from '../globalvars/CONSTANTS.js';
import {playerData} from '../globalvars/playerData.js';
import textbox      from '../functions/textbox.js'

let KEY = CONSTANTS.SCENES.AIRPORT;
var messageText;

export class AirportScene extends Phaser.Scene {
	constructor() {
		super({
			key: KEY
		});

	}

	init (data) {
		console.log("Loaded " + KEY);
		playerData.location = KEY;
		messageText = data;
		console.log(playerData);
	}

	// Load assets
	preload() {
		this.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
	}

	// Load game objects
	create () {
		this.cameras.main.backgroundColor.setTo(0,0,0);
		textbox.createTextBox(this, 
			100, 
			CONSTANTS.UI.SCREEN_HEIGHT - 200, {
			wrapWidth: CONSTANTS.UI.SCREEN_WIDTH,
	})
	.start("Moved to the airport", 10);

		// Return to Overworld
		this.theatreButton = this.add.text(
			CONSTANTS.UI.SCREEN_WIDTH - 300, 100, ' Return to Overworld')
		.setInteractive()
		.once('pointerdown', () => {
			this.scene.start(CONSTANTS.SCENES.OVERWORLD);
		});

		this.add.text(500, 360, KEY, {fill: '#0f0', fontSize: CONSTANTS.TEXT.FONT_SIZE});
	}

}