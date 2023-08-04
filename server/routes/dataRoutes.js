const express = require('express');
const router = express.Router();
const yahooFinanceController = require('../controllers/yfc');

// Route to get historical data from Yahoo Finance API
router.get('/:symbol', yahooFinanceController.proxyYahooFinance);

module.exports = router;
