require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var connectionPassword = process.env.CONNECTIONPASSWORD;
var bodyParser   = require('body-parser');
var secret = process.env.SECRET;
var session = require("express-session");
var MongoStore = require("connect-mongo")(session);
var createError = require('http-errors');
var axios = require('axios').default;

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

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json())

app.use(session({
  secret: `${secret}`,
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 86400000 },
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 // 1 day
  })
}));

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users/signup'));
app.use('/users', require('./routes/users/login'));
app.use('/users', require('./routes/users/logout'));
app.use('/users', require('./routes/users/userData'))
app.use('/users', require('./routes/users/editProfile'));
app.use('/users', require('./routes/users/getGeoLocation'));
app.use('/jobs', require('./routes/jobs/postJob'));
app.use('/jobs', require('./routes/jobs/editJob'));
app.use(('/jobs'), require('./routes/jobs/postJob'));
app.use('/jobs', require('./routes/jobs/findJobs'));
app.use('/jobs', require('./routes/jobs/findMyJobs'));
app.use('/jobs', require('./routes/jobs/findCleanerJobs'));
app.use(('/jobs'), require('./routes/jobs/editJob'));
app.use(('/jobs'), require('./routes/jobs/application'));
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
  res.json(err.status);
});

module.exports = app;

app.listen(3000, 'localhost');
