import {CONSTANTS} from '../globalvars/CONSTANTS.js';
import {playerData} from '../globalvars/playerData.js';
import * as playerFnc from '../globalvars/playerData.js';
import * as textbox from '../functions/textbox.js'
import * as sceneFnc from '../functions/sceneFunctions.js'
import { sceneText } from '../dialogue/TheatreText.js';

let KEY = CONSTANTS.SCENES.THEATRE;

let tb;

let submenu = [];

export class TheatreScene extends Phaser.Scene {
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
	}

	// Load game objects
	create () {
		// scene image
		this.add.image(7, 100, 'theatre_bg')
		.setOrigin(0, 0)
		.setDisplaySize(950, 680);

		tb = textbox.createTextBox(this, 100, CONSTANTS.UI.SCREEN_HEIGHT - 300, {wrapWidth: 650});
		tb.start("At the movie theatre. Sit wherever you want", CONSTANTS.TEXT.TEXT_SPEED);

		this.addArrows();

		// Return to Lobby
		this.toLobbyButton = this.add.image(478, 750, 'red_arrow')
			.setDisplaySize(30, 30)
			.setInteractive()
			.once('pointerup', () => {
				this.scene.start(CONSTANTS.SCENES.LOBBY);
		});

		// button of concession
		this.add.rectangle(400, 600, 150, 80, '#000000', 0)
		.setOrigin(0, 0)
		.setInteractive()
		.on('pointerup', () => {
			playerFnc.clearSubmenu(submenu);
			tb.start(sceneText.concession.interact, CONSTANTS.TEXT.TEXT_SPEED);
		})

		// button of seat r1c1
		this.add.rectangle(120, 370, 275, 70, '#000000', 1)
		.setOrigin(0, 0)
		.setInteractive()
		.on('pointerup', () => {
			playerFnc.clearSubmenu(submenu);
			if (playerData.stats.hour >= 20) {
				return;
			}
			this.confirmSeatGood();
		})

		// button of seat r2c1
		this.add.rectangle(120, 480, 275, 70, '#000000', 1)
		.setOrigin(0, 0)
		.setInteractive()
		.on('pointerup', () => {
			playerFnc.clearSubmenu(submenu);

			this.confirmSeatGood();
		});

		// button of seat r1c3
		this.add.rectangle(570, 370, 275, 70, '#000000', 1)
		.setOrigin(0, 0)
		.setInteractive()
		.on('pointerup', () => {
			playerFnc.clearSubmenu(submenu);
			this.confirmSeatBad();
		});

		// button of seat r2c4
		this.add.rectangle(720, 480, 50, 70, '#000000', 1)
		.setOrigin(0, 0)
		.setInteractive()
		.on('pointerup', () => {
			playerFnc.clearSubmenu(submenu);
			this.confirmSeatBad();
		})
	}

	addArrows() {
		// arrow for concession
		this.add.image(455, 560, 'red_arrow')
		.setOrigin(0, 0)
		.setDisplaySize(30, 30);

		// arrow for r1c2
		this.add.image(235, 330, 'red_arrow')
		.setOrigin(0, 0)
		.setDisplaySize(30, 30);

		// arrow for r1c3
		this.add.image(660, 330, 'red_arrow')
		.setOrigin(0, 0)
		.setDisplaySize(30, 30);

		// arrow for r1c4
		this.add.image(790, 330, 'red_arrow')
		.setOrigin(0, 0)
		.setDisplaySize(30, 30);

		// arrow for r2c2
		this.add.image(235, 435, 'red_arrow')
		.setOrigin(0, 0)
		.setDisplaySize(30, 30);

		// arrow for r2c4
		this.add.image(730, 435, 'red_arrow')
		.setOrigin(0, 0)
		.setDisplaySize(30, 30);
	
	}

	watchMovie() {
		let startMinute = playerData.stats.minute;
		let minutesofSleep = ((60 - startMinute) != 60) ? 60 - startMinute : 0;
		
		if (startMinute != 0) {
			playerFnc.changeTime(minutesofSleep);
		}

		while(playerData.stats.hour != 20) {
			playerFnc.changeTime(60);
		}
	}
	
	confirmSeatGood() {

		submenu.push(this.add.text(250, CONSTANTS.UI.SUBMENU_Y, "YES", { fontSize: CONSTANTS.TEXT.FONT_SIZE })
			.setInteractive()
			.on('pointerup', () => {
				playerFnc.clearSubmenu(submenu);

				this.watchMovie();
				tb.start(sceneText.seats.goodSeat, CONSTANTS.TEXT.TEXT_SPEED)
			})
		);

		submenu.push(this.add.text(450, CONSTANTS.UI.SUBMENU_Y, "NO", { fontSize: CONSTANTS.TEXT.FONT_SIZE })
			.setInteractive()
			.on('pointerup', () => {
				playerFnc.clearSubmenu(submenu);
			})
		);

		tb.start("Sit here?", CONSTANTS.TEXT.TEXT_SPEED)
	}

	confirmSeatBad() {

		submenu.push(this.add.text(250, CONSTANTS.UI.SUBMENU_Y, "YES", { fontSize: CONSTANTS.TEXT.FONT_SIZE })
			.setInteractive()
			.on('pointerup', () => {
				playerFnc.clearSubmenu(submenu);

				this.watchMovie();
				tb.start(sceneText.seats.badSeat, CONSTANTS.TEXT.TEXT_SPEED)
			})
		);

		submenu.push(this.add.text(450, CONSTANTS.UI.SUBMENU_Y, "NO", { fontSize: CONSTANTS.TEXT.FONT_SIZE })
			.setInteractive()
			.on('pointerup', () => {
				playerFnc.clearSubmenu(submenu);
			})
		);

		tb.start("Sit here?", CONSTANTS.TEXT.TEXT_SPEED)
	}
}