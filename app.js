var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

global.__basedir = __dirname;

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//CUSTOM 
var Store = require("jfs");
var index_controller = require('./controllers/index');

global.configStorage = new Store('./config/config.json');
global.config = global.configStorage.allSync();

//if no hostname has been set, sets it in the configuration
if (!global.config.hostname) {
  index_controller.getDeviceHostname((hostname) => {
    global.configStorage.save('hostname', hostname)
  });
}

//if no ip address has been set, sets it in the configuration
if (!global.config.ip || global.config.ip === '') {
  global.configStorage.save('ip', index_controller.getIpAddress())
}

module.exports = app;
