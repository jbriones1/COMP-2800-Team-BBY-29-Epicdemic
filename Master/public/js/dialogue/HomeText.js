let comp = {
	interact: 'Booted computer...',
	news: {
		day1:     'NEWS REPORT: There has been cases reported of a new virus going around. Although the virus has not impacted Crowntown significantly, the government is urging us to be cautious. If you have any questions, ask a health care provider for more details.', 
		good:     'NEWS REPORT: The number of cases seems to be going down. Please keep up the good work.',
		neutral:  'NEWS REPORT: The number of cases is still increasing. Please wear a mask when going out and make sure to self-isolate if you\'re experiencing symptoms!',
		bad:      'NEWS REPORT: The virus seems to be spread much quicker than first thought. Several places are now ordered to close. Air travel is banned.',
		terrible: 'NEWS REPORT: The virus has spread to all parts of the world. The government has ordered all people to stay indoors.',
		critical: 'There\'s no news. Seems like the world is doomed.'
	},
	messages: {
		None:  'No messages',
		Brian: 'Wanna go get to the movies?',
		Jon:   'Wanna go to the pub? (You wonder why Jon keeps asking to go to the pub, this town doesn\'t have one.)',
		Andi:  'Wanna go get some food at the mall?',
		Mandy: 'Wanna go for a walk in the park?',
		Boss:  "Don't be late for work! There's a shipment of toys I want you to come deal with.",
		deleted: "Messages deleted"
	},
	order: {
		interact: 'Order food online'
	},
	shutdown: 'Shutting down...',
	game: {
		    healthy: ["You play some League and lose because you think your team is awful. You lose happiness",
				          "You play some Fortnite and your friends bully you for it. It hurts a little",
				          "You play some League and win, thinking that you carried. You didn't. Your ego is inflated a little"
								 ],
				tilted: "You're absolutely tilted and get destroyed. You should go do something else.",
				unhappy: "You shouldn't be playing games right now with your current mood."
	}
}

let bed = {
	interact: 'Would you like to sleep for the day?',
	sleepGood:  'You fall asleep',
	tooEarly: 'You can\'t sleep now, there are things to do!',
	sleepSoon: 'You\'re getting sleepy, but you want to do other things first',
	wakeGood:   'Your alarm clock goes off. You wake up, feeling refreshed.',
	wakeBad:    'Your alarm clock goes off. You wake up, feeling groggy.',
	wakeMask:   'Your mask broke in your sleep.' //unused
}

let storage = {
	interact: 'You open your storage closet',
	noToiletPaper: 'You should probably buy some toilet paper.',
	equip: "You put on the mask, making sure to cover your mouth and nose. Now they care who you are."
}

let sink = {
	interact: 'You wash your hands'
}

export let sceneText = {
	intro: "I should probably check what's happening online. Click on the computer to find out what's going on.",
	comp: comp,
	bed: bed,
	storage: storage,
	sink: sink
}




