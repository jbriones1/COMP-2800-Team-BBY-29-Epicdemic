/* Functions for the main page (after log-in) */

$(document).ready(function() {

    // When New Game is pressed
    $('#newGame').click(function() {
        if (confirm("Starting a new game will override your saved game, are you sure?")) {
            $.ajax({
                url: '/newGame',
                type: 'POST',
                success: window.location.href="/Epicdemic"
            });
        } 
    });

    // When Load Game is pressed
    $('#loadGame').click(function() {
        $.ajax({
            url: 'checkLoad',
            type: 'GET',
            success: function(res) {
                if (res) {
                    window.location.href='/Epicdemic';
                } else {
                    alert("You don't have a saved game.");
                }
            }
        });

        //window.location.href='/Epicdemic';
    });
}) 