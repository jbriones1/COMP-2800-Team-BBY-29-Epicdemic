import {CONSTANTS} from '../globalvars/CONSTANTS.js';
import {playerData} from '../globalvars/playerData.js';
import * as playerFnc from '../globalvars/playerData.js';
import * as textbox from '../functions/textbox.js'
import * as sceneFnc from '../functions/sceneFunctions.js'
import { sceneText } from '../dialogue/TheatreLobbyText.js';

let KEY = CONSTANTS.SCENES.LOBBY;

let tb;

let submenu = [];

export class LobbyScene extends Phaser.Scene {
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
		this.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
		this.load.image('nextPage', '../assets/images/arrow-down-left.png');
		this.load.image('theatreLobby_bg', '../assets/backgrounds/theatreLobby/theatre_lobby.png');
		this.load.image('theatreLobby_customer', '../assets/backgrounds/theatreLobby/customer.png');
		this.load.image('theatreLobby_arrow', '../assets/images/red_arrow.png')
	}

	// Load game objects
	create () {
		// scene image
		this.add.image(7, 100, 'theatreLobby_bg')
		.setOrigin(0, 0)
		.setDisplaySize(950, 680);

		this.add.image(230, 350, 'theatreLobby_customer')
		.setOrigin(0, 0)
		.setDisplaySize(70, 130);

		this.addArrows();

		
		//this.add.text(80, 10, KEY, {fill: '#0f0', fontSize: CONSTANTS.TEXT.FONT_SIZE });

		tb = textbox.createTextBox(this, 100, CONSTANTS.UI.SCREEN_HEIGHT - 300, {wrapWidth: 650});
		tb.start("At Theatre Lobby", CONSTANTS.TEXT.TEXT_SPEED);

		// Return to Overworld
		this.overworldButton = this.add.text(
			CONSTANTS.UI.SCREEN_WIDTH - 150, 10, 'Map', { fontSize: CONSTANTS.TEXT.FONT_SIZE })
		.setInteractive()
		.on('pointerdown', () => {
			this.scene.start(CONSTANTS.SCENES.OVERWORLD);
		});

		//======================================
		// how to deal with this button? 
		//======================================
		// go to theatre
		this.theatreButton = this.add.text(700, 400, 'Theatre', { fontSize: CONSTANTS.TEXT.FONT_SIZE })
		.setInteractive()
		.on('pointerdown', () => {
			this.scene.start(CONSTANTS.SCENES.THEATRE);
		});


		// button of reception
		this.add.rectangle(600, 250, 150, 100, '#000000', 0)
		.setOrigin(0, 0)
		.setInteractive()
		.on('pointerdown', () => {
			playerFnc.clearSubmenu(submenu);
			tb.start(sceneText.ticketWindow.interact, CONSTANTS.TEXT.TEXT_SPEED);
		})

		// button of large sofa
		this.add.rectangle(240, 370, 130, 70, '#000000', 0)
		.setOrigin(0, 0)
		.setInteractive()
		.on('pointerdown', () => {
			playerFnc.clearSubmenu(submenu);
			tb.start(sceneText.largeSofa.interact, CONSTANTS.TEXT.TEXT_SPEED);
			this.listSeatChoices();
		})

		// button of small sofa
		this.add.rectangle(100, 500, 100, 70, '#000000', 0)
		.setOrigin(0, 0)
		.setInteractive()
		.on('pointerdown', () => {
			playerFnc.clearSubmenu(submenu);
			tb.start(sceneText.smallSofa.interact, CONSTANTS.TEXT.TEXT_SPEED);
			this.listSofaChoices();
		})		

	}

	listSeatChoices() {
		submenu.push(this.add.text(250, CONSTANTS.UI.SUBMENU_Y, "YES", { fontSize: CONSTANTS.TEXT.FONT_SIZE })
			.setInteractive()
			.on('pointerdown', () => {
				tb.start(sceneText.seats.badSeat);
			})
		);

		submenu.push(this.add.text(450, CONSTANTS.UI.SUBMENU_Y, "NO", { fontSize: CONSTANTS.TEXT.FONT_SIZE })
			.setInteractive()
			.on('pointerdown', () => {
				tb.start(sceneText.seats.goodSeat);
			})
		);
	}

	listSofaChoices() {
		submenu.push(this.add.text(250, CONSTANTS.UI.SUBMENU_Y, "YES", { fontSize: CONSTANTS.TEXT.FONT_SIZE })
			.setInteractive()
			.on('pointerdown', () => {
				tb.start(sceneText.sofa.sit);
			})
		);

		submenu.push(this.add.text(450, CONSTANTS.UI.SUBMENU_Y, "NO", { fontSize: CONSTANTS.TEXT.FONT_SIZE })
			.setInteractive()
			.on('pointerdown', () => {
				tb.start(sceneText.sofa.notSit);
			})
		);
	}

	addArrows() {
		this.add.image(230, 350, 'theatreLobby_arrow')
		.setOrigin(0, 0)
		.setDisplaySize(30, 30);

		this.add.image(230, 350, 'theatreLobby_arrow')
		.setOrigin(0, 0)
		.setDisplaySize(30, 30);

		this.add.image(230, 350, 'theatreLobby_arrow')
		.setOrigin(0, 0)
		.setDisplaySize(30, 30);
	}


}