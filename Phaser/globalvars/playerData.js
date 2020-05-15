export let playerData = {
	stats: {
		hunger: 10, 
		health: 10, // 7-10 good, 5-6 neutral, 3-4 is bad, 0-2 is dead
		money: 10,
		happiness: 10,
		event_done: 0,
		day: 1,
		hour: 9,
		minute: 0,
		minuteStr: '00',
		donations: 0,
		last_meal: 0,
		bad_decisions: 0
	},
	fridge: {
		apple: 0,
		instant_ramen: 0,
		bread: 0
	},
	storage: {
		masks: 0,
		toilet_paper: 0,
		soap: 3
	},
	inventory: {
		mask: false,
		ticket: false
	},
	messages: [
		{ sender: 'Boss', message: "Make sure you come to work today! I'm not closing this place yet and we got toys to sell."},
		{ sender: 'Jon', message: 'Hey wanna go watch a movie today? Sonic the Hedgehog is playing at around 6PM.'}
	],
	friends: {
		Brian: true,
		Jon: true,
		Andi: true,
		Mandy: true
	},
	location: null,
	job: true,
	tutorial_done: false,
	unlocked: false,
	secret: false,
	hospital: {
		grandma: true
	},
	toystore: {
		healthy_customer: true
	},
	theatre: {

	}
};

let startingPlayerData = {
	stats: {
		hunger: 10, 
		health: 10, // 7-10 good, 5-6 neutral, 3-4 is bad, 0-2 is dead
		money: 10,
		happiness: 10,
		event_done: 0,
		day: 1,
		hour: 9,
		minute: 0,
		minuteStr: '00',
		donations: 0,
		last_meal: 0,
		bad_decisions: 0
	},
	fridge: {
		apple: 0,
		instant_ramen: 0,
		bread: 0
	},
	storage: {
		masks: 0,
		toilet_paper: 0,
		soap: 3
	},
	inventory: {
		mask: false,
		ticket: false
	},
	messages: [
		{ sender: 'Boss', message: "Make sure you come to work today! I'm not closing this place yet and we got toys to sell."},
		{ sender: 'Jon', message: 'Hey wanna go watch a movie today? Sonic the Hedgehog is playing at around 6PM.'}
	],
	friends: {
		Brian: true,
		Jon: true,
		Andi: true,
		Mandy: true
	},
	location: null,
	job: true,
	tutorial_done: false,
	unlocked: false,
	secret: false,
	hospital: {
		grandma: true
	},
	toystore: {
		healthy_customer: true
	},
	theatre: {

	}
};

// Amount is the time changed in minutes
export function changeTime(amount) {
	playerData.stats.minute += amount;
	if (playerData.stats.minute >= 60) {
		playerData.stats.hour += Math.floor(playerData.stats.minute / 60);
		playerData.stats.last_meal += Math.floor(playerData.stats.minute / 60);
		playerData.stats.minute = playerData.stats.minute % 60;
		checkLastMeal();
	}
	if (playerData.stats.hour >= 24) {
		playerData.stats.day += Math.floor(playerData.stats.hour / 24);
		playerData.stats.hour = playerData.stats.hour % 24;
	}
	
	zeroPad();
}

// Returns a string of the fridge contents
export function fridgeContents() {
	let str = '';
	for (let x in playerData.fridge) {
		str += playerData.fridge[x] + 'x ' + x.replace(/_/g, ' ') + '\n';
	}
	return str;
}

export function storageContents() {
	let str = '';
	for (let x in playerData.storage) {
		str += playerData.storage[x] + 'x ' + x.replace(/_/g, ' ') + '\n';
	}
	return str;
}

function zeroPad() {
	playerData.stats.minuteStr = playerData.stats.minute.toString();
	playerData.stats.minuteStr = playerData.stats.minuteStr.padStart(2, '0');
}

// Clears the current menu
export function clearSubmenu (submenu) {
	if (submenu != undefined) {
		for (let i = 0; i < submenu.length; i++) {
			submenu[i].destroy();
		}
	}
}

export function changeHunger(num) {
	playerData.stats.hunger += num;

	if (num > 0) {
		playerData.stats.last_meal -= num;
	}
}	

function checkLastMeal() {
	if (playerData.stats.last_meal >= 4) {
		playerData.stats.hunger--;
	}
}

export function maskCheck() {
	if (!playerData.inventory.mask) {
		playerData.stats.health--;
	}

	return playerData.inventory.mask;
}