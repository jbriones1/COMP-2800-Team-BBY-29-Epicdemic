var mysql = require('mysql');
var dbconfig = require('../config/database');
var pool = mysql.createPool(dbconfig.connection);

exports.saveScore = function(username, score, callback) {
    let date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    console.log(date);
    var sql = "INSERT INTO score VALUES (?, ?, ?)";
    pool.getConnection(function(err, connection) {
        if (err) {
            console.log(err);
            callback(true);
            return;
        }
        connection.query("USE " + dbconfig.database);
        connection.query(sql, [username, date, score], function(error, results) {
            if (error) {
                console.log(error);
                callback(true);
                return;
            } else {
                callback(false, results);
            }
        });

        connection.query("SELECT high_score FROM user WHERE username = ?", [username], function(error, results) {
            if (error) {
                console.log(error);
                callback(true);
                return;
            } else {
                if (results < score) {
                    connection.query("UPDATE user SET high_score = ? WHERE username = ?", [score, username], function(error, results) {
                        connection.release();
                        if (error) {
                            console.log(error);
                            callback(true);
                            return;
                        }
                    });
                }
            }
        });
    });
}