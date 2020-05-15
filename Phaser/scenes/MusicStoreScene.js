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
		this.load.image('musicStore_manager', '../assets/backgrounds/musicStore/manager.png');
		this.load.image('musicStore_arrow', '../assets/images/red_arrow.png')
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
		this.toMallButton = this.add.image(462, 730, 'musicStore_arrow')
		.setOrigin(0, 0)
		.setDisplaySize(30, 30)
		.setInteractive()
		.once('pointerdown', () => {
			this.scene.start(CONSTANTS.SCENES.OVERWORLD);
		});

		// button of manager
		this.add.image(350, 640, 'musicStore_manager')
		.setOrigin(0, 0)
		.setInteractive()
		.on('pointerdown', () => {
			tb.start(sceneText.manager.interact, CONSTANTS.TEXT.TEXT_SPEED);
		})

		// button of cash register
		this.add.rectangle(650, 650, 150, 80, '#000000', 0)
		.setOrigin(0, 0)
		.setInteractive()
		.on('pointerdown', () => {
			tb.start(sceneText.ticketWindow.interact, CONSTANTS.TEXT.TEXT_SPEED);
		})

		// button of left toy table
		this.add.rectangle(120, 440, 100, 120, '#000000', 0)
		.setOrigin(0, 0)
		.setInteractive()
		.on('pointerdown', () => {
			tb.start(sceneText.ticketWindow.interact, CONSTANTS.TEXT.TEXT_SPEED);
		})

		// button of right toy table
		this.add.rectangle(730, 440, 100, 120, '#000000', 0)
		.setOrigin(0, 0)
		.setInteractive()
		.on('pointerdown', () => {
			tb.start(sceneText.ticketWindow.interact, CONSTANTS.TEXT.TEXT_SPEED);
		})

		// button of toys in the middle
		this.add.rectangle(410, 460, 140, 120, '#000000', 0)
		.setOrigin(0, 0)
		.setInteractive()
		.on('pointerdown', () => {
			tb.start(sceneText.ticketWindow.interact, CONSTANTS.TEXT.TEXT_SPEED);
		})

	}

	addArrows() {
		// arrow for manager
		this.add.image(370, 606, 'musicStore_arrow')
		.setOrigin(0, 0)
		.setDisplaySize(30, 30);

		// arrow for reception
		this.add.image(660, 600, 'musicStore_arrow')
		.setOrigin(0, 0)
		.setDisplaySize(30, 30);

		// arrow for left toy table 
		this.add.image(160, 380, 'musicStore_arrow')
		.setOrigin(0, 0)
		.setDisplaySize(30, 30);

		// arrow for right toy table 
		this.add.image(760, 380, 'musicStore_arrow')
		.setOrigin(0, 0)
		.setDisplaySize(30, 30);

		// arrow for toys in the middle
		this.add.image(460, 400, 'musicStore_arrow')
		.setOrigin(0, 0)
		.setDisplaySize(30, 30);

	}

}