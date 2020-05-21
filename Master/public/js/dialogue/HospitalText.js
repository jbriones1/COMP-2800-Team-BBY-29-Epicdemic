let reception = {
    /* First line of dialogue */
    interact: 'Hello! How can I help you?',
    /* OPTION: Ask a question */
    question: {
        /* First line of dialogue after asking a question. */
        interact: 'Ask away!',
        /* "How can I help the hospital amid this crisis?" */
        question1: [
					'Stay home as much as possible',
					'If you feel sick, use a self-triage tool, or call your provider rather than rushing immediately to the hospital',
					'Make a monetary donation to a non-profit hospital',
					'Run essential errands for those of higher risk!'
				],
        /* "Do you have any hand sanitizer I could use?" */
        question2: {
            answer: 'Yes there is some hand sanitizer right here! Thank you for asking!'
        },
        /* Do you have a face mask I could use? */
        question3: {
            answer: "As much as I would love to provide you with some, our hospital barely has enough as it is. I'm sorry!"
        },
        /* Do you have gloves I could wear? */
        question4: {
            answer: "As much as I would love to provide you with some, our hospital barely has enough as it is. I'm sorry!"
				},
				/* What's going to happen to the places around here? */
				question5: "Based on how careful people are, some places may close. If we're really bad about being cautious, some places might shut down!"
    },
    /* OPTION: Donate */
    donate: {
        /* First line of dialogue for this option. */
        interact: 'Thank you so much! Which item are you looking to donate?',
        /* Thank you */
				thanks: 'Thank you for your donation. We appreciate it so much!',
				notEnough: "Sorry, looks like you're too poor!"
    },

    /* OPTION: Check-in */
    checkup: {
			good: "Looks like you're good and healthy. Keep it up!",
			neutral: "You look like you've seen better days, maybe try eating healthier and getting out a bit?",
			bad: "Oh dear, you need to take care of yourself more! Make sure to wash your hands and quarantine if you're not feeling well."
		},

		grandma: "Unfortunately, got very sick because someone wasn't cautious around her. Some people are just not being careful enough around the elderly."
}

let seats = {
    /* First line of dialogue when seats are selected. */
    interact: 'This is the waiting area.',

    /* Examining the waiting area. */
    examine: 'The seats are all separated to abide by the social-distancing rules. However, there seem to be a lot more people sitting in the north-west side.',

    /* OPTION: Take a Seat */
    takeASeat: {
        /* First line of dialogue when user decides to take a seat. */
        interact: 'Where should I sit...',

        badSeat: 'You realize this is a poor place to sit... However you feel too awkward to get up now.',

        goodSeat: 'You picked a great place to sit! Way to employ social-distancing!'
    },

    stand: "You decide to stand rather than sit. You feel as if you're healthy enough to stand. It also keeps you within healthy social-distancing distance."
}

let hospitalRooms = {
    /* First line of dialogue when seats are selected. */
    interact: 'Those are the doors to the hospital rooms.',

    /* OPTION: Go inside. */
    enter: {
        success: 'You enter the hospital rooms for your check-up',
        fail: 'As you try to go to the hospital rooms, you find the doors are locked... You feel the stares of the people around you.'
    }
}

let grandma = {
	interact: "Ohhhhhhhhhhhhhhhhhhhhhhhhhhhhhh hheeeeeelllloooo theeerrreeeeee. No one evvveeerrrrrr talks to me. I'm so happy someone your age still appreciates us old folks looonngg enoougghh to have a conversation. What are you here for? I'm just here for some routine checkups. Ooooooohhhhhhh....... (She talks to you for 3 hours)",
	egg: "Oh thank you for talking to me. Here, have this old key. I used to work at the school and it seems like nobody is there anymore. (You've unlocked the school!)",
	no_mask: "\nYou should've worn a mask when talking to her"
}

export let sceneText = {
    reception: reception,
    seats: seats,
		hospitalRooms: hospitalRooms,
		grandma: grandma
}