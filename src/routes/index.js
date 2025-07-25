const express = require('express');
const membershipRoute = require('./membership.routes');
const informationRoute = require('./information.routes');
const transactionRoute = require('./transaction.routes');
const router = express.Router();

router.use(membershipRoute);
router.use(informationRoute);
router.use(transactionRoute);

module.exports = router;