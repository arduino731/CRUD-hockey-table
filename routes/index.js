var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

require('../config/passport')(passport);
//root route

router.get("/", function(req, res) {
    var title = "brian3";
    res.render("index", { title: title });
});
// show register form
router.get("/register", function(req, res) {
    res.render("register");
});
//handle sign up logic
router.post("/register", function(req, res) {
    var Localpicture = "http://www.fivepointstance.com/wp-content/uploads/2013/11/Be-Weird.jpg";
    var newUser = new User({ username: req.body.username, Localpicture: Localpicture });
    User.register(newUser, req.body.password, function(err, user) {
        if (err) {
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function() {
            res.redirect("/");
        });
    });
});

//show login form
router.get("/login", function(req, res) {
    res.render("login");
});

//handling login logic
router.post("/login", passport.authenticate("local", {
    successRedirect: "/login",
    failureRedirect: "/login"
}), function(req, res) {});

// route for facebook authentication and login
router.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

// handle the callback after facebook has authenticated the user
router.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/',
        failureRedirect: '/login'
    }));
// logout route
router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
});

//middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}
module.exports = router;