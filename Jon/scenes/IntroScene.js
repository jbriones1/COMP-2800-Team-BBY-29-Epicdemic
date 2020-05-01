import {CONSTANTS} from '../globalvars/CONSTANTS.js';
import {playerData} from '../globalvars/playerData.js';

let KEY = CONSTANTS.SCENES.INTRO

export class IntroScene extends Phaser.Scene {
	constructor() {
		super({
			key: KEY
		});

	}

	init () {
		console.log("Loaded " + KEY);
		
		console.log(playerData);
	}

	// Load assets
	preload() {
		
	}

	// Load game obj
	create () {
		this.scene.start(CONSTANTS.SCENES.OVERWORLD);
	}

}