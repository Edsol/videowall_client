var express = require('express');
var router = express.Router();

var index_controller = require("../controllers/index");

router.get('/', index_controller.index);
router.get('/status', index_controller.status)
router.get('/hostname', index_controller.getHostname)
router.get('/setHostname/:hostname', index_controller.setHostname)
router.post('/run', index_controller.openBrowser);
router.get('/closeBrowser', index_controller.closeBrowser)
router.get('/screenshot/:base64', index_controller.getScreenshot)
router.get('/reboot', index_controller.rebootDevice)
router.get('/osd/:text', index_controller.setOsd)
router.get('/getConfig', index_controller.getConfig)
router.post('/setConfig', index_controller.setConfig)
router.post('/runCommand', index_controller.runCommand)

module.exports = router;
