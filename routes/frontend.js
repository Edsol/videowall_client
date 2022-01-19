var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    console.log('AAA')
    res.json(true);
});

module.exports = router;
