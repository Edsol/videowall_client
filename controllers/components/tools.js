const { exec } = require("child_process");
var xrandrParse = require('xrandr-parse')
const configController = require('../config');
global.config = configController.getConfig;

class Tools {

    static async exec(command) {
        return new Promise((resolve, reject) => {
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    resolve(error.message);
                }
                resolve(stdout);
            })
        })
    }

    static async getMonitors() {
        var monitorsList = await this.exec('DISPLAY=:0 xrandr --current');
        return xrandrParse(monitorsList);
    }

    static async listMonitors(noParse = false, save = false) {
        var monitors = await this.getMonitors();

        if (noParse === true) {
            return monitors;
        }
        var response = {};

        for (var port of Object.keys(monitors)) {
            var monitor_info = monitors[port];

            if (monitor_info.connected) {
                response[monitor_info.index] = {
                    port: port,
                    primary: monitor_info.index === 0 ? true : false,
                    size: {
                        width: monitor_info.width || null,
                        height: monitor_info.height || null
                    }
                };
            }
        }

        if (save) {
            configController.replace('display', response)
        }

        return response;
    }

}

module.exports = Tools