import {CONSTANTS} from '/js/CONSTANTS.js';
import * as playerFnc from '/js/playerData.js';

var goodChars = ['chicken', 'bunny', 'duck', 'rino', 'bird'];
var badChars = ['ghost', 'skull1', 'skull2', 'turtle', 'pig'];
var goodies;
var baddies;
var tutorialSprites;
var scoreText;
var livesText;
var start;
var dude;
var platforms;
var score;
var LEFT = 0;
var RIGHT = 1;
var lives;
var gameOver = false;
var instructions;
var timer;
var elapsed;
var win;
var winText = [
		'Congratulations on a hard day of work!',
		'Click here to return to your real life'
];
var restart;
var restartText = [
		'You could not finish your job!',
		'Click here to try again'
];
var finished = false;
var gameWidth = 950;
var scene;


let KEY = CONSTANTS.SCENES.MINIGAME;

/********************************************
 * Work mini-game accessed in the Toy store *
 ********************************************/
export class MiniGame extends Phaser.Scene {

	constructor() {
		super({
			key: KEY
		});
	}
	init(data) {
		this.playerData = data.playerData;
	}

	create() {
		lives = 3;
		score = 0;

		
		
		// BG
		this.add.image(475, 640, 'bg');
		// this.add.image(400, 300, 'sky');
		// Platform
		platforms = this.physics.add.staticGroup();
		platforms.create(475, 1270, 'ground').setScale(3).refreshBody();
		// Score text
		scoreText = this.add.text(16, 16, 'Score: 0', {
				fontSize: '50px',
				fill: '#000000',
				fontWeight: 'bold'
		});
		// Lives text
		livesText = this.add.text(gameWidth - 250, 16, 'Lives: 3', {
				fontSize: '50px',
				fill: '#000000',
				fontWeight: 'bold'
		});

		// 'dude' - playable character
		dude = this.physics.add.sprite(100, 0, 'dude');
		dude.setCollideWorldBounds(true);
		
		dude.setScale(3);
		dude.setBounce(0, 0);
		
		// Left, turn, right got the character movement
		this.anims.create({
				key: 'left',
				frames: this.anims.generateFrameNumbers('dude', {start: 0, end: 3}),
				frameRate: 10,
				repeat: -1
		});

		this.anims.create({
				key: 'turn',
				frames: [{key: 'dude', frame: 4}],
				frameRate: 20
		});

		this.anims.create({
				key: 'right',
				frames: this.anims.generateFrameNumbers('dude', {start: 5, end: 8}),
				frameRate: 10,
				repeat: -1
		});

		// Idle animations for the items falling from sky:
		this.anims.create({
				key: 'idleChicken',
				frames: this.anims.generateFrameNumbers('chicken', {start: 0, end: 12}),
				frameRate: 20,
				repeat: -1
		});
		this.anims.create({
				key: 'idleBunny',
				frames: this.anims.generateFrameNumbers('bunny', {start: 0, end: 7}),
				frameRate: 20,
				repeat: -1
		});
		this.anims.create({
				key: 'idleDuck',
				frames: this.anims.generateFrameNumbers('duck', {start: 0, end: 9}),
				frameRate: 20,
				repeat: -1
		});
		this.anims.create({
				key: 'idleRino',
				frames: this.anims.generateFrameNumbers('rino', {start: 0, end: 10}),
				frameRate: 20,
				repeat: -1
		});
		this.anims.create({
				key: 'idleBird',
				frames: this.anims.generateFrameNumbers('bird', {start: 0, end: 8}),
				frameRate: 20,
				repeat: -1
		});

		this.anims.create({
				key: 'idleTurtle',
				frames: this.anims.generateFrameNumbers('turtle', {start: 0, end: 7}),
				frameRate: 20,
				repeat: -1
		});
		this.anims.create({
				key: 'idleGhost',
				frames: this.anims.generateFrameNumbers('ghost', {start: 0, end: 9}),
				frameRate: 20,
				repeat: -1
		});
		this.anims.create({
				key: 'idleSkull1',
				frames: this.anims.generateFrameNumbers('skull1', {start: 0, end: 7}),
				frameRate: 20,
				repeat: -1
		});
		this.anims.create({
				key: 'idleSkull2',
				frames: this.anims.generateFrameNumbers('skull2', {start: 0, end: 7}),
				frameRate: 20,
				repeat: -1
		});
		this.anims.create({
				key: 'idlePig',
				frames: this.anims.generateFrameNumbers('pig', {start: 0, end: 11}),
				frameRate: 20,
				repeat: -1
		});

		tutorialSprites = this.physics.add.group();
		for (let i = 0; i < 5; i++) {
				let baddie = tutorialSprites.create((500 + (100 * i)), 0, badChars[i]);
				baddie.setScale(2.3);
				baddie.setCollideWorldBounds(true);
				baddie.setTint(0xfc0303);
				let goodie = tutorialSprites.create((i * 100), 0, goodChars[i]);
				goodie.setCollideWorldBounds(true);
				goodie.setScale(2.3);
				goodie.setTint(0x32a842);
				
				switch(i) {
				case 0:
						goodie.anims.play('idleChicken', true);
						break;
				case 1:
						goodie.anims.play('idleBunny', true);
						break;
				case 2:
						goodie.anims.play('idleDuck', true);
						break;
				case 3:
						goodie.anims.play('idleRino', true);
						break;
				case 4:
						goodie.anims.play('idleBird', true);
						break;
				}

				switch(i) {
				case 0:
						baddie.anims.play('idleGhost', true);
						break;
				case 1:
						baddie.anims.play('idleSkull1', true);
						break;
				case 2:
						baddie.anims.play('idleSkull2', true);
						break;
				case 3:
						baddie.anims.play('idleTurtle', true);
						break;
				case 4:
						baddie.anims.play('idlePig', true);
						break;
				}
				
		}

		// Text to show the instructions to the player
		var instructionsText = [
				"Click the left or right side of the screen to move",
				"that direction",
				"",
				"The green and red colored objects will fall from the", 
				"sky:",
				"-Collecting the green objects will give you 10 points.",
				"-Hitting the red objects will cost you 1 life.",
				"",
				"You have three lives",
				"You must get 50 points to finish your day at work"
		];

		// Instructions that are displayed on the screen
		instructions = this.add.text(20, 400, instructionsText, {
				fontSize: '45px',
				tint: '#000000',
				fontWeight: 'bold',
				wordWrap: {width: 920},
				stroke: '#000000',
				strokeThickness: 10
		});
		
		// Start button 
		start = this.add.text(gameWidth / 2.9, 300, 'START', {
				fontSize: '80px',
				fill: '#000000'
		})
		.setInteractive()
		.on('pointerdown', () => {
				
				start.destroy();
				instructions.destroy();
				tutorialSprites.destroy(true);
				timer = this.time.addEvent({
						delay: 4500,
						callback: this.randomSpawn,
						loop: true
				});
				elapsed = timer.getElapsed();
		});
		// Goodies
		
		goodies = this.physics.add.group();
		

		// Baddies
		
		baddies = this.physics.add.group();
		

		
		scene = this;

	}

	/**********************************************
	 * Updates the game every frame that it's run *
	 **********************************************/
	update() {
		
		if (score >= 50) {
				timer.timeScale = 2;
		}

		if (score >= 120) {
				timer.timeScale = 3;
		}

		if (score >= 200) {
				timer.timeScale = 4;
		}

		if (score >= 250) {
				timer.timeScale = 5
		}

		
		// Player movement
		// Checks whether the player should move left or right based on the
		// position on the screen that's tapped.
		// Left side moves left, right side moves right, anywhere else will stop the player
		if (this.input.activePointer.isDown) {
				
				let x = this.input.activePointer.x;
				
				if (Math.floor(x / (gameWidth / 2)) === LEFT) {
						dude.setVelocityX(-450);
						dude.anims.play('left', true);
						
				} else if (Math.floor(x / (gameWidth / 2)) === RIGHT) {
						dude.setVelocityX(450);
						dude.anims.play('right', true);
						
				} else {
						dude.setVelocityX(0);
						dude.anims.play('turn');
				}
		}

	
		
	} // update

  /**
	 * Hitting a baddie causes loss of life
	 * @param {Object} dude is the player character
	 * @param {Object} baddie is the bad item colliding
	 */
	hitBaddie(dude, baddie) {
		scene.__proto__.collide(baddie, dude);
		lives--;
		
		livesText.setText('Lives: ' + lives)
		
		if (lives <= 0) {
				timer.paused = true;
				 scene.physics.pause();
				 dude.setTint(0xff0000);
				 dude.anims.play('turn');
				 gameOver = true;
				 restart = scene.add.text(80, 300, restartText, {
						fontSize: '50px',
						fill: '#000000',
						fontWeight: 'bold',
						wordWrap: {width: 920},
						stroke: '#000000',
						strokeThickness: 1
				}).setInteractive().on('pointerdown', () => {
						scene.scene.restart();
				});
		}
	} // hit baddie

	/**
	 * Collision with a good item increases points
	 * @param {Entity} dude is the player character
	 * @param {Entity} goodie is the good item colliding
	 */
	collectGoodie(dude, goodie) {
		scene.__proto__.collide(goodie, dude);
		score += 10;
		scoreText.setText('Score: ' + score);
		

		if (score >= 50) {
				timer.paused = true;
				scene.physics.pause();
				dude.setTint(0xf5ff36);
				dude.anims.play('turn');
				gameOver = true;
				win = scene.add.text(30, 300, winText, {
						fontSize: '50px',
						tint: '#fff',
						fontWeight: 'bold',
						wordWrap: {width: 920},
						stroke: '#000000',
						strokeThickness: 10
				}).setInteractive().on('pointerdown', () => {
						scene.playerData.stats.money += Math.floor(score / 5);
						playerFnc.changeTime(scene.playerData, 240);
						scene.scene.start(CONSTANTS.SCENES.MUSICSTORE, {playerData: scene.playerData, finished: gameOver});
				});
		}

	} // collect goodie

	/**
	 * Colliding with objects causes the objects to be destroyed
	 * @param {Entity} entity is the entity being destroyed
	 * @param {Entity} platform 
	 */
	collide(entity, platform) {
		entity.destroy();
	} // collide

	/**
	 * Spawns goodies at set intervals.
	 * Spaces out the good items to spawn randomly
	 * @param {Number} num number of goodies to spawn 
	 */
	spawnGood(num) {
		var x = Phaser.Math.Between(0, gameWidth);
		let goodie = goodies.create(x, 0, goodChars[num]);
		goodie.setScale(2.3);
		goodie.setBounce(0);
		scene.physics.add.collider(platforms, goodie, scene.__proto__.collide, null, this);
		scene.physics.add.collider(dude, goodie, scene.__proto__.collectGoodie, null, this);
		goodie.setTint(0x32a842);
		switch(num) {
				case 0:
						goodie.anims.play('idleChicken', true);
						break;
				case 1:
						goodie.anims.play('idleBunny', true);
						break;
				case 2:
						goodie.anims.play('idleDuck', true);
						break;
				case 3:
						goodie.anims.play('idleRino', true);
						break;
				case 4:
						goodie.anims.play('idleBird', true);
						break;
		}
	} // spawn good

	/**
	 * Spawns baddies at set intervals.
	 * Spaces out the bad items to spawn randomly
	 * @param {Number} num number of baddies to spawn 
	 */
	spawnBad(num) {
		
		var x = Phaser.Math.Between(0, gameWidth);
		let baddie = baddies.create(x, 0, badChars[num]);
		baddie.setScale(2.3);
		baddie.setBounce(0);
		scene.physics.add.collider(platforms, baddie, scene.__proto__.collide, null, this);
		scene.physics.add.collider(dude, baddie, scene.__proto__.hitBaddie, null, this);
		baddie.setTint(0xfc0303);
		switch(num) {
				case 0:
						baddie.anims.play('idleGhost', true);
						break;
				case 1:
						baddie.anims.play('idleSkull1', true);
						break;
				case 2:
						baddie.anims.play('idleSkull2', true);
						break;
				case 3:
						baddie.anims.play('idleTurtle', true);
						break;
				case 4:
						baddie.anims.play('idlePig', true);
						break;
		}
	} // spawn bad

	/************************************
	 * Randomly chooses things to spawn *
	 ************************************/
	randomSpawn() {
		if (score < 300) {
				for (let i = 0; i < 5; i++) {
						setTimeout(function() {
								let randomNum = Phaser.Math.Between(0, 4);
								
								scene.__proto__.spawnBad(randomNum);
								scene.__proto__.spawnGood(randomNum);
						}, Math.random() * 1000);
				}
		}
	}

} // end of class 