import {CONSTANTS} from '/js/CONSTANTS.js';
import {playerData} from '/js/playerData.js';
import * as playerFnc from '/js/playerData.js';
import * as textbox from '/js/functions/textbox.js'
import * as sceneFnc from '/js/functions/sceneFunctions.js'
import { sceneText } from '/js/dialogue/TheatreLobbyText.js';

let KEY = CONSTANTS.SCENES.LOBBY;

let tb;

let submenu = [];

export class LobbyScene extends Phaser.Scene {
	constructor() {
		super({
			key: KEY
		});
	}

	init (data) {
		this.playerData = data.playerData;
		console.log("Loaded " + KEY);
		if (this.playerData.location != CONSTANTS.SCENES.THEATRE) {
			sceneFnc.checkDistance(this.playerData.location, KEY);
		}

		this.playerData.location = KEY;
		console.dir(this.playerData);
	}

	// Load assets
	preload() {
		this.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
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
	
		tb = textbox.createTextBox(this, 100, CONSTANTS.UI.SCREEN_HEIGHT - 300, {wrapWidth: 650});
		tb.start("At Theatre Lobby", CONSTANTS.TEXT.TEXT_SPEED);

		// Return to Overworld
		this.overworldButton = this.add.image(456, 750, 'red_arrow')
		.setOrigin(0, 0)
		.setDisplaySize(30, 30)
		.setInteractive()
		.on('pointerup', () => {
			this.scene.start(CONSTANTS.SCENES.OVERWORLD, {playerData: this.playerData});
		});

		// go to theatre
		this.theatreButton = this.add.image(780, 490, 'red_arrow').setRotation(3.14 + 3.14/2)
		.setOrigin(0, 0)
		.setDisplaySize(30, 30)
		.setInteractive()
		.on('pointerup', () => {
			playerFnc.clearSubmenu(submenu);
			this.listMovieEntranceChoices();
			tb.start(sceneText.theatreEntrance.interact, CONSTANTS.TEXT.TEXT_SPEED);
		});


		// button of reception
		this.add.rectangle(600, 250, 150, 100, '#000000', 0)
		.setOrigin(0, 0)
		.setInteractive()
		.on('pointerup', () => {
			playerFnc.clearSubmenu(submenu);

			this.listTicketWindowChoices();
			tb.start(sceneText.ticketWindow.interact, CONSTANTS.TEXT.TEXT_SPEED);
		})

		// button of large sofa
		this.add.rectangle(240, 370, 130, 70, '#000000', 0)
		.setOrigin(0, 0)
		.setInteractive()
		.on('pointerup', () => {
			playerFnc.clearSubmenu(submenu);
			tb.start(sceneText.largeSofa.interact, CONSTANTS.TEXT.TEXT_SPEED);
			this.listSeatChoices();
		})

		// button of small sofa
		this.add.rectangle(100, 500, 100, 70, '#000000', 0)
		.setOrigin(0, 0)
		.setInteractive()
		.on('pointerup', () => {
			playerFnc.clearSubmenu(submenu);
			tb.start(sceneText.smallSofa.interact, CONSTANTS.TEXT.TEXT_SPEED);
			this.listSofaChoices();
		})		

		// Jon event
		if (this.playerData.events.watchMovieWithJon && this.playerData.stats.hour > 16) {
			this.jon = this.add.sprite(500, 300, 'Jon', 1)
			.setInteractive()
			.on('pointerup', () => {
				playerFnc.clearSubmenu(submenu);
				tb.start(sceneText.Jon, CONSTANTS.TEXT.TEXT_SPEED);
				
			});
		}

	}

	// Seat next to the lady
	listSeatChoices() {
		submenu.push(this.add.text(250, CONSTANTS.UI.SUBMENU_Y, "YES", { fontSize: CONSTANTS.TEXT.FONT_SIZE })
			.setInteractive()
			.on('pointerup', () => {
				playerFnc.clearSubmenu(submenu);

				if (!this.playerData.inventory.mask) {
					this.playerData.stats.health--;
				}
				this.playerData.stats.bad_decisions++;
				playerFnc.changeTime(this.playerData, 10);
				tb.start(sceneText.seats.badSeat, CONSTANTS.TEXT.TEXT_SPEED);
			})
		);

		submenu.push(this.add.text(450, CONSTANTS.UI.SUBMENU_Y, "NO", { fontSize: CONSTANTS.TEXT.FONT_SIZE })
			.setInteractive()
			.on('pointerup', () => {
				playerFnc.clearSubmenu(submenu);
				tb.start(sceneText.seats.goodSeat, CONSTANTS.TEXT.TEXT_SPEED);
			})
		);
	}

	listSofaChoices() {
		submenu.push(this.add.text(250, CONSTANTS.UI.SUBMENU_Y, "YES", { fontSize: CONSTANTS.TEXT.FONT_SIZE })
			.setInteractive()
			.on('pointerup', () => {
				playerFnc.clearSubmenu(submenu);
				tb.start(sceneText.sofa.sit, CONSTANTS.TEXT.TEXT_SPEED);
				this.sitAndWait();
			})
		);

		submenu.push(this.add.text(450, CONSTANTS.UI.SUBMENU_Y, "NO", { fontSize: CONSTANTS.TEXT.FONT_SIZE })
			.setInteractive()
			.on('pointerup', () => {
				playerFnc.clearSubmenu(submenu);
				tb.start(sceneText.sofa.notSit, CONSTANTS.TEXT.TEXT_SPEED);
			})
		);
	}

	listTicketWindowChoices() {
		submenu.push(this.add.text(100, CONSTANTS.UI.SUBMENU_Y, "BUY TICKET $8", { fontSize: CONSTANTS.TEXT.FONT_SIZE })
			.setInteractive()
			.on('pointerup', () => {
				playerFnc.clearSubmenu(submenu);
				
				if (!this.playerData.inventory.ticket && this.playerData.stats.money >= 8) {
					this.playerData.inventory.ticket++;
					this.playerData.stats.money -= 8;
					tb.start(sceneText.ticketWindow.buy.success, CONSTANTS.TEXT.TEXT_SPEED);
					playerFnc.clearSubmenu(submenu);
				} else if (this.playerData.inventory.ticket) {
					tb.start(sceneText.ticketWindow.buy.alreadyHave, CONSTANTS.TEXT.TEXT_SPEED);
					playerFnc.clearSubmenu(submenu);
				} else {
					tb.start(sceneText.ticketWindow.buy.noMoney, CONSTANTS.TEXT.TEXT_SPEED);
					playerFnc.clearSubmenu(submenu);
				}
			})
		);

		submenu.push(this.add.text(450, CONSTANTS.UI.SUBMENU_Y, "LEAVE", { fontSize: CONSTANTS.TEXT.FONT_SIZE })
			.setInteractive()
			.on('pointerup', () => {
				playerFnc.clearSubmenu(submenu);
				tb.start(sceneText.sofa.notSit, CONSTANTS.TEXT.TEXT_SPEED);
			})
		);
	}

	listMovieEntranceChoices() {
		submenu.push(this.add.text(250, CONSTANTS.UI.SUBMENU_Y, "YES", { fontSize: CONSTANTS.TEXT.FONT_SIZE })
			.setInteractive()
			.on('pointerup', () => {
				playerFnc.clearSubmenu(submenu);

				if (this.playerData.inventory.ticket && (this.playerData.stats.hour >= 18 && this.playerData.stats.hour < 20)) {
					this.playerData.inventory.ticket = false;
					this.scene.start(CONSTANTS.SCENES.THEATRE, {playerData: this.playerData});
				} else if (!this.playerData.inventory.ticket){
					playerFnc.clearSubmenu(submenu);
					tb.start(sceneText.theatreEntrance.failure, CONSTANTS.TEXT.TEXT_SPEED);
				} else {
					playerFnc.clearSubmenu(submenu);
					tb.start(sceneText.theatreEntrance.noMovie, CONSTANTS.TEXT.TEXT_SPEED);
				}

			})
		);

		submenu.push(this.add.text(450, CONSTANTS.UI.SUBMENU_Y, "NO", { fontSize: CONSTANTS.TEXT.FONT_SIZE })
			.setInteractive()
			.on('pointerup', () => {
				playerFnc.clearSubmenu(submenu);
			})
		);
	}

	addArrows() {
		// arrow for large sofa
		this.add.image(300, 320, 'red_arrow')//.setRotation(3.14/2)
		.setOrigin(0, 0)
		.setDisplaySize(30, 30);

		// arrow for small sofa
		this.add.image(115, 425, 'red_arrow')//.setRotation(3.14)
		.setOrigin(0, 0)
		.setDisplaySize(30, 30);

		// arrow for reception
		this.add.image(655, 195, 'red_arrow')
		.setOrigin(0, 0)
		.setDisplaySize(30, 30);		
	}

	sitAndWait() {
		let startMinute = this.playerData.stats.minute;
		let minutesofSleep = ((60 - startMinute) != 60) ? 60 - startMinute : 0;
		
		if (this.playerData.stats.hour < 18) {
			if (startMinute != 0) {
				playerFnc.changeTime(this.playerData, minutesofSleep);
			}
			while(this.playerData.stats.hour != 18) {
				playerFnc.changeTime(this.playerData, 60);
			}
		} else if (this.playerData.stats.hour >= 18 && this.playerData.stats.hour < 20) {
			tb.start(sceneText.wait.movie_started, CONSTANTS.TEXT.TEXT_SPEED);
		} else if (this.playerData.stats.hour < 24) {
			tb.start(sceneText.wait.movie_ended, CONSTANTS.TEXT.TEXT_SPEED);
		}
		
		this.scene.restart();
	} // end of sit and wait

}