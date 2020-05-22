var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var path = require('path');
var favicon = require('serve-favicon');
var flash = require('connect-flash');

var app = express();
var port = process.env.PORT || 5000;

/* passport.js */
var passport = require('passport');
require('./config/passport.js')(passport);

/* ejs */
app.set('view engine', 'ejs');

/* app.use */
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: true
}));
// serve static files
app.use(express.static(__dirname + '/public'));
// Session
app.use(session({
    secret: 'justasecret',
    resave: true,
    saveUninitialized: true
}));
// Use passport.js
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Routes
require('./app/routes.js')(app, passport);

// Favicon
app.use(favicon(__dirname + '/public/images/favicon/img/favicon.ico'));

// Listen
app.listen(port, function() {
    console.log("App listening on port: " + port);
});