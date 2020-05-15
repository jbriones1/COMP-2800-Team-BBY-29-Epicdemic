var express = require('express');
var app = express();
var path = require('path');

var assets = path.join(__dirname, 'public/assets');

app.use(express.static(assets));

var port = process.env.PORT || 8080;

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/html/miniGame.html');
});

app.listen(port, function() {
    console.log("App running on port: " + port);
});