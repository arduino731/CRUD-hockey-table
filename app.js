var createError = require('http-errors');
var express = require('express');
var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// var flash = require("connect-flash");
var bodyParser = require("body-parser"); // to handle HTTP POST req
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var methodOverride = require("method-override");
var User = require('./models/user');
// var seedDB = require('./seeds');
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
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

// app.use(logger('dev'));
app.use(express.static(path.join(__dirname, '/public')));
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(flash());
// app.use(cookieParser("hockey"));
// seedDB(); //seed the database

// app.use(function(req, res, next) {
//     res.locals.success = req.flash('success');
//     res.locals.info = req.flash('info');
//     res.locals.error = req.flash('error');
//     next();
// });


app.use('/', indexRouter);

app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
    console.log('Server is running at port : ' + 3000);
});