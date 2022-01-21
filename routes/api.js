var express = require('express');
var router = express.Router();

var api = require("../controllers/api");

router.get('/', api.index);
router.get('/status', api.status)
router.get('/hostname', api.getHostname)
router.get('/setHostname/:hostname', api.setHostname)
router.get('/mac', api.getMacAddress)
router.post('/openUrl', api.openUrl);
router.get('/closeBrowserByPid/:id', api.closeBrowserByPid)
router.get('/closeBrowser', api.closeBrowser)
router.get('/screenshot', api.getScreenshot)
router.get('/reboot', api.rebootDevice)
router.get('/reload', api.reload)
router.get('/osd/:text', api.setOsd)
router.get('/getConfig', api.getConfig)
router.post('/setConfig', api.setConfig)
router.post('/runCommand', api.runCommand)
router.get('/reloadDisplays', api.reloadDisplays)
router.get('/loadUpdate', api.loadUpdate)

router.get('/getMonitorsInfo', api.getMonitorsInfo)
router.get('/storeMonitorsInfo', api.storeMonitorsInfo)
router.get('/deleteStoredMonitorsInfo', api.deleteStoredMonitorsInfo)
router.get('/getMonitors', api.getMonitors)
router.get('/getMonitors/:noParse', api.getMonitors)
router.get('/setPrimaryMonitor/:id', api.setPrimaryMonitor)
router.get('/setPlaceByPort/:placeCommand/:leftPort/:rightPort', api.setPlaceByPort)
router.get('/setPlace/:placeCommand/:leftId/:rightId', api.setPlace)

module.exports = router;
