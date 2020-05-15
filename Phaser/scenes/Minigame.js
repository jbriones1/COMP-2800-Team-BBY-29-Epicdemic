import {CONSTANTS} from '../globalvars/CONSTANTS.js';
import {playerData} from '../globalvars/playerData.js';

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


let KEY = CONSTANTS.SCENES.MINIGAME;

export class MiniGame extends Phaser.Scene {

	constructor() {
		super({
			key: KEY
		});
	}

	create() {
		lives = 3;
		score = 0;

		console.log(lives);
		console.dir(this.scene);
		
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
		console.dir(dude);
		// Left, turn, right
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
				"You must get 300 points to finish your day at work"
		];

		instructions = this.add.text(20, 500, instructionsText, {
				fontSize: '45px',
				fill: '#000000',
				fontWeight: 'bold',
				wordWrap: {width: 920},
				stroke: '#000000',
				strokeThickness: 1
		});
		




		start = this.add.text(gameWidth / 2.9, 300, 'START', {
				fontSize: '80px',
				fill: '#000000'
		})
		.setInteractive()
		.on('pointerdown', () => {
				gameStart = true;
				start.destroy();
				instructions.destroy();
				tutorialSprites.destroy(true);
				timer = this.time.addEvent({
						delay: 4500,
						callback: randomSpawn,
						loop: true
				});
				elapsed = timer.getElapsed();
		});
		// Goodies
		
		goodies = this.physics.add.group();
		

		// Baddies
		
		baddies = this.physics.add.group();



		// this.physics.add.overlap(dude, goodies, null, this);

		// this.physics.add.overlap(dude, baddies, null, this);

		console.log(this);
		


	}

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

	hitBaddie(dude, baddie) {
		collide(baddie, dude);
		lives--;
		console.log(lives);
		livesText.setText('Lives: ' + lives)
		console.dir("collide with baddie: " + baddie);
		if (lives <= 0) {
				timer.paused = true;
				 game.scene.scenes[0].physics.pause();
				 dude.setTint(0xff0000);
				 dude.anims.play('turn');
				 gameOver = true;
				 restart = game.scene.scenes[0].add.text(80, 300, restartText, {
						fontSize: '50px',
						fill: '#000000',
						fontWeight: 'bold',
						wordWrap: {width: 920},
						stroke: '#000000',
						strokeThickness: 1
				}).setInteractive().on('pointerdown', () => {
						console.dir(game.scene.keys.default.scene.restart());
				});
		}
	} // hit baddie

	collectGoodie(dude, goodie) {
		console.log(goodie);
		collide(goodie, dude);
		score += 10;
		scoreText.setText('Score: ' + score);
		console.log("collide goodie");

		if (score >= 50) {
				timer.paused = true;
				game.scene.scenes[0].physics.pause();
				dude.setTint(0xf5ff36);
				dude.anims.play('turn');
				gameOver = true;
				win = game.scene.scenes[0].add.text(30, 300, winText, {
						fontSize: '50px',
						fill: '#000000',
						fontWeight: 'bold',
						wordWrap: {width: 920},
						stroke: '#000000',
						strokeThickness: 1
				}).setInteractive().on('pointerdown', () => {
						game.scene.keys.default.scene.start('scene2', {finished: gameOver});
				});
		}

	} // collect goodie

	collide(entity, platform) {
		entity.destroy();
	} // collide

	spawnGood(num) {
		var x = Phaser.Math.Between(0, gameWidth);
		let goodie = goodies.create(x, 0, goodChars[num]);
		goodie.setScale(2.3);
		goodie.setBounce(0);
		game.scene.scenes[0].physics.add.collider(platforms, goodie, collide, null, this);
		game.scene.scenes[0].physics.add.collider(dude, goodie, collectGoodie, null, this);
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
	}

	spawnGood(num) {
		var x = Phaser.Math.Between(0, gameWidth);
		let goodie = goodies.create(x, 0, goodChars[num]);
		goodie.setScale(2.3);
		goodie.setBounce(0);
		game.scene.scenes[0].physics.add.collider(platforms, goodie, collide, null, this);
		game.scene.scenes[0].physics.add.collider(dude, goodie, collectGoodie, null, this);
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

	spawnBad(num) {
		var x = Phaser.Math.Between(0, gameWidth);
		let baddie = baddies.create(x, 0, badChars[num]);
		baddie.setScale(2.3);
		baddie.setBounce(0);
		game.scene.scenes[0].physics.add.collider(platforms, baddie, collide, null, this);
		game.scene.scenes[0].physics.add.collider(dude, baddie, hitBaddie, null, this);
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

	randomSpawn() {
		if (score < 300) {
				for (let i = 0; i < 5; i++) {
						setTimeout(function() {
								let randomNum = Phaser.Math.Between(0, 4);
								console.log(randomNum);
								spawnBad(randomNum);
								spawnGood(randomNum);
						}, Math.random() * 1000);
				}
		}
	}

} // end of class 