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

//CUSTOM 
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'))
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/css'))
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/js'))
app.use('/axios', express.static(__dirname + '/node_modules/axios/dist'))

var configController = require('./controllers/config');
var index_controller = require('./controllers/index');

const displayModel = require('./models/display');
const display = new displayModel();

const configModel = require('./models/config');
const config = new configModel();

const fileConfig = configController.getConfig();

(async () => {
  var displayList = await display.getList();
  if (displayList.length === 0) {
    await display.storeInfo()
  }

  var db_config = await config.getAll();
  global.config = db_config;
  global.fileConfig = fileConfig;

  if (db_config.ip === undefined) {
    config.insert({
      title: 'ip',
      type: 'string',
      string: await index_controller.getIpAddress()
    });
  }

  if (db_config.mac === undefined) {
    config.insert({
      title: 'mac',
      type: 'string',
      string: await index_controller.getMacAddress()
    });
  }

  if (db_config.hostname === undefined) {
    index_controller.getDeviceHostname((hostname) => {
      config.insert({
        title: 'hostname',
        type: 'string',
        string: hostname
      });
    });
  }

  if (db_config.browserParams === undefined) {
    config.insert({
      title: 'browserParams',
      type: 'json',
      json: JSON.stringify(fileConfig.browserParams)
    });
  }

})();

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

module.exports = app;
