let checkout = {
	good: {
		interact: 'Welcome! What would you like?',
		noItems: 'You can pay for items you get here'
	},
	bad: {
		interact: 'Please stay away, I\'m only here because I have to. You can use the self-checkout to the left of me'
	},
	purchase: {
		clerk: 'Thank you for your purchase!',
		selfCheckout: '*beep boop* Thank you for your money.',
		noMoney: 'You can\'t afford this',
		toFridge: '\nAdded to your fridge',
		toStorage: '\nAdded to your storage',
		noStock: 'No stock of this left'
	},
	self: {
		interact: "*Beep boop* Buy stuff."
	}
}

let shelf = {
	interact: 'There is a large empty section. \nProbably the toilet paper and hand sanitizer section.'
}

let produce = {
	interact: 'Looks like some healthy food. That\'ll probably be good for me'
}

export let sceneText = {
	checkout: checkout,
	shelf: shelf,
	produce: produce
}




