var fs = require('fs');
var Store = require("jfs");
const { exec } = require("child_process");

var jsonDefaultFilePath = __dirname + '/../config/config.example.json'
var jsonFilePath = __dirname + '/../config/config.json'

if (fs.existsSync(jsonFilePath) === false) {
    fs.copyFileSync(jsonDefaultFilePath, jsonFilePath)
}

const configStorage = exports.configStorage = new Store(jsonFilePath);

exports.config = configStorage.allSync();

exports.setDisplayExport = async () => {
    exec('export DISPLAY=:0', (error, stdout, stderr) => {
        if (error) {
            return error.message;
        }
    })

    return true;
}

exports.getConfig = () => {
    global.config = configStorage.allSync();
    return configStorage.allSync();
}

exports.get = (key) => {
    return configStorage.get(key);
}

exports.save = (key, value) => {
    configStorage.saveSync(key, value);
    return true;
}

exports.setConfig = (key, value) => {
    configStorage.saveSync(key, value)
    return true;
}

exports.replace = (key, value) => {
    console.log('replaceConfig')
    configStorage.deleteSync(key)
    configStorage.saveSync(key, value)
    return true;
}