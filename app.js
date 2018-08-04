var createError = require('http-errors');
var express = require('express');
var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var methodOverride = require("method-override");
var User = require('./models/user');
var app = express();
var dotenv = require('dotenv').config();

var indexRouter = require('./routes/index');

// configuration ===============================================================
var configDB = require('./config/database.js');
// mongoose.connect(configDB.localhost); // connect to your local database
// mongoose.connect(configDB.url);          // connect to mlab server db
// console.log('The value of PORT is:', process.env.MONGOLAB_URI);
mongoose.connect(process.env.MONGOLAB_URI,{ useNewUrlParser: true });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: true }));
// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "namePackage",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
});


app.use('/', indexRouter);


// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
    console.log('Server is running at port : ' + 3000);
});