import {CONSTANTS} from '../globalvars/CONSTANTS.js';
import {playerData} from '../globalvars/playerData.js';
import * as playerFnc from '../globalvars/playerData.js';
import * as textbox from '../functions/textbox.js'
import * as sceneFnc from '../functions/sceneFunctions.js'
import { sceneText } from '../dialogue/TheatreText.js';

let KEY = CONSTANTS.SCENES.THEATRE;

let tb;

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
		this.load.image('theatre_bg', '../assets/backgrounds/theatre/theatre.png');
	}

	// Load game objects
	create () {
		// scene image
		this.add.image(7, 100, 'theatre_bg')
		.setOrigin(0, 0)
		.setDisplaySize(950, 680);

		//this.add.text(80, 10, KEY, {fill: '#0f0', fontSize: CONSTANTS.TEXT.FONT_SIZE });

		tb = textbox.createTextBox(this, 100, CONSTANTS.UI.SCREEN_HEIGHT - 300, {wrapWidth: 650});
		tb.start("At Theatre", CONSTANTS.TEXT.TEXT_SPEED);

		// Return to Lobby
		this.toLobbyButton = this.add.text(
			CONSTANTS.UI.SCREEN_WIDTH - 360, 10, ' Return to Lobby', { fontSize: CONSTANTS.TEXT.FONT_SIZE })
			.setInteractive()
			.once('pointerdown', () => {
				this.scene.start(CONSTANTS.SCENES.LOBBY);
		});

		// button of concession
		this.add.rectangle(400, 600, 150, 100, '#000000', 0.8)
		.setOrigin(0, 0)
		.setInteractive()
		.on('pointerdown', () => {
			tb.start(sceneText.concession.interact, CONSTANTS.TEXT.TEXT_SPEED);
		})

		// button of seat r1c1
		this.add.rectangle(120, 350, 100, 70, '#000000', 0.8)
		.setOrigin(0, 0)
		.setInteractive()
		.on('pointerdown', () => {
			tb.start(sceneText.concession.interact, CONSTANTS.TEXT.TEXT_SPEED);
		})

		// button of seat r1c2
		this.add.rectangle(280, 350, 100, 70, '#000000', 0.8)
		.setOrigin(0, 0)
		.setInteractive()
		.on('pointerdown', () => {
			tb.start(sceneText.concession.interact, CONSTANTS.TEXT.TEXT_SPEED);
		})

		// button of seat r2c1
		this.add.rectangle(120, 480, 100, 70, '#000000', 0.8)
		.setOrigin(0, 0)
		.setInteractive()
		.on('pointerdown', () => {
			tb.start(sceneText.concession.interact, CONSTANTS.TEXT.TEXT_SPEED);
		})

		// button of seat r2c2
		this.add.rectangle(280, 480, 100, 70, '#000000', 0.8)
		.setOrigin(0, 0)
		.setInteractive()
		.on('pointerdown', () => {
			tb.start(sceneText.concession.interact, CONSTANTS.TEXT.TEXT_SPEED);
		})

		// button of seat r1c3
		this.add.rectangle(570, 350, 100, 70, '#000000', 0.8)
		.setOrigin(0, 0)
		.setInteractive()
		.on('pointerdown', () => {
			tb.start(sceneText.concession.interact, CONSTANTS.TEXT.TEXT_SPEED);
		})

		// button of seat r1c4
		this.add.rectangle(750, 350, 100, 70, '#000000', 0.8)
		.setOrigin(0, 0)
		.setInteractive()
		.on('pointerdown', () => {
			tb.start(sceneText.concession.interact, CONSTANTS.TEXT.TEXT_SPEED);
		})

		// button of seat r2c3
		this.add.rectangle(570, 480, 100, 70, '#000000', 0.8)
		.setOrigin(0, 0)
		.setInteractive()
		.on('pointerdown', () => {
			tb.start(sceneText.concession.interact, CONSTANTS.TEXT.TEXT_SPEED);
		})

		// button of seat r2c4
		this.add.rectangle(750, 480, 100, 70, '#000000', 0.8)
		.setOrigin(0, 0)
		.setInteractive()
		.on('pointerdown', () => {
			tb.start(sceneText.concession.interact, CONSTANTS.TEXT.TEXT_SPEED);
		})


	}

}