import { CONSTANTS } from '/js/CONSTANTS.js';
import { playerData } from '/js/playerData.js';
import * as playerFnc from '/js/playerData.js';
import * as textbox from '/js/functions/textbox.js'
import * as sceneFnc from '/js/functions/sceneFunctions.js'
import { sceneText } from '/js/dialogue/StoreText.js';

let KEY = CONSTANTS.SCENES.STORE;
let tb;
let submenu;

/*********************************************************************
 * Store scene                                                       *
 * Contains the checkouts, shelves and has the area to purchase food *
 *********************************************************************/
export class StoreScene extends Phaser.Scene {
	constructor() {
		super({
			key: KEY
		});
	}

	init(data) {
		this.playerData = data.playerData;

		sceneFnc.checkDistance(this.playerData, KEY);
		this.playerData.location = KEY;
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
				this.scene.start(CONSTANTS.SCENES.OVERWORLD, {playerData: this.playerData});
			});
	}

	update () {

	}

	// ==================================================================================================================

	/*******************************************************
	 * Interactable objects for the scene are created here *
	 *******************************************************/
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

				if (this.playerData.stats.health >= 5) {
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

	/******************************************************
	 * List of items available for purchase to the player *
	 ******************************************************/
	listClerkItems () {
		tb.start(sceneText.checkout.good);
		
		// Ramen choice
		this.checkoutRamen = this.add.text(50, CONSTANTS.UI.SUBMENU_Y, '$1 Ramen', { fontSize: CONSTANTS.TEXT.FONT_SIZE })
		.setInteractive()
		.on('pointerup', () => {

			if (this.purchase(1)) {
				this.playerData.fridge.instant_ramen++;
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
				this.playerData.fridge.apple++;
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
				this.playerData.fridge.bread++;
				tb.start(sceneText.checkout.purchase.clerk + sceneText.checkout.purchase.toFridge);
			} else {
				tb.start(sceneText.checkout.purchase.noMoney);
			}

		});

		// Mask choice
		this.checkoutMask = this.add.text(250, CONSTANTS.UI.SUBMENU_Y + 100, '$5 Masks', { fontSize: CONSTANTS.TEXT.FONT_SIZE })
		.setInteractive()
		.on('pointerup', () => {
			
			if (this.playerData.stats.health < 3) {
				tb.start(sceneText.checkout.purchase.noStock);
				return;
			}

			if (!this.playerData.inventory.mask && this.purchase(5)) {
				// playerData.storage.masks++;
				this.playerData.inventory.mask = true;
				tb.start(sceneText.checkout.purchase.clerk + " You put on the mask.");
				// tb.start(sceneText.checkout.purchase.clerk + sceneText.checkout.purchase.toStorage);
			} else if (this.playerData.inventory.mask) {
				tb.start(sceneText.checkout.purchase.wearingMask);
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
				this.playerData.storage.soap++;
				tb.start(sceneText.checkout.purchase.clerk + sceneText.checkout.purchase.toStorage);
			} else {
				tb.start(sceneText.checkout.purchase.noMoney);
			}
			
			console.log(this.playerData.storage.soap);
		});

		submenu = [this.checkoutRamen, 
			this.checkoutApple, 
			this.checkoutBread, 
			this.checkoutMask,
			this.checkoutTp,
			this.checkoutSoap];
	}

	/**
	 * Allows the player to purchase an item, reducing their money
	 * if they can afford it. Returns true if successfully bought,
	 * false if not
	 * @param {Number} price is the price of the object
	 */
	purchase (price) {

		if (this.playerData.stats.money >= price) {
			this.playerData.stats.money -= price;
			return true;
		}

		return false;
	}
}