import stratsMain from './model/stratsMain.js';
import processData from './model/processData.js';
import express, { json } from 'express';
import { get } from 'axios';
import { writeFileSync } from 'fs';
import cors from 'cors';

const app = express();
const port = 3001; // You can choose any available port number


// CORS middleware
app.use(cors({ origin: '*' }));

app.use(function(req, res, next) {
res.header('Access-Control-Allow-Origin', '*');
res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
next();
})

app.use(json());

// Endpoint to proxy the Yahoo Finance API request
app.get('/yahoo-finance/:symbol', async (req, res) => {
  const symbol = req.params.symbol;
  const { period1, period2, interval, events, includeAdjustedClose } = req.query;

  try {
    const response = await get(
      `http://query1.finance.yahoo.com/v7/finance/chart/${symbol}?period1=${period1}&period2=${period2}&interval=${interval}&events=${events}&includeAdjustedClose=${includeAdjustedClose}`
    );
    const data = response.data;
    const historicalData = processData(data);

    if (historicalData.length > 0) {
      // Save data to the server
      const fileName = `./model/data/historical_data.json`;
      writeFileSync(fileName, JSON.stringify(historicalData, null, 2), 'utf8');

      // Trading strategies
      const trades = stratsMain();
      console.log(`Data for ${symbol} downloaded successfully to ${fileName}`);

      res.json(historicalData);
      res.json(trades);
    } else {
      res.status(404).json({ error: 'No data received from Yahoo Finance API.' });
    }
  } catch (error) {
    console.error('Error occurred during API request:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the proxy server
app.listen(port, () => {
  console.log(`Proxy server is running on port ${port}`);
});
