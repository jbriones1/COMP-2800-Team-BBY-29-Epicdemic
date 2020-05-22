let desk = {
    interact: 'This is my desk!',
    stationery: {
        interact: 'You check your desk for stationery...',
        pencil: 'You grab your pencil...',
        paper: 'You grab a sheet of paper...',
        markers: 'You grab your markers...',
        done: 'You finished with your stationery and put it all away...'
    },
    classmates: {
        interact: 'Who do you want to talk to?',
        Jon: "You play tic-tac-toe with Jon... You won!",
        Andi: "You have a wonderful conversation with Andi about unicorns and penguins...",
        Mandy: "Mandy shares her snacks with you... It was your favourite: goldfish.",
        Brian: "You and Brian make plans to ride bikes after school..."
    },
    activities: {
        interact: "What do you want to do?",
        draw: {
            fail: "You must have pencils, markers and paper to draw...",
        pictures: {
            unicorn: 'You drew a unicorn!',
            robot: 'You drew a robot!'
        }
        }
    }
}

let teacher = {
    interact: 'Hello!',
    question: {
        interact: "What do you want to ask me?",
        question1: {
            answer1: "COVID-19 is a virus that is spreading rapidly... Please practice social distancing!"
        },
        question2: {
            answer1: "Wash your hands often!",
            answer2: "Practice social distancing! At least 6 feet of room from other people!",
            answer3: "Cover your mouth and nose with a cloth face covering when around others!",
        },
        question3: {
            answer1: "Read chapter 3 from the textbook..."
        }
    }

}

let bookshelf = {
    interact: 'There are a lot of books here...',
    books: {
        interact: "Which book has the coolest cover...?",
        book1: "You grab book1...",
        book2: "You grab book2...",
        book3: "You grab book3...",
        failOwned: "You already have this book...",
        failTooMany: "You can only take one book at a time! Put your book back to get another...",
        return: "You return all your books...",
        returnFail: "You don't have any books..."
    },

}

export let sceneText = {
    desk: desk,
    teacher: teacher,
    bookshelf: bookshelf
}