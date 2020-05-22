import {CONSTANTS} from '../js/CONSTANTS.js';
import {playerData} from '../js/playerData.js';
import * as textbox from '/js/functions/textbox.js'

let KEY = CONSTANTS.SCENES.END;

let endFlag = false;
let tb;
let menuUp = false;

/***********************************************
 * Used to trigger listening to end events and *
 ***********************************************/
export class EndScene extends Phaser.Scene {
	constructor() {
		super({
			key: KEY
		});
	}

	// Initializes the scene
	init (data) {
		this.playerData = data.playerData;
		uiScene = this.scene.get(CONSTANTS.SCENES.UI);

		this.scene.setVisible(false);
	}

	// Load assets
	preload() {
		this.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
		this.load.image('nextPage', '/assets/images/arrow-down-left.png');
	}

	// Load game objects
	create () {
		
	}

	update() {

		// Checks if the world is ending
		if (!endFlag && (this.playerData.stats.day >= 4
			|| this.playerData.stats.hunger < 1
			|| this.playerData.stats.health == 0)) {
			this.endgame();
		}

		// Creates the PLAY AGAIN button
		if (tb != undefined && !tb.isTyping && tb.isLastPage && !menuUp) {
			this.add.text(400, 700, "PLAY AGAIN", {fontSize: CONSTANTS.TEXT.FONT_SIZE})
			.setInteractive()
			.on('pointerup', () => {
				this.playerData = JSON.parse(JSON.stringify(playerData));
				this.scene.start(CONSTANTS.SCENES.HOME, {playerData: this.playerData})
				.launch(CONSTANTS.SCENES.UI, {playerData: this.playerData});
				menuUp = true;
			});
		}

		// Checks the world health and updates things appropriately
		this.checkWorldHealth();
	}

/********************************
 * Triggers the end of the game *
 ********************************/
	endgame() {
		endFlag = true;
		this.scene.stop(CONSTANTS.SCENES.UI);
		this.scene.pause(CONSTANTS.SCENES.UI);
		this.scene.stop(this.playerData.location);
		this.scene.setVisible(true, CONSTANTS.SCENES.END);
		tb = textbox.createEndTextBox(this, 250, 300, 
			{wrapWidth: 650})
			.start(this.calculateScore(), CONSTANTS.TEXT.TEXT_SPEED);
		
	}	

	/*************************************************************
   * Sets certain events up in the world based on world health *
   *************************************************************/
	checkWorldHealth() {
		// Good health 8-10
		if (this.playerData.stats.health < 7) {
			this.playerData.hospital.grandma = false;
		}

		// Bad health 4-7
		

		// Critical health 1-3

	}

	/*****************************************************************************
	Score is calculated by adding happiness and hunger, multiplying them by 10.
	The health of the world is multiplied by 20 and added to this.
	If the player has a mask on they gain another 50 points.
	Every time they spend time with their friend they gain 10 points.
	Bad decisions lower score by 10 points per decision. Finding the secret adds
	100 points. If you end the game wearing a mask you are given 
	******************************************************************************/
	calculateScore() {
		let score = this.playerData.stats.happiness * 10 + this.playerData.stats.hunger * 10 
			- this.playerData.stats.bad_decisions * 10 + this.playerData.stats.health * 20
			+ this.playerData.stats.event_done * 50;

		if (this.playerData.inventory.mask) { score += 50; }
		if (this.playerData.secret) { score += 50; }

		let str = "";
		if (this.playerData.stats.day >= 4) {
			str += "Congratulations! You survived!"
			str += "\nGame completion: 200";
			score += 200;
		} else if (this.playerData.stats.hunger < 1) {
			str += "Unforunately, you starved."
		} else if (this.playerData.stats.happiness < 1) {
			str += "You die of a broken heart. Make sure to keep your mental health up too!"
		} else if (this.playerData.stats.health < 1) {
			str += "The world was overtaken by the virus."
		}

		str += "\nHappiness: " + this.playerData.stats.happiness * 10;
		str += "\nHunger: " + this.playerData.stats.hunger * 10;
		str += "\nWorld Health: " + this.playerData.stats.health * 20;
		str += "\nDonations: " + this.playerData.stats.donations;
		str += "\nEvents done: " + this.playerData.stats.event_done * 10;
		str += "\nWearing a mask: " + ((this.playerData.inventory.mask) ? "50" : "0");
		str += "\nEaster egg found: " + ((this.playerData.secret) ? "50" : "0");
		str += "\nBad decisions made: -" + this.playerData.stats.bad_decisions * 10;
		str += "\nScore: " + score;
		
		this.postScore(score);
		return str;
	}

	/**********************************************
	 * Send the score to the leaderboards         *
	 * @param {Number} score is the score to post *
	 **********************************************/
	postScore(score) {
		let data = {
			score: score
		};
		$.ajax({
			url:"/saveScore",
			type: 'POST',
			data: data,
			dataType: 'json',
			success: function(result) {
				console.log("Score Saved to database");
			}
		});
	}

}