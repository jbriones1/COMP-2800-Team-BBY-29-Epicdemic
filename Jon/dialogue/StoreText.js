let freezer = {
		interact: 'There are frozen fries here. Take some?',
		confirm: 'You take a bag',
		decline: 'You decide to get something healthier'
}

let checkout = {
	pay: 'Pay for your items?', // requires a cost after
	noItems: 'You can pay for items you get here'
}

let shelf = {
	good: 'Masks, soap and toilet paper are sold here.',                  // 70 or higher health
	neutral: 'Masks and soap sold here. No toilet paper to be found',     // 50 - 69 health
	bad: 'Soap is sold here. Seems the masks and toilet paper are gone.', // 30 - 49 health
	takeMask: 'You take a mask.', 
	takeSoap: 'You grab some soap',
	takeTp: 'You grab a roll of tp'
}

let produce = {
	interact: 'There are apples here. Take some?',
	confirm: 'You take an apple',
	decline: 'You decide on something different'
}

export let sceneText = {
	freezer: freezer,
	checkout: checkout,
	shelf: shelf,
	produce: produce
}




