import {CONSTANTS}    from '../globalvars/CONSTANTS.js';
import {playerData}   from '../globalvars/playerData.js';
import * as playerFnc from '../globalvars/playerData.js';
import * as textbox   from '../functions/textbox.js' 
import {sceneText}     from '../dialogue/HomeText.js';

let KEY = CONSTANTS.SCENES.HOME;
let tb;
let submenu;

export class HomeScene extends Phaser.Scene {
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
	}

	// Load game objects
	create () {
		// Textbox at the bottom of the screen
		tb  = textbox.createTextBox(this, 
			100, 
			CONSTANTS.UI.SCREEN_HEIGHT - 600, {
			wrapWidth: 650,
		});

		// Message when entering the scene
		tb.start("At home", CONSTANTS.TEXT.TEXT_SPEED);

		// Creates all the menu buttons for the scene
		this.createObjects();

		// Return to Overworld
		this.theatreButton = this.add.text(
			CONSTANTS.UI.SCREEN_WIDTH - 400, 10, ' Return to Overworld', {fontSize: CONSTANTS.TEXT.FONT_SIZE})
		.setInteractive()
		.once('pointerdown', () => {
			this.scene.start(CONSTANTS.SCENES.OVERWORLD);
		});

		// Location name
		this.add.text(10, 10, KEY, {fill: '#0f0', fontSize: CONSTANTS.TEXT.FONT_SIZE})
	}

	/* All the interactable objects in the scene are made here */
	createObjects () {

		// Computer
		this.computer = this.add.text(100, 100, 'Computer', {fontSize: CONSTANTS.TEXT.FONT_SIZE})
		.setInteractive()
		.on('pointerdown', () => {
			playerFnc.clearSubmenu(submenu);

			console.log(playerFnc.changeTime(1));
			this.listCompChoices();
			tb.start(sceneText.comp.interact 
				+ '\nYou have ' + playerData.messages.length + ' message(s)', CONSTANTS.TEXT.TEXT_SPEED);
		});

		// Sink
		this.sink = this.add.text(100, 200, 'Sink', {fontSize: CONSTANTS.TEXT.FONT_SIZE})
		.setInteractive()
		.on('pointerdown', () => {
			playerFnc.clearSubmenu(submenu);

			if (this.washHands()) {
				playerData.storage.soap--;
				playerData.stats.health += 3;
				console.log(playerData.storage.soap);
			}
		});

		// Fridge
		this.fridge = this.add.text(100, 300, 'Fridge', {fontSize: CONSTANTS.TEXT.FONT_SIZE})
		.setInteractive()
		.on('pointerdown', () => {
			playerFnc.clearSubmenu(submenu);

			tb.start('You have:\n' + playerFnc.fridgeContents(), CONSTANTS.TEXT.TEXT_SPEED);
		});

		// Storage Unit
		this.storage = this.add.text(100, 400, 'Storage Unit', {fontSize: CONSTANTS.TEXT.FONT_SIZE})
		.setInteractive()
		.on('pointerdown', () => {
			playerFnc.clearSubmenu(submenu);

			tb.start('You have:\n' + playerFnc.storageContents(), CONSTANTS.TEXT.TEXT_SPEED);
		});

		// Bed
		this.storage = this.add.text(100, 500, 'Bed', {fontSize: CONSTANTS.TEXT.FONT_SIZE})
		.setInteractive()
		.on('pointerdown', () => {
			playerFnc.clearSubmenu(submenu);
			
			tb.start(sceneText.bed.interact, CONSTANTS.TEXT.TEXT_SPEED);
		});

	} // end of create objects function

	// Choices when Computer is clicked
	listCompChoices () {
		this.compNews = this.add.text(400, 100, 'News', {fontSize: CONSTANTS.TEXT.FONT_SIZE})
		.setInteractive()
		.on('pointerdown', () => {
			if (playerData.stats.day == 1) {tb.start(sceneText.comp.news.day1);}
			else if (playerData.stats.health >= 70) {tb.start(sceneText.comp.news.good, CONSTANTS.TEXT.TEXT_SPEED);}
			else if (playerData.stats.health >= 50) {tb.start(sceneText.comp.news.neutral, CONSTANTS.TEXT.TEXT_SPEED);}
			else if (playerData.stats.health >= 30) {tb.start(sceneText.comp.news.bad, CONSTANTS.TEXT.TEXT_SPEED);}
			else if (playerData.stats.health >= 10) {tb.start(sceneText.comp.news.terrible, CONSTANTS.TEXT.TEXT_SPEED);}
			else { tb.start(sceneText.comp.news.critical, CONSTANTS.TEXT.TEXT_SPEED);}
		});

		this.compMessages = this.add.text(400, 200, 'Messages', {fontSize: CONSTANTS.TEXT.FONT_SIZE})
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

		this.compOrder = this.add.text(400, 300, 'Order online', {fontSize: CONSTANTS.TEXT.FONT_SIZE})
		.setInteractive()
		.on('pointerdown', () => {
		
		});

		this.compShutDown = this.add.text(400, 400, 'Shutdown', {fontSize: CONSTANTS.TEXT.FONT_SIZE})
		.setInteractive()
		.on('pointerdown', () => {
			tb.start(sceneText.comp.shutdown, CONSTANTS.TEXT.TEXT_SPEED);

			playerFnc.clearSubmenu(submenu);
		});

		submenu = [this.compNews, this.compMessages, this.compOrder, this.compShutDown];
	}

	washHands () {
		let soapCheck = (playerData.storage.soap > 0);
		let withSoap = (soapCheck) ? 'with' : 'without';
		let noSoap = (soapCheck) ? '. +3 health' : '. There is no effect'

		tb.start(sceneText.sink.interact + ' ' + withSoap + ' soap' + noSoap, CONSTANTS.TEXT.TEXT_SPEED);

		console.log(playerFnc.changeTime(1));

		return soapCheck > 0;
	}
}