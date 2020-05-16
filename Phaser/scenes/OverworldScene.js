import {CONSTANTS}  from '../globalvars/CONSTANTS.js';
import {playerData} from '../globalvars/playerData.js';
import * as textbox from '../functions/textbox.js'; 
import * as sceneFnc from '../functions/sceneFunctions.js';
import {overworldText} from '../dialogue/IntroSceneText.js'

let KEY = CONSTANTS.SCENES.OVERWORLD;
let testText ='Select a location.';
const GetValue = Phaser.Utils.Objects.GetValue;
let tb;

let schoolTextTint = '#f00'

export class OverworldScene extends Phaser.Scene {
	constructor() {
		super({
			key: KEY
		});
	}

	// Load data and plugins from other 
	init () {
		console.log("Loaded " + KEY);

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

		let bg = this.add.image(0, 90, 'overworld_bg')
		.setOrigin(0,0)
		.setDisplaySize(CONSTANTS.UI.SCREEN_WIDTH, CONSTANTS.UI.SCREEN_HEIGHT - 200);

		this.createButtons();

		// Textbox
		tb = textbox.createTextBox(this, 
			100, 
			CONSTANTS.UI.SCREEN_HEIGHT - 100, {
			wrapWidth: 500,
	})
	
	tb.start(testText, CONSTANTS.TEXT.TEXT_SPEED);

	}

	update () {

	}

	createButtons () {

		// Easter egg
		if (playerData.unlocked) {
			schoolTextTint = '#fff'
		}
		
		// Home button
		this.homeButton = this.add.rectangle(115, 100, 200, 175, '#000000', 0)
		.setOrigin(0,0)
		.setInteractive()
		.on('pointerup', () => this.scene.start(CONSTANTS.SCENES.HOME));

		this.add.text(175, 210, 'Home', { fontSize: CONSTANTS.TEXT.FONT_SIZE })
		.setStroke('#000000', 10);

		// Airport button
		this.airportButton = this.add.rectangle(680, 125, 200, 200, '#000000', 0)
		.setOrigin(0,0)
		.setInteractive()
		.on('pointerup', () => {
			// this.scene.start(CONSTANTS.SCENES.AIRPORT);
			tb.start('Closed due to the virus', CONSTANTS.TEXT.TEXT_SPEED);
		});
		
		this.add.text(700, 260, 'Airport', { fill: '#f00', fontSize: CONSTANTS.TEXT.FONT_SIZE })
		.setStroke('#000000', 10)

		// Store button
		this.storeButton = this.add.rectangle(700, 400, 200, 185, '#000000', 0)
		.setOrigin(0,0)
		.setInteractive()
		.on('pointerup', () => this.scene.start(CONSTANTS.SCENES.STORE) );
		
		this.add.text(750, 550, 'Store', { fontSize: CONSTANTS.TEXT.FONT_SIZE })
		.setStroke('#000000', 10);
		
		// School button
		this.schoolButton = this.add.rectangle(700, 590, 200, 185, '#000000', 0)
		.setOrigin(0,0)
		.setInteractive()
		.on('pointerup', () => {
			if (playerData.unlocked) {
				this.scene.start(CONSTANTS.SCENES.SCHOOL)
			} else {
				tb.start(overworldText.locked, CONSTANTS.TEXT.TEXT_SPEED);
			}
		});
		
		this.add.text(750, 720, 'School', { fill: schoolTextTint, fontSize: CONSTANTS.TEXT.FONT_SIZE })
		.setStroke('#000000', 10);

		// Hospital button
		this.hospitalButton = this.add.rectangle(550, 775, 200, 185, '#000000', 0)
		.setOrigin(0,0)
		.setInteractive()
		.on('pointerup', () => this.scene.start(CONSTANTS.SCENES.HOSPITAL));
		
		this.add.text(577, 980, 'Hospital', { fill: '#fff', fontSize: CONSTANTS.TEXT.FONT_SIZE })
		.setStroke('#000000', 10);

		// Park button
		this.parkButton = this.add.rectangle(320, 750, 130, 200, '#000000', 0)
		.setOrigin(0,0)
		.setInteractive()
		.on('pointerup', () => {
			if (playerData.stats.health >= 4) {
				this.scene.start(CONSTANTS.SCENES.PARK);
			} else {
				tb.start(overworldText.locked, CONSTANTS.TEXT.TEXT_SPEED);
			}
		});
		
		this.parkText = this.add.text(350, 800, 'Park', { fill: '#fff', fontSize: CONSTANTS.TEXT.FONT_SIZE })
		.setStroke('#000000', 10);

		// Lobby button
		this.lobbyButton = this.add.rectangle(0, 700, 275, 175, '#0000ff', 0)
		.setOrigin(0,0)
		.setInteractive()
		.on('pointerup', () => this.scene.start(CONSTANTS.SCENES.LOBBY));
		
		this.lobbyText = this.add.text(10, 825, 'Movie Theatre', { fill: '#fff', fontSize: CONSTANTS.TEXT.FONT_SIZE })
		.setStroke('#000000', 10);

		// Mall button
		this.mallButton = this.add.rectangle(100, 300, 200, 300, '#0000ff', 0)
		.setOrigin(0,0)
		.setInteractive()
		.on('pointerup', () => {
			if (playerData.stats.health >= 1) {
				this.scene.start(CONSTANTS.SCENES.MUSICSTORE);
			} else {
				tb.start(overworldText.locked, CONSTANTS.TEXT.TEXT_SPEED);
			}	
		});
		
		this.mallText = this.add.text(155, 525, 'Mall', { fill: '#fff', fontSize: CONSTANTS.TEXT.FONT_SIZE })
		.setStroke('#000000', 10);

		this.setLocationStatuses()
	}

	// Locks certain locations if the health of the world is not good
	setLocationStatuses() {
		// Movies
		if (playerData.stats.health < 8) {
			this.lobbyText.setFill('#f00');
		} 

		// Mall
		if (playerData.stats.health < 3) {
			this.mallText.setFill('#f00');
		} 

		// Park
		if (playerData.stats.health < 4) {
			this.parkText.setFill('#f00');
		} 
	}
}