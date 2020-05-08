export let playerData = {
	stats: {
		hunger: 100,
		health: 100,
		money: 1000,
		happiness: 100,
		score: 0,
		day: 1,
		hour: 12,
		minute: 0,
		minuteStr: '00',
	},
	fridge: {
		apples: 0,
		fries: 0,
		cakes: 0
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
	job: true,
	stationery: [{
		pencil: false,
		markers: false,
		paper: false
	}],
	book: [{
		hasBook1: false,
		hasBook2: false,
		hasBook3: false,
		hasOneBook: false
	}]
};

export function changeTime(amount) {
	playerData.stats.minute += amount;
	if (playerData.stats.minute >= 60) {
		playerData.stats.minute = playerData.stats.minute - 60;
		playerData.stats.hour++;
	}
	if (playerData.stats.hour >= 24) {
		playerData.stats.hour = playerData.stats.hour - 24;
		playerData.stats.day++;
	}
	
	zeroPad();

	return 'Day ' + playerData.stats.day + 
		     '\nTime: ' + playerData.stats.hour + ':' + playerData.stats.minuteStr;
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

export function clearSubmenu (submenu) {
	if (submenu != undefined) {
		for (let i = 0; i < submenu.length; i++) {
			submenu[i].destroy();
		}
	}
}

export function drawStats(scene) {
	
}