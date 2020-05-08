let manager = {
    interact: "Hey, what's up?",

    question: {
        /* Do I have to wear gloves and a mask while I work? */
        answer1: "Yes, If I catch you without gloves and a mask, I am docking your pay!",
        
        /* How many people are we letting into the store at a time? */
        answer2: "We are only letting 5 people in the store at all times. This is to ensure we can abide by the social-distancing rules.",

        /* What tasks should I do today? */
        jobs: {
            stockRecords: "Stock the records shelf",
            stockCDs: "Stock the CD shelf",
            sortRecordsGenre: "Order the records shelf by genre",
            sortRecordsAlpha: "Order the records shelf alphabetically",
            sortCDsGenre: "Order the CDs shelf by genre",
            sortCDsAlpha: "Order the CDs shelf alphabetically",
            fixCashRegister: "Try to fix the cash register, I think somebody broke it.",
            disinfectShelves: "Disinfect both selves",
            disinfectRegister: "Disinfect the cash register",
            fiveTransactions: "Take 5 transactions at the cash register"
        },

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

let recordShelf = {
    interact: "A shelf that holds records",

    stock: {
        success: "You stock the shelves... Finally you are finished!",
        fail: "You stock the shelves... You get tired and decide to take a break."
    },

    order: {
        byGenre: {
            success: "You try to order all the records by genre... You were successful!",
            fail: "You try to order all the records by genre... You got distracted by a baby crying outside and lose track. Try again!"
        },

        alphabetically: {
            success: "You try to order all the records alphabetically... You were successful!",
            fail: "You try to order all the records alphabetically... You lose track of where you were because your favourite song started playing and you had to sing along. Try again!"
        }
    },

    disinfect: "You disinfect the record shelf."
}

let cdShelf = {
    interact: "A shelf that holds CDs",

    stock: {
        success: "You stock the shelves... Finally you are finished!",
        fail: "You stock the shelves... You get tired and decide to take a break."
    },

    order: {
        byGenre: {
            success: "You try to order all the CDs by genre... You were successful!",
            fail: "You try to order all the CDs by genre... You got distracted by a baby crying outside and lose track. Try again!"
        },

        alphabetically: {
            success: "You try to order all the CDs alphabetically... You were successful!",
            fail: "You try to order all the CDs alphabetically... You lose track of where you were because your favourite song started playing and you had to sing along. Try again!"
        }
    },

    disinfect: "You disinfect the CDs shelf."
}

export let sceneText = {
    cdShelf: cdShelf,
    recordShelf: recordShelf,
    cashRegister: cashRegister,
    manager: manager
}