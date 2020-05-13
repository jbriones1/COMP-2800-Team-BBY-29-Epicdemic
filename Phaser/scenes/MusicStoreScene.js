import {CONSTANTS} from '../globalvars/CONSTANTS.js';
import {playerData} from '../globalvars/playerData.js';
import * as playerFnc from '../globalvars/playerData.js';
import * as textbox from '../functions/textbox.js'
import * as sceneFnc from '../functions/sceneFunctions.js'
import { sceneText } from '../dialogue/MusicStoreText.js';

let KEY = CONSTANTS.SCENES.MUSICSTORE;

let tb;

export class MusicStoreScene extends Phaser.Scene {
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
		this.load.image('musicStore_bg', '../assets/backgrounds/musicStore/toystore.png');
	}

	// Load game objects
	create () {
		// scene image
		this.add.image(7, 100, 'musicStore_bg')
		.setOrigin(0, 0)
		.setDisplaySize(950, 680);

		this.add.text(80, 10, KEY, {fill: '#0f0', fontSize: CONSTANTS.TEXT.FONT_SIZE });

		tb = textbox.createTextBox(this, 100, CONSTANTS.UI.SCREEN_HEIGHT - 300, {wrapWidth: 650});
		tb.start("At Toy Store", CONSTANTS.TEXT.TEXT_SPEED);

		// Return to Mall
		this.toMallButton = this.add.text(
			CONSTANTS.UI.SCREEN_WIDTH - 350, 10, ' Return to Mall', { fontSize: CONSTANTS.TEXT.FONT_SIZE })
		.setInteractive()
		.once('pointerdown', () => {
			this.scene.start(CONSTANTS.SCENES.MALL);
		});

		// button of cash register
		//======================================
		// submenu ? 
		//======================================
		this.add.rectangle(650, 650, 150, 100, '#000000', 0.8)
		.setOrigin(0, 0)
		.setInteractive()
		.on('pointerdown', () => {
			tb.start(sceneText.ticketWindow.interact, CONSTANTS.TEXT.TEXT_SPEED);
		})

		// button of toy shelf1
		//======================================
		// submenu ? 
		//======================================
		this.add.rectangle(720, 430, 100, 150, '#000000', 0.8)
		.setOrigin(0, 0)
		.setInteractive()
		.on('pointerdown', () => {
			tb.start(sceneText.ticketWindow.interact, CONSTANTS.TEXT.TEXT_SPEED);
		})

		// button of toy shelf2
		//======================================
		// submenu ? 
		//======================================
		this.add.rectangle(120, 430, 100, 150, '#000000', 0.8)
		.setOrigin(0, 0)
		.setInteractive()
		.on('pointerdown', () => {
			tb.start(sceneText.ticketWindow.interact, CONSTANTS.TEXT.TEXT_SPEED);
		})

		// button of manager
		//======================================
		// submenu ?   need to add manager in bg img
		//======================================
		this.add.rectangle(430, 650, 100, 100, '#000000', 0.8)
		.setOrigin(0, 0)
		.setInteractive()
		.on('pointerdown', () => {
			tb.start(sceneText.ticketWindow.interact, CONSTANTS.TEXT.TEXT_SPEED);
		})


	}

}