import {CONSTANTS} from '../globalvars/CONSTANTS.js';
import {playerData} from '../globalvars/playerData.js';
import * as playerFnc from '../globalvars/playerData.js';
import * as textbox from '../functions/textbox.js'
import * as sceneFnc from '../functions/sceneFunctions.js'
import { sceneText } from '../dialogue/TheatreText.js';

let KEY = CONSTANTS.SCENES.THEATRE;

let tb;

let submenu = [];

export class TheatreScene extends Phaser.Scene {
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
		this.load.image('theatre_bg', '../assets/backgrounds/theatre/theatre_people.png');
		this.load.image('theatre_arrow', '../assets/images/red_arrow.png');
		//this.load.image('theatre_return_arrow', '../assets/images/arrow-down-left.png')
	}

	// Load game objects
	create () {
		// scene image
		this.add.image(7, 100, 'theatre_bg')
		.setOrigin(0, 0)
		.setDisplaySize(950, 680);

		tb = textbox.createTextBox(this, 100, CONSTANTS.UI.SCREEN_HEIGHT - 300, {wrapWidth: 650});
		tb.start("At Theatre", CONSTANTS.TEXT.TEXT_SPEED);

		this.addArrows();

		// Return to Lobby
		this.toLobbyButton = this.add.image(478, 750, 'theatre_arrow')
			.setDisplaySize(30, 30)
			.setInteractive()
			.once('pointerdown', () => {
				this.scene.start(CONSTANTS.SCENES.LOBBY);
		});

		// button of concession
		this.add.rectangle(400, 600, 150, 80, '#000000', 0)
		.setOrigin(0, 0)
		.setInteractive()
		.on('pointerdown', () => {
			playerFnc.clearSubmenu(submenu);
			tb.start(sceneText.concession.interact, CONSTANTS.TEXT.TEXT_SPEED);
		})

		// button of seat r1c1
		this.add.rectangle(120, 350, 100, 70, '#000000', 0)
		.setOrigin(0, 0)
		.setInteractive()
		.on('pointerdown', () => {
			playerFnc.clearSubmenu(submenu);
			tb.start(sceneText.concession.interact, CONSTANTS.TEXT.TEXT_SPEED);
		})

		// button of seat r1c2
		this.add.rectangle(280, 350, 100, 70, '#000000', 0)
		.setOrigin(0, 0)
		.setInteractive()
		.on('pointerdown', () => {
			playerFnc.clearSubmenu(submenu);
			tb.start(sceneText.concession.interact, CONSTANTS.TEXT.TEXT_SPEED);
		})

		// button of seat r2c1
		this.add.rectangle(120, 480, 100, 70, '#000000', 0)
		.setOrigin(0, 0)
		.setInteractive()
		.on('pointerdown', () => {
			playerFnc.clearSubmenu(submenu);
			tb.start(sceneText.concession.interact, CONSTANTS.TEXT.TEXT_SPEED);
		})

		// button of seat r2c2
		this.add.rectangle(280, 480, 100, 70, '#000000', 0)
		.setOrigin(0, 0)
		.setInteractive()
		.on('pointerdown', () => {
			playerFnc.clearSubmenu(submenu);
			tb.start(sceneText.concession.interact, CONSTANTS.TEXT.TEXT_SPEED);
		})

		// button of seat r1c3
		this.add.rectangle(570, 350, 100, 70, '#000000', 0)
		.setOrigin(0, 0)
		.setInteractive()
		.on('pointerdown', () => {
			playerFnc.clearSubmenu(submenu);
			tb.start(sceneText.concession.interact, CONSTANTS.TEXT.TEXT_SPEED);
		})

		// button of seat r1c4
		this.add.rectangle(750, 350, 100, 70, '#000000', 0)
		.setOrigin(0, 0)
		.setInteractive()
		.on('pointerdown', () => {
			playerFnc.clearSubmenu(submenu);
			tb.start(sceneText.concession.interact, CONSTANTS.TEXT.TEXT_SPEED);
		})

		// button of seat r2c3
		this.add.rectangle(570, 480, 100, 70, '#000000', 0)
		.setOrigin(0, 0)
		.setInteractive()
		.on('pointerdown', () => {
			playerFnc.clearSubmenu(submenu);
			tb.start(sceneText.concession.interact, CONSTANTS.TEXT.TEXT_SPEED);
		})

		// button of seat r2c4
		this.add.rectangle(750, 480, 100, 70, '#000000', 0)
		.setOrigin(0, 0)
		.setInteractive()
		.on('pointerdown', () => {
			playerFnc.clearSubmenu(submenu);
			tb.start(sceneText.concession.interact, CONSTANTS.TEXT.TEXT_SPEED);
		})
	}

	addArrows() {
		// arrow for concession
		this.add.image(455, 560, 'theatre_arrow')
		.setOrigin(0, 0)
		.setDisplaySize(30, 30);

		// arrow for r1c2
		this.add.image(170, 330, 'theatre_arrow')
		.setOrigin(0, 0)
		.setDisplaySize(30, 30);

		// arrow for r1c2
		this.add.image(300, 330, 'theatre_arrow')
		.setOrigin(0, 0)
		.setDisplaySize(30, 30);

		// arrow for r1c3
		this.add.image(630, 330, 'theatre_arrow')
		.setOrigin(0, 0)
		.setDisplaySize(30, 30);

		// arrow for r1c4
		this.add.image(760, 330, 'theatre_arrow')
		.setOrigin(0, 0)
		.setDisplaySize(30, 30);

		// arrow for r2c2
		this.add.image(170, 435, 'theatre_arrow')
		.setOrigin(0, 0)
		.setDisplaySize(30, 30);

		// arrow for r2c2
		this.add.image(300, 435, 'theatre_arrow')
		.setOrigin(0, 0)
		.setDisplaySize(30, 30);

		// arrow for r2c3
		this.add.image(630, 435, 'theatre_arrow')
		.setOrigin(0, 0)
		.setDisplaySize(30, 30);

		// arrow for r2c4
		this.add.image(760, 435, 'theatre_arrow')
		.setOrigin(0, 0)
		.setDisplaySize(30, 30);
	
	}
	
}