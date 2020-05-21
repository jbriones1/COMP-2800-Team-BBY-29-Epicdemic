import {CONSTANTS} from '/js/CONSTANTS.js';
import {playerData} from '/js/playerData.js';

let KEY = CONSTANTS.SCENES.UI;
let uiText;
let stats;

export class UIScene extends Phaser.Scene {
	constructor() {
		super({
			key: KEY
		});
	}

	init (data) {
	}

	// Load assets
	preload() {
		this.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');

	}

	// Load game objects
	create () {

	}

	update() {

	}

}