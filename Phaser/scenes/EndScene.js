import {CONSTANTS} from '../globalvars/CONSTANTS.js';
import {playerData} from '../globalvars/playerData.js';
import * as textbox from '../functions/textbox.js'

let KEY = CONSTANTS.SCENES.END;
let uiText;
let uiScene;
let endFlag = false;

export class EndScene extends Phaser.Scene {
	constructor() {
		super({
			key: KEY
		});
	}

	init () {
		uiScene = this.scene.get(CONSTANTS.SCENES.UI);
		console.log("Loaded " + KEY);
		this.scene.setVisible(false);
	}

	// Load assets
	preload() {
		this.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
		this.load.image('nextPage', '../assets/images/arrow-down-left.png');
	}

	// Load game objects
	create () {

	}

	update() {

		if (!endFlag && (playerData.stats.day >= 6 
			|| playerData.stats.hunger < 1
			|| playerData.stats.health == 0)) {
			this.endgame();
		}

		// Checks the world health and updates things appropriately
		this.checkWorldHealth();
	}

	endgame() {
		endFlag = true;
		this.scene.pause(CONSTANTS.SCENES.UI);
		this.scene.stop(playerData.location);
		this.scene.setVisible(true, CONSTANTS.SCENES.END);
		textbox.createEndTextBox(this, 250, 300, 
			{wrapWidth: 650})
			.start(this.calculateScore(), CONSTANTS.TEXT.TEXT_SPEED);
	}	

	// Checks to see whether some scenes need to be loaded differently
	checkWorldHealth() {
		// Good health 8-10
		if (playerData.stats.health < 7) {
			playerData.hospital.grandma = false;
		}

		// Bad health 4-7


		// Critical health 1-3

	}

	/* 
	Score is calculated by adding happiness and hunger, multiplying them by 10.
	The health of the world is multiplied by 20 and added to this.
	If the player has a mask on they gain another 50 points.
	Every time they spend time with their friend they gain 10 points.
	Bad decisions lower score by 10 points per decision. Finding the secret adds
	100 points. If you end the game wearing a mask you are given 
	*/
	calculateScore() {
		let score = playerData.stats.happiness * 10 + playerData.stats.hunger * 10 
			- playerData.stats.bad_decisions * 10 + playerData.stats.health * 20
			+ playerData.stats.event_done * 50;

		if (playerData.inventory.mask) { score += 50; }
		if (playerData.secret) { score += 50; }
		let str = "Happiness: " + playerData.stats.happiness * 10;
		str += "\nHunger: " + playerData.stats.hunger * 10;
		str += "\nWorld Health: " + playerData.stats.health * 20;
		str += "\nEvents done: " + playerData.stats.event_done * 10;
		str += "\nWearing a mask: " + ((playerData.inventory.mask) ? "50" : "0");
		str += "\nEaster egg found: " + ((playerData.secret) ? "50" : "0");
		str += "\nBad decisions made: -" + playerData.stats.bad_decisions * 10;
		str += "\nScore: " + score;
		return str;
	}

}