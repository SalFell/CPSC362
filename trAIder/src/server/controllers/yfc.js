// Yahoo Finance Controller (yfc.js)
// Part of Controller in MVC

import axios from 'axios';
import processData from '../utils/processData.js';
import { writeFileSync } from 'fs';

// Proxy Yahoo Finance API request
const proxyYahooFinance = async (req, res) => {
  try {
    const { symbol } = req.params;
    const { period1, period2, interval, events, includeAdjustedClose } = req.query;

    const response = await axios.get(
      `https://query1.finance.yahoo.com/v7/finance/chart/${symbol}`,
      {
        params: {
          period1,
          period2,
          interval,
          events,
          includeAdjustedClose,
        },
      }
    );

    const historicalData = processData(response.data);

    if (historicalData.length > 0) {
      // Save data to the server
      const fileName = `./model/data/historical_data.json`;
      writeFileSync(fileName, JSON.stringify(historicalData, null, 2), 'utf8');

      console.log(`Data for ${symbol} downloaded successfully to ${fileName}`);

      res.json(historicalData);
    } else {
      res.status(404).json({ error: 'No data received from Yahoo Finance API.' });
    }
  } catch (error) {
    console.error('Error occurred while downloading data:', error.message);
    res.status(500).json({ error: 'Error occurred during data download. Please try again.' });
  }
};

export { proxyYahooFinance };
