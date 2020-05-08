import { CONSTANTS } from '../globalvars/CONSTANTS.js';
import { playerData } from '../globalvars/playerData.js';
import * as playerFnc from '../globalvars/playerData.js';
import * as textbox from '../functions/textbox.js'
import * as sceneFnc from '../functions/sceneFunctions.js'
import { sceneText } from '../dialogue/HomeText.js';

let KEY = CONSTANTS.SCENES.HOME;
let tb;
let submenu;

let boy;
let computerOn = false;
let mainButtons;

export class HomeScene extends Phaser.Scene {
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
		// Textbox assets
		this.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
		this.load.image('nextPage', '../assets/images/arrow-down-left.png');

		this.load.spritesheet('boy', '../characterspritesheet/boy1.png', { frameWidth: 31, frameHeight: 48 });

		// House assets
		this.load.image('house_bg', '../assets/backgrounds/home/home_furnished.png');
		this.load.image('house_computer', '../assets/backgrounds/home/computer.png');
		this.load.image('house_cabinet', '../assets/backgrounds/home/cabinet.png');
		this.load.image('house_fridge', '../assets/backgrounds/home/fridge.png');
		this.load.image('house_sink', '../assets/backgrounds/home/sink.png');
		this.load.image('house_bed', '../assets/backgrounds/home/bed.png');
	}

	// Load game objects
	create() {

		// Scene image
		this.add.image(16, 100, 'house_bg')
			.setOrigin(0, 0)
			.setDisplaySize(918, 650);

		// boy = this.add.sprite(500, 500, 'boy')
		// 	.setDisplaySize(96, 144)
		// 	.setInteractive()
		// 	.on('pointerdown', () => {
		// 		tb.start('You hit the boy', 50);
		// 	});

		// this.anims.create({
		// 	key: 'neutral',
		// 	frames: this.anims.generateFrameNumbers('boy', { start: 0, end: 2 }),
		// 	frameRate: 3,
		// 	repeat: -1,
		// 	yoyo: true
		// });

		// Textbox at the bottom of the screen
		tb = textbox.createTextBox(this,
			100,
			CONSTANTS.UI.SCREEN_HEIGHT - 300, {
			wrapWidth: 650,
		});

		// Message when entering the scene
		tb.start("At home", CONSTANTS.TEXT.TEXT_SPEED);

		// Creates all the menu buttons for the scene
		this.createObjects();

		// Return to Overworld
		this.theatreButton = this.add.text(
			CONSTANTS.UI.SCREEN_WIDTH - 100, 10, 'Map', { fontSize: CONSTANTS.TEXT.FONT_SIZE })
			.setInteractive()
			.on('pointerdown', () => {
				this.scene.start(CONSTANTS.SCENES.OVERWORLD);
			});

		// Location name
		this.add.text(10, 10, KEY, { fill: '#0f0', fontSize: CONSTANTS.TEXT.FONT_SIZE })

		// UI
		sceneFnc.drawUI(this, 50);
	}

	/* All the interactable objects in the scene are made here */
	createObjects() {

		// Bed
		this.bed = this.add.image(639, 353, 'house_bed')
			.setInteractive()
			.on('pointerdown', () => {
					playerFnc.clearSubmenu(submenu);

				this.listBedChoices();
				tb.start(sceneText.bed.interact, CONSTANTS.TEXT.TEXT_SPEED);	
			});

		// Computer
		this.computer = this.add.image(812, 422, 'house_computer')
			.setInteractive()
			.on('pointerdown', () => {
				playerFnc.clearSubmenu(submenu);

				let str = '';
				if (!computerOn) {
					console.log(playerFnc.changeTime(5));
					computerOn = true;
					str += sceneText.comp.interact + '\n';
					tb.start(str + 'You have ' + playerData.messages.length 
					+ ' message(s)', CONSTANTS.TEXT.TEXT_SPEED);
				}
				this.listCompChoices();
			});

		// Sink
		this.sink = this.add.image(346, 325, 'house_sink')
			.setInteractive()
			.on('pointerdown', () => {
				playerFnc.clearSubmenu(submenu);

				this.washHands();
			});

		// Fridge
		this.fridge = this.add.image(212, 303, 'house_fridge')
			.setInteractive()
			.on('pointerdown', () => {
				playerFnc.clearSubmenu(submenu);

				tb.start('You have:\n' + playerFnc.fridgeContents(), CONSTANTS.TEXT.TEXT_SPEED);
			});

		// Storage Unit
		this.storage = this.add.image(468, 350, 'house_cabinet')
			.setInteractive()
			.on('pointerdown', () => {
				playerFnc.clearSubmenu(submenu);

				let tpCheck = (playerData.storage.toilet_paper < 1) ? 
					sceneText.storage.noToiletPaper : '';

				tb.start('You have:\n' + playerFnc.storageContents() + '\n' + tpCheck, 
					CONSTANTS.TEXT.TEXT_SPEED);
			});

			mainButtons = [this.bed, this.computer, this.sink, this.fridge, this.storage];
	} // end of create objects function

	update() {
		// boy.anims.play('neutral', true);
	}

	// Choices when Computer is clicked
	listCompChoices() {
		this.compNews = this.add.text(50, CONSTANTS.UI.SUBMENU_Y, 'News', { fontSize: CONSTANTS.TEXT.FONT_SIZE })
			.setInteractive()
			.on('pointerdown', () => {
				if (playerData.stats.day == 1) { tb.start(sceneText.comp.news.day1); }
				else if (playerData.stats.health >= 70) { tb.start(sceneText.comp.news.good, CONSTANTS.TEXT.TEXT_SPEED); }
				else if (playerData.stats.health >= 50) { tb.start(sceneText.comp.news.neutral, CONSTANTS.TEXT.TEXT_SPEED); }
				else if (playerData.stats.health >= 30) { tb.start(sceneText.comp.news.bad, CONSTANTS.TEXT.TEXT_SPEED); }
				else if (playerData.stats.health >= 10) { tb.start(sceneText.comp.news.terrible, CONSTANTS.TEXT.TEXT_SPEED); }
				else { tb.start(sceneText.comp.news.critical, CONSTANTS.TEXT.TEXT_SPEED); }
			});

		this.compMessages = this.add.text(200, CONSTANTS.UI.SUBMENU_Y, 'Messages', { fontSize: CONSTANTS.TEXT.FONT_SIZE })
			.setInteractive()
			.on('pointerdown', () => {
				if (playerData.messages == undefined || playerData.messages.length == 0) {
					tb.start(sceneText.comp.messages.None, CONSTANTS.TEXT.TEXT_SPEED);
				} else {
					let str = '';
					str += 'From: ' + playerData.messages[0].sender;
					str += '\n' + playerData.messages[0].message;
					for (let i = 1; i < playerData.messages.length; i++) {
						str += '\n\nFrom: ' + playerData.messages[i].sender;
						str += '\n' + playerData.messages[i].message;
					}
					tb.start(str, CONSTANTS.TEXT.TEXT_SPEED);
				}
			});

		this.compOrder = this.add.text(400, CONSTANTS.UI.SUBMENU_Y, 'Order online', { fontSize: CONSTANTS.TEXT.FONT_SIZE })
			.setInteractive()
			.on('pointerdown', () => {
				tb.start(sceneText.comp.order.interact);
			});

		this.compShutDown = this.add.text(700, CONSTANTS.UI.SUBMENU_Y, 'Shutdown', { fontSize: CONSTANTS.TEXT.FONT_SIZE })
			.setInteractive()
			.on('pointerdown', () => {
				computerOn = false;
				tb.start(sceneText.comp.shutdown, CONSTANTS.TEXT.TEXT_SPEED);

				playerFnc.clearSubmenu(submenu);
			});

		submenu = [this.compNews, this.compMessages, this.compOrder, this.compShutDown];
	}

	listBedChoices() {
		this.bedYes = this.add.text(200, CONSTANTS.UI.SUBMENU_Y, 'Yes', { fontSize: CONSTANTS.TEXT.FONT_SIZE })
			.setInteractive()
			.on('pointerdown', () => {
				if (playerData.stats.hour >= 21 || playerData.stats.hour < 8) {
					playerFnc.clearSubmenu(submenu);

					tb.start(sceneText.bed.sleepGood, CONSTANTS.TEXT.TEXT_SPEED);

					// Disables the buttons in the room temporarily
					sceneFnc.disableButtons(mainButtons);
					this.time.addEvent({
						delay: 1500,
						callback: () => {
							tb.start(sceneText.bed.wakeGood, CONSTANTS.TEXT.TEXT_SPEED);
							sceneFnc.enableButtons(mainButtons);
							this.sleep();
						},
						callbackScope: this
					});

					// Changes the day and time
				} else {
					tb.start(sceneText.bed.tooEarly, CONSTANTS.TEXT.TEXT_SPEED);
				}
			});

		this.bedNo = this.add.text(500, CONSTANTS.UI.SUBMENU_Y, 'No', { fontSize: CONSTANTS.TEXT.FONT_SIZE })
			.setInteractive()
			.on('pointerdown', () => {
				if (playerData.messages == undefined || playerData.messages.length == 0) {
					tb.start(sceneText.comp.messages.None, CONSTANTS.TEXT.TEXT_SPEED);
				} else {
					let str = '';

					if (playerData.stats.hour >= 21 || playerData.stats.hour < 8) {
						str += sceneText.bed.sleepSoon;
					} else {
						str += sceneText.bed.tooEarly;
					}
					
					tb.start(str, CONSTANTS.TEXT.TEXT_SPEED);
				}
			});

			submenu = [this.bedYes, this.bedNo];
	}

	washHands() {
		let soapCheck = (playerData.storage.soap > 0);
		let withSoap = (soapCheck) ? 'with' : 'without';
		let noSoap = (soapCheck) ? '. You feel healthier.' : '. There is no effect'

		if (soapCheck) {
			playerData.storage.soap--;
			playerData.stats.health +=3;
		}

		tb.start(sceneText.sink.interact + ' ' 
			+ withSoap + ' soap' + noSoap
			+ '\n\n\nYou have ' + playerData.storage.soap + ' soap left.', CONSTANTS.TEXT.TEXT_SPEED);

		console.log(playerFnc.changeTime(1));

	}

	sleep() {
		let hoursOfSleep = 0;
		let startMinute = playerData.stats.minute;
		let minutesofSleep = ((60 - startMinute) != 60) ? 60 - startMinute : 0;
		
		if (startMinute != 0) {
			playerFnc.changeTime(minutesofSleep);
		}

		while(playerData.stats.hour != 7) {
			playerFnc.changeTime(60);
			hoursOfSleep++;
		}

		console.log('Day ' + playerData.stats.day + '\nTime: ' + playerData.stats.hour + ':' + playerData.stats.minuteStr);
		return 'You slept for ' + hoursOfSleep + ' hours and ' + minutesofSleep + ' minutes.';
	}
}