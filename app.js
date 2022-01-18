var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var apiRouter = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', apiRouter);

global.__basedir = __dirname;

//CUSTOM 
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'))
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/css'))
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/js'))
app.use('/axios', express.static(__dirname + '/node_modules/axios/dist'))

var configController = require('./controllers/config');
var api = require('./controllers/api');

const displayModel = require('./models/display');
const display = new displayModel();

const configModel = require('./models/config');
const config = new configModel();

const urlHistoryModel = require('./models/urlHistory');
const urlHistory = new urlHistoryModel();

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
      string: await api.getIpAddress()
    });
  }

  if (db_config.mac === undefined) {
    config.insert({
      title: 'mac',
      type: 'string',
      string: await api.getMacAddress()
    });
  }

  if (db_config.hostname === undefined) {
    api.getDeviceHostname((hostname) => {
      config.insert({
        title: 'hostname',
        type: 'string',
        string: hostname
      });
    });
  }

  if (db_config.configfileLoaded === undefined || await config.getByTitle('configfileLoaded', true) === false) {
    config.loadConfigInDatabase(fileConfig);
  }

  if (db_config.restoreAfterShutdown) {
    var displayList = await display.getList();

    if (displayList.length > 0) {
      for (var displayObject of displayList) {
        var lastUrlHistory = await urlHistory.getLast({
          displayId: displayObject.id
        });

        if (lastUrlHistory.closed === false) {
          console.log('Reload browser istance for Display', lastUrlHistory.port)
          display.reload(lastUrlHistory);
        }
      }
    }
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
