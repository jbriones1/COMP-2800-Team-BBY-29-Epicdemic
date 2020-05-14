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

		if (playerData.stats.day >= 6) {
			this.endgame();
		}
	}

	endgame() {
		this.scene.pause(CONSTANTS.SCENES.UI);
		this.scene.stop(playerData.location);
		this.scene.setVisible(true, CONSTANTS.SCENES.END);
	}

}