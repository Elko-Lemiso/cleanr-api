require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var connectionPassword = process.env.CONNECTIONPASSWORD;
var bodyParser   = require('body-parser');
var secret = process.env.SECRET;
var session    = require("express-session");
// var MongoStore = require("connect-mongo")(session);

mongoose
  .connect(`${connectionPassword}`, {
    useNewUrlParser: true,  
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

var app = express();
app.use(cors({
  origin: true,
  credentials: true
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users/signup'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

app.listen(3000, 'localhost');
