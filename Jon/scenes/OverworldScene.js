import {CONSTANTS} from '../globalvars/CONSTANTS.js';
import {playerData} from '../globalvars/playerData.js';

let KEY = CONSTANTS.SCENES.OVERWORLD;

export class OverworldScene extends Phaser.Scene {
	constructor() {
		super({
			key: KEY
		});
	}

	// Load data and plugins from other 
	init () {
		console.log("Loaded " + KEY);
		playerData.location = KEY;


		console.log(playerData);
	}

	// Load assets
	preload() {
		
	}

	create () {

		this.createButtons();

	}

	update () {

	}

	createButtons () {
		
		this.homeButton = this.add.text(100, 100, 'Home')
		.setInteractive()
		.on('pointerdown', () => this.scene.start(CONSTANTS.SCENES.HOME));

		this.airportButton = this.add.text(200, 100, 'Airport')
		.setInteractive()
		.on('pointerdown', () => this.scene.start(CONSTANTS.SCENES.AIRPORT, "Moved to airport."));

		this.storeButton = this.add.text(300, 100, 'Store')
		.setInteractive()
		.on('pointerdown', () => this.scene.start(CONSTANTS.SCENES.STORE));

		this.schoolButton = this.add.text(400, 100, 'School')
		.setInteractive()
		.on('pointerdown', () => this.scene.start(CONSTANTS.SCENES.SCHOOL));

		this.hospitalButton = this.add.text(500, 100, 'Hospital')
		.setInteractive()
		.on('pointerdown', () => this.scene.start(CONSTANTS.SCENES.HOSPITAL));

		this.parkButton = this.add.text(600, 100, 'Park')
		.setInteractive()
		.on('pointerdown', () => this.scene.start(CONSTANTS.SCENES.PARK));

		this.lobbyButton = this.add.text(100, 200, 'Lobby')
		.setInteractive()
		.on('pointerdown', () => this.scene.start(CONSTANTS.SCENES.LOBBY));

		this.mallButton = this.add.text(200, 200, 'Mall')
		.setInteractive()
		.on('pointerdown', () => this.scene.start(CONSTANTS.SCENES.MALL));
	}

}