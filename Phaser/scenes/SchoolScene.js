import {CONSTANTS} from '../globalvars/CONSTANTS.js';
import {playerData} from '../globalvars/playerData.js';
import * as playerFnc from '../globalvars/playerData.js';
import * as textbox   from '../functions/textbox.js' 
import {sceneText}     from '../dialogue/SchoolText.js';

let KEY = CONSTANTS.SCENES.SCHOOL;
let tb;
let submenu;
let mainMenu;
let stationeryMenu;
let deskActive = false;
let subSubMenuActive = false;


export class SchoolScene extends Phaser.Scene {
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

		

		// Creates all the menu buttons for the scene
		this.createObjects();

		// Return to Overworld
		this.overworldButton = this.add.image(470, 750, 'red_arrow').setDisplaySize(30, 30)
			.setInteractive()
			.on('pointerup', () => {
				this.scene.start(CONSTANTS.SCENES.OVERWORLD);
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
		if (!playerData.secret) {
			playerData.secret = true;
			playerData.storage.toilet_paper += 100;
		}
	}

}