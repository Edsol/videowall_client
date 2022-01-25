const { exec, execSync } = require("child_process");
const fs = require('fs');
const ip = require('ip');
const getmac = require('getmac');
const configController = require('../controllers/config');

const displayModel = require('../models/display');
const display = new displayModel();

const configModel = require('../models/config');
const config = new configModel();

const pageModel = require('../models/page');
const page = new pageModel();

global.config = configController.getConfig;

exports.index = async (req, res) => {
    // var displayList = await display.getList();

    // res.render('index', {
    //     title: global.config.hostname,
    //     hostname: global.config.hostname,
    //     displays: displayList
    // });
    // res.render('../dist/index')
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
    res.json(await config.getByTitle('hostname', true))
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
    res.json(await config.getAll())
}

exports.setConfig = (req, res) => {
    for (const [key, value] of Object.entries(req.body)) {
        configController.replace(key, value)
    }
    res.json(true)
}

exports.runCommand = async (req, res) => {
    var command = req.body.command;
    console.log(`Command '${command}' received`)

    if (command === '') {
        return false;
    }

    exec(command, async (error, stdout, stderr) => {

        if (error) {
            return error.message;
        }

        res.json(stdout)
    })
}

/**
 * SET hostname of device
 */
exports.setHostname = async (req, res) => {
    var hostname = req.params.hostname.replace(/\s+/g, '').trim();
    if (req.params.hostname === '') {
        res.json(false);
    }

    console.log(hostname)
    config.replace('hostname', hostname);

    res.json({ executed: true, errors: null });
}

/**
 * 
 */
exports.openUrl = async (req, res) => {
    var url = req.body.url;

    if (url === '') {
        res.json({ executed: false, errors: 'No url' });
    }

    var displayId = req.body.display;

    if (displayId === undefined || displayId === null) {
        var displayObj = await display.getPrimary();
        if (displayObj !== null) {
            displayId = displayObj.id || null;
        }
    }

    if (displayId === undefined || displayId === null) {
        var first = await display.getLast();
        displayId = first.id;
    }

    var pid = await display.openBrowser(displayId, url);

    res.json({ executed: true, pid: pid })
}

exports.reloadDisplayPage = async (req, res) => {
    var displayId = parseInt(req.params.id);

    var lastUrlOfDisplay = await display.urlHistory.getLast({
        displayId: displayId
    });

    if (lastUrlOfDisplay.closed) {
        return res.json(`Page '${lastUrlOfDisplay.url}' for display ${displayId} was closed`);
    }

    var pageObject = await page.connect(lastUrlOfDisplay.port);
    pageObject.reload();
}

/**
 * 
 */
exports.closeBrowserByPid = async (req, res) => {
    if (req.params.id === null) {
        res.json(false);
    }
    exec(`kill ` + req.params.id, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            res.json(error.message);
        }

        res.json(true);
    })
}

/**
 * 
 */
exports.closeBrowser = async (req, res) => {
    browserCommand = config.chromiumCommand || 'chromium-browser';
    exec(`killall ` + browserCommand, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            res.json(error.message);
        }

        res.json(true);
    })
}

// DISPLAY=:0 import -silent crop 1920x1080+1920+0 -screen png:"/home/debian/videowall_client/../screenshot.png"home/debian/videowall_client/../screenshot.png"

exports.getScreenshot = async (req, res) => {
    // const screenshot = require('screenshot-desktop')

    file_path = __basedir + '/../screenshot.png';
    // var options = {
    //     screen: 1,
    //     filename: file_path
    // };
    // console.log('list displays', await screenshot.listDisplays())
    // console.log('screenshot options', options)
    // screenshot(options);

    // var base64 = fs.readFileSync(file_path).toString('base64');
    // res.json(base64)


    // var command = `DISPLAY=:0 scrot ${file_path} -o`;
    var command = `DISPLAY=:0 import -silent -window root -crop 1920x1080+0+0 -screen png:"${file_path}"`;
    // `scrot ${file_path} -o --display=:0`
    console.log('scrot command:', command)
    exec(command, (error, stdout, stderr) => {
        console.log('inside scrot exec')
        if (error) {
            console.log(`error: ${error.message}`);
            res.json(error.message);
        }

        console.log('upload image in base64 format')
        var base64 = fs.readFileSync(file_path).toString('base64');
        res.json(base64)
    });
}

exports.rebootDevice = async (req, res) => {
    exec(`/sbin/shutdown -r now`, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            res.json(error.message);
        }
        res.json(true);
    })
}

exports.reload = async (req, res) => {
    console.log('reload pm2')
    exec(`pm2 reload all`, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            res.json({ execute: false, error: error.message });
        } else {
            res.json({ execute: true, error: null })
        }
        // res.json(true);
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

exports.getMonitorsInfo = async (req, res) => {
    res.json(await display.extractDisplayInfo());
}

exports.storeMonitorsInfo = async (req, res) => {
    res.json(await display.storeInfo());
}

exports.deleteStoredMonitorsInfo = async (req, res) => {
    res.json(await display.deleteAll());
}

exports.getMonitors = async (req, res) => {
    var listMonitors = await display.getList();
    res.json(listMonitors);
}

exports.setPrimaryMonitor = async (req, res) => {
    var id = parseInt(req.params.id);
    if (await display.exists({ id: id }) === false) {
        res.json(false);
    } else {
        await display.setPrimary(id);
        res.json(true);
    }
}

exports.setPlaceByPort = async (req, res) => {
    console.log('SetPlaceByPort', req.params)
    var result = await display.setPlaceByPort(
        req.params.placeCommand,
        req.params.leftPort,
        req.params.rightPort
    )

    console.log('setPlaceByPort result', result);
    res.json(result);
}

exports.setPlace = async (req, res) => {
    var command = req.params.placeCommand;

    var result = await display.setPlace(
        command,
        parseInt(req.params.leftId),
        parseInt(req.params.rightId)
    );

    if (typeof result === 'string') {
        res.json(result)
    }
    console.log('setPlace result', result);
    res.json(result);
}

exports.reloadDisplays = async (req, res) => {
    // var countDeleted = await display.deleteAll();
    // console.log('delete all display', countDeleted);
    // await display.storeInfo();
    // console.log('stored display info')
    res.json(true);
}

exports.loadUpdate = async (req, res) => {
    console.log('loadUpdate')
    exec(`git pull`, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            res.json({ execute: false, error: error.message });
        } else {
            res.json({ execute: true, error: null })
        }
    })
}