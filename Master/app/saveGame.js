var mysql = require('mysql');
var dbconfig = require('../config/database');
var pool = mysql.createPool(dbconfig.connection);

var defaultPlayerData = {
	stats: {
		hunger: 10, 
		health: 10, // 7-10 good, 5-6 neutral, 3-4 is bad, 0-2 is dead
		money: 10,
		happiness: 10,
		event_done: 0,
		day: 1,
		hour: 9,
		minute: 0,
		minuteStr: '00',
		donations: 0,
		last_meal: 0,
		bad_decisions: 0
	},
	fridge: {
		apple: 0,
		instant_ramen: 0,
		bread: 0
	},
	storage: {
		toilet_paper: 0,
		soap: 3
	},
	inventory: {
		mask: false,
		ticket: false
	},
	messages: [
		{ sender: 'Boss', message: "Make sure you come to work today! I'm not closing this place yet and we got toys to sell."},
		{ sender: 'Jon', message: 'Hey wanna go watch a movie today? Sonic the Hedgehog is playing at around 6PM.'}
	],
	friends: {
		Brian: true,
		Jon: true,
		Andi: true,
		Mandy: true
	},
	location: null,
	job: true,
	tutorial_done: false,
	unlocked: false,
	secret: false,
	hospital: {
		grandma: true
	},
	toystore: {
		healthy_customer: true
	},
	park: {
		sally_annoyed: false,
		brian_refused: false
	},
	events: {
		watchMovieWithJon: true, 
		runWithBrian: false,
		protest: false
	}
};



exports.newGame = function(username, callback) {
    let query = "UPDATE save SET playerdata = ? WHERE username = ?";
    pool.getConnection(function(err, connection) {
        if (err) {
            callback(true);
            return;
        }
        let stringifiedData = JSON.stringify(defaultPlayerData);
        connection.query("USE " + dbconfig.database);
        connection.query(query, [stringifiedData, username], function(err, results) {
            if (err) {
                console.log(err);
                callback(true);
                return;
            } else {
                callback(false, results);
            }
        });
    });
}

exports.saveGame = function(username, playerData, callback) {
    var sql = "INSERT INTO save VALUES (?, ?)";
    pool.getConnection(function(err, connection) {
        if (err) {
            console.log(err);
            callback(true);
            return;
        }
        connection.query("USE " + dbconfig.database);
        connection.query("SELECT * FROM save WHERE username = ?", [username], function(err, results) {
            if (err) {
                connection.release();
                console.log(err);
                callback(true);
                return;
            } else {
                if (results.length) {
                    connection.query("UPDATE save SET playerdata = ? WHERE username = ?", [playerData, username], function(err, results) {
                        connection.release();
                        if (err) {
                            console.log(err);
                            callback(true);
                            return;
                        }
                    });
                } else {
                    connection.query(sql, [username, playerData], function(err, results) {
                        connection.release();
                        if (err) {
                            console.log(err);
                            callback(true);
                            return;
                        } else {
                            callback(false, results);
                        }
                    });
                }
            }
        });
    });
}


