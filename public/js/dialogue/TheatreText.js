// Dialogue for the Theatre
let enter = "I can't wait to watch this movie!";

let seats = {
    goodSeat: "You picked a great place to sit! You enjoy the movie thoroughly and employ physical distancing.",

		badSeat: "You realize that you picked a poor place to sit... However the movie is starting and its too awkward to switch now.",
		
		done: "The movie is over"
}

let concession = {
    // interact: "Welcome the concession stand! What can I get for you?",
    interact: "Welcome to the concession stand! Please make sure you sit appropriately and are quiet for the movie.",

    buy: {
        success: "Here you are! Enjoy the show and stay safe!",
        fail: "Sorry, you don't have enough money for that!"
    },

    question: {
        /* Why aren't you guys using the popcorn machine? */
        answer1: "We aren't using the popcorn machine because we are currently only selling pre-packaged items. This is an attempt to prevent the additional spread of COVID-19. We still have popcorn, chocolate and candy!",
        
        /* Why can't I have a soda from the fountain? */
        answer2: "The soda fountain is currently not available to be used. We are only selling canned drinks at the moment in an effort to prevent the additional spread of COVID-19.",

        /* Why are you wearing gloves and a mask? */
        answer3: "Wearing gloves and masks are an extra precaution that could help against the spread. It's not a certain thing, but because there is even a chance of it helping, I'm all for it!"
    }
}

export let sceneText = {
	enter: enter,
    seats: seats,
    concession: concession
}
