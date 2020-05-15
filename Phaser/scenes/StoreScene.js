import { CONSTANTS } from '../globalvars/CONSTANTS.js';
import { playerData } from '../globalvars/playerData.js';
import * as playerFnc from '../globalvars/playerData.js';
import * as textbox from '../functions/textbox.js'
import * as sceneFnc from '../functions/sceneFunctions.js'
import { sceneText } from '../dialogue/StoreText.js';

let KEY = CONSTANTS.SCENES.STORE;
let tb;
let submenu;

export class StoreScene extends Phaser.Scene {
	constructor() {
		super({
			key: KEY
		});
	}

	init() {
		console.log("Loaded " + KEY);
		sceneFnc.checkDistance(playerData.location, KEY);
		playerData.location = KEY;

		console.log(playerData);
	}

	// Load assets
	preload() {
		// Textbox assets
		this.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
	}

	// Load game objects
	create() {

		// Scene image
		this.add.image(0, 100, 'groceryStore_bg')
			.setOrigin(0, 0)
			.setDisplaySize(950, 680);		

		// Textbox at the bottom of the screen
		tb = textbox.createTextBox(this,
			100,
			CONSTANTS.UI.SCREEN_HEIGHT - 300, {
			wrapWidth: 650,
		});

		// Message when entering the scene
		tb.start("At the grocery store.", CONSTANTS.TEXT.TEXT_SPEED);

		// Creates all the menu buttons for the scene
		this.createObjects();

		// Return to Overworld
		this.overworldButton = this.add.image(340, 750, 'red_arrow').setDisplaySize(30, 30)
			.setInteractive()
			.on('pointerup', () => {
				this.scene.start(CONSTANTS.SCENES.OVERWORLD);
			});
	}

	update () {

	}

	// ==================================================================================================================

	// CREATE OBJECTS ---------------------------------------------------------------------------------------------------
	createObjects() {

		// Shelf
		this.shelf = this.add.rectangle(510, 280, 360, 175, '#000000', 0)
			.setOrigin(0,0)
			.setInteractive()
			.on('pointerup', () => {
				playerFnc.clearSubmenu(submenu);
				
				tb.start(sceneText.shelf.interact);
			});

			this.add.image(690, 240, 'red_arrow').setDisplaySize(30, 30);

		// Checkout
		this.checkout = this.add.rectangle(320, 220, 150, 200, '#000000', 0)
			.setOrigin(0,0)
			.setInteractive()
			.on('pointerup', () => {
				playerFnc.clearSubmenu(submenu);

				if (playerData.stats.health >= 5) {
					tb.start(sceneText.checkout.good.interact, CONSTANTS.TEXT.TEXT_SPEED);
					this.listClerkItems();
				} else {
					tb.start(sceneText.checkout.interact, CONSTANTS.TEXT.TEXT_SPEED);
				}
				
			});

			this.add.image(390, 220, 'red_arrow').setDisplaySize(30, 30);

		// Produce
		this.produce = this.add.rectangle(125, 520, 150, 175, '#000000', 0)
			.setOrigin(0,0)
			.setInteractive()
			.on('pointerup', () => {
				playerFnc.clearSubmenu(submenu);

				tb.start(sceneText.produce.interact, CONSTANTS.TEXT.TEXT_SPEED);
			});

			this.add.image(205, 510, 'red_arrow').setDisplaySize(30, 30);

		// Self checkout
		this.produce = this.add.rectangle(135, 320, 140, 120, '#000000', 0)
			.setOrigin(0,0)
			.setInteractive()
			.on('pointerup', () => {
				playerFnc.clearSubmenu(submenu);

				this.listClerkItems();
				tb.start(sceneText.checkout.self.interact, CONSTANTS.TEXT.TEXT_SPEED);
			});

			this.add.image(200, 300, 'red_arrow').setDisplaySize(30, 30);

	} // end of create objects function

	// Items available to buy
	listClerkItems () {
		tb.start(sceneText.checkout.good);
		
		// Ramen choice
		this.checkoutRamen = this.add.text(50, CONSTANTS.UI.SUBMENU_Y, '$1 Ramen', { fontSize: CONSTANTS.TEXT.FONT_SIZE })
		.setInteractive()
		.on('pointerup', () => {

			if (this.purchase(1)) {
				playerData.fridge.instant_ramen++;
				tb.start(sceneText.checkout.purchase.clerk + sceneText.checkout.purchase.toFridge);
			} else {
				tb.start(sceneText.checkout.purchase.noMoney);
			}

		});

		// Apple choice
		this.checkoutApple = this.add.text(250, CONSTANTS.UI.SUBMENU_Y, '$2 Apple', { fontSize: CONSTANTS.TEXT.FONT_SIZE })
		.setInteractive()
		.on('pointerup', () => {
			
			if (this.purchase(2)) {
				playerData.fridge.apple++;
				tb.start(sceneText.checkout.purchase.clerk + sceneText.checkout.purchase.toFridge);
			} else {
				tb.start(sceneText.checkout.purchase.noMoney);
			}

		});

		// Bread choice
		this.checkoutBread = this.add.text(450, CONSTANTS.UI.SUBMENU_Y, '$3 Bread', { fontSize: CONSTANTS.TEXT.FONT_SIZE })
		.setInteractive()
		.on('pointerup', () => {
			
			if (this.purchase(3)) {
				playerData.fridge.bread++;
				tb.start(sceneText.checkout.purchase.clerk + sceneText.checkout.purchase.toFridge);
			} else {
				tb.start(sceneText.checkout.purchase.noMoney);
			}

		});

		// Mask choice
		this.checkoutMask = this.add.text(250, CONSTANTS.UI.SUBMENU_Y + 100, '$5 Masks', { fontSize: CONSTANTS.TEXT.FONT_SIZE })
		.setInteractive()
		.on('pointerup', () => {
			
			if (playerData.stats.health < 3) {
				tb.start(sceneText.checkout.purchase.noStock);
				return;
			}

			if (this.purchase(5)) {
				playerData.storage.masks++;
				tb.start(sceneText.checkout.purchase.clerk + sceneText.checkout.purchase.toStorage);
			} else {
				tb.start(sceneText.checkout.purchase.noMoney);
			}
			
		});

		// Toilet paper choice
		this.checkoutTp = this.add.text(450, CONSTANTS.UI.SUBMENU_Y + 100, '$5 Toilet Paper', { fontSize: CONSTANTS.TEXT.FONT_SIZE })
		.setInteractive()
		.on('pointerup', () => {
			
			tb.start(sceneText.checkout.purchase.noStock);
			
		});

		// Soap choice
		this.checkoutSoap = this.add.text(50, CONSTANTS.UI.SUBMENU_Y + 100, '$1 Soap', { fontSize: CONSTANTS.TEXT.FONT_SIZE })
		.setInteractive()
		.on('pointerup', () => {
			
			if (this.purchase(1)) {
				playerData.storage.soap++;
				tb.start(sceneText.checkout.purchase.clerk + sceneText.checkout.purchase.toStorage);
			} else {
				tb.start(sceneText.checkout.purchase.noMoney);
			}
			
			console.log(playerData.storage.soap);
		});

		submenu = [this.checkoutRamen, 
			this.checkoutApple, 
			this.checkoutBread, 
			this.checkoutMask,
			this.checkoutTp,
			this.checkoutSoap];
	}

	purchase (price) {

		if (playerData.stats.money >= price) {
			playerData.stats.money -= price;
			return true;
		}

		return false;
	}
}