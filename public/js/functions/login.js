/* Function used to redirect the page to registration page. */

$(document).ready(function() {
    $('#register').click(function() {
        window.location.href="/register"
    });

    console.log(document.referrer);
});
