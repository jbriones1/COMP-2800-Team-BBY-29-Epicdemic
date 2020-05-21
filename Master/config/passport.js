var localStrategy = require("passport-local").Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('./database');
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
		masks: 0,
		toilet_paper: 0,
		soap: 3
	},
	inventory: {
		mask: false,
		ticket: false
	},
	messages: [
		{ sender: 'Government', message: "Anything with a red arrow pointing to it is interactable"},
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
	events: {
		watchMovieWithJon: true
	}
};

module.exports = function(passport) {


    passport.serializeUser(function(user, done) {
            done(null, user.username);
        
    });

    passport.deserializeUser(function(username, done) {
        console.log("deserializing: " + username);
        pool.getConnection(function(error, connection) {
            if (error) {
                console.log(error);
                return done(error);
            } else {
                connection.query('USE ' + dbconfig.database);
                connection.query("SELECT * FROM user WHERE username = ?", [username],
                    function(error, rows) {
                        done(error, rows[0]);
                    });
                connection.release();
            }
        });
    });

    // Sign-up
    passport.use(
        'local-signup',
        new localStrategy({
            usernameField:'username',
            passwordField:'password',
            passReqToCallback:true
        },
        function(req, username, password, done){
            pool.getConnection(function(error, connection) {
                if (error) {
                    console.log(error);
                    return done(error);
                }
                connection.query('USE ' + dbconfig.database);
                connection.query("SELECT * FROM user WHERE username = ? ", [username], function(err, rows) {
                    if(err) {
                        return done(err);
                    } else {
                        if(rows.length) {
                            return done(null, false, req.flash('signupMessage', 'That username is already taken'));
                        } else {
                            var newUserMysql = {
                                username: username,
                                password: bcrypt.hashSync(password, null, null)
                            };
        
                            var insertQuery = 'INSERT INTO user (username, password) VALUES (?, ?)';
        
                            connection.query(insertQuery, [newUserMysql.username, newUserMysql.password],
                                function(err, rows) {
                                    if (err)
                                        console.log(err);
                                    newUserMysql.id = rows.insertId;
                                    return done(null, newUserMysql);
                                });
                            
                            stringPlayerData = JSON.stringify(defaultPlayerData);
                            var insertQuerySave = "INSERT INTO save (username, playerdata) VALUES (?, ?)";

                            connection.query(insertQuerySave, [newUserMysql.username, stringPlayerData], function(err, rows) {
                                if (err)
                                    throw err;
                                else
                                    console.log(rows);
                            });
                        }
                        connection.release();
                    }
                });
            });
        })
    );

    // Log-in
    passport.use(
        'local-login',
        new localStrategy({
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
        },
        function(req, username, password, done) {
            pool.getConnection(function(error, connection) {
                if (error) {
                    console.log(error);
                    return done(error);
                } else {
                    connection.query('USE ' + dbconfig.database);
                    connection.query("SELECT * FROM user WHERE username = ? ", [username],
                    function(err, rows) {
                        if (err)
                            return done(err);
                        if (!rows.length) {
                            return done(null, false, req.flash('loginMessage', 'No User Found'));
                        }
                        if (!bcrypt.compareSync(password, rows[0].password)) {
                            console.log("Wrong Pass");
                            return done(null, false, req.flash('loginMessage', 'Wrong Password'));
                        }
                        return done(null, rows[0]);
                    });
                    connection.release();
                }
            });
        })
    );

    // Google
    passport.use(new GoogleStrategy({
        clientID: '271196140535-s1842l90m4r2gders61n25fceaaj7d6l.apps.googleusercontent.com',
        clientSecret: 'Ia3aMfBZayUnYl13F6wYPpQQ',
        callbackURL: "/auth/google/callback"
      },
      function(accessToken, refreshToken, profile, done) {
          console.log(profile)
            pool.getConnection(function(error, connection) {
                if (error) {
                    console.log(error);
                    return done(error);
                } else {
                    connection.query('USE ' + dbconfig.database);
                    connection.query('SELECT * FROM user WHERE username = ?', [profile.id], function(err, rows) {
                        if (err) {
                            return done(err);
                        }
                        if (!rows.length) {
                            var newUserGoogle = {
                                username: profile.id,
                            };
                            connection.query('INSERT INTO user (username, display_name) VALUES (?, ?)', [profile.id, profile.displayName], function(err, rows) {
                                if (err) {
                                    console.log(err);
                                    return done(err);
                                }
                                return done(null, newUserGoogle);
                            });

                            stringPlayerData = JSON.stringify(defaultPlayerData);
                            var insertQuerySave = "INSERT INTO save (username, playerdata) VALUES (?, ?)";

                            connection.query(insertQuerySave, [profile.id, stringPlayerData], function(err, rows) {
                                console.log("Inserting save");
                                if (err) {
                                    console.log(err);
                                    throw err;
                                }
                                else {
                                    console.log(rows);
                                }
                            });
                        } else {
                            return done(null, rows[0]);
                        }
                    });
                    connection.release();
                }
            });
      }
    ));
};




