import {CONSTANTS} from '../globalvars/CONSTANTS.js';
import {playerData} from '../globalvars/playerData.js';

let KEY = CONSTANTS.SCENES.MUSICSTORE;

export class MusicStoreScene extends Phaser.Scene {
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
		
	}

	// Load game objects
	create () {

		// REMOVE LATER
		this.input.on('pointerdown', function () {
		this.scene.start(CONSTANTS.SCENES.OVERWORLD);
		}, this);

		this.add.text(500, 360, KEY, {fill: '#0f0'})
	}

}