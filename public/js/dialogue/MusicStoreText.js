// Dialogue for the Toy store. Kept as MusicStore due to numberous dependencies needing to be renamed
let manager = {
    interact: "Hey, get to work! The government may not consider this place essential, but I sure do.",

    question: {
        /* Do I have to wear gloves and a mask while I work? */
        answer1: "Yes, If I catch you without gloves and a mask, I am docking your pay!",
        
        /* How many people are we letting into the store at a time? */
        answer2: "We are only letting 5 people in the store at all times. This is to ensure we can abide by the social-distancing rules.",

        /* What tasks should I do today? */
        jobs: "You should probably get to work",

        finishedJobs: {
            success: "Great job! Feel free to head home, your pay will be automatically deposited into your account!",
            fail: "You have not finished all your jobs. Speak to me again after you finish"
        }
    }
}

let cashRegister = {
    broken: {
        interact: "This register is broken... I wonder what happened.",
        fix: {
            missingPart: "It appears to be missing a screw. Check the shelves for one",
            success: "You try to fix the machine... You were successful",
            fail: "You try to fix the machine... You could not fix it. You should try again"
        }
    },

    notBroken: {
        interact: "The good old cash register...",

        disinfect: "You disinfect the cash register",

        payment: "You successfully take a payment."
    }
}

let misc = {
	kid: "You disinfect the kid",
	leftToys: "Why is there a sword here? You disinfect it anyway",
	rightToys: "What a strange assortment of toys"
}

let customer = {
	interact: "This whole quarantine thing they're talking about seems like a terrible idea. The government is totally overreacting! ",
	mask: "I see you're wearing a mask. I don't need one because this whole virus is propaganda",
	noMask: "I see you're not wearing a mask, you're one of the smart ones!",
	agree: "Right!? I'm going to tell the other mothers that we should just bring our kids to the playground!.",
	disagree: "Pssh. You're as brainwashed as them. The government needs to re-open the schools so that my kid over there can stop annoying me!",
	blame: "I set up that playdate like you said I should and my kid got sick! This is all your fault! (You feel bad for the kid)"
}

export let sceneText = {
    cashRegister: cashRegister,
		manager: manager,
		customer: customer,
		misc: misc
}