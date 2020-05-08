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
		// Textbox assets
		this.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
		this.load.image('nextPage', '../assets/images/arrow-down-left.png');

		// House assets
		this.load.image('overworld_bg', '../assets/backgrounds/overworld.png');
	}

	create () {

		let bg = this.add.image(0, 0, 'overworld_bg')
		.setOrigin(0,0)
		.setDisplaySize(CONSTANTS.UI.SCREEN_WIDTH, CONSTANTS.UI.SCREEN_HEIGHT - 200);

		this.createButtons();
		this.tb = textbox.createTextBox(this, 
			100, 
			CONSTANTS.UI.SCREEN_HEIGHT - 150, {
			wrapWidth: 500,
	})
	.start(testText, CONSTANTS.TEXT.TEXT_SPEED);

	}

	update () {

	}

	createButtons () {
		
		// Home Button
		this.homeButton = this.add.rectangle(165, 100, 100, 150, '#000000', 0.1)
		.setOrigin(0,0)
		.setInteractive()
		.on('pointerdown', () => this.scene.switch(CONSTANTS.SCENES.HOME));

		this.add.text(180, 210, 'Home', { fontSize: CONSTANTS.TEXT.FONT_SIZE })
		.setStroke('#000000', 10)

		// Airport Button
		this.airportButton = this.add.text(700, 260, 'Airport', { fontSize: CONSTANTS.TEXT.FONT_SIZE })
		.setInteractive()
		.setStroke('#000000', 10)
		.on('pointerdown', () => this.scene.switch(CONSTANTS.SCENES.AIRPORT));

		this.storeButton = this.add.text(750, 550, 'Store', { fontSize: CONSTANTS.TEXT.FONT_SIZE })
		.setInteractive()
		.setStroke('#000000', 10)
		.on('pointerdown', () => this.scene.switch(CONSTANTS.SCENES.STORE), { fontSize: CONSTANTS.TEXT.FONT_SIZE });

		this.schoolButton = this.add.text(750, 720, 'School', { fontSize: CONSTANTS.TEXT.FONT_SIZE })
		.setInteractive()
		.setStroke('#000000', 10)
		.on('pointerdown', () => this.scene.switch(CONSTANTS.SCENES.SCHOOL));

		this.hospitalButton = this.add.text(577, 980, 'Hospital', { fontSize: CONSTANTS.TEXT.FONT_SIZE })
		.setInteractive()
		.setStroke('#000000', 10)
		.on('pointerdown', () => this.scene.switch(CONSTANTS.SCENES.HOSPITAL));

		this.parkButton = this.add.text(350, 800, 'Park', { fontSize: CONSTANTS.TEXT.FONT_SIZE })
		.setInteractive()
		.setStroke('#000000', 10)
		.on('pointerdown', () => this.scene.switch(CONSTANTS.SCENES.PARK));

		this.lobbyButton = this.add.text(10, 825, 'Movie Theatre', { fontSize: CONSTANTS.TEXT.FONT_SIZE })
		.setInteractive()
		.setStroke('#000000', 10)
		.on('pointerdown', () => this.scene.switch(CONSTANTS.SCENES.LOBBY));

		this.mallButton = this.add.text(155, 525, 'Mall', { fontSize: CONSTANTS.TEXT.FONT_SIZE })
		.setInteractive()
		.setStroke('#000000', 10)
		.on('pointerdown', () => this.scene.switch(CONSTANTS.SCENES.MALL));

		// Location name
		this.add.text(10, 10, KEY, { fill: '#0f0', fontSize: CONSTANTS.TEXT.FONT_SIZE })
	}
}