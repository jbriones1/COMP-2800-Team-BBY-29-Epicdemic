import { CONSTANTS } from '../globalvars/CONSTANTS.js';
import { playerData } from '../globalvars/playerData.js';
import * as playerFnc from '../globalvars/playerData.js';
import * as textbox from '../functions/textbox.js'
import { sceneText } from '../dialogue/AirportText.js';

let KEY = CONSTANTS.SCENES.AIRPORT;
let tb;
let submenu;

export class AirportScene extends Phaser.Scene {
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

		// Terminal
		this.computer = this.add.text(100, 100, 'Terminal', { fontSize: CONSTANTS.TEXT.FONT_SIZE })
			.setInteractive()
			.on('pointerdown', () => {
				playerFnc.clearSubmenu(submenu);

				// Checks if the player has a ticket
				if (playerData.inventory.ticket) {
					tb.start(sceneText.terminal.ticket, CONSTANTS.TEXT.TEXT_SPEED);
				} else {
					tb.start(sceneText.terminal.noTicket, CONSTANTS.TEXT.TEXT_SPEED);
				}
			});

		// Window
		this.window = this.add.text(100, 200, 'Window', { fontSize: CONSTANTS.TEXT.FONT_SIZE })
			.setInteractive()
			.on('pointerdown', () => {
				playerFnc.clearSubmenu(submenu);

				// Checks if the world is doing badly
				if (playerData.stats.health >= 70) {
					tb.start(sceneText.window.good, CONSTANTS.TEXT.TEXT_SPEED);
				} else {
					tb.start(sceneText.window.bad, CONSTANTS.TEXT.TEXT_SPEED);
				}
			});

		// Good seat
		this.fridge = this.add.text(100, 300, 'Good seat', { fontSize: CONSTANTS.TEXT.FONT_SIZE })
			.setInteractive()
			.on('pointerdown', () => {
				playerFnc.clearSubmenu(submenu);

				tb.start('You have:\n' + playerFnc.fridgeContents(), CONSTANTS.TEXT.TEXT_SPEED);
			});

		// Bad seat
		this.fridge = this.add.text(100, 400, 'Bad seat', { fontSize: CONSTANTS.TEXT.FONT_SIZE })
			.setInteractive()
			.on('pointerdown', () => {
				playerFnc.clearSubmenu(submenu);

				tb.start('You have:\n' + playerFnc.fridgeContents(), CONSTANTS.TEXT.TEXT_SPEED);
			});

		// Ticket Window
		this.storage = this.add.text(100, 500, 'Ticket Window', { fontSize: CONSTANTS.TEXT.FONT_SIZE })
			.setInteractive()
			.on('pointerdown', () => {
				playerFnc.clearSubmenu(submenu);

				tb.start('You have:\n' + playerFnc.storageContents(), CONSTANTS.TEXT.TEXT_SPEED);
			});
	}

}