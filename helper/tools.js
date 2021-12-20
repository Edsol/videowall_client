const { exec } = require("child_process");
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