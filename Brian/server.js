var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var path = require('path');
var favicon = require('serve-favicon');

var app = express();
var port = process.env.PORT || 5000;

var passport = require('passport');
var flash = require('connect-flash');

require('./config/passport.js')(passport);
var leaderboard = require('./app/leaderboard');

app.use(express.static(__dirname + '/public'));


app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.set('view engine', 'ejs');


app.use(session({
    secret: 'justasecret',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./app/routes.js')(app, passport);

app.use(favicon(__dirname + '/public/images/favicon/img/favicon.ico'));

app.listen(port, function() {
    console.log("App listening on port: " + port);
});