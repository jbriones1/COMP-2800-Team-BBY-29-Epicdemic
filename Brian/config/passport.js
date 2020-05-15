var localStrategy = require("passport-local").Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('./database');
var pool = mysql.createPool(dbconfig.connection);

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
        callbackURL: "http://localhost:5000/auth/google/callback"
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




