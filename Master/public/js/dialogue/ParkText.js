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

let protester = [
	"MY BODY MY CHOICE",
	""
]

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