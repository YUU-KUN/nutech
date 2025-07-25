const express = require('express');
const verifyToken = require('../middlewares/verifyToken');
const { banner, service } = require('../modules/information/controller');
const router = express.Router();

router.get('/banner', banner);
router.get('/services', verifyToken, service);

module.exports = router;