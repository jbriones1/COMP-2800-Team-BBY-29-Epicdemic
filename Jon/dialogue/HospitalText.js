let reception = {
    /* First line of dialogue */
    interact: 'Hello! How can I help you?',
    /* OPTION: Ask a question */
    question: {
        /* First line of dialogue after asking a question. */
        interact: 'Ask away!',
        /* "How can I help the hospital amid this crisis?" */
        question1: {
            answer1: 'Stay home as much as possible',
            answer2: 'If you feel sick, use a self-triage tool, or call your provider rather than rushing immediately to the hospital',
            answer3: 'Make a monetary donation to a non-profit hospital',
            answer4: 'Donate masks, hand sanitizer, and cleaning supplies!',
            answer5: 'Run essential errands for those of higher risk!'
        },
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
        }
    },
    /* OPTION: Donate */
    donate: {
        /* First line of dialogue for this option. */
        interact: 'Thank you so much! Which item are you looking to donate?',
        /* Thank you */
        thanks: 'Thank you for your donation. We appreciate it so much!'
    },

    /* OPTION: Check-in */
    checkin: {
        confirm: 'Thank you for checking in! We will let you know when it is your turn. Feel free to take a seat in the mean time. Remember to employ social-distancing rules!',
        fail: 'You have already checked in!'
    }
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

export let sceneText = {
    reception: reception,
    seats: seats,
    hospitalRooms: hospitalRooms
}