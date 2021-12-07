const { exec } = require("child_process");
const fs = require('fs');
const ip = require('ip');
const getmac = require('getmac');
const configController = require('../controllers/config');

global.config = configController.getConfig;
// var chromium_params = " --display=:0 --start-fullscreen --window-position=9000,9000 --disable-inforbars --kiosk";
// 
// Doppia finestra
// chromium-browser --new-window --start-fullscreen --window-position=0,0 --user-data-dir=Default --start-fullscreen --display=:0 http://google.com
// chromium-browser --new-window --start-fullscreen --window-position=1920,0 --user-data-dir=Default --start-fullscreen --display=:0 http://google.com

// chromium-browser --new-window --start-fullscreen  --user-data-dir=Default --display=:0 --window-position=0,0 --window-size=1920,1080 --kiosk tp://google.com

exports.index = async (req, res) => {
    res.render('index', {
        title: 'PiClient: ' + (config.hostname || '-----'),
        hostname: config.hostname
    });
}

/**
 * GET status of service
 */
exports.status = async (req, res) => {
    res.json(true);
}

/**
 * GET hostname of device
 */
exports.getHostname = async (req, res) => {
    // if (!global.config.hostname) {
    //     global.configStorage.saveSync('hostname', os.hostname());
    // }
    res.json(config.hostname)
}

exports.getDeviceHostname = (callback) => {
    exec("cat /proc/sys/kernel/hostname", (error, stdout, stderr) => {
        if (error) {
            return error.message;
        }
        callback(stdout)
    })
}

exports.getIpAddress = () => {
    return ip.address();
}

exports.getMacAddress = () => {
    // cat /sys/class/net/eth0/address
    return getmac.default();
}

exports.getConfig = async (req, res) => {
    res.json(configController.getConfig())
}

exports.setConfig = (req, res) => {
    for (const [key, value] of Object.entries(req.body)) {
        configController.replace(key, value)
    }
    res.json(true)
}

exports.runCommand = (req, res) => {
    if (req.body.command === '') {
        return false;
    }

    exec(req.body.command, (error, stdout, stderr) => {
        if (error) {
            return error.message;
        }
        return stdout
    })
}

/**
 * SET hostname of device
 */
exports.setHostname = async (req, res) => {
    var hostname = req.params.hostname;
    if (req.params.hostname === '') {
        res.json(false);
    }

    configController.replace('hostname', hostname)

    var response = { executed: true, errors: null };
    // exec(`sudo hostnamectl set-hostname ` + hostname, (error, stdout, stderr) => {
    //     if (error) {
    //         response.executed = false;
    //         response.errors = error.message;
    //     }
    // });
    res.json(response);
}

exports.openBrowser = async (req, res, next) => {
    var url = req.body.url;
    if (url === '') {
        res.json({ executed: false, errors: 'No url' });
    } else {
        exec(`unclutter & chromium-browser ${url} ${config.chromiumParams} &`, (error, stdout, stderr) => {
            if (error) {
                res.json({ executed: false, errors: error.message });
            }
            res.json({ executed: true, errors: null });
        });
        configController.save('lastUrl', url);
        res.json({ executed: true, errors: null });
    }
}

exports.closeBrowser = async (req, res) => {
    // killall chromium-browser
    // pkill -o chromium
    exec(`killall chromium-browser`, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            res.json(error.message);
        }

        res.json(true);

    })
}

exports.getScreenshot = async (req, res) => {
    file_path = __basedir + '/tmp/screenshot.png';
    exec(`scrot ${file_path} -o --display=:0`, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            res.json(error.message);
        }

        var format = JSON.parse(req.params.base64);
        if (format === true) {
            console.log(format, 'upload image in base64 format')
            var base64 = fs.readFileSync(file_path).toString('base64');
            res.json(base64)
        } else {
            console.log(format, 'upload image in binary format')
            // res.sendFile(file_path);
            res.download(file_path);
        }
    });
}

exports.rebootDevice = async (req, res) => {
    exec(`sudo reboot now`, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            res.json(error.message);
        }
        res.json(true);
    })
}

exports.setOsd = async (req, res) => {
    var text = req.params.text;
    exec(`export DISPLAY=":0"`, (error, stdout, stderr) => {
        console.log(stdout)
        exec(`DISPLAY=:0 echo ${text} | osd_cat -p top -A right -f -*-*-bold-*-*-*-150-60-*-*-*-*-*-* -d 3 -s 3`, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                res.json(error.message);
            }
            res.json(true);
        })
    });
}