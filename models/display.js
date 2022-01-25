const Table = require('./table');
const os = require("os");
const tools = require('../helper/tools');
var xrandrParse = require('../libs/xrandrParser');

const configModel = require('../models/config');
const config = new configModel();

const urlHistoryModel = require('../models/urlHistory');

class Display extends Table {
	tableName = 'display';

	urlHistory = new urlHistoryModel();

	async extractDisplayInfo() {
		var monitorsList = await tools.exec('DISPLAY=:0 xrandr --current');
		return xrandrParse(monitorsList);
	}

	async parsePosition(info) {
		if (info.left === 0 && info.top === 0) {
			return "center";
		} else if (info.left > 0 && info.top === 0) {
			return "right";
		}
		else if (info.left === 0 && info.top > 0) {
			return "above";
		} else {
			return null;
		}
	}

	/**
	 * Get list of display connected
	 * @param  {} noParse=false
	 */
	async list(noParse = false) {
		var monitors = await this.extractDisplayInfo();

		if (noParse === true) {
			return monitors;
		}
		var result = {};

		for (var port of Object.keys(monitors)) {
			var monitor_info = monitors[port];

			if (monitor_info.connected) {
				var position = await this.parsePosition(monitor_info);
				var monitor_data = {
					port: port,
					primary: monitor_info.primary,
					width: monitor_info.width || 0,
					height: monitor_info.height || 0,
					left: monitor_info.left || 0,
					top: monitor_info.top || 0,
					position: position
				};

				result[monitor_info.index] = monitor_data;
			}
		}

		return result;
	}

	/**
	 * Store display information in database
	 */
	async storeInfo() {
		var monitors = await this.list();
		for (var monitor_data of Object.values(monitors)) {
			if (await this.exists({ port: monitor_data.port }) === false) {
				await this.create({
					data: monitor_data
				});
			}
		}
		return true;
	}

	async getField(displayId, field) {
		if (await this.exists({ id: displayId }) === false) {
			return null;
		}
		var display = await this.get(displayId)
		return display[field];
	}

	/**
	 * Set primary display
	 * @param  {} id
	 */
	async setPrimary(id) {
		await this.deleteAll({}, { primary: false })
		var display = await this.get(id);
		await tools.exec(`DISPLAY=:0 xrandr --output ${display.port} --primary`);
		return await this.setField(id, 'primary', true)
	}

	async getPrimary() {
		return await this.find({
			primary: true
		})
	}

	async setPlaceByPort(command, first_port, second_port) {
		var first_display = await this.find({
			port: first_port
		});

		var second_display = await this.find({
			port: second_port
		});

		console.log('command', command);
		console.log('first_display', first_display);
		console.log('second_display', second_display)

		return await this.setPlace(command, first_display.id, second_display.id);
	}

	/**
	 * Set monitor position
	 * 
	 * @param  {} command
	 * @param  {} left_id
	 * @param  {} right_id
	 */
	async setPlace(command, first_id, second_id) {
		const acceptedPlaceCommand = {
			'right': '--right-of',
			'left': '--left-of',
			'above': '--above',
			'belove': '--below'
		};

		if (xrand_command = acceptedPlaceCommand[command] === undefined) {
			return 'Command not valid';
		}
		var xrand_command = acceptedPlaceCommand[command];
		var first_display = await this.get(first_id);
		var second_display = await this.get(second_id);
		console.log('execute ' + `xrandr --output ${first_display.port} ${xrand_command} ${second_display.port}`)
		await tools.exec(`DISPLAY=:0 xrandr --output ${first_display.port} ${xrand_command} ${second_display.port}`);
		return true;
	}

	async openBrowser(displayId, url) {
		var browserParams = await config.getByTitle('browserParams', true);
		var displayObj = await this.get(displayId);

		browserParams.push("--profile-directory=Default" + displayId);
		browserParams.push(`--window-position=${displayObj.left},${displayObj.top}`);

		const userInfo = os.userInfo();

		var userDataDir = userInfo.homedir + "/.config/chromium/Default" + displayId;

		// var pid = await this.browserLauncher(url, browserParams, userDataDir)
		var chromeInstance = await this.chromeLauncher(url, browserParams, userDataDir);
		// var targetId = chromeInstance.page._target._targetId;
		console.log('chromeInstance', chromeInstance)

		console.log(`Browser start for Display ${displayId} with PID`, chromeInstance.pid);

		await this.urlHistory.insert({
			url: url,
			pid: chromeInstance.pid,
			port: chromeInstance.port,
			displayId: displayId,
			closed: false,
			userDataDir: userDataDir,
			browserParams: JSON.stringify(browserParams)
		});

		return chromeInstance.pid;
	}


	async browserLauncher(url, browserParams, userDataDir, detach = true) {
		console.log('url launched with browserLauncher', browserParams)
		const launcher = require('@httptoolkit/browser-launcher');

		var browserCommand = await config.getByTitle('chromiumCommand', true) || 'chromium';

		var browserOptions = {
			browser: browserCommand,
			detached: true,
			options: browserParams,
			profile: userDataDir
		};

		return new Promise((resolve, reject) => {
			launcher(async function (err, launch) {
				launch(url, browserOptions, async function (err, instance) {
					if (err) {
						reject(err);
					}

					if (detach === true) {
						instance.process.unref();
						instance.process.stdin.unref();
						instance.process.stdout.unref();
						instance.process.stderr.unref();
					}

					instance.on('stop', function (code) {
						this.urlHistory.setClosedByPid(instance.pid, true);
						console.log(`Browser instance (PID ${instance.pid}) stopped`);
					});

					resolve({
						pid: instance.pid,
						port: instance.port
					});
				}
				);
			});
		})
	}

	async chromeLauncher(url, browserParams, userDataDir) {
		console.log('chromeLauncher')
		const ChromeLauncher = require('chrome-launcher');

		return new Promise((resolve, reject) => {
			ChromeLauncher.launch({
				startingUrl: url,
				chromeFlags: browserParams
			}).then(async chrome => {
				console.log(`Chrome debugging port running on ${chrome.port}`);

				chrome.process.on('close', () => {
					this.urlHistory.setClosedByPid(chrome.pid, true);
					console.log(`Browser instance (PID ${chrome.pid}) stopped`);
				})

				resolve({
					pid: chrome.pid,
					port: chrome.port
				});
			});
		})
	}

	async reload(urlHistory) {
		return await this.openBrowser(urlHistory.displayId, urlHistory.url);
	}
}

module.exports = Display