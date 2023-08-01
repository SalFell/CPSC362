const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 3001; // You can choose any available port number


// CORS middleware
app.use(cors({ origin: '*' }));

app.use(function(req, res, next) {
res.header('Access-Control-Allow-Origin', '*');
res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
next();
})

// Endpoint to proxy the Yahoo Finance API request
app.get('/yahoo-finance/:symbol', async (req, res) => {
  const symbol = req.params.symbol;
  const { period1, period2, interval, events, includeAdjustedClose } = req.query;

  try {
    const response = await axios.get(
      `http://query1.finance.yahoo.com/v7/finance/chart/${symbol}?period1=${period1}&period2=${period2}&interval=${interval}&events=${events}&includeAdjustedClose=${includeAdjustedClose}`
    );

    res.json(response.data);
  } catch (error) {
    console.error('Error occurred during API request:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the proxy server
app.listen(port, () => {
  console.log(`Proxy server is running on port ${port}`);
});
