import {CONSTANTS} from '../js/CONSTANTS.js';

let KEY = CONSTANTS.SCENES.HOWTOPLAY;
let content1 = "Objective: Survive three days.\n\nExplore Crowntown, engage in activities with friends, but be careful with how you do it."
let content2 = "indicates an object is interactable. Clicking on the object it points to will trigger something\n"
let content3 = "Based on your decisions in the game, you may cause the world's health to decline. Be careful with your actions; you may be harming people with your actions."
let content4 = "Hunger and happiness are two stats that you need to keep up. If either reach zero you automatically fail. The world's health is also something to watch out for; your actions directly influence it. Good decisions increase health, bad decisions reduce it. You'll know when you make a bad decision."

/***********************************************************
 * HowToPlay scene.                                        *
 * Contains the instructions on how to play the game       *
 ***********************************************************/
export class HowToPlayScene extends Phaser.Scene {
	constructor() {
		super({
			key: KEY
		});
	}

	init () {
		this.scene.setVisible(false, CONSTANTS.SCENES.INTRO);
	}

	// Load assets
	preload() {
		this.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');

	}

	// Load game objects
	create () {

		// Styling used for the text on the screen
		let style = {fontSize: CONSTANTS.TEXT.FONT_SIZE,
			 wordWrap: { width: 850}
		};

		// Back button to return to the introscene
		this.add.text(0, 10, "Back", {fontSize: 30})
		.setInteractive()
		.on('pointerup', () => {
			this.scene.setVisible(true, CONSTANTS.SCENES.INTRO);
			this.scene.stop();
		});

		// Main content showing instructions
		this.add.text(300, 100,
			"Welcome to Epicdemic!", {fontSize: CONSTANTS.TEXT.FONT_SIZE + 10});

		this.mainText = this.add.text(50, 300, content1, style);
		this.add.text(50, 500, content3, style);
		this.add.image(50, 700, 'red_arrow').setDisplaySize(30, 30);
		this.add.text(90, 700, content2, style);
		this.add.text(50, 900, content4, style);
	} // end of create

	update() {

	}

}