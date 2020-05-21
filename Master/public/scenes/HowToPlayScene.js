import {CONSTANTS} from '../js/CONSTANTS.js';
import {playerData} from '../js/playerData.js';

let KEY = CONSTANTS.SCENES.HOWTOPLAY;
let content1 = "Object: Survive three days. You're free to do whatever you want in the game, provided it's available.\n\nThere will be a few things that you'll need to keep track of: your hunger, happiness and the hidden world health."
let content2 = "indicates an object is interactable, just click it and something will happen."
let content3 = "Based on your decisions in the game, you may cause the world's health to decline."


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

		let style = {fontSize: CONSTANTS.TEXT.FONT_SIZE,
			 wordWrap: { width: 850}
		};

		this.add.text(0, 100, "Back", {fontSize: 30})
		.setInteractive()
		.on('pointerup', () => {
			this.scene.setVisible(true, CONSTANTS.SCENES.INTRO);
			this.scene.stop();
		});


		this.add.text(300, 10,
			"Welcome to Epicdemic!", {fontSize: CONSTANTS.TEXT.FONT_SIZE + 10});

		this.mainText = this.add.text(50, 300, content1, style);
		this.add.image(50, 500, 'red_arrow').setDisplaySize(30, 30);
		this.add.text(90, 500, content2, style);
	} // end of create

	update() {

	}

}