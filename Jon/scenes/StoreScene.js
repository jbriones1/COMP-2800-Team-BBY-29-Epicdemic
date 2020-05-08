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
		playerData.location = KEY;

		console.log(playerData);
	}

	// Load assets
	preload() {
		// Textbox assets
		this.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
		this.load.image('nextPage', '../assets/images/arrow-down-left.png');

		// Store assets
		this.load.image('groceryStore_bg', '../assets/backgrounds/groceryStore/groceryStore.png');
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
		this.theatreButton = this.add.text(
			CONSTANTS.UI.SCREEN_WIDTH - 100, 10, 'Map', { fontSize: CONSTANTS.TEXT.FONT_SIZE })
			.setInteractive()
			.on('pointerdown', () => {
				this.scene.start(CONSTANTS.SCENES.OVERWORLD);
			});

		// Location name
		this.add.text(10, 10, KEY, { fill: '#0f0', fontSize: CONSTANTS.TEXT.FONT_SIZE });

		sceneFnc.drawUI(this, 50);
	}

	/* All the interactable objects in the scene are made here */
	createObjects() {

		// Shelf
		this.shelf = this.add.rectangle(510, 280, 360, 175, '#000000', 0)
			.setOrigin(0,0)
			.setInteractive()
			.on('pointerdown', () => {
				playerFnc.clearSubmenu(submenu);
				
				tb.start(sceneText.shelf.interact);
			});

		// Checkout
		this.checkout = this.add.rectangle(320, 220, 150, 200, '#000000', 0)
			.setOrigin(0,0)
			.setInteractive()
			.on('pointerdown', () => {
				playerFnc.clearSubmenu(submenu);

				tb.start(sceneText.checkout.good);
				this.listClerkItems();
			});

		// Produce
		this.produce = this.add.rectangle(125, 520, 150, 175, '#000000', 0)
			.setOrigin(0,0)
			.setInteractive()
			.on('pointerdown', () => {
				playerFnc.clearSubmenu(submenu);

				tb.start(sceneText.produce.interact, CONSTANTS.TEXT.TEXT_SPEED);
			});

		// Self checkout
		this.produce = this.add.rectangle(135, 320, 140, 120, '#000000', 0)
			.setOrigin(0,0)
			.setInteractive()
			.on('pointerdown', () => {
				playerFnc.clearSubmenu(submenu);

				tb.start("Self checkout", CONSTANTS.TEXT.TEXT_SPEED);
			});

	} // end of create objects function

	// Items available to buy
	listClerkItems () {
		
		this.checkoutRamen = this.add.text(50, CONSTANTS.UI.SUBMENU_Y, '$1 Ramen', { fontSize: CONSTANTS.TEXT.FONT_SIZE })
		.setInteractive()
		.on('pointerdown', () => {

			if (this.purchase(playerData.fridge.instant_ramen, 1)) {
				playerData.fridge.instant_ramen++;
				tb.start(sceneText.checkout.purchase.clerk + sceneText.checkout.purchase.toFridge);
			} else {
				tb.start(sceneText.checkout.purchase.noMoney);
			}

		});

		this.checkoutApple = this.add.text(250, CONSTANTS.UI.SUBMENU_Y, '$2 Apple', { fontSize: CONSTANTS.TEXT.FONT_SIZE })
		.setInteractive()
		.on('pointerdown', () => {
			
			if (this.purchase(playerData.fridge.apples, 2)) {
				playerData.fridge.apples++;
				tb.start(sceneText.checkout.purchase.clerk + sceneText.checkout.purchase.toFridge);
			} else {
				tb.start(sceneText.checkout.purchase.noMoney);
			}

		});

		this.checkoutBread = this.add.text(450, CONSTANTS.UI.SUBMENU_Y, '$3 Bread', { fontSize: CONSTANTS.TEXT.FONT_SIZE })
		.setInteractive()
		.on('pointerdown', () => {
			
			if (this.purchase(playerData.fridge.bread, 3)) {
				playerData.fridge.bread++;
				tb.start(sceneText.checkout.purchase.clerk + sceneText.checkout.purchase.toFridge);
			} else {
				tb.start(sceneText.checkout.purchase.noMoney);
			}

		});

		this.checkoutMask = this.add.text(250, CONSTANTS.UI.SUBMENU_Y + 100, '$5 Masks', { fontSize: CONSTANTS.TEXT.FONT_SIZE })
		.setInteractive()
		.on('pointerdown', () => {
			
			if (playerData.stats.health < 30) {
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

		this.checkoutTp = this.add.text(450, CONSTANTS.UI.SUBMENU_Y + 100, '$5 Toilet Paper', { fontSize: CONSTANTS.TEXT.FONT_SIZE })
		.setInteractive()
		.on('pointerdown', () => {
			
			tb.start(sceneText.checkout.purchase.noStock);
			
		});

		this.checkoutSoap = this.add.text(50, CONSTANTS.UI.SUBMENU_Y + 100, '$1 Soap', { fontSize: CONSTANTS.TEXT.FONT_SIZE })
		.setInteractive()
		.on('pointerdown', () => {
			
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