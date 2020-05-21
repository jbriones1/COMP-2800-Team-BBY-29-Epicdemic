let leaderboard = require("./leaderboard")
let save = require("./saveGame")
let load = require('./loadPlayerData')
let saveScore = require('./saveScore')
let profile = require('./profile')

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
        profile.getHistory(req.user.username, function(err, results) {
            for (let i = 0; i < results.length; i++) {
                let date = new Date(results[i].date).toString().substr(0, results[i].date.toString().indexOf(' GMT'));
                results[i].date = date;
            }
            res.render('profile.ejs', {
                name: name,
                high_score: req.user.high_score,
                history: results
            });
        });
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

    // POST: Pre-existing game data in database replaced with default (new game)
    app.post('/newGame', isLoggedIn, function(req, res) {
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

    app.get('/checkLoad', isLoggedIn, function(req, res) {
        load.checkForLoad(req.user.username, function(err, results) {
            if (!results) {
                res.send(false);
            } else {
                res.send(true);
            }
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

    app.post('/saveScore', isLoggedIn, function(req, res) {
        let score = req.body.score;
        console.log("score" + score);
        let username = req.user.username;
        console.log("request: " + req.body);
        console.log(username);

        saveScore.saveScore(username, score, function(err, results) {
            if (err) {
                console.log("Error");
            } else {
                console.log("Score POSTED");
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
