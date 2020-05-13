let kiosk = {
    interact: 'You try to use the ticket kiosk...',

    cost: "Tickets are $8.50",

    buy: {
        success: 'You successfully buy a ticket from the kiosk',
        fail: "It appears you don't have enough money for this ticket"
    }
}

// let concession = {
//     interact: "Welcome the concession stand! What can I get for you?",

//     buy: {
//         success: "Here you are! Enjoy the show and stay safe!",
//         fail: "Sorry, you don't have enough money for that!"
//     },

//     question: {
//         /* Why aren't you guys using the popcorn machine? */
//         answer1: "We aren't using the popcorn machine because we are currently only selling pre-packaged items. This is an attempt to prevent the additional spread of COVID-19. We still have popcorn, chocolate and candy!",
        
//         /* Why can't I have a soda from the fountain? */
//         answer2: "The soda fountain is currently not available to be used. We are only selling canned drinks at the moment in an effort to prevent the additional spread of COVID-19.",

//         /* Why are you wearing gloves and a mask? */
//         answer3: "Wearing gloves and masks are an extra precaution that could help against the spread. It's not a certain thing, but because there is even a chance of it helping, I'm all for it!"
//     }
// }

let ticketWindow = {
    interact: 'Hello! How can I help you?',

    question: {
        /* Can I watch a movie for free? */
        answer1: "Unfortunately no, you must purchase a ticket.",

        /* How many people come by the theatre now-a-days? */
        answer2: "Not too many people. We have implemented the necessary precautions in order to stay open. There are things we do such as the immediate sanitation of seats and only selling pre-packaged items.",

        /* How much are tickets? */
        answer3: "Tickets are $8.50 each!"
    },

    buy: {
        success: "Wonderful, here is your ticket! Enjoy the show!",

        failure: "It appears that you don't have enough money for this ticket."
    }
}

let theatreEntrance = {
    interact: "This is the entrance to the theatre",

    success: "Entering the theatre",

    failure: "You don't have a ticket! Go buy one before you enter the theatre"
}

//======================================
// new added -> seat choice 
//======================================
let largeSofa = {
    interact: "A lady is sitting on the sofa"
}

//======================================
// new added -> seat choice 
//======================================
let smallSofa = {
    interact: "There is an empty seat"
}

export let sceneText = {
    theatreEntrance: theatreEntrance,
    ticketWindow: ticketWindow,
    //concession: concession,
    kiosk: kiosk,
    largeSofa: largeSofa,
    smallSofa: smallSofa
}