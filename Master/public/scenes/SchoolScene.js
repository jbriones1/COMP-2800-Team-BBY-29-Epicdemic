import {CONSTANTS} from '/js/CONSTANTS.js';
import {playerData} from '/js/playerData.js';
import * as playerFnc from '/js/playerData.js';
import * as textbox   from '/js/functions/textbox.js'
import * as sceneFnc from '/js/functions/sceneFunctions.js'
import {sceneText}     from '/js/dialogue/SchoolText.js';

let KEY = CONSTANTS.SCENES.SCHOOL;
let tb;


export class SchoolScene extends Phaser.Scene {
	constructor() {
		super({
			key: KEY
		});

	}

	init (data) {
		this.playerData = data.playerData;
		console.log("Loaded " + KEY);

		sceneFnc.checkDistance(this.playerData, KEY);
		this.playerData.location = KEY;
	}

	// Load assets
	preload() {
		this.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
	}

	// Load game objects
	create () {

		

		// Creates all the menu buttons for the scene
		this.createObjects();

		// Return to Overworld
		this.overworldButton = this.add.image(470, 750, 'red_arrow').setDisplaySize(30, 30)
			.setInteractive()
			.on('pointerup', () => {
				this.scene.start(CONSTANTS.SCENES.OVERWORLD, {playerData: this.playerData});
			});

		// Textbox for dialogue
		tb = textbox.createTextBox(this, 100, CONSTANTS.UI.SCREEN_HEIGHT - 300, {
			wrapWidth: 650
		});

		// Entering message:
		tb.start("You've found all the toilet paper!", CONSTANTS.TEXT.TEXT_SPEED);

		this.findSecret();

	}

	createObjects() {
		// Background
		this.add.image(5, 100, 'school_bg')
		.setOrigin(0,0)
		.setDisplaySize(950, 680);
	}

	findSecret() {
		if (!this.playerData.secret) {
			this.playerData.secret = true;
			this.playerData.storage.toilet_paper += 100;
		}
	}

}