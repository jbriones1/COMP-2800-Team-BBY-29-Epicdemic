import { CONSTANTS } from '../globalvars/CONSTANTS.js';
import { playerData } from '../globalvars/playerData.js';
import * as playerFnc from '../globalvars/playerData.js';
import * as textbox from '../functions/textbox.js'
import * as sceneFnc from '../functions/sceneFunctions.js'
import { sceneText } from '../dialogue/HospitalText.js';

let KEY = CONSTANTS.SCENES.HOSPITAL;

let tb;
let submenu = [];
let mainButtons = [];

let nurseTalk;
let grannyTalk = false;
let eggTalk = 0;

export class HospitalScene extends Phaser.Scene {
	constructor() {
		super({
			key: KEY
		});
	}

	init () {
		console.log("Loaded " + KEY);
		sceneFnc.checkDistance(playerData.location, KEY);
		playerData.location = KEY;

		console.log(playerData);
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
			this.scene.start(CONSTANTS.SCENES.OVERWORLD);
		});

	}

	update () {

		// Used when talking to the old grandma in the room
		if (grannyTalk && !tb.isTyping && tb.isLastPage) {
			grannyTalk = false;
			sceneFnc.enableButtons(mainButtons);
			playerFnc.changeTime(180);
		} // end of granny talking
	}

// ----------------------------------------------------------------------------

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
				playerFnc.changeTime(5);
			} else {
				tb.start(sceneText.seats.takeASeat.goodSeat, CONSTANTS.TEXT.TEXT_SPEED);
				playerFnc.changeTime(5);
			}
			
		});

		// Good seats
		this.goodSeats = this.add.rectangle(850, 400, 80, 250, '#000', 0)
		.setOrigin(0, 0)
		.setInteractive()
		.on('pointerup', () => {
			tb.start(sceneText.seats.takeASeat.goodSeat, CONSTANTS.TEXT.TEXT_SPEED);
			playerFnc.changeTime(5);
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

			if (eggTalk == 3 && !playerData.unlocked) {
				str += sceneText.grandma.egg;
				playerData.unlocked = true;
			} else {
				str += sceneText.grandma.interact;
				eggTalk++;
			}

			// If you're not wearing a mask
			if (!playerData.inventory.mask) {
				playerData.stats.health--;
				str += '. ' + sceneText.grandma.no_mask;
			}

			// You can't do anything else while talking to the old lady
			grannyTalk = true;
			sceneFnc.disableButtons(mainButtons);
			tb.start(str, CONSTANTS.TEXT.TEXT_SPEED * 3);
		});

		// Remove grandma if the world isn't healthy
		if (!playerData.hospital.grandma) {
			this.grandma.destroy();
		}

		mainButtons = [this.nurse, this.badSeats, this.goodSeat, this.goodSeats, this.grandma]

		// Nurse animation ------------------------------------------------------------------------------------------------
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

	/* RECEPTION CODE */
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
										if (playerData.stats.money >= 5) {
											tb.start(sceneText.reception.donate.thanks);
											playerData.stats.donations += 5;
											playerData.stats.money -= 5;
										} else {
											tb.start(sceneText.reception.donate.notEnough);
										}
									})
		);

		submenu.push(this.add.text(700, CONSTANTS.UI.SUBMENU_Y, 'CHECK UP', { fontSize: CONSTANTS.TEXT.FONT_SIZE })
									.setInteractive()
									.on('pointerup', () => {
										tb.start(sceneText.reception.checkin.confirm);
									})
		);

		if (!playerData.hospital.grandma)
		submenu.push(this.add.text(50, CONSTANTS.UI.SUBMENU_Y + 100, "> Where's the old lady?", { fontSize: CONSTANTS.TEXT.FONT_SIZE })
									.setInteractive()
									.on('pointerup', () => {
										tb.start(sceneText.reception.grandma);
									})
		);
	}

	listQuestions() {
		playerFnc.clearSubmenu(submenu);

		submenu.push(this.add.text(10, CONSTANTS.UI.SUBMENU_Y, '> How do I help?', { fontSize: CONSTANTS.TEXT.FONT_SIZE })
									.setInteractive()
									.on('pointerup', () => {

										if (nurseTalk == 5) {
											tb.start("")
										}
										
										tb.start(sceneText.reception.question.question1[Math.floor(Math.random() * sceneText.reception.question.question1.length)]);
									})
		);
		
		submenu.push(this.add.text(10, CONSTANTS.UI.SUBMENU_Y + 50, '> Can I have a face mask?', { fontSize: CONSTANTS.TEXT.FONT_SIZE })
									.setInteractive()
									.on('pointerup', () => {
										tb.start(sceneText.reception.question.question3.answer);
									})
		);
	}

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
