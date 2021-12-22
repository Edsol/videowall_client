const { exec, execSync } = require("child_process");
const fs = require('fs');
const ip = require('ip');
const getmac = require('getmac');
const configController = require('../controllers/config');

const displayModel = require('../models/display');
const display = new displayModel();
const tools = require('../helper/tools');

global.config = configController.getConfig;

exports.index = async (req, res) => {
    var displayList = await display.getList();

    res.render('index', {
        title: 'PiClient: ' + (config.hostname || '-----'),
        hostname: config.hostname,
        displays: displayList
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

/**
 * 
 */
exports.openUrl = async (req, res) => {
    var url = req.body.url;
    var displayId = req.body.display;

    var chromeFlags = [
        "--display=:0",
        '--kiosk',
        "--disable-features=Translate",
        // "--headless",
        "--disable-gpu",
        "--no-sandbox"
        // `--window-position=${displayObj.left},${displayObj.top}`,
        // "--profile-directory=Default" + displayId,

    ];

    if (url === '') {
        res.json({ executed: false, errors: 'No url' });
    }

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

    if (displayId !== undefined || displayId !== null) {
        var displayObj = await display.get(displayId);
        if (displayObj !== null) {
            chromeFlags.push("--profile-directory=Default" + displayId);
            chromeFlags.push(`--window-position=${displayObj.left},${displayObj.top}`);
        }
    }

    console.log('displayObj', displayObj)
    console.log('displayId', displayId);
    var userDataDir = `/home/powering/.config/chromium/Default${displayId}`;

    var pid = null;

    if (req.params.chromeLauncher === true) {
        var pid = await chromeLauncher(url, chromeFlags, userDataDir);
        console.log('pid', pid)
        res.json({ executed: true, pid: pid })
    } else if (req.params.chromeLauncher === false || req.params.chromeLauncher === undefined) {
        var pid = await browserLauncher(url, chromeFlags, userDataDir, true);
        res.json({ executed: true, pid: pid })
    } else {
        res.json({ executed: false, pid: null })
    }
}

async function chromeLauncher(url, chromeFlags, userDataDir) {
    console.log('url launched with chromeLauncher', chromeFlags)
    const ChromeLauncher = require('chrome-launcher');

    if (fs.existsSync(userDataDir) === false) {
        userDataDir = null;
    }

    ChromeLauncher.launch({
        port: 9222,
        startingUrl: url,
        // chromePath: '/usr/bin/chromium',
        chromeFlags: chromeFlags,
        userDataDir: userDataDir
    }).then(chrome => {
        console.log(`chrome`, chrome)
        console.log(`Chrome debugging port running on ${chrome.port}`);
        res.json({ executed: true, pid: chrome.pid })
    })
}

async function browserLauncher(url, chromeFlags, userDataDir, detach = true) {
    console.log('url launched with browserLauncher', chromeFlags)
    const launcher = require('@httptoolkit/browser-launcher');
    browserCommand = config.chromiumCommand || 'chromium';


    var browserOptions = {
        browser: browserCommand,
        detached: true,
        // noProxy: ['127.0.0.1', 'localhost'],
        options: chromeFlags,
        profile: userDataDir
    };

    console.log('browserOptions', browserOptions)

    return new Promise((resolve, reject) => {
        launcher(async function (err, launch) {
            launch(url, browserOptions,
                async function (err, instance) {
                    if (err) {
                        // return console.error(err);
                        reject(err);
                    }

                    if (detach === true) {
                        instance.process.unref();
                        instance.process.stdin.unref();
                        instance.process.stdout.unref();
                        instance.process.stderr.unref();
                    }

                    console.log('Instance started with PID:', instance.pid);

                    instance.on('stop', function (code) {
                        console.log('Instance stopped with exit code:', code);
                    });

                    resolve(instance.pid);
                }
            );
        });
    })
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

exports.getScreenshot = async (req, res) => {
    const screenshot = require('screenshot-desktop')

    file_path = __basedir + '/tmp/screenshot.png';
    await screenshot({ filename: file_path });

    // var base64 = fs.readFileSync(file_path).toString('base64');
    // res.json(base64)
    res.json(true);

    // var command = `DISPLAY=:0 scrot ${file_path} -o`;
    // // `scrot ${file_path} -o --display=:0`
    // console.log('scrot command:', command)
    // exec(command, (error, stdout, stderr) => {
    //     console.log('inside scrot exec')
    //     if (error) {
    //         console.log(`error: ${error.message}`);
    //         res.json(error.message);
    //     }

    //     console.log('upload image in base64 format')
    //     // var base64 = fs.readFileSync(file_path).toString('base64');
    //     // res.json(base64)
    // });
    // res.json(false);
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

exports.getMonitorsInfo = async (req, res) => {
    res.json(await display.extractDisplayInfo());
}

exports.storeMonitorsInfo = async (req, res) => {
    res.json(await display.storeInfo());
}

exports.deleteStoredMonitorsInfo = async (req, res) => {
    res.json(await display.deleteAll({}));
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
    var countDeleted = await display.deleteAll({});
    console.log('delete all display', countDeleted);
    await display.storeInfo();
    console.log('stored display info')
    res.json(true);
}