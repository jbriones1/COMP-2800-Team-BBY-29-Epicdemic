import {CONSTANTS}  from '../globalvars/CONSTANTS.js';
import {playerData} from '../globalvars/playerData.js';
import * as textbox from '../functions/textbox.js' 

let KEY = CONSTANTS.SCENES.OVERWORLD;
let testText ='Select a location.';
const GetValue = Phaser.Utils.Objects.GetValue;

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
		this.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
		this.load.image('nextPage', '../assets/images/arrow-down-left.png');
	}

	create () {

		this.createButtons();
		this.tb = textbox.createTextBox(this, 
			100, 
			CONSTANTS.UI.SCREEN_HEIGHT - 400, {
			wrapWidth: 500,
	})
	.start(testText, CONSTANTS.TEXT.TEXT_SPEED);

	}

	update () {

	}

	createButtons () {
		
		this.homeButton = this.add.text(100, 100, 'Home', )
		.setInteractive()
		.on('pointerdown', () => this.scene.start(CONSTANTS.SCENES.HOME));

		this.airportButton = this.add.text(200, 100, 'Airport', {fill: '#f00'})
		.setInteractive()
		.on('pointerdown', () => this.scene.start(CONSTANTS.SCENES.AIRPORT));

		this.storeButton = this.add.text(300, 100, 'Store', {fill: '#f00'})
		.setInteractive()
		.on('pointerdown', () => this.scene.start(CONSTANTS.SCENES.STORE), {fill: '#f00'});

		this.schoolButton = this.add.text(400, 100, 'School', {fill: '#f00'})
		.setInteractive()
		.on('pointerdown', () => this.scene.start(CONSTANTS.SCENES.SCHOOL));

		this.hospitalButton = this.add.text(500, 100, 'Hospital', {fill: '#f00'})
		.setInteractive()
		.on('pointerdown', () => this.scene.start(CONSTANTS.SCENES.HOSPITAL));

		this.parkButton = this.add.text(600, 100, 'Park', {fill: '#f00'})
		.setInteractive()
		.on('pointerdown', () => this.scene.start(CONSTANTS.SCENES.PARK));

		this.lobbyButton = this.add.text(100, 200, 'Lobby', {fill: '#f00'})
		.setInteractive()
		.on('pointerdown', () => this.scene.start(CONSTANTS.SCENES.LOBBY));

		this.mallButton = this.add.text(200, 200, 'Mall', {fill: '#f00'})
		.setInteractive()
		.on('pointerdown', () => this.scene.start(CONSTANTS.SCENES.MALL));

		// Location name
		this.add.text(10, 10, KEY, { fill: '#0f0', fontSize: CONSTANTS.TEXT.FONT_SIZE })
	}
}