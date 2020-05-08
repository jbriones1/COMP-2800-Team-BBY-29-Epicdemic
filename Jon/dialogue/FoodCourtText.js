let enter = "The smell of food makes you realize how hungry you are...";

let foodPlace = {
    interact: "Hi, what can I get for you today?",

    question: {
        interact: "Ask away!",
        /* What is the special today? */
        answer1: `The special today is ${special}`,

        /* How are you doing today? */
        answer2: "I am doing great! Thanks for asking",

        /* How much does the food cost here? */
        answer3: "We only sell combos and they are $9 each. The main items come with a canned drink, and a bag of chips."
    },

    order: {
        success: "Alright, here is your food! Stay safe and have a wonderful day!",

        fail: "I'm sorry! You don't have enough money for this!"
    }
}

let seats = {
    interact: "The seats are separated to abide by social distancing rules.",

    takeASeat: {
        interact: "Where should I sit...",

        goodSeat: "You picked a great place to sit!",

        badSeat: "You realize this is a poor place to sit... The person beside lets out a cough."
    },

    whileSitting: {
        eat: {
            good: "You eat your food, it's delicious",

            bad: "You eat your food... You don't quite enjoy it."
        },

        leave: "You leave the seating area."
    }
}

export let sceneText = {
    seats: seats,
    foodPlace: foodPlace,
    enter: enter
}