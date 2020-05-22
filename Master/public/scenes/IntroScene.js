import {CONSTANTS} from '../js/CONSTANTS.js';
import * as textbox from '../js/functions/textbox.js'
import * as sceneText from '../js/dialogue/IntroSceneText.js';

let KEY = CONSTANTS.SCENES.INTRO
let tb;
let startText = false;
let scenebl;
let beginText;
let helpText;


export class IntroScene extends Phaser.Scene {
	constructor() {
		super({
			key: KEY
		});

	}

	init () {
		localStorage.removeItem('savedPlayerData');
		console.log("Loaded " + KEY);
		scenebl = this;
	}

	// Load assets
	preload() {
		this.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
		this.load.image('nextPage', '/assets/images/arrow-down-left.png');
		this.load.image('red_arrow', '/assets/images/red_arrow.png');

		// House
		this.load.image('house_bg', '/assets/backgrounds/home/home_furnished.png');
		this.load.image('house_computer', '/assets/backgrounds/home/computer.png');
		this.load.image('house_cabinet', '/assets/backgrounds/home/cabinet.png');
		this.load.image('house_fridge', '/assets/backgrounds/home/fridge.png');
		this.load.image('house_sink', '/assets/backgrounds/home/sink.png');
		this.load.image('house_bed', '/assets/backgrounds/home/bed.png');

		// Hospital
		this.load.image('hospital_bg', '/assets/backgrounds/hospital/hospital.png');
		this.load.image('hospital_desk', '/assets/backgrounds/hospital/reception.png')
		this.load.spritesheet('hospital_nurse', '/assets/characters/nurse.png', {frameWidth: 90, frameHeight: 150});
		this.load.spritesheet('hospital_grandma', '/assets/characters/grandma1.png', {frameWidth: 90, frameHeight: 150});
	
		// Grocery Store
		this.load.image('groceryStore_bg', '/assets/backgrounds/groceryStore/groceryStore.png');

		// Toy Store
		this.load.image('nextPage', '/assets/images/arrow-down-left.png');
		this.load.image('musicStore_bg', '/assets/backgrounds/musicStore/toystore.png');
		this.load.image('musicStore_manager', '/assets/backgrounds/musicStore/manager.png');

		// School
		this.load.image('school_bg', '/assets/backgrounds/school/school_toliet_paper.png');

		// Theatre Lobby
		this.load.image('theatreLobby_bg', '/assets/backgrounds/theatreLobby/theatre_lobby.png');
		this.load.image('theatreLobby_customer', '/assets/backgrounds/theatreLobby/customer.png');

		// Theatre
		this.load.image('theatre_bg', '/assets/backgrounds/theatre/theatre_people.png')

		//Park
		this.load.image('park_bg', '/assets/backgrounds/park.png')
		this.load.spritesheet('park_girl', '/characterspritesheet/girl1.png', { frameWidth: 31, frameHeight: 48 })
		this.load.image('park_arrow', '/assets/images/red_arrow.png')
		
		// Mini-game ==============================================================
		// bg
		this.load.image('ground', '/assets/minigame/platform.png');
		this.load.image('bg', '/assets/minigame/bg.png');

		// Character
		this.load.spritesheet('dude', '/assets/minigame/dude.png', { frameWidth: 32, frameHeight: 48 });

		// Good
		this.load.spritesheet('chicken', '/assets/minigame/Chicken/Idle.png',
		{frameWidth: 32, frameHeight: 34});
		this.load.spritesheet('bunny', '/assets/minigame/Bunny/Idle.png',
		{frameWidth: 34, frameHeight: 44});
		this.load.spritesheet('duck', '/assets/minigame/Duck/Idle.png',
		{frameWidth: 36, frameHeight: 36});
		this.load.spritesheet('rino', '/assets/minigame/Rino/Idle.png',
		{frameWidth: 52, frameHeight: 34});
		this.load.spritesheet('bird', '/assets/minigame/BlueBird/Flying.png',
		{frameWidth: 32, frameHeight: 32});

		// Bad
		this.load.spritesheet('ghost', '/assets/minigame/Ghost/Idle.png',
		{frameWidth: 44, frameHeight: 30});
		this.load.spritesheet('skull1', '/assets/minigame/Skull/Idle1.png',
		{frameWidth: 52, frameHeight: 54});
		this.load.spritesheet('skull2', '/assets/minigame/Skull/Idle2.png',
		{frameWidth: 52, frameHeight: 54});
		this.load.spritesheet('turtle', '/assets/minigame/Turtle/spikeso.png',
		{frameWidth: 44, frameHeight: 26});
		this.load.spritesheet('pig', '/assets/minigame/AngryPig/Run.png',
		{frameWidth: 36, frameHeight: 30});
	}
	

	// Load game object
	create () {
		tb = textbox.createTextBox(this,
			100, 300, { wrapWidth: 650 })
		.setVisible(false);

		$.getJSON('/loadgame', function(data) {
			console.log(data);
			console.log("Game loaded");
			this.playerData = data;

			if (this.playerData.location != null) {
				scenebl.scene.start(this.playerData.location, {playerData: this.playerData}).launch(CONSTANTS.SCENES.UI, {playerData: this.playerData});
			} else {
				tb.setVisible(true).start(sceneText.introduction, CONSTANTS.TEXT.TEXT_SPEED);

				beginText = scenebl.add.text(400, 700, "START\n", 
				{fontSize: CONSTANTS.TEXT.FONT_SIZE + 10})
				.setInteractive()
				.on('pointerup', () => {
				// Boots all necessary scenes
				scenebl.scene.start(CONSTANTS.SCENES.HOME, {playerData: this.playerData})
				.launch(CONSTANTS.SCENES.UI, {playerData: this.playerData});
			});
				

			helpText = scenebl.add.text(325, 800, "HOW TO PLAY\n", {fontSize: CONSTANTS.TEXT.FONT_SIZE + 10})
			.setInteractive()
			.on('pointerup', () => {
				scenebl.scene.launch(CONSTANTS.SCENES.HOWTOPLAY);
			});
			} // end of else
		}); // end of JSON load



		
	}

	update () {
		// if (tb.isLastPage && !tb.isTyping && !startText) {
		// 	beginText = this.add.text(400, 700, "START", 
		// 		{fontSize: CONSTANTS.TEXT.FONT_SIZE + 10})
		// 	.setInteractive()
		// 	.on('pointerup', () => {
		// 		// Boots all necessary scenes
		// 		this.scene.start(CONSTANTS.SCENES.HOME, {playerData: this.playerData})
		// 		.launch(CONSTANTS.SCENES.UI);
		// 	});
			
		// 	startText = true;
		// }

	
	} // end of update

}

