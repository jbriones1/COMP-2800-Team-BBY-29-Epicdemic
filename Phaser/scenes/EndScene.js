import {CONSTANTS} from '../globalvars/CONSTANTS.js';
import {playerData} from '../globalvars/playerData.js';

let KEY = CONSTANTS.SCENES.END;
let uiText;
let uiScene;

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
		uiText = this.add.text(CONSTANTS.UI.SCREEN_WIDTH/2, CONSTANTS.UI.SCREEN_HEIGHT/2, 'ENDSCENE', {fontSize: '35px'});

	}

	update() {

		if (playerData.stats.day >= 6 || playerData.stats.hunger < 1) {
			this.endgame();
		}

		// Checks the world health and updates things appropriately
		this.checkWorldHealth();
	}

	endgame() {
		this.scene.pause(CONSTANTS.SCENES.UI);
		this.scene.stop(playerData.location);
		this.scene.setVisible(true, CONSTANTS.SCENES.END);
		textbox.createTextBox(this, 100, 300, 
			{wrapWidth: 650})
			.start();
	}	

	// Checks to see whether some scenes need to be loaded differently
	checkWorldHealth() {
		// Good health 7-10
		if (playerData.stats.health < 7) {
			playerData.hospital.grandma = false;
		}

		// Bad health 4-6


		// Critical health 1-3

	}

}