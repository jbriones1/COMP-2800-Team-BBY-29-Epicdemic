import {CONSTANTS} from '../globalvars/CONSTANTS.js';

let KEY = CONSTANTS.SCENES.CHATBOX;

export class Chatbox extends Phaser.Scene {

	constructor() {
		super({
			key: CONSTANTS.SCENES.CHATBOX
		});
	}

	init (data) {
		this.message = data.message;
		console.log(this.message);
	}

	preload() {
		
	}

	create () {
		this.add.text(0, 620, 'BLAH BLAH' + this.message);
	}


}