import {CONSTANTS} from '/js/CONSTANTS.js';
import {playerData} from '/js/playerData.js';
import * as playerFnc from '/js/playerData.js';
import * as textbox from '/js/functions/textbox.js'
import * as sceneFnc from '/js/functions/sceneFunctions.js'
import { sceneText } from '/js/dialogue/HospitalText.js';

let KEY = CONSTANTS.SCENES.HOSPITAL;

let tb;
let submenu = [];
let mainButtons = [];

let nurseTalk;
let grannyTalk = false;
let eggTalk = 0;

/*********************************************************
 * Hospital scene.                                       *
 * Contains the nurse, old lady and several seats.       *
 *********************************************************/
export class HospitalScene extends Phaser.Scene {
	constructor() {
		super({
			key: KEY
		});
	}

	init (data) {
		this.playerData = data.playerData;

		sceneFnc.checkDistance(this.playerData.location, KEY);
		this.playerData.location = KEY;

		nurseTalk = 0;
		grannyTalk = 0;
	}

	// Load assets
	preload() {
		// Textbox
		this.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
	}

	// Load game objects
	create () {

		// createText
		// textbox.createTextBox(scene, x, y, )
		tb = textbox.createTextBox(this, 100, CONSTANTS.UI.SCREEN_HEIGHT - 300, 
			{wrapWidth: 650});

		tb.start('Hospital. There are a few places to sit.', CONSTANTS.TEXT.TEXT_SPEED);

		this.createObjects();
		this.addArrows();
		
		// Return to Overworld
		// text(x, y, String)
		this.add.image(577, 730, 'red_arrow')
		.setOrigin(0, 0)
		.setDisplaySize(30, 30)
		.setInteractive()
		.on('pointerup', () => {
			this.scene.start(CONSTANTS.SCENES.OVERWORLD, {playerData: this.playerData});
		});

	}

	update () {

		// Used when talking to the old grandma in the room
		if (grannyTalk && !tb.isTyping && tb.isLastPage) {
			grannyTalk = false;
			sceneFnc.enableButtons(mainButtons);
			playerFnc.changeTime(this.playerData, 180);
		} // end of granny talking
	}

// ----------------------------------------------------------------------------

	/*******************************************************
	 * Interactable objects for the scene are created here *
	 *******************************************************/
	createObjects () {
		// Scene image
		// this.add.image(x, y, key/variable)
		this.add.image(5, 100, 'hospital_bg')
		.setOrigin(0,0)
		.setDisplaySize(950, 680);

		// Nurse
		this.nurse = this.add.sprite(350, 375, 'hospital_nurse', 1)
		.setInteractive()
		.on('pointerup', () => {
			playerFnc.clearSubmenu(submenu);
			
			tb.start(sceneText.reception.interact, CONSTANTS.TEXT.TEXT_SPEED);

			this.listReceptionChoices();
			
		});

		// Bad seats
		this.badSeats = this.add.rectangle(600, 400, 80, 250, '#000', 0)
		.setOrigin(0, 0)
		.setInteractive()
		.on('pointerup', () => {
			if (this.grandma != undefined) {
				tb.start(sceneText.seats.takeASeat.badSeats, CONSTANTS.TEXT.TEXT_SPEED);
				playerFnc.changeTime(this.playerData, 5);
			} else {
				tb.start(sceneText.seats.takeASeat.goodSeat, CONSTANTS.TEXT.TEXT_SPEED);
				playerFnc.changeTime(this.playerData, 5);
			}
			
		});

		// Good seats
		this.goodSeats = this.add.rectangle(850, 400, 80, 250, '#000', 0)
		.setOrigin(0, 0)
		.setInteractive()
		.on('pointerup', () => {
			tb.start(sceneText.seats.takeASeat.goodSeat, CONSTANTS.TEXT.TEXT_SPEED);
			playerFnc.changeTime(this.playerData, 5);
		});

		// Good seat
		this.goodSeat = this.add.rectangle(20, 525, 80, 110, '#000', 0)
		.setOrigin(0, 0)
		.setInteractive()
		.on('pointerup', () => {
			tb.start(sceneText.seats.takeASeat.goodSeat, CONSTANTS.TEXT.TEXT_SPEED);
		});

		// Grandma
		this.grannyTalk = 0;
		this.grandma = this.add.sprite(630, 480, 'hospital_grandma', 3)
		.setInteractive()
		.on('pointerup', () => {
			playerFnc.clearSubmenu(submenu);

			let str = '';

			if (eggTalk == 3 && !this.playerData.unlocked) {
				str += sceneText.grandma.egg;
				this.playerData.unlocked = true;
			} else {
				str += sceneText.grandma.interact;
				eggTalk++;
			}

			// If you're not wearing a mask
			if (!this.playerData.inventory.mask) {
				this.playerData.stats.health--;
				str += '. ' + sceneText.grandma.no_mask;
			}

			// You can't do anything else while talking to the old lady
			grannyTalk = true;
			sceneFnc.disableButtons(mainButtons);
			tb.start(str, CONSTANTS.TEXT.TEXT_SPEED * 3);
		});

		// Remove grandma if the world isn't healthy
		if (!this.playerData.hospital.grandma) {
			this.grandma.destroy();
		}

		mainButtons = [this.nurse, this.badSeats, this.goodSeat, this.goodSeats, this.grandma]

		// Nurse animation 
		this.anims.create({
			key: 'hospital_nurse_neutral',
			frames: this.anims.generateFrameNumbers('hospital_nurse', {start: 0, end: 2}),
			frameRate: 3,
			repeat: -1,
			yoyo: true
		});
		this.nurse.anims.play('hospital_nurse_neutral', true);

		// this.add.rectangle(startX, startY, width, height, color, alpha/transparency)
		this.add.rectangle(275, 300, 150, 200, '#000000', 0)
		.setOrigin(0, 0)

		
	} // end of createObjects ()

	/*******************************************
	 * List of dialogue options with the nurse *
	 *******************************************/
	listReceptionChoices() {
		playerFnc.clearSubmenu(submenu);
		submenu.push(this.add.text(50, CONSTANTS.UI.SUBMENU_Y, 'QUESTION', { fontSize: CONSTANTS.TEXT.FONT_SIZE })
									.setInteractive()
									.on('pointerup', () => {
										tb.start(sceneText.reception.question.interact);
										this.listQuestions();
									})
		);

		submenu.push(this.add.text(360, CONSTANTS.UI.SUBMENU_Y, 'DONATE $5', { fontSize: CONSTANTS.TEXT.FONT_SIZE })
									.setInteractive()
									.on('pointerup', () => {
										playerFnc.clearSubmenu(submenu);
										if (this.playerData.stats.money >= 5) {
											tb.start(sceneText.reception.donate.thanks);
											this.playerData.stats.donations += 5;
											this.playerData.stats.money -= 5;
										} else {
											tb.start(sceneText.reception.donate.notEnough);
										}
									})
		);

		submenu.push(this.add.text(700, CONSTANTS.UI.SUBMENU_Y, 'CHECK UP', { fontSize: CONSTANTS.TEXT.FONT_SIZE })
									.setInteractive()
									.on('pointerup', () => {
										playerFnc.clearSubmenu(submenu);
										tb.start(sceneText.reception.checkin.confirm);
										let health = this.playerData.stats.health;

										if (health >= 8) {
											tb.start(sceneText.reception.checkup.good);
										} else if (health >= 4) {
											tb.start(sceneText.reception.checkup.neutral);
										} else {
											tb.start(sceneText.reception.checkup.bad);
										}

										playerFnc.changeTime(this.playerData, 10);
									})
		);

		if (!this.playerData.hospital.grandma)
		submenu.push(this.add.text(50, CONSTANTS.UI.SUBMENU_Y + 100, "> Where's the old lady?", { fontSize: CONSTANTS.TEXT.FONT_SIZE })
									.setInteractive()
									.on('pointerup', () => {
										tb.start(sceneText.reception.grandma);
									})
		);
	}

	/**************************************
	 * List of questions to ask the nurse *
	 **************************************/
	listQuestions() {
		playerFnc.clearSubmenu(submenu);

		submenu.push(this.add.text(10, CONSTANTS.UI.SUBMENU_Y, '> How do I help?', { fontSize: CONSTANTS.TEXT.FONT_SIZE })
									.setInteractive()
									.on('pointerup', () => {
					
										tb.start(sceneText.reception.question.question1[Math.floor(Math.random() * sceneText.reception.question.question1.length)]);
									})
		);
		
		submenu.push(this.add.text(10, CONSTANTS.UI.SUBMENU_Y + 40, '> Can I have a face mask?', { fontSize: CONSTANTS.TEXT.FONT_SIZE })
									.setInteractive()
									.on('pointerup', () => {
										tb.start(sceneText.reception.question.question3.answer);
									})
		);

		submenu.push(this.add.text(10, CONSTANTS.UI.SUBMENU_Y + 80, '> What\'s going to happen to the places around town?', { fontSize: CONSTANTS.TEXT.FONT_SIZE })
									.setInteractive()
									.on('pointerup', () => {
										tb.start(sceneText.reception.question.question5);
									})
		);
	}

	/*******************************************
	 * Arrows to indicate interactable objects *
	 *******************************************/
	addArrows() {
		// Right seats
		this.add.image(870, 340, 'red_arrow')
		.setOrigin(0, 0)
		.setDisplaySize(30, 30);

		// left chair
		this.add.image(50, 500, 'red_arrow')
		.setOrigin(0, 0)
		.setDisplaySize(30, 30);

		// nurse
		this.add.image(333, 270, 'red_arrow')
		.setOrigin(0, 0)
		.setDisplaySize(30, 30);

		// middle seats
		this.add.image(630, 340, 'red_arrow')
		.setOrigin(0, 0)
		.setDisplaySize(30, 30);
	
	}
}
