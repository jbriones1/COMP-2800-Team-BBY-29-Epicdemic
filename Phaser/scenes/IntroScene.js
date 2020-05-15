import {CONSTANTS} from '../globalvars/CONSTANTS.js';
import {playerData} from '../globalvars/playerData.js';
import * as textbox from '../functions/textbox.js'
import * as sceneText from '../dialogue/IntroSceneText.js';

let KEY = CONSTANTS.SCENES.INTRO
let tb;
let startText = false;
let beginText;

export class IntroScene extends Phaser.Scene {
	constructor() {
		super({
			key: KEY
		});

	}

	init () {
		console.log("Loaded " + KEY);
		
		console.log(playerData);
	}

	// Load assets
	preload() {
		this.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
		this.load.image('nextPage', '../assets/images/arrow-down-left.png');
		this.load.image('red_arrow', '../assets/images/red_arrow.png');

		// House
		this.load.image('house_bg', '../assets/backgrounds/home/home_furnished.png');
		this.load.image('house_computer', '../assets/backgrounds/home/computer.png');
		this.load.image('house_cabinet', '../assets/backgrounds/home/cabinet.png');
		this.load.image('house_fridge', '../assets/backgrounds/home/fridge.png');
		this.load.image('house_sink', '../assets/backgrounds/home/sink.png');
		this.load.image('house_bed', '../assets/backgrounds/home/bed.png');

		// Hospital
		this.load.image('hospital_bg', '../assets/backgrounds/hospital/hospital.png');
		this.load.image('hospital_desk', '../assets/backgrounds/hospital/reception.png')
		this.load.spritesheet('hospital_nurse', '../assets/characters/nurse.png', {frameWidth: 90, frameHeight: 150});
		this.load.spritesheet('hospital_grandma', '../assets/characters/grandma1.png', {frameWidth: 90, frameHeight: 150});
	
		// Grocery Store
		this.load.image('groceryStore_bg', '../assets/backgrounds/groceryStore/groceryStore.png');

		// Toy Store
		this.load.image('nextPage', '../assets/images/arrow-down-left.png');
		this.load.image('musicStore_bg', '../assets/backgrounds/musicStore/toystore.png');
		this.load.image('musicStore_manager', '../assets/backgrounds/musicStore/manager.png');

		// School
		this.load.image('school_bg', '../assets/backgrounds/school/school_toliet_paper.png');

		// Theatre Lobby
		this.load.image('theatreLobby_bg', '../assets/backgrounds/theatreLobby/theatre_lobby.png');
		this.load.image('theatreLobby_customer', '../assets/backgrounds/theatreLobby/customer.png');

		// Theatre
		this.load.image('theatre_bg', '../assets/backgrounds/theatre/theatre_people.png')

		

		// Mini-game ==============================================================
		// bg
		this.load.image('sky', '../assets/sky.png');
		this.load.image('ground', '../assets/platform.png');
		this.load.image('bg', '../assets/bg.png');

		// Character
		this.load.spritesheet('dude', '../assets/dude.png', { frameWidth: 32, frameHeight: 48 });

		// Good
		this.load.spritesheet('chicken', '../assets/Enemies/Chicken/Idle.png',
		{frameWidth: 32, frameHeight: 34});
		this.load.spritesheet('bunny', '../assets/Enemies/Bunny/Idle.png',
		{frameWidth: 34, frameHeight: 44});
		this.load.spritesheet('duck', '../assets/Enemies/Duck/Idle.png',
		{frameWidth: 36, frameHeight: 36});
		this.load.spritesheet('rino', '../assets/Enemies/Rino/Idle.png',
		{frameWidth: 52, frameHeight: 34});
		this.load.spritesheet('bird', '../assets/Enemies/BlueBird/Flying.png',
		{frameWidth: 32, frameHeight: 32});

		// Bad
		this.load.spritesheet('ghost', '../assets/Enemies/Ghost/Idle.png',
		{frameWidth: 44, frameHeight: 30});
		this.load.spritesheet('skull1', '../assets/Enemies/Skull/Idle1.png',
		{frameWidth: 52, frameHeight: 54});
		this.load.spritesheet('skull2', '../assets/Enemies/Skull/Idle2.png',
		{frameWidth: 52, frameHeight: 54});
		this.load.spritesheet('turtle', '../assets/Enemies/Turtle/spikeso.png',
		{frameWidth: 44, frameHeight: 26});
		this.load.spritesheet('pig', '../assets/Enemies/AngryPig/Run.png',
		{frameWidth: 36, frameHeight: 30});
	}

	// Load game object
	create () {
		tb = textbox.createEndTextBox(this,
			100, 300, { wrapWidth: 650 });

		tb.start(sceneText.introduction, CONSTANTS.TEXT.TEXT_SPEED);
	}

	update () {

		this.scene.start(CONSTANTS.SCENES.THEATRE).launch(CONSTANTS.SCENES.UI);
		// this.scene.start(CONSTANTS.SCENES.MINIGAME);

		if (tb.isLastPage && !tb.isTyping && !startText) {

			beginText = this.add.text(400, 700, "START", 
				{fontSize: CONSTANTS.TEXT.FONT_SIZE + 10})
			.setInteractive()
			.on('pointerup', () => {
				// Boots all necessary scenes
				this.scene.start(CONSTANTS.SCENES.HOME)
				.launch(CONSTANTS.SCENES.UI);
			});
			
			startText = true;
		}
	} // end of update

}

