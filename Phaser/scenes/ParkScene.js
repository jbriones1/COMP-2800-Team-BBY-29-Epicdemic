import { CONSTANTS } from '../globalvars/CONSTANTS.js';
import { playerData } from '../globalvars/playerData.js';
import * as playerFnc from '../globalvars/playerData.js';
import * as textbox from '../functions/textbox.js'
import * as sceneFnc from '../functions/sceneFunctions.js'
import { sceneText } from '../dialogue/ParkText.js';

let KEY = CONSTANTS.SCENES.PARK;
let tb;
let submenu = [];

export class ParkScene extends Phaser.Scene {
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
		this.load.image('park_bg', '../assets/backgrounds/park.png')
		this.load.spritesheet('park_girl', '../characterspritesheet/girl1.png', { frameWidth: 31, frameHeight: 48 })
	}
	
	// Load game objects
	create () {
		//Scene image
		this.add.image(15, 100, 'park_bg')
			.setOrigin(0, 0)
			.setDisplaySize(918, 650);
		
		// Textbox at the bottom of the screen
		tb = textbox.createTextBox(this,
			100,
			CONSTANTS.UI.SCREEN_HEIGHT - 300, {
			wrapWidth: 650,
		});

		// Message when entering the scene
		tb.start("At Park", CONSTANTS.TEXT.TEXT_SPEED);

		// Return to Overworld
		this.theatreButton = this.add.text(
			CONSTANTS.UI.SCREEN_WIDTH - 100, 50, 'Map',{ fontSize: CONSTANTS.TEXT.FONT_SIZE })
			.setInteractive()
			.once('pointerdown', () => {
				this.scene.start(CONSTANTS.SCENES.OVERWORLD);
		});
		//location name
		// this.add.text(20, 50, KEY, {fill: '#0f0', fontSize: CONSTANTS.TEXT.FONT_SIZE})

		//create object buttons
		this.createObjects();
		
		this.anims.create({
			key: 'park_girl_neutral',
			frames: this.anims.generateFrameNumbers('park_girl', {start: 0, end: 2}),
			frameRate: 3,
			repeat: -1,
			yoyo: true
		});	
		//add person girl 1
		let park_girl = this.add.sprite(435, 355, 'park_girl', 1)
		.setDisplaySize(45, 75)
		.setInteractive()
		.on('pointerdown', () => {
			playerFnc.clearSubmenu(submenu);
			tb.start(sceneText.person1.interact, CONSTANTS.TEXT.TEXT_SPEED)
			this.listPersonChoices();
		})
		park_girl.anims.play('park_girl_neutral', true);
	}

	createObjects(){
		//fountain button
		this.add.rectangle(265, 335, 132, 108,'#000000', 0)
		.setOrigin(0,0)
		.setInteractive()
		.on('pointerdown', () => {
			playerFnc.clearSubmenu(submenu);
			tb.start(sceneText.fountain.interact, CONSTANTS.TEXT.TEXT_SPEED)
			this.listFountainChoices();
		})
		//trail 1
		this.add.rectangle(405, 410, 55, 270,'#000000', 0)
		.setOrigin(0,0)
		.setInteractive()
		.on('pointerdown', () => {
			playerFnc.clearSubmenu(submenu);
			tb.start(sceneText.trails.interact, CONSTANTS.TEXT.TEXT_SPEED)
			this.listTrailsChoices();
		})
		//trail 2
		this.add.rectangle(450, 410, 270, 55,'#000000', 0)
		.setOrigin(0,0)
		.setInteractive()
		.on('pointerdown', () => {
			playerFnc.clearSubmenu(submenu);
			tb.start(sceneText.trails.interact, CONSTANTS.TEXT.TEXT_SPEED)
			this.listTrailsChoices();
		})
		//trail 3
		this.add.rectangle(718, 0, 55, 750,'#000000', 0)
		.setOrigin(0,0)
		.setInteractive()
		.on('pointerdown', () => {
			playerFnc.clearSubmenu(submenu);
			tb.start(sceneText.trails.interact, CONSTANTS.TEXT.TEXT_SPEED)
			this.listTrailsChoices();
		})
		//trail 4
		this.add.rectangle(0, 670, 320, 55,'#000000', 0)
		.setOrigin(0,0)
		.setInteractive()
		.on('pointerdown', () => {
			playerFnc.clearSubmenu(submenu);
			tb.start(sceneText.trails.interact, CONSTANTS.TEXT.TEXT_SPEED)
			this.listTrailsChoices();
		})
		//trail 5
		this.add.rectangle(265, 625, 150, 55,'#000000', 0)
		.setOrigin(0,0)
		.setInteractive()
		.on('pointerdown', () => {
			playerFnc.clearSubmenu(submenu);
			tb.start(sceneText.trails.interact, CONSTANTS.TEXT.TEXT_SPEED)
			this.listTrailsChoices();
		})
	}
	/* PARK GIRL CODE */
	listPersonChoices() {
		//add submenu.push to do wrap it around
		submenu.push(this.add.text(20, CONSTANTS.UI.SUBMENU_Y, "QUESTION", {fontSize: CONSTANTS.TEXT.FONT_SIZE})
			.setInteractive()
			.on('pointerdown', () => {
				tb.start(sceneText.person1.question.answer1, CONSTANTS.TEXT.TEXT_SPEED);
		 	})
		);
	}
	//Founctain choices
	listFountainChoices() {
		submenu.push(this.add.text(20, CONSTANTS.UI.SUBMENU_Y, "DRINK", {fontSize: CONSTANTS.TEXT.FONT_SIZE})
			.setInteractive()
			.on('pointerdown', () => {
				tb.start(sceneText.fountain.drink, CONSTANTS.TEXT.TEXT_SPEED);
		 	})
		);

		submenu.push(this.add.text(300, CONSTANTS.UI.SUBMENU_Y, "LEAVE", {fontSize: CONSTANTS.TEXT.FONT_SIZE})
			.setInteractive()
			.on('pointerdown', () => {
				tb.start(sceneText.fountain.leave, CONSTANTS.TEXT.TEXT_SPEED);
		 	})
		);
	}
	//Trail Choices
	listTrailsChoices(){
		submenu.push(this.add.text(20, CONSTANTS.UI.SUBMENU_Y, "WALK", {fontSize: CONSTANTS.TEXT.FONT_SIZE})
			.setInteractive()
			.on('pointerdown', () => {
				tb.start(sceneText.trails.walk, CONSTANTS.TEXT.TEXT_SPEED);
		 	})
		);

		submenu.push(this.add.text(300, CONSTANTS.UI.SUBMENU_Y, "EXAMINE", {fontSize: CONSTANTS.TEXT.FONT_SIZE})
			.setInteractive()
			.on('pointerdown', () => {
				tb.start(sceneText.trails.examine.good, CONSTANTS.TEXT.TEXT_SPEED);
		 	})
		);

	}

}