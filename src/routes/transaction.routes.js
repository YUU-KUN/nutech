const express = require('express');
const { balance, topup, history, transaction } = require('../modules/transaction/controller');
const verifyToken = require('../middlewares/verifyToken');
const router = express.Router();

router.get('/balance', verifyToken, balance);
router.post('/topup', verifyToken, topup);
router.get('/transaction/history', verifyToken, history);
router.post('/transaction', verifyToken, transaction);

module.exports = router