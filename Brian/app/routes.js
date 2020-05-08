let leaderboard = require("./leaderboard")

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
        res.render('login.ejs', {message: req.flash('loginMessage')});
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
            res.render('main.ejs', {
                name: req.user.username
            });
        }
    });
    

    // GET Profile
    app.get('/profile', isLoggedIn, function(req, res) {
        if (req.user) {
            res.render('profile.ejs', {
                name:req.user.username,
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
};




function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    
    res.redirect('/');
}
