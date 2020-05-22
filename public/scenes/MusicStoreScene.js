import {CONSTANTS} from '/js/CONSTANTS.js';
import {playerData} from '/js/playerData.js';
import * as playerFnc from '/js/playerData.js';
import * as textbox from '/js/functions/textbox.js'
import * as sceneFnc from '/js/functions/sceneFunctions.js'
import { sceneText } from '/js/dialogue/MusicStoreText.js';

let KEY = CONSTANTS.SCENES.MUSICSTORE;

let tb;
let objectDebug = 0;
let submenu = [];

export class MusicStoreScene extends Phaser.Scene {
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
		// scene image
		this.add.image(7, 100, 'musicStore_bg')
		.setOrigin(0, 0)
		.setDisplaySize(950, 680);

		this.addArrows();

		tb = textbox.createTextBox(this, 100, CONSTANTS.UI.SCREEN_HEIGHT - 300, {wrapWidth: 650});
		tb.start("At Toy Store", CONSTANTS.TEXT.TEXT_SPEED);

		// Return to overworld
		this.toMallButton = this.add.image(462, 730, 'red_arrow')
		.setOrigin(0, 0)
		.setDisplaySize(30, 30)
		.setInteractive()
		.once('pointerup', () => {
			this.scene.start(CONSTANTS.SCENES.OVERWORLD, {playerData: this.playerData});
		});

		// button of customer healthy
		this.customerHealthy = this.add.image(350, 640, 'musicStore_manager')
		.setOrigin(0, 0)
		.setInteractive()
		.on('pointerup', () => {
			this.interactCustomer();
		})

		// Creates a customer with different responses
		if (!this.playerData.toystore.healthy_customer) {
			this.customerHealthy.destroy();
			this.customerBad = this.add.image(350, 640, 'musicStore_manager')
			.setOrigin(0, 0)
			.setInteractive()
			.on('pointerup', () => {
				tb.start(sceneText.customer.blame, CONSTANTS.TEXT.TEXT_SPEED);
				this.playerData.stats.happiness -= 2;
			})
		}

		// button of cash register
		this.add.rectangle(650, 650, 150, 80, '#000000', objectDebug)
		.setOrigin(0, 0)
		.setInteractive()
		.on('pointerup', () => {
			tb.start(sceneText.manager.interact, CONSTANTS.TEXT.TEXT_SPEED);
			if (!this.playerData.inventory.mask) {
				this.playerData.stats.health--;
			}
		})

		// button of left toy table
		this.add.rectangle(110, 430, 150, 170, '#000000', objectDebug)
		.setOrigin(0, 0)
		.setInteractive()
		.on('pointerup', () => {
			tb.start(sceneText.misc.leftToys, CONSTANTS.TEXT.TEXT_SPEED);
		})

		// button of kid
		this.add.rectangle(100, 650, 150, 120, '#000000', objectDebug)
		.setOrigin(0, 0)
		.setInteractive()
		.on('pointerup', () => {
			tb.start(sceneText.misc.kid, CONSTANTS.TEXT.TEXT_SPEED);
		})

		// button of right toy table
		this.add.rectangle(730, 440, 100, 120, '#000000', objectDebug)
		.setOrigin(0, 0)
		.setInteractive()
		.on('pointerup', () => {
			tb.start(sceneText.misc.rightToys, CONSTANTS.TEXT.TEXT_SPEED);
		})

		// button of toys in the middle
		this.add.rectangle(410, 460, 140, 120, '#000000', objectDebug)
		.setOrigin(0, 0)
		.setInteractive()
		.on('pointerup', () => {
			tb.start(sceneText.manager.question.jobs, CONSTANTS.TEXT.TEXT_SPEED);
			this.listWorkChoices();
		})

	}

	addArrows() {
		// arrow for manager
		this.add.image(370, 606, 'red_arrow')
		.setOrigin(0, 0)
		.setDisplaySize(30, 30);

		// arrow for reception
		this.add.image(660, 600, 'red_arrow')
		.setOrigin(0, 0)
		.setDisplaySize(30, 30);

		// arrow for left toy table 
		this.add.image(160, 380, 'red_arrow')
		.setOrigin(0, 0)
		.setDisplaySize(30, 30);

		// arrow for left toy table 
		this.add.image(160, 620, 'red_arrow')
		.setOrigin(0, 0)
		.setDisplaySize(30, 30);

		// arrow for right toy table 
		this.add.image(760, 380, 'red_arrow')
		.setOrigin(0, 0)
		.setDisplaySize(30, 30);

		// arrow for toys in the middle
		this.add.image(460, 400, 'red_arrow')
		.setOrigin(0, 0)
		.setDisplaySize(30, 30);

	}

	listWorkChoices() {
		playerFnc.clearSubmenu(submenu);

		submenu.push(
			this.add.text(200, CONSTANTS.UI.SUBMENU_Y, 'YES', { fontSize: CONSTANTS.TEXT.FONT_SIZE })
			.setInteractive()
			.on('pointerup', () => {
				this.scene.start(CONSTANTS.SCENES.MINIGAME, {playerData: this.playerData});
			})
		);

		submenu.push(
			this.add.text(500, CONSTANTS.UI.SUBMENU_Y, 'NO', { fontSize: CONSTANTS.TEXT.FONT_SIZE })
			.setInteractive()
			.on('pointerup', () => {
				playerFnc.clearSubmenu(submenu);
			})
		);

	} // end of list work choices

	interactCustomer() {
		playerFnc.clearSubmenu(submenu);

		let str = sceneText.customer.interact;
		if (this.playerData.inventory.mask) {
			str += " " + sceneText.customer.mask;
		} else {
			str += " " + sceneText.customer.noMask;
			this.playerData.stats.health--;
		}
		
		tb.start(str, CONSTANTS.TEXT.TEXT_SPEED);

		submenu.push(
			this.add.text(200, CONSTANTS.UI.SUBMENU_Y, 'AGREE', { fontSize: CONSTANTS.TEXT.FONT_SIZE })
			.setInteractive()
			.on('pointerup', () => {
				playerFnc.clearSubmenu(submenu);
				tb.start(sceneText.customer.agree, CONSTANTS.TEXT.TEXT_SPEED);
				this.playerData.stats.bad_decisions++;
				this.playerData.toystore.healthy_customer = false;
			})
		);

		submenu.push(
			this.add.text(500, CONSTANTS.UI.SUBMENU_Y, 'DISAGREE', { fontSize: CONSTANTS.TEXT.FONT_SIZE })
			.setInteractive()
			.on('pointerup', () => {
				playerFnc.clearSubmenu(submenu);
				tb.start(sceneText.customer.disagree, CONSTANTS.TEXT.TEXT_SPEED);
			})
		);
	}

}