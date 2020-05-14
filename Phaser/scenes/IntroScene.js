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
		this.load.image('redArrow', '../assets/images/red_arrow.png');
	}

	// Load game object
	create () {
		tb = textbox.createTextBox(this,
			100, 300, { wrapWidth: 650 });

		tb.start(sceneText.introduction, CONSTANTS.TEXT.TEXT_SPEED);
	}

	update () {

		// this.scene.start(CONSTANTS.SCENES.HOME).launch(CONSTANTS.SCENES.UI);

		if (tb.isLastPage && !tb.isTyping && !startText) {

			beginText = this.add.text(400, 500, "START", 
				{fontSize: CONSTANTS.TEXT.FONT_SIZE})
			.setInteractive()
			.on('pointerdown', () => {
				// Boots all necessary scenes
				this.scene.start(CONSTANTS.SCENES.HOME)
				.launch(CONSTANTS.SCENES.UI);
			});
			
			startText = true;
		}
	} // end of update

}

