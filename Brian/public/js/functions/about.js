/* Function for scrolling feature when a button is clicked. */
$(document).ready(function() {
    $("#learnMore").click(function() {
        console.log("clicked");
        $('html, body').animate({
            scrollTop: $("#team").offset().top -100
        }, 2000);
    });
});
