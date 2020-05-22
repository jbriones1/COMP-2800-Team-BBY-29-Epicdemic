let enter = "A weirdly small mall...";

let atm = {
    interact: "Time to check my funds!",

    widthdraw: {
        interact: "You attempt to withdraw some money.",
        success: "The withdrawal was completed succesfully.",
        fail: "You don't have enough money in your account to withdraw that much!"
    },

    deposit: {
        interact: "You attempt to deposit some money",
        success: "The deposit was coimpleted successfully.",
        fail: "You don't have that much money to deposit!"
    },

    balance: {
        interact: "Checking balance...",
        return: `Your balance is: $${balance}`
    }
}

let musicStore = {
    interact: 'This is where you work.',

    enter: 'Time to work!'
}

let foodCourt = {
    interact: 'This is the food court.',

    enter: "I wonder what is being served today..."
}

export let sceneText = {
    foodCourt: foodCourt,
    musicStore: musicStore,
    atm: atm,
    enter: enter
}