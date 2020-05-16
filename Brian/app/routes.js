let leaderboard = require("./leaderboard")
let save = require("./saveGame")
let load = require('./loadPlayerData')

module.exports = function(app, passport) {
    // GET Landing
    app.get('/', function(req, res) {
        if (req.user) {
            res.redirect("/main");
        } else {
            res.render('landing.ejs');
        }
    });

    // GET Login
    app.get('/login', function(req, res) {
        if (req.isAuthenticated()) {
            res.redirect('/');
        } else {
            res.render('login.ejs', {message: req.flash('loginMessage')});
        }
    });

    // POST Login
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/main',
        failureRedirect: '/login',
        failureFlash: true
    }), 
        function(req, res) {
            if (req.body.remember) {
                req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
                req.session.cookie.expires = false;
            }
            res.redirect('/main');
        }
    );

    // GET Register
    app.get('/register', function(req, res) {
        res.render('register.ejs', {message: req.flash('signupMessage')});
    });

    // POST Register
    app.post('/register', passport.authenticate('local-signup', {
        successRedirect: '/main',
        failureRedirect: '/register',
        failureFlash: true
    }), function(err, data) {
        if(err) {
            console.log(err);
        }
    });

    // GET Main
    app.get('/main', isLoggedIn, function(req, res) {
        if (!req.user) {
            res.redirect("/");
        } else {
            if (!req.user.display_name) {
                res.render('main.ejs', {
                    name: req.user.username
                });
            } else {
                res.render('main.ejs', {name: req.user.display_name});
            }
        }
    });
    

    // GET Profile
    app.get('/profile', isLoggedIn, function(req, res) {
        var name;
        if (!req.user.display_name) {
            name = req.user.username;
        } else {
            name = req.user.display_name;
        }
        if (req.user) {
            res.render('profile.ejs', {
                name: name,
                score:req.user.score
            });
        } else {
            req.redirect("/");
        }
    });

    // GET Logout
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    // GET Leaderboard
    app.get('/leaderboard', function(req, res) {
        leaderboard.getScores(function(err, results) {
            if (err) {
                console.log("Error");
            }
            res.render('leaderboard.ejs', {
                user:results
            });
        });
    });

    // DELETE: Pre-existing game data in database
    app.delete('/newGame', isLoggedIn, function(req, res) {
        save.newGame(req.user.username, function(err, results) {
            if (err) {
                throw err;
            } 
        });
    });


    // GET: Game page
    app.get('/Epicdemic', isLoggedIn, function(req, res) {
        res.render('game.ejs');
    });

    // GET: Load game (player data)
    app.get('/loadGame', isLoggedIn, function(req, res) {
        load.loadGame(req.user.username, function(err, results) {
            let playerDataAsJson = JSON.parse(results[0].playerdata);
            console.log("JSON:");
            console.log(playerDataAsJson);
            res.send(playerDataAsJson);
        });
    });

    // POST: Save game (player data)
    app.post('/Epicdemic', function(req, res) {
        console.log("Posted: ");
        
        let playerData = JSON.stringify(req.body);
        let username = req.user.username;

        console.log(playerData);
        console.log(username);
        
        save.saveGame(username, playerData, function(err, results) {
             if(err) {
                 console.log("Error");
             } else {
                 console.log("Save success!");
             }
        });
        
        
    });

    // GET: About page
    app.get('/about', function(req, res) {
        res.render('about.ejs');
    });

    // GET /auth/google
    app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

    // GET /auth/google/callback
    app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login', successRedirect: '/main'}),
    function(req, res) {
        res.send('idk');
    });
};



function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    
    res.redirect('/');
}
