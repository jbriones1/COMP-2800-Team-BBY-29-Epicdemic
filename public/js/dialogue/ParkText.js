let person1 = {
    /* First line of dialogue when selecting this person. */
    interact: "Hey! I'm Sally!",

    /* OPTION: Ask a question */
    question: {
        /* Why is there nobody here? */
        answer1: "I think everyone is trying to abide by the social-distancing rules. This is why we're standing at least 6 feet away from each other while talking.",
        /* Can I have some of your food? */
        answer2: "I wouldn't do that if I were you. I saw some other people drinking out of that earlier.",
        /* Want to go back to my place and play video games? */
				answer3: "That sounds like a lot of fun! But I live with my grandma, and I'm afraid of getting her sick.",
				annoyed: "Please leave me alone.",
				angry: "(She doesn't even acknowledge your presence. Feels bad.)"
    },

    bye: "It was really nice talking to you!"
}

let fountain = {
    interact: "It's a pretty fountain.",

    drink: 'You drink from the water fountain. You feel a bit worse.',

    leave: 'You decide its best to stay away from public water fountains in the meantime...'
}

let trails = {
    interact: 'A short, popular trail that is covered by lots of shade on this hot, summer day.',

    walk: 'You walk the trail. Exercise is good for you, even if there\'s a pandemic. You feel healthier.',

    examine: {
        good: 'This trail is usually very full, but there\'s less people here',
        neutral: 'Only a few people are walking dogs.',
        bad: 'The trail is completely empty',
        dead: ""
    },
		leave: 'You decide to leave the trail for now...',
}

let protester = {
	main: {
		interact: "SCREW THE QUARANTINE, WE WILL NOT BE SHACKLED! Join us, drink the fountain water and expose the government's lies!",
		yes: "You approach the fountain, but the cops have arrived and send you home. You're fined all your money.",
		no: "Whatever, guess you're just part of the sheep.",
		noMask: "That mask of yours is cutting off the oxygen to your brain. Get out of here!"
	},
	sub: [
		"We want haircuts!",
		"Open the pub!",
		"Bring us toilet paper!",
		"Selling toilet paper, $200 a roll!",
		"We want to work!",
		"We will not be stopped by tyrants!",
		"Even Pharaoh free people during a plague!",
		"#endtheshutdown",
		"Give me liberty or give me the virus!",
		"Bring me Thanos!",
		"My body, my choice to work!",
		"Reopen Crowntown!",
		"I'm sorry, I thought this was the land of the free!",
		"We want out of the coop!",
		"Set us free!",
		"2020? More like 1984!",
		"5G caused this!",
		"Wake up sheep!"
	]
}

let Brian = {
	interact: "Hey, you ready to race?",
	yes: "Loser gets the virus! (You run beside each other the whole way until you're both gasping for air.)",
	no: "Well, let me know when you're ready!",
	refuse: "Aw, well, I'm going to go on ahead."
}

export let sceneText = {
    trails: trails,
    fountain: fountain,
		person1: person1,
		protester: protester,
		Brian: Brian
}