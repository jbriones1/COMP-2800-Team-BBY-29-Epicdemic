export let playerData = {
	stats: {
		hunger: 10, 
		health: 10, // 7-10 good, 5-6 neutral, 3-4 is bad, 0-2 is dead
		money: 10,
		happiness: 10,
		score: 0,
		day: 1,
		hour: 8,
		minute: 0,
		minuteStr: '00',
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
		{
		sender: 'Jon',
		message: 'Hello there'},
		{
			sender: 'Brian',
			message: 'Goodbye'}
	],
	location: null,
	job: true
};

export function setTime(hour, minute) {

}

export function changeTime(amount) {
	playerData.stats.minute += amount;
	if (playerData.stats.minute >= 60) {
		playerData.stats.hour += Math.floor(playerData.stats.minute / 60);
		playerData.stats.minute = playerData.stats.minute % 60;
	}
	if (playerData.stats.hour >= 24) {
		playerData.stats.day += Math.floor(playerData.stats.hour / 24);
		playerData.stats.hour = playerData.stats.hour % 24;
	}
	
	zeroPad();
}

export function fridgeContents() {
	let str = '';
	for (let x in playerData.fridge) {
		str += playerData.fridge[x] + 'x ' + x.replace(/_/g, ' ') + '\n';
	}
	str += '\nin the fridge.'
	return str;
}

export function storageContents() {
	let str = '';
	for (let x in playerData.storage) {
		str += playerData.storage[x] + 'x ' + x.replace(/_/g, ' ') + '\n';
	}
	str += '\nin storage.'
	return str;
}

function zeroPad(num, size) {
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