const fs = require('fs');
const readHistoricalDataFile = require('./readData.js');

// Function simulate trades based on the Bollinger Data
function BBstrat(data) {
  let window = 20;
  let deviations = 2;
  const bands = [];
  const trades = [];
  let cashReserve = 100000;
  let stockAmount = 0;

  for (let i = window - 1; i < data.length; i++) {
    const currentPrices = data.slice(i - window + 1, i + 1).map((item) => item.Close);
    const mean = currentPrices.reduce((sum, price) => sum + price, 0) / window;
    const variance = currentPrices.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) / window;
    const stdDev = Math.sqrt(variance);
    //calculate upperband
    const upperBand = (mean + deviations * stdDev);
    //calculate lowerband
    const lowerBand = (mean - deviations * stdDev);

    // Determine the signal based on Bollinger Bands
    let signal = 'Hold';
    if (data[i].Close > upperBand) {
      signal = 'Sell';
    } else if (data[i].Close < lowerBand) {
      signal = 'Buy';
    }

    bands.push({
      Date: data[i].Date,
      sma: mean,
      upperBand,
      lowerBand,
      signal,
    });

    const currentDate = new Date(data[i].Date);
    if (signal === 'Buy') {
      // Buy
      const price = data[i].Close;
      const date = new Date(data[i].Date);
       if(cashReserve > 0)
       {
         stockAmount += 10000/price;
         cashReserve -= 10000;
       }

      trades.push({
        DateOfTrade: currentDate.toISOString(),
        Price: price.toFixed(2),
        TradeType: 'Buy',
        CashReserve: cashReserve.toFixed(2),
        StockAmount: stockAmount.toFixed(2),
        MoneyInStock: (stockAmount * price).toFixed(2),
        TotalInPortfolio: (cashReserve + stockAmount * price).toFixed(2),
      });
    } else if (signal === 'Sell') {
      // Sell
      const price = data[i].Close;
      const date = new Date(data[i].Date);
       if(cashReserve > 0)
       {
         stockAmount += 10000/price;
         cashReserve -= 10000;
       }

      trades.push({
        DateOfTrade: currentDate.toISOString(),
        Price: price.toFixed(2),
        TradeType: 'Sell',
        CashReserve: cashReserve.toFixed(2),
        StockAmount: stockAmount.toFixed(2),
        MoneyInStock: '0.00',
        TotalInPortfolio: cashReserve.toFixed(2),
      });
      
    }
  }

return trades;
}

module.exports = BBstrat;
