var express = require('express');
var router = express.Router();
const { exec } = require("child_process");
const os = require('os');
const fs = require('fs');

// var chromium_params = " --display=:0 --start-fullscreen --window-position=9000,9000 --disable-inforbars --kiosk";
// 
// Doppia finestra
// chromium-browser --new-window --start-fullscreen --window-position=0,0 --user-data-dir=Default --start-fullscreen --display=:0 http://google.com
// chromium-browser --new-window --start-fullscreen --window-position=1920,0 --user-data-dir=Default --start-fullscreen --display=:0 http://google.com

// chromium-browser --new-window --start-fullscreen  --user-data-dir=Default --display=:0 --window-position=0,0 --window-size=1920,1080 --kiosk tp://google.com

var chromium_params = "--display=:0 --kiosk --incognito --disable-inforbars --window-position=0,0";

/**
 */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

/**
 * GET status of service
 */
router.get('/status', function (req, res, next) {
  res.json(true);
})

/**
 * GET hostname of device
 */
router.get('/hostname', function (req, res, next) {
  res.json(os.hostname());
})

/**
 * SET hostname of device
 */
router.put('/hostname', function (req, res, next) {
  if (req.body.hostname === '') {
    res.json(false);
  } else {
    exec(`hostnamectl set-hostname ` + req.body.hostname, (error, stdout, stderr) => {
      if (error) {
        res.json({ executed: false, errors: error.message });
      }
      res.json({ executed: true, errors: null });
    });
  }
})

/**
 */
router.post('/run', function (req, res, next) {
  var url = req.body.url;
  if (url === '') {
    res.json({ executed: false, errors: 'No url' });
  } else {
    exec(`unclutter & chromium-browser ${url} ${chromium_params} &`, (error, stdout, stderr) => {
      if (error) {
        res.json({ executed: false, errors: error.message });
      }
      res.json({ executed: true, errors: null });
    });
    res.json({ executed: true, errors: null });
  }
});

/**
 * make a screenshot
 */
router.get('/screenshot/:base64', function (req, res, next) {
  file_path = __basedir + '/tmp/screenshot.png';
  exec(`scrot ${file_path} -o --display=:0`, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      res.json(error.message);
    }
    if (req.params.base64) {
      var base64 = fs.readFileSync(file_path).toString('base64');
      res.json(base64)
    } else {
      res.download(file_path);
    }
  });
})
/**
 */
router.get('/closeBrowser', function (req, res, next) {
  // killall chromium-browser
  // pkill -o chromium
  exec(`killall chromium-browser`, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      res.json(error.message);
    }

    res.json(true);

  })
})

module.exports = router;
