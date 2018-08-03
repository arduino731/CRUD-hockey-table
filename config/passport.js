// config/passport.js

// load all the things we need
var passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

// load up the user model
var User = require('../models/user');

// load the auth variables
var configAuth = require('./auth');


// expose this function to our app using module.exports
module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // FACEBOOK ================================================================
    // =========================================================================
    passport.use(new FacebookStrategy({

            // pull in our app id and secret from our auth.js file
            clientID: configAuth.facebookAuth.clientID,
            clientSecret: configAuth.facebookAuth.clientSecret,
            callbackURL: configAuth.facebookAuth.callbackURL,
            profileFields: ['id', 'email', 'displayName', 'picture.type(large)', 'profileUrl']

        },
        // facebook will send back the token and profile
        function(accessToken, refreshToken, profile, done) {

            // asynchronous
            process.nextTick(function() {
                // find the user in the database based on their facebook id
                User.findOne({ 'facebook.id': profile.id }, function(err, user) {
                    if (err) {
                        return done(err);
                    }
                    // if the user is found, then log them in
                    if (user) {
                        console.log("HERE" + user);
                        if (user.facebook.token) {
                            user.facebook.token = accessToken;
                            user.facebook.name = profile.displayName;
                            user.facebook.email = profile.emails[0].value;

                            user.save(function(err) {
                                if (err)
                                    throw err;
                                return done(null, user);
                            });
                        }
                        // console.log("HERE" + user);
                        // return done(null, user); // user found, return that user
                    } else {
                        // if there is no user found with that facebook id, create them
                        console.log("new token is " + accessToken);
                        var newUser = new User();
                        // set all of the facebook information in our user model
                        newUser.facebook.id = profile.id; // set the users facebook id                   
                        newUser.facebook.token = accessToken; // we will save the token that facebook provides to the user                    
                        newUser.facebook.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first
                        newUser.facebook.name = profile.displayName;
                        newUser.facebook.picture = profile.photos ? profile.photos[0].value : 'http://www.fivepointstance.com/wp-content/uploads/2013/11/Be-Weird.jpg';
                        newUser.facebook.link = profile.profileUrl;
                        // save our user to the database
                        newUser.save(function(err) {
                            if (err)
                                throw err;

                            // if successful, return the new user
                            return done(null, newUser);
                        });
                    }

                });
            });

        }));

};