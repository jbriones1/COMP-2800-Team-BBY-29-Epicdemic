import {CONSTANTS}  from '../globalvars/CONSTANTS.js';
import {playerData} from '../globalvars/playerData.js';

let KEY = CONSTANTS.SCENES.AIRPORT;
var messageText;

export class AirportScene extends Phaser.Scene {
	constructor() {
		super({
			key: KEY
		});

	}

	init (data) {
		console.log("Loaded " + KEY);
		playerData.location = KEY;
		messageText = data;
		console.log(playerData);
	}

	// Load assets
	preload() {
	}

	// Load game objects
	create () {
		this.cameras.main.backgroundColor.setTo(0,0,0);

		// REMOVE LATER
		this.input.on('pointerdown', function () {
			this.scene.start(CONSTANTS.SCENES.OVERWORLD);

		}, this);

		this.add.text(500, 360, KEY, {fill: '#0f0'});
		this.add.text(10, 620, messageText, {fill: '#0f0'});



	}

}