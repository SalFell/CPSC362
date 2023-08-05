import axios from 'axios';
import processData from '../utils/processData.js';

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

    const data = response.data;
    const historicalData = processData(data);

    res.json(historicalData);
  } catch (error) {
    console.error('Error occurred while downloading data:', error.message);
    res.status(500).json({ error: 'Error occurred during data download. Please try again.' });
  }
};

export default proxyYahooFinance;