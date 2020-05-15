import { CONSTANTS } from '../globalvars/CONSTANTS.js';
import { playerData } from '../globalvars/playerData.js';
import * as playerFnc from '../globalvars/playerData.js';
import * as textbox from '../functions/textbox.js'
import * as sceneFnc from '../functions/sceneFunctions.js'
import { sceneText } from '../dialogue/HomeText.js';

let KEY = CONSTANTS.SCENES.HOME;
let tb;
let submenu = [];

let computerOn = false;
let mainButtons;
let warnMsg = false;

export class HomeScene extends Phaser.Scene {
	constructor() {
		super({
			key: KEY
		});

	}

	init() {
		console.log("Loaded " + KEY);
		sceneFnc.checkDistance(playerData.location, KEY);
		playerData.location = KEY;

		console.log(playerData);
	}

	// Load assets
	preload() {
		// Textbox assets
		this.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
	}

	// Load game objects
	create() {

		// Scene image
		this.add.image(16, 100, 'house_bg')
			.setOrigin(0, 0)
			.setDisplaySize(918, 650);

		// Textbox at the bottom of the screen
		tb = textbox.createTextBox(this,
			100,
			CONSTANTS.UI.SCREEN_HEIGHT - 300, {
			wrapWidth: 650,
		});

		// Message when entering the scene
		if (!playerData.tutorial_done) {
			tb.start(sceneText.intro, CONSTANTS.TEXT.TEXT_SPEED);
			playerData.tutorial_done = true;
		} else {
			tb.start("At home", CONSTANTS.TEXT.TEXT_SPEED);
		}

		// Creates all the menu buttons for the scene
		this.createObjects();

		// Return to Overworld
		this.add.image(375, 730, 'red_arrow').setDisplaySize(30, 30)
			.setInteractive()
			.on('pointerup', () => {
				this.scene.start(CONSTANTS.SCENES.OVERWORLD);
			});

	}

	update() {

	}

	// ==================================================================================================================

	/* All the interactable objects in the scene are made here */
	createObjects() {

		// Bed
		this.bed = this.add.image(639, 353, 'house_bed')
			.setInteractive()
			.on('pointerup', () => {
					playerFnc.clearSubmenu(submenu);

				this.listBedChoices();
				tb.start(sceneText.bed.interact, CONSTANTS.TEXT.TEXT_SPEED);
				computerOn = false;	
			});

		this.add.image(645, 200, 'red_arrow').setDisplaySize(30, 30);

		// Computer
		this.computer = this.add.image(812, 422, 'house_computer')
			.setInteractive()
			.on('pointerup', () => {
				playerFnc.clearSubmenu(submenu);

				let str = '';
				if (!computerOn) {
					playerFnc.changeTime(5);
					computerOn = true;
					str += sceneText.comp.interact + '\n';
					tb.start(str + 'You have ' + playerData.messages.length 
					+ ' message(s)', CONSTANTS.TEXT.TEXT_SPEED);
					this.listCompChoices();
				}
			});
			this.add.image(812, 342, 'red_arrow').setDisplaySize(30, 30);

		// Sink
		this.sink = this.add.image(346, 325, 'house_sink')
			.setInteractive()
			.on('pointerup', () => {
				playerFnc.clearSubmenu(submenu);

				this.washHands();
				computerOn = false;
			});
		this.add.image(346, 225, 'red_arrow').setDisplaySize(30, 30);

		// Fridge
		this.fridge = this.add.image(212, 303, 'house_fridge')
			.setInteractive()
			.on('pointerup', () => {
				playerFnc.clearSubmenu(submenu);
				computerOn = false;

				this.listFridgeChoices();

				tb.start('You have:\n' + playerFnc.fridgeContents(), CONSTANTS.TEXT.TEXT_SPEED);
			});
			this.add.image(212, 150, 'red_arrow').setDisplaySize(30, 30);

		// Storage Unit
		this.storage = this.add.image(468, 350, 'house_cabinet')
			.setInteractive()
			.on('pointerup', () => {
				playerFnc.clearSubmenu(submenu);

				let tpCheck = (playerData.storage.toilet_paper < 1) ? 
					sceneText.storage.noToiletPaper : '';

				tb.start('You have:\n' + playerFnc.storageContents() + '\n' + tpCheck, 
					CONSTANTS.TEXT.TEXT_SPEED);
				computerOn = false;
			});
			this.add.image(468, 280, 'red_arrow').setDisplaySize(30, 30);

			mainButtons = [this.bed, this.computer, this.sink, this.fridge, this.storage];
	} // end of create objects function

	// COMPUTER CHOICES -------------------------------------------------------------------------------------------------
	listCompChoices() {
		this.compNews = this.add.text(110, CONSTANTS.UI.SUBMENU_Y, 'NEWS', { fontSize: CONSTANTS.TEXT.FONT_SIZE })
			.setInteractive()
			.on('pointerup', () => {
				if (playerData.stats.day == 1) { tb.start(sceneText.comp.news.day1); }
				else if (playerData.stats.health >= 7) { tb.start(sceneText.comp.news.good, CONSTANTS.TEXT.TEXT_SPEED); }
				else if (playerData.stats.health >= 5) { tb.start(sceneText.comp.news.neutral, CONSTANTS.TEXT.TEXT_SPEED); }
				else if (playerData.stats.health >= 3) { tb.start(sceneText.comp.news.bad, CONSTANTS.TEXT.TEXT_SPEED); }
				else if (playerData.stats.health >= 1) { tb.start(sceneText.comp.news.terrible, CONSTANTS.TEXT.TEXT_SPEED); }
				else { tb.start(sceneText.comp.news.critical, CONSTANTS.TEXT.TEXT_SPEED); }
			});

		this.compMessages = this.add.text(300, CONSTANTS.UI.SUBMENU_Y, 'MESSAGES', { fontSize: CONSTANTS.TEXT.FONT_SIZE })
			.setInteractive()
			.on('pointerup', () => {
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

		this.compGame = this.add.text(500, CONSTANTS.UI.SUBMENU_Y, 'GAME', { fontSize: CONSTANTS.TEXT.FONT_SIZE })
			.setInteractive()
			.on('pointerup', () => {
				this.playCompGame();
			});

		this.compShutDown = this.add.text(675, CONSTANTS.UI.SUBMENU_Y, 'SHUTDOWN', { fontSize: CONSTANTS.TEXT.FONT_SIZE })
			.setInteractive()
			.on('pointerup', () => {
				computerOn = false;
				tb.start(sceneText.comp.shutdown, CONSTANTS.TEXT.TEXT_SPEED);

				playerFnc.clearSubmenu(submenu);
			});

		submenu = [this.compNews, this.compMessages, this.compGame, this.compShutDown];
	}

	// BED CHOICES ------------------------------------------------------------------------------------------------------
	listBedChoices() {
		this.sleepTxt = this.add.text(0, CONSTANTS.UI.SUBMENU_Y, 'SLEEP:', { fontSize: CONSTANTS.TEXT.FONT_SIZE })
		this.bedYes = this.add.text(200, CONSTANTS.UI.SUBMENU_Y, 'YES', { fontSize: CONSTANTS.TEXT.FONT_SIZE })
			.setInteractive()
			.on('pointerup', () => {
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
					playerFnc.clearSubmenu(submenu);
					tb.start(sceneText.bed.tooEarly, CONSTANTS.TEXT.TEXT_SPEED);
				}
			});

		this.bedNo = this.add.text(500, CONSTANTS.UI.SUBMENU_Y, 'NO', { fontSize: CONSTANTS.TEXT.FONT_SIZE })
			.setInteractive()
			.on('pointerup', () => {
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

			submenu = [this.sleepTxt, this.bedYes, this.bedNo];
	}

	// WASH HANDS -------------------------------------------------------------------------------------------------------
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

		playerFnc.changeTime(1);
	}

	// SLEEP ------------------------------------------------------------------------------------------------------------
	sleep() {
		let hoursOfSleep = 0;
		let startMinute = playerData.stats.minute;
		let minutesofSleep = ((60 - startMinute) != 60) ? 60 - startMinute : 0;
		
		if (startMinute != 0) {
			playerFnc.changeTime(minutesofSleep);
		}

		while(playerData.stats.hour != 9) {
			playerFnc.changeTime(60);
			hoursOfSleep++;
		}

		return 'You slept for ' + hoursOfSleep + ' hours and ' + minutesofSleep + ' minutes.';
	} // end of sleep

	listFridgeChoices() {
		let contents = playerData.fridge
		
		submenu.push(this.add.text(10, CONSTANTS.UI.SUBMENU_Y, 'EAT: ', {fontSize: CONSTANTS.TEXT.FONT_SIZE}));

		submenu.push(this.add.text(110, CONSTANTS.UI.SUBMENU_Y, 'APPLE ', {fontSize: CONSTANTS.TEXT.FONT_SIZE})
									.setInteractive()
									.on('pointerup', () => {
										this.eat('apple')
									}));
		submenu.push(this.add.text(110, CONSTANTS.UI.SUBMENU_Y + 50, 'RAMEN ', {fontSize: CONSTANTS.TEXT.FONT_SIZE})
									.setInteractive()
									.on('pointerup', () => {
										this.eat('ramen')
									}));
		submenu.push(this.add.text(110, CONSTANTS.UI.SUBMENU_Y + 100, 'BREAD ', {fontSize: CONSTANTS.TEXT.FONT_SIZE})
									.setInteractive()
									.on('pointerup', () => {
										this.eat('bread')
									}));
	} // end of fridge choices

	// EAT --------------------------------------------------------------------------------------------------------------
	eat(item) {
		switch(item) {
			case 'apple':
					if (playerData.fridge.apple > 0) {
						playerData.fridge.apple--;
						tb.start("You eat an apple", CONSTANTS.TEXT.TEXT_SPEED);
						playerFnc.changeHunger(1);
						playerFnc.changeTime(5);
					} else {
						if (!warnMsg) {
							warnMsg = true;
							tb.start("You don't have any", CONSTANTS.TEXT.TEXT_SPEED);
							sceneFnc.disableButtons(mainButtons);
							this.time.addEvent({
								delay: 1500,
								callback: () => {
									tb.start('You have:\n' + playerFnc.fridgeContents(), CONSTANTS.TEXT.TEXT_SPEED);
									sceneFnc.enableButtons(mainButtons);
									warnMsg = false;
								},
								callbackScope: this
							});
						}
					}
				break;
			case 'ramen':
				if (playerData.fridge.instant_ramen > 0) {
					playerData.fridge.ramen--;
					tb.start("You eat some ramen. It's not the healthiest thing", CONSTANTS.TEXT.TEXT_SPEED);
					playerFnc.changeHunger(2);
					playerData.stats.health -= 2;
					playerFnc.changeTime(10);
				} else {
					if (!warnMsg) {
						warnMsg = true;
						tb.start("You don't have any", CONSTANTS.TEXT.TEXT_SPEED);
						sceneFnc.disableButtons(mainButtons);
						this.time.addEvent({
							delay: 1500,
							callback: () => {
								tb.start('You have:\n' + playerFnc.fridgeContents(), CONSTANTS.TEXT.TEXT_SPEED);
								sceneFnc.enableButtons(mainButtons);
								warnMsg = false;
							},
							callbackScope: this
						});
					}
				}
				break;
			case 'bread':
				if (playerData.fridge.bread > 0) {
					playerData.fridge.bread--;
					tb.start("You eat some bread. It fills you up quite a bit", CONSTANTS.TEXT.TEXT_SPEED);
					playerFnc.changeHunger(5);
					playerFnc.changeTime(5);
				} else {
					if (!warnMsg) {
						warnMsg = true;
						tb.start("You don't have any", CONSTANTS.TEXT.TEXT_SPEED);
						sceneFnc.disableButtons(mainButtons);
						this.time.addEvent({
							delay: 1500,
							callback: () => {
								tb.start('You have:\n' + playerFnc.fridgeContents(), CONSTANTS.TEXT.TEXT_SPEED);
								sceneFnc.enableButtons(mainButtons);
								warnMsg = false;
							},
							callbackScope: this
						});
					}
				}
				break;
			default:
		}

	} // end of eat

	// PLAY COMP GAME ---------------------------------------------------------------------------------------------------
	playCompGame() {
		let choice = Math.floor(Math.random() * sceneText.comp.game.healthy.length);
		if (playerData.stats.happiness < 1) {
			tb.start(sceneText.comp.game.unhappy);
		} else if (playerData.stats.happiness < 6) {
			playerData.stats.happiness--;
			tb.start(sceneText.comp.game.tilted);
			playerFnc.changeTime(30);
		 } else if (choice == 1) {
			playerData.stats.happiness++;
			tb.start(sceneText.comp.game.healthy[choice]);
			playerFnc.changeTime(30);
		 } else {
			playerData.stats.happiness--;
			tb.start(sceneText.comp.game.healthy[choice]);
			playerFnc.changeTime(30);
		}
		
	} // end of game

	// STORAGE CHOICES --------------------------------------------------------------------------------------------------
	listStorageChoices() {
		playerFnc.clearSubmenu(submenu);

		// Wear a mask
		if (playerData.storage.masks > 0) {
			console.log('Wearing mask');
			submenu.push(
				this.add.text(200, SUBMENU_Y, 'WEAR MASK')
				.setInteractive()
				.on('pointerup', () => {
					tb.start(sceneText.comp.game.tilted);
				})
			);
		} // end of if statement
		
	} // end of storage choices

}