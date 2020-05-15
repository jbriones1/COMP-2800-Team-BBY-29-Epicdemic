/* Functions for the main page (after log-in) */

$(document).ready(function() {

    // When New Game is pressed
    $('#newGame').click(function() {
        if (confirm("Starting a new game will override your saved game, are you sure?")) {
            $.ajax({
                url: '/newGame',
                type: 'DELETE',
                success: window.location.href="/Epicdemic"
            })
        } 
    });

    // Whjen Load Game is pressed
    $('#loadGame').click(function() {
        window.location.href='/Epicdemic';
    });
}) 