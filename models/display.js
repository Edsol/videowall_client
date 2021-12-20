const Table = require('./table');
const tools = require('../helper/tools');
var xrandrParse = require('../libs/xrandrParser');

class Display extends Table {
	tableName = 'display';

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
		var first_display = this.find({
			port: first_port
		});

		var second_display = this.find({
			port: first_port
		});

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
}

module.exports = Display