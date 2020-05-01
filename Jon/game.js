/** @type {import("../typings/phaser")} */

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

import {Chatbox}        from './UI/Chatbox.js';

let config = {
	type: Phaser.AUTO,
	width: 720,
	height: 1280,
	scene: [
		IntroScene, 
		OverworldScene, 
		Chatbox, 
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
		MusicStoreScene
	]
};

let game = new Phaser.Game(config);

window.location.reload(true);