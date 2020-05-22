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
	park: {
		sally_annoyed: false,
		brian_refused: false
	},
	events: {
		watchMovieWithJon: true, 
		runWithBrian: false,
		protest: false
	}
};

// Amount is the time changed in minutes
export function changeTime(data, amount) {
	data.stats.minute += amount;
	if (data.stats.minute >= 60) {
		data.stats.hour += Math.floor(data.stats.minute / 60);
		data.stats.last_meal += Math.floor(data.stats.minute / 60);
		data.stats.minute = data.stats.minute % 60;
		checkLastMeal(data);
	}
	if (data.stats.hour >= 24) {
		data.stats.day += Math.floor(data.stats.hour / 24);
		data.stats.hour = data.stats.hour % 24;
	}
	
	zeroPad(data);
}

// Returns a string of the fridge contents
export function fridgeContents(data) {
	let str = '';
	for (let x in data.fridge) {
		str += data.fridge[x] + 'x ' + x.replace(/_/g, ' ') + '\n';
	}
	return str;
}

export function storageContents(data) {
	let str = '';
	for (let x in data.storage) {
		str += data.storage[x] + 'x ' + x.replace(/_/g, ' ') + '\n';
	}
	return str;
}

function zeroPad(data) {
	data.stats.minuteStr = data.stats.minute.toString();
	data.stats.minuteStr = data.stats.minuteStr.padStart(2, '0');
}

// Clears the current menu
export function clearSubmenu (submenu) {
	if (submenu != undefined) {
		for (let i = 0; i < submenu.length; i++) {
			submenu[i].destroy();
		}
	}
}

export function changeHunger(data, num) {
	data.stats.hunger += num;

	if (num > 0) {
		data.stats.last_meal = 0;
	}
}	

function checkLastMeal(data) {
	if (data.stats.last_meal >= 4) {
		data.stats.hunger--;
		data.stats.last_meal = 0;
	}
}

export function maskCheck(data) {
	if (!data.inventory.mask) {
		data.stats.health--;
	}

	return data.inventory.mask;
}