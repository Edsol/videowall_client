const { exec } = require("child_process");
var xrandrParse = require('xrandr-parse')
const configController = require('../controllers/config');
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

}

module.exports = Tools