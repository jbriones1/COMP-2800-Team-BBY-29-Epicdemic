import {CONSTANTS} from '../globalvars/CONSTANTS.js';
import {playerData} from '../globalvars/playerData.js';
import * as playerFnc from '../globalvars/playerData.js';
import * as textbox   from '../functions/textbox.js' 
import {sceneText}     from '../dialogue/SchoolText.js';

let KEY = CONSTANTS.SCENES.SCHOOL;
let tb;
let submenu;
let mainMenu;
let stationeryMenu;
let deskActive = false;
let subSubMenuActive = false;


export class SchoolScene extends Phaser.Scene {
	constructor() {
		super({
			key: KEY
		});

	}

	init () {
		console.log("Loaded " + KEY);
		playerData.location = KEY;


		console.log(playerData);
		console.log("Preload");
	}

	// Load assets
	preload() {
		this.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
		this.load.image('nextPage', '../assets/images/arrow-down-left.png');
	}

	// Load game objects
	create () {

		// Textbox for dialogue
		tb = textbox.createTextBox(this, 100, CONSTANTS.UI.SCREEN_HEIGHT - 600, {
			wrapWidth: 650
		});

		// Entering message:
		tb.start("At School!", CONSTANTS.TEXT.TEXT_SPEED, function() {
			console.log("Entering message:");
		});

		// Creates all the menu buttons for the scene
		this.createObjects(function() {
			console.log("Creating objects");
		});

		// Return to Overworld
		this.theatreButton = this.add.text(
			CONSTANTS.UI.SCREEN_WIDTH - 300, 100, ' Return to Overworld')
			.setInteractive()
			.once('pointerdown', () => {
				this.scene.start(CONSTANTS.SCENES.OVERWORLD);
		});

		// Location label
		this.add.text(500, 360, KEY, {fill: '#0f0'})

	}

	createObjects() {
		// Desk
		this.desk = this.add.text(100, 100, "Desks", {fontSize: CONSTANTS.TEXT.FONT_SIZE}).setInteractive()
		.on('pointerdown', () => {
			if(!deskActive) {
				deskActive = true;
				playerFnc.clearSubmenu(submenu);
				tb.start(sceneText.desk.interact, CONSTANTS.TEXT.TEXT_SPEED);
				this.listDeskChoices();
				this.teacher.alpha = 0;
				this.bookshelf.alpha = 0;
			}
		});
		

		// Teacher
		this.teacher = this.add.text(100, 200, "Teacher", {fontSize: CONSTANTS.TEXT.FONT_SIZE})
		.setInteractive()
		.on('pointerdown', () => {
			if (!deskActive) {
				deskActive = true;
				playerFnc.clearSubmenu(submenu);
				tb.start(sceneText.teacher.interact);
				this.listTeacherChoices();
				this.desk.alpha = 0;
				this.bookshelf.alpha = 0;
			}
		});

		// Bookshelf
		this.bookshelf = this.add.text(100, 300, "Bookshelf", {fontSize: CONSTANTS.TEXT.FONT_SIZE})
		.setInteractive()
		.on('pointerdown', () => {
			deskActive = true;
			playerFnc.clearSubmenu(submenu);
			tb.start(sceneText.bookshelf.interact);
			this.listBookShelfChoices();
			this.desk.alpha = 0;
			this.teacher.alpha = 0;
		});

		mainMenu = [this.bookshelf, this.teacher, this.desk];
	}

	listDeskChoices() {
		// Back to main menu
		this.back = this.add.text(150, 150, "Back", {fontSize: CONSTANTS.TEXT.FONT_SIZE})
		.setInteractive()
		.on('pointerdown', ()=> {
			tb.start("At School!", CONSTANTS.TEXT.TEXT_SPEED);
			playerFnc.clearSubmenu(submenu);
			playerFnc.clearSubmenu(mainMenu)
			this.createObjects();
			deskActive = false;
		});

		// Stationery
		this.stationery = this.add.text(150, 200, "Your Stationery:", {fontSize: CONSTANTS.TEXT.FONT_SIZE})
		.setInteractive()
		.on('pointerdown', () => {
			if (!subSubMenuActive) {
				subSubMenuActive = true;
				// Dialogue box:
				tb.start(sceneText.desk.stationery.interact);
				// Hide other sub-menu items
				this.activities.alpha = 0;
				this.classmates.alpha = 0;
				this.back.alpha = 0;

				/* Stationery Menu */
				// Back 
				this.back = this.add.text(150, 300, "Back", {fontSize: CONSTANTS.TEXT.FONT_SIZE})
				.setInteractive()
				.on('pointerdown', () => {
					tb.start(sceneText.desk.interact);
					playerFnc.clearSubmenu(stationeryMenu);
					this.listDeskChoices();
					subSubMenuActive = false;
				});

				// Pencil
				this.pencil = this.add.text(150, 350, "Pencil", {fontSize: CONSTANTS.TEXT.FONT_SIZE})
				.setInteractive()
				.on('pointerdown', () => {
					if (playerData.stationery.pencil == false) {
						playerData.stationery.pencil = true;
						tb.start(sceneText.desk.stationery.pencil, CONSTANTS.TEXT.TEXT_SPEED);
					} else {
						tb.start("You are already holding a pencil...", CONSTANTS.TEXT.TEXT_SPEED);
					}
				});
				
				// Marker
				this.markers = this.add.text(150, 400, "Marker", {fontSize: CONSTANTS.TEXT.FONT_SIZE})
				.setInteractive()
				.on('pointerdown', () => {
					if (playerData.stationery.markers == false) {
						playerData.stationery.markers = true;
						tb.start(sceneText.desk.stationery.markers, CONSTANTS.TEXT.TEXT_SPEED);
					} else {
						tb.start("You are already holding your markers...", CONSTANTS.TEXT.TEXT_SPEED);
					}
				});

				// Paper
				this.paper = this.add.text(150, 450, "Paper", {fontSize: CONSTANTS.TEXT.FONT_SIZE})
				.setInteractive()
				.on('pointerdown', () => {
					if (playerData.stationery.paper == false) {
						playerData.stationery.paper = true;
						tb.start(sceneText.desk.stationery.paper, CONSTANTS.TEXT.TEXT_SPEED);
					} else {
						tb.start("You are already holding a sheet of paper...", CONSTANTS.TEXT.TEXT_SPEED);
					}
				});

				// Put away
				this.putAway = this.add.text(150, 500, "Put all stationery back", {fontSize: CONSTANTS.TEXT.FONT_SIZE})
				.setInteractive()
				.on('pointerdown', () => {
					playerData.stationery.markers = false;
					playerData.stationery.pencil = false;
					playerData.stationery.paper = false;
					tb.start(sceneText.desk.stationery.done, CONSTANTS.TEXT.TEXT_SPEED);
				});
				stationeryMenu = [this.stationery, this.back, this.pencil, this.paper, this.putAway, this.markers];
			}
		});

		this.classmates = this.add.text(150, 300, "Your Friends", {fontSize: CONSTANTS.TEXT.FONT_SIZE})
		.setInteractive()
		.on('pointerdown', () => {
			if (!subSubMenuActive) {
				subSubMenuActive = true;
				// Dialogue
				tb.start(sceneText.desk.classmates.interact);
				// Clear Other menu items
				this.activities.alpha = 0;
				this.stationery.alpha = 0;
				this.back.alpha = 0;

				// Back 
				this.back = this.add.text(150, 350, "Back", {fontSize: CONSTANTS.TEXT.FONT_SIZE})
				.setInteractive()
				.on('pointerdown', () => {
					playerFnc.clearSubmenu(stationeryMenu);
					tb.start(sceneText.desk.interact);
					this.listDeskChoices();
					subSubMenuActive = false;
				});
				
				// Jon
				this.Jon = this.add.text(150, 400, "Jon", {fontSize: CONSTANTS.TEXT.FONT_SIZE})
				.setInteractive()
				.on('pointerdown', () => {
					tb.start(sceneText.desk.classmates.Jon);
				});

				// Mandy
				this.Mandy = this.add.text(150, 450, "Mandy", {fontSize: CONSTANTS.TEXT.FONT_SIZE})
				.setInteractive()
				.on('pointerdown', () => {
					tb.start(sceneText.desk.classmates.Mandy);
				});

				// Brian
				this.Brian = this.add.text(150, 500, "Brian", {fontSize: CONSTANTS.TEXT.FONT_SIZE})
				.setInteractive()
				.on('pointerdown', () => {
					tb.start(sceneText.desk.classmates.Brian);
				});

				// Andi
				this.Andi = this.add.text(150, 550, "Andi", {fontSize: CONSTANTS.TEXT.FONT_SIZE})
				.setInteractive()
				.on('pointerdown', () => {
					tb.start(sceneText.desk.classmates.Andi);
				});

				stationeryMenu = [this.classmates, this.back, this.Jon, this.Mandy, this.Andi, this.Brian];
			}
		});

		this.activities = this.add.text(150, 400, "Activities", {fontSize: CONSTANTS.TEXT.FONT_SIZE})
		.setInteractive()
		.on('pointerdown', () => {
			if (!subSubMenuActive) {
				subSubMenuActive = true;
				// Dialogue:
				tb.start(sceneText.desk.activities.interact)
				// Clear Other menu items
				this.classmates.alpha = 0;
				this.stationery.alpha = 0;
				this.back.alpha = 0;

				// Back 
				this.back = this.add.text(150, 450, "Back", {fontSize: CONSTANTS.TEXT.FONT_SIZE})
				.setInteractive()
				.on('pointerdown', () => {
					tb.start(sceneText.desk.interact);
					playerFnc.clearSubmenu(stationeryMenu);
					this.listDeskChoices();
					subSubMenuActive = false;
				});

				// Draw 
				this.draw = this.add.text(150, 500, "Draw", {fontSize: CONSTANTS.TEXT.FONT_SIZE})
				.setInteractive()
				.on('pointerdown', () => {
					if (playerData.stationery.markers && playerData.stationery.paper && playerData.stationery.pencil) {
						let random = Math.floor(Math.random() * 2);
						console.log(random);
						random == 0 ? tb.start(sceneText.desk.activities.draw.pictures.robot) : tb.start(sceneText.desk.activities.draw.pictures.unicorn);
					} else {
						tb.start(sceneText.desk.activities.draw.fail);
					}
				});
				stationeryMenu = [this.activities, this.back, this.draw];
			}
		});
		submenu = [this.back, this.stationery, this.classmates, this.activities];
	}

	listTeacherChoices() {
		// Return to main menu
		this.back = this.add.text(150, 250, "Back", {fontSize: CONSTANTS.TEXT.FONT_SIZE})
		.setInteractive()
		.on('pointerdown', ()=> {
			tb.start("At School!", CONSTANTS.TEXT.TEXT_SPEED);
			playerFnc.clearSubmenu(submenu);
			playerFnc.clearSubmenu(mainMenu)
			this.createObjects();
			deskActive = false;
		});

		// Ask a Question
		this.question = this.add.text(150, 300, "Ask a Question!", {fontSize: CONSTANTS.TEXT.FONT_SIZE})
		.setInteractive()
		.on('pointerdown', () => {
			if (!subSubMenuActive) {
				subSubMenuActive = true;
				// Dialogue box:
				tb.start(sceneText.teacher.question.interact);

				// Hide other sub-menu items
				this.back.alpha = 0;

				/* Question Menu */
				// Back
				this.back = this.add.text(150, 350, "Back", {fontSize: CONSTANTS.TEXT.FONT_SIZE})
				.setInteractive()
				.on('pointerdown', () => {
					tb.start(sceneText.teacher.interact);
					playerFnc.clearSubmenu(stationeryMenu);
					this.listTeacherChoices();
					subSubMenuActive = false;
				});

				// What is COVID-19?
				this.question1 = this.add.text(150, 400, "What Is COVID-19?", {fontSize: CONSTANTS.TEXT.FONT_SIZE})
				.setInteractive()
				.on("pointerdown", () => {
					tb.start(sceneText.teacher.question.question1.answer1);
				});

				// How can I stop the spread of COVID-19?
				this.question2 = this.add.text(150, 450, "How can I help stop the spread?", {fontSize: CONSTANTS.TEXT.FONT_SIZE})
				.setInteractive()
				.on("pointerdown", () => {
					let random = Math.floor(Math.random() * 3);
					switch(random) {
						case 0:
							tb.start(sceneText.teacher.question.question2.answer1);
							break;
						case 1:
							tb.start(sceneText.teacher.question.question2.answer2);
							break;
						default:
							tb.start(sceneText.teacher.question.question2.answer3);
							break;
					}
				});

				// What is the homework?
				this.question3 = this.add.text(150, 500, "What's for homework?", {fontSize: CONSTANTS.TEXT.FONT_SIZE})
				.setInteractive()
				.on("pointerdown", () => {
					tb.start(sceneText.teacher.question.question3.answer1);
				});

				stationeryMenu = [this.question, this.back, this.question1, this.question2, this.question3];
			}
		});
		submenu = [this.back, this.question];
	}

	listBookShelfChoices() {
		// Back to main menu
		this.back = this.add.text(150, 350, "Back", {fontSize: CONSTANTS.TEXT.FONT_SIZE})
		.setInteractive()
		.on('pointerdown', ()=> {
			tb.start("At School!", CONSTANTS.TEXT.TEXT_SPEED);
			playerFnc.clearSubmenu(submenu);
			playerFnc.clearSubmenu(mainMenu)
			this.createObjects();
			deskActive = false;
		});

		// Choose a book
		this.getRandomBook = this.add.text(150, 400, "Get A Book!", {fontSize: CONSTANTS.TEXT.FONT_SIZE})
		.setInteractive()
		.on('pointerdown', ()=> {
			if (!subSubMenuActive) {
				subSubMenuActive = true;
				// Dialogue box:
				tb.start(sceneText.bookshelf.books.interact);

				// Hide other sub-menu items
				this.back.alpha = 0;

				/* Book Menu. */
				// Back
				this.back = this.add.text(150, 450, "Back", {fontSize: CONSTANTS.TEXT.FONT_SIZE})
				.setInteractive()
				.on('pointerdown', () => {
					tb.start(sceneText.teacher.interact);
					playerFnc.clearSubmenu(stationeryMenu);
					this.listBookShelfChoices();
					subSubMenuActive = false;
				});

				this.book1 = this.add.text(150, 500, "Book 1", {fontSize: CONSTANTS.TEXT.FONT_SIZE})
				.setInteractive()
				.on('pointerdown', () => {
					if (playerData.book.hasBook1) {
						tb.start(sceneText.bookshelf.books.failOwned);
					} else if (playerData.book.hasOneBook) {
						tb.start(sceneText.bookshelf.books.failTooMany);
					} else {
						tb.start(sceneText.bookshelf.books.book1);
						playerData.book.hasBook1 = true;
						playerData.book.hasOneBook = true;
					}
				});

				this.book2 = this.add.text(150, 550, "Book 2", {fontSize: CONSTANTS.TEXT.FONT_SIZE})
				.setInteractive()
				.on('pointerdown', () => {
					if (playerData.book.hasBook2) {
						tb.start(sceneText.bookshelf.books.failOwned);
					} else if (playerData.book.hasOneBook) {
						tb.start(sceneText.bookshelf.books.failTooMany);
					} else {
						tb.start(sceneText.bookshelf.books.book2);
						playerData.book.hasBook2 = true;
						playerData.book.hasOneBook = true;
					}
				});

				this.book3 = this.add.text(150, 600, "Book 3", {fontSize: CONSTANTS.TEXT.FONT_SIZE})
				.setInteractive()
				.on('pointerdown', () => {
					if (playerData.book.hasBook3) {
						tb.start(sceneText.bookshelf.books.failOwned);
					} else if (playerData.book.hasOneBook) {
						tb.start(sceneText.bookshelf.books.failTooMany);
					} else {
						tb.start(sceneText.bookshelf.books.book3);
						playerData.book.hasBook3 = true;
						playerData.book.hasOneBook = true;
					}
				});

				this.returnBooks = this.add.text(150, 650, "Return Your Book", {fontSize: CONSTANTS.TEXT.FONT_SIZE})
				.setInteractive()
				.on('pointerdown', () => {
					if (!playerData.book.hasOneBook) {
						tb.start(sceneText.bookshelf.books.returnFail);
					} else {
						tb.start(sceneText.bookshelf.books.return);
						playerData.book.hasBook1 = false;
						playerData.book.hasBook2 = false;
						playerData.book.hasBook3 = false;
						playerData.book.hasOneBook = false;
					}
				});

				stationeryMenu = [this.getRandomBook, this.back, this.book1, this.book2, this.book3, this.returnBooks];
			}
		});

		submenu = [this.back, this.getRandomBook];
	}
}