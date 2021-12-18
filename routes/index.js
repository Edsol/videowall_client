var express = require('express');
var router = express.Router();

var index_controller = require("../controllers/index");

router.get('/', index_controller.index);
router.get('/status', index_controller.status)
router.get('/hostname', index_controller.getHostname)
router.get('/setHostname/:hostname', index_controller.setHostname)
router.get('/mac', index_controller.getMacAddress)
router.post('/openUrl', index_controller.openUrl);
router.get('/closeBrowserByPid/:id', index_controller.closeBrowserByPid)
router.get('/closeBrowser', index_controller.closeBrowser)
router.get('/screenshot', index_controller.getScreenshot)
router.get('/reboot', index_controller.rebootDevice)
router.get('/osd/:text', index_controller.setOsd)
router.get('/getConfig', index_controller.getConfig)
router.post('/setConfig', index_controller.setConfig)
router.post('/runCommand', index_controller.runCommand)

router.get('/storeMonitorsInfo', index_controller.storeMonitorsInfo)
router.get('/deleteStoredMonitorsInfo', index_controller.deleteStoredMonitorsInfo)
router.get('/getMonitors', index_controller.getMonitors)
router.get('/getMonitors/:noParse', index_controller.getMonitors)
router.get('/setPrimaryMonitor/:id', index_controller.setPrimaryMonitor)
router.get('/setPlace/:placeCommand/:leftId/:rightId', index_controller.setPlace)

module.exports = router;
