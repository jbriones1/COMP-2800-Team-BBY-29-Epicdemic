/* Function for scrolling feature when the button on the about page is clicked. */
$(document).ready(function() {
    $("#learnMore").click(function() {
        console.log("clicked");
        $('html, body').animate({
            scrollTop: $("#team").offset().top -100
        }, 2000);
    });
});
