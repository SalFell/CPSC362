import express from 'express';
import proxyYahooFinance from '../controllers/yfc.js';


const router = express.Router();
// Route to get historical data from Yahoo Finance API
router.get('/:symbol', proxyYahooFinance);

export default router;
