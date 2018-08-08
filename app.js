var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
// var logger = require('morgan');
var bodyParser = require("body-parser"); // to handle HTTP POST req
var mongoose = require("mongoose");
var methodOverride = require("method-override");
// var User = require('./models/user');
var app = express();
var dotenv = require('dotenv').config();
var indexRouter = require('./routes/index');
var configDB = require('./config/database.js');

// console.log('The value of PORT is:', process.env.MONGOLAB_URI);
mongoose.connect(process.env.MONGOLAB_URI,{ useNewUrlParser: true });

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '/public')));
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', indexRouter);

app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
    console.log('Server is running at port : ' + 3000);
});