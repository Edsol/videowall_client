var express = require('express');
var router = express.Router();

var index = require("../controllers/index");

router.get('/', (req, res) => {
    console.log('AAA')
    res.json(true);
});

module.exports = router;
