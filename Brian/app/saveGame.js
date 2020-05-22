var mysql = require('mysql');
var dbconfig = require('../config/database');
var pool = mysql.createPool(dbconfig.connection);

exports.newGame = function(username, callback) {
    let query = "DELETE FROM save WHERE username = ?";
    pool.getConnection(function(err, connection) {
        if (err) {
            callback(true);
            return;
        }
        connection.query("USE " + dbconfig.database);
        connection.query(query, [username], function(err, results) {
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


