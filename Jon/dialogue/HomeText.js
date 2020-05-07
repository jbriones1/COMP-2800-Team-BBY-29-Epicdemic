let comp = {
	interact: 'Booted computer...',
	news: {
		day1:     'NEWS REPORT: There has been cases reported of a new virus going around. The public is urged to make smart decisions to prevent the spread.', 
		good:     'NEWS REPORT: There number of cases seems to be going down.',
		neutral:  'NEWS REPORT: The number of cases worldwide seems to be steady.',
		bad:      'NEWS REPORT: The virus seems to be spread much quicker than first thought. Several places are now ordered to close. Air travel is banned.',
		terrible: 'NEWS REPORT: The virus has spread to all parts of the world. The government has ordered all people to stay indoors.',
		critical: 'There\'s no news. Seems like the world is doomed.'
	},
	messages: {
		None:  'No messages',
		Brian: 'Wanna go get to the movies?',
		Jon:   'Wanna go to the pub?',
		Andi:  'Wanna go get some food at the mall?',
		Mandy: 'Wanna go for a walk in the park?'
	},
	order: {
		interact: 'Order food online'
	},
	shutdown: 'Shutting down...'
}

let bed = {
	interact: 'Would you like to sleep for the day?',
	sleepGood:  'Time to sleep...',
	wakeGood:   'You wake up, feeling refreshed.',
	wakeBad:    'You wake up, feeling terrible.',
	wakeMask:   'Your mask broke in your sleep.'
}

let storage = {
	interact: 'You open your storage closet',
	noToiletPaper: 'You should probably buy some toilet paper.'
}

let sink = {
	interact: 'You wash your hands'
}

export let sceneText = {
	comp: comp,
	bed: bed,
	storage: storage,
	sink: sink
}




