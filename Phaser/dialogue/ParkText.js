let person1 = {
    /* First line of dialogue when selecting this person. */
    interact: "Hey! I'm Sally!",

    /* OPTION: Ask a question */
    question: {
        /* Why is there nobody here? */
        answer1: "I think everyone is trying to abide by the social-distancing rules. This is why we're standing at least 6 feet away from each other while talking.",
        /* Can I have some of your food? */
        answer2: "Honestly, I'm usually a very sharing person, but in the midst of this crisis, I have to say no. It's not just for my own sake, but for your own as well.",
        /* Want to go back to my place and play video games? */
        answer3: "Video games sound like a lot of fun! However, let's just play together at our own houses. That's the magic of the Internet!"
    },

    bye: "It was really nice talking to you!"
}

let fountain = {
    interact: 'As you stare at the water fountain, you realize how thirsty you are',

    drink: 'You drink from the water fountain.',

    leave: 'You decide its best to stay away from public water fountains in the meantime...'
}

let trails = {
    interact: 'A short, popular trail that is covered by lots of shade on this hot, summer day.',

    walk: 'I walked the trail',

    examine: {
        good: 'This trail is usually very full, there is not a soul in sight today.',
        neutral: 'This trail is not very packed today. Only a few people are walking dogs.',
        bad: 'This trail is packed! Everyone looks like they are having a great time',
        dead: 'You are watching over this trail from the sky.'
    },
		leave: 'You decide to leave the trail for now...',
}

export let sceneText = {
    trails: trails,
    fountain: fountain,
    person1: person1
}