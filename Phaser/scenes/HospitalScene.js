import { CONSTANTS } from '../globalvars/CONSTANTS.js';
import { playerData } from '../globalvars/playerData.js';
import * as playerFnc from '../globalvars/playerData.js';
import * as textbox from '../functions/textbox.js'
import * as sceneFnc from '../functions/sceneFunctions.js'
import { sceneText } from '../dialogue/HospitalText.js';

let KEY = CONSTANTS.SCENES.HOSPITAL;

let tb;
let submenu = [];

export class HospitalScene extends Phaser.Scene {
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
		// Textbox
		this.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
		this.load.image('nextPage', '../assets/images/arrow-down-left.png');

		// Hospital assets
		// this.load.image(variable_name, 'path to the file');
		this.load.image('hospital_bg', '../assets/backgrounds/hospital/hospital.png');
		this.load.image('hospital_desk', '../assets/backgrounds/hospital/reception.png')
		this.load.spritesheet('hospital_nurse', '../assets/characters/nurse.png', {frameWidth: 90, frameHeight: 150});
	}

	// Load game objects
	create () {

		// createText
		// textbox.createTextBox(scene, x, y, )
		tb = textbox.createTextBox(this, 100, CONSTANTS.UI.SCREEN_HEIGHT - 300);

		tb.start('At the hospital', CONSTANTS.TEXT.TEXT_SPEED);

		this.createObjects();
		
		// Return to Overworld
		// text(x, y, String)
		this.overworldButton = this.add.text(
			CONSTANTS.UI.SCREEN_WIDTH - 100, 0, 'Map', { fontSize: CONSTANTS.TEXT.FONT_SIZE })
			.setInteractive()
			.on('pointerdown', () => {
				this.scene.start(CONSTANTS.SCENES.OVERWORLD);
			});

	}

	createObjects () {
		// Scene image
		// this.add.image(x, y, key/variable)
		this.add.image(5, 100, 'hospital_bg')
		.setOrigin(0,0)
		.setDisplaySize(950, 680);

		// Nurse
		let nurse = this.add.sprite(350, 375, 'hospital_nurse', 1)
		.setInteractive()
		.on('pointerdown', () => {
			playerFnc.clearSubmenu(submenu);
			
			tb.start(sceneText.reception.interact, CONSTANTS.TEXT.TEXT_SPEED);

			this.listReceptionChoices();
			
		});

		// Bad seat
		let badSeat = this.add.sprite(700, 375, 'hospital_nurse', 1)
		.setInteractive()
		.on('pointerdown', () => {
			playerFnc.clearSubmenu(submenu);

			tb.start(sceneText.reception.interact, CONSTANTS.TEXT.TEXT_SPEED);

			submenu.push(this.add.text(10, CONSTANTS.UI.SUBMENU_Y, 'Bad seat', { fontSize: CONSTANTS.TEXT.FONT_SIZE })
			.setInteractive()
			.on('pointerdown', () => {
				tb.start(sceneText.reception.question.interact);
				playerFnc.changeTime(480);
			}));
		});

		// Nurse animation
		this.anims.create({
			key: 'hospital_nurse_neutral',
			frames: this.anims.generateFrameNumbers('hospital_nurse', {start: 0, end: 2}),
			frameRate: 3,
			repeat: -1,
			yoyo: true
		});
		nurse.anims.play('hospital_nurse_neutral', true);

		// this.add.rectangle(startX, startY, width, height, color, alpha/transparency)
		this.add.rectangle(275, 300, 150, 200, '#000000', 0)
		.setOrigin(0, 0)
	} // end of createObjects ()

	/* RECEPTION CODE */
	listReceptionChoices() {
		playerData.
		submenu.push(this.add.text(10, CONSTANTS.UI.SUBMENU_Y, 'QUESTION', { fontSize: CONSTANTS.TEXT.FONT_SIZE })
									.setInteractive()
									.on('pointerdown', () => {
										tb.start(sceneText.reception.question.interact);
									})
		);
		submenu.push(this.add.text(210, CONSTANTS.UI.SUBMENU_Y, 'DONATE', { fontSize: CONSTANTS.TEXT.FONT_SIZE })
									.setInteractive()
									.on('pointerdown', () => {
										tb.start(sceneText.reception.donate.interact);
									})
		);

		submenu.push(this.add.text(410, CONSTANTS.UI.SUBMENU_Y, 'CHECK UP', { fontSize: CONSTANTS.TEXT.FONT_SIZE })
									.setInteractive()
									.on('pointerdown', () => {
										tb.start(sceneText.reception.checkin.confirm);
									})
		);
	}

	listQuestions() {
		submenu.push();
	}
}
