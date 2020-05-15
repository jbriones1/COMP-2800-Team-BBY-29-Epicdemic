/** @type {import("../typings/phaser")} */

import {CONSTANTS}       from './globalvars/CONSTANTS.js';

import {IntroScene}      from './scenes/IntroScene.js';
import {OverworldScene}  from './scenes/OverworldScene.js';
import {HomeScene}       from './scenes/HomeScene.js';
import {AirportScene}    from './scenes/AirportScene.js';
import {StoreScene}      from './scenes/StoreScene.js';
import {SchoolScene}     from './scenes/SchoolScene.js';
import {HospitalScene}   from './scenes/HospitalScene.js';
import {ParkScene}       from './scenes/ParkScene.js';
import {LobbyScene}      from './scenes/LobbyScene.js';
import {TheatreScene}    from './scenes/TheatreScene.js';
import {MallScene}       from './scenes/MallScene.js';
import {FoodCourtScene}  from './scenes/FoodCourtScene.js';
import {MusicStoreScene} from './scenes/MusicStoreScene.js';
import {UIScene}         from './scenes/UIScene.js';
import {EndScene}        from './scenes/EndScene.js'; 
import {MiniGame}        from './scenes/Minigame.js';

let config = {
	type: Phaser.AUTO,
	width: CONSTANTS.UI.SCREEN_WIDTH,
	height: CONSTANTS.UI.SCREEN_HEIGHT,
	scene: [
		IntroScene, 
		OverworldScene,
		UIScene, 
		HomeScene,
		AirportScene,
		StoreScene,
		SchoolScene,
		HospitalScene,
		ParkScene,
		LobbyScene,
		TheatreScene,
		MallScene,
		FoodCourtScene,
		MusicStoreScene,
		EndScene,
		MiniGame
	],
	physics: {
		default: 'arcade',
		arcade: {
				gravity: {y: 300},
				debug: false
		}
	},
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH
		}
};

let game = new Phaser.Game(config);