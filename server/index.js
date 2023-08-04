const { MACOmain } = require('./MACO-Gabe');
const BBmain = require('./BB');
//const { BackTestResults } = require('../client/src/BackTestResults');
const processData = require('./processData');
const express = require('express');
const axios = require('axios');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000; // You can choose any available port number


// CORS middleware
app.use(cors({ origin: '*' }));

app.use(function(req, res, next) {
res.header('Access-Control-Allow-Origin', '*');
res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
next();
})

app.use(express.json());

// Endpoint to proxy the Yahoo Finance API request
app.get('/yahoo-finance/:symbol', async (req, res) => {
  const symbol = req.params.symbol;
  const { period1, period2, interval, events, includeAdjustedClose } = req.query;

  try {
    const response = await axios.get(
      `http://query1.finance.yahoo.com/v7/finance/chart/${symbol}?period1=${period1}&period2=${period2}&interval=${interval}&events=${events}&includeAdjustedClose=${includeAdjustedClose}`
    );
    const data = response.data;
    const historicalData = processData(data);

    if (historicalData.length > 0) {
      // Save data to the server
      const fileName = `./data/${symbol}_historical_data.json`;
      fs.writeFileSync(fileName, JSON.stringify(historicalData, null, 2), 'utf8');

      // Backtest
      MACOmain(fileName);
      // console.log(MACO);
      BBmain(fileName);
      // console.log(BB);
      //BackTestResults(MACO);
      console.log(`Data for ${symbol} downloaded successfully to ${fileName}`);

      res.json(historicalData);
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
