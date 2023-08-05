import express from 'express';
import { proxyYahooFinance } from '../controllers/yfc.js';
import { getMACOResults, getBBResults } from '../controllers/stratsController.js';


const router = express.Router();
// Route to get historical data from Yahoo Finance API
router.get('/:symbol', proxyYahooFinance);
router.get('/:symbol/MACO-strategy-results', getMACOResults);
router.get('/:symbol/BB-strategy-results', getBBResults);

export default router;
