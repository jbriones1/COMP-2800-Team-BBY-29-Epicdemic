import { CONSTANTS } from '../globalvars/CONSTANTS.js';
import { playerData } from '../globalvars/playerData.js';
import * as playerFnc from '../globalvars/playerData.js';
import * as textbox from '../functions/textbox.js'
import { sceneText } from '../dialogue/StoreText.js';

let KEY = CONSTANTS.SCENES.STORE;
let inventory = { apples: 0, fries: 0, cakes: 0, masks: 0, toilet_paper: 0, soap: 0 };
let tb;
let submenu;

export class StoreScene extends Phaser.Scene {
	constructor() {
		super({
			key: KEY
		});
	}

	init() {
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
	create() {

		// Textbox at the bottom of the screen
		tb = textbox.createTextBox(this,
			100,
			CONSTANTS.UI.SCREEN_HEIGHT - 600, {
			wrapWidth: 650,
		});

		// Message when entering the scene
		tb.start("At home", CONSTANTS.TEXT.TEXT_SPEED);

		// Creates all the menu buttons for the scene
		this.createObjects();

		// Return to Overworld
		this.theatreButton = this.add.text(
			CONSTANTS.UI.SCREEN_WIDTH - 400, 10, ' Return to Overworld', { fontSize: CONSTANTS.TEXT.FONT_SIZE })
			.setInteractive()
			.once('pointerdown', () => {
				this.scene.start(CONSTANTS.SCENES.OVERWORLD);
			});

		// Location name
		this.add.text(10, 10, KEY, { fill: '#0f0', fontSize: CONSTANTS.TEXT.FONT_SIZE })

	}

	/* All the interactable objects in the scene are made here */
	createObjects() {

		// Freezer
		this.computer = this.add.text(100, 100, 'Freezer', { fontSize: CONSTANTS.TEXT.FONT_SIZE })
			.setInteractive()
			.on('pointerdown', () => {
				playerFnc.clearSubmenu(submenu);

				console.log(playerFnc.changeTime(1));
				tb.start(sceneText.freezer.interact, CONSTANTS.TEXT.TEXT_SPEED);
				this.listFreezerChoices();
			});

		// Shelf
		this.sink = this.add.text(100, 200, 'Shelf', { fontSize: CONSTANTS.TEXT.FONT_SIZE })
			.setInteractive()
			.on('pointerdown', () => {
				playerFnc.clearSubmenu(submenu);
				
				if (playerData.stats.health >= 70) {
					tb.start(sceneText.shelf.good, CONSTANTS.TEXT.TEXT_SPEED);
				} else if (playerData.stats.health >= 50) {
					tb.start(sceneText.shelf.neutral, CONSTANTS.TEXT.TEXT_SPEED);
				} else {
					tb.start(sceneText.shelf.bad, CONSTANTS.TEXT.TEXT_SPEED);
				}

				this.listShelfChoices();
			});

		// Checkout
		this.fridge = this.add.text(100, 300, 'Checkout', { fontSize: CONSTANTS.TEXT.FONT_SIZE })
			.setInteractive()
			.on('pointerdown', () => {
				playerFnc.clearSubmenu(submenu);

				if (playerData.stats.health >= 70) {
					tb.start(sceneText.shelf.good, CONSTANTS.TEXT.TEXT_SPEED);
				} else if (playerData.stats.health >= 50) {
					tb.start(sceneText.shelf.neutral, CONSTANTS.TEXT.TEXT_SPEED);
				} else {
					tb.start(sceneText.shelf.bad, CONSTANTS.TEXT.TEXT_SPEED);
				}

			});


		// Produce
		this.storage = this.add.text(100, 400, 'Produce', { fontSize: CONSTANTS.TEXT.FONT_SIZE })
			.setInteractive()
			.on('pointerdown', () => {
				playerFnc.clearSubmenu(submenu);

				tb.start("Placeholder", CONSTANTS.TEXT.TEXT_SPEED);
			});

	} // end of create objects function

	// listFreezerChoices
	

	// listShelfChoices
}