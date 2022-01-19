var express = require('express');
var router = express.Router();

const displayModel = require('../models/display');
const display = new displayModel();

const urlHistoryModel = require('../models/urlHistory');
const urlHistory = new urlHistoryModel();

router.get('/urlHistorylist/:limit', async (req, res) => {
    var list = await urlHistory.prisma.urlHistory.findMany({
        take: parseInt(req.params.limit),
        orderBy: {
            id: 'desc'
        },
        include: {
            display: true
        }
    })

    res.json(list)
});

router.get('/clearHistoryList', async (req, res) => {
    res.json(true);
});

module.exports = router;
