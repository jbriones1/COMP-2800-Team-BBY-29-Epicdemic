import {CONSTANTS}  from '../globalvars/CONSTANTS.js';
import {playerData} from '../globalvars/playerData.js';
import textbox      from '../functions/textbox.js' 
import {homeText}   from '../dialogue/HomeText.js';

let KEY = CONSTANTS.SCENES.HOME;
let tb;

export class HomeScene extends Phaser.Scene {
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
		this.load.image('nextPage', '../images/arrow-down-left.png');
	}

	// Load game objects
	create () {
		this.createObjects();

		// Textbox at the bottom of the screen
		this.updateTextbox("At home");

		// Return to Overworld
		this.theatreButton = this.add.text(
			CONSTANTS.UI.SCREEN_WIDTH - 300, 100, ' Return to Overworld')
		.setInteractive()
		.once('pointerdown', () => {
			this.scene.start(CONSTANTS.SCENES.OVERWORLD);
		});

		this.add.text(500, 360, KEY, {fill: '#0f0'})
	}

	createObjects () {
		// Computer button
		this.computerButton = this.add.text(100, 100, 'Computer', )
		.setInteractive()
		.on('pointerdown', () => {
			playerData.stats.hour += 0.1;
			this.updateTextbox(homeText.comp.news.day1);
			console.log(playerData.stats.hour)
		});
	}

	updateTextbox (message) {
		if (tb == undefined) {
			tb = textbox.createTextBox(this, 
				100, 
				CONSTANTS.UI.SCREEN_HEIGHT - 400, {
				wrapWidth: 500,
			})
		}
		tb.start(message, CONSTANTS.TEXT.TEXT_SPEED);
	}


}