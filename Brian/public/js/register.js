$(document).ready(function() {
    $('input[type="checkbox"]').click(function() {
        if ($(this).is(":checked")) {
            $('#password').attr('type', 'text');
        } else if ($(this).is(":not(:checked)")) {
            $('#password').attr('type', 'password');
        }
    });
});