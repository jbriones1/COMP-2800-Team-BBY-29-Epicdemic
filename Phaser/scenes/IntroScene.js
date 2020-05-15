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
	}

	// Load game object
	create () {
		tb = textbox.createTextBox(this,
			100, 300, { wrapWidth: 650 });

		tb.start(sceneText.introduction, CONSTANTS.TEXT.TEXT_SPEED);
	}

	update () {

		this.scene.start(CONSTANTS.SCENES.STORE).launch(CONSTANTS.SCENES.UI);

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

