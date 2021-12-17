const Table = require('./table');
const tools = require('../helper/tools');
var xrandrParse = require('xrandr-parse');


class Display extends Table {
	tableName = 'display';

	async extractDisplayInfo() {
		var monitorsList = await tools.exec('DISPLAY=:0 xrandr --current');
		return xrandrParse(monitorsList);
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
				var primary = monitor_info.index === 0 ? true : false;

				var monitor_data = {
					port: port,
					primary: primary,
					width: monitor_info.width || 0,
					height: monitor_info.height || 0,
					xZeroPosition: primary ? 0 : monitor_info.width,
					yZeroPosition: 0
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

	async getWidth(displayId) {
		if (await this.exists({ id: displayId }) === false) {
			return 0;
		}
		var display = await this.get(displayId)
		return display.width;
	}

	async getheight(displayId) {
		if (await this.exists({ id: displayId }) === false) {
			return 0;
		}
		var display = await this.get(displayId)
		return display.height;
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
}

module.exports = Display