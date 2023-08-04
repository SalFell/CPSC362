const fs = require('fs');
const readHistoricalDataFile = require('./readData.js');

// Function to simulate trades based on the "Close" data
function MACO() {
  const data = readHistoricalDataFile();
  //when the days price goes above or below the moving average, buy or sell
  //first generate moving average, then compare to price
    const trades = [];
  let cashReserve = 10000;
  let cashForTrade = 90000
  let stockAmount = 0;
  let sum = 0;
  let movingAverage;
  let lookbackPeriod = 20; //20 day moving average

  for(let i = 0; i < 19; i++)
  {
    sum += data[i].Close;
  }
  movingAverage = sum/lookbackPeriod;
  sum = 0;
  stockAmount = cashForTrade/data[lookbackPeriod].Close;

  //all trades will be $10,000
  for (let i = lookbackPeriod; i < data.length - 1; i++) {
    previousMovingAverage = movingAverage;

    //Add past lookbackperiod number of days of prices
    for(let j = i - 19; j <= i; j++){
      sum += data[j].Close;
    }
    //Divide that by the lookbackperiod
    movingAverage = sum/lookbackPeriod;
    sum = 0;
 
    if(data[i].Close > movingAverage && data[i-1].Close < previousMovingAverage)
    {
      //buy
      const price = data[i].Close;
      const date = new Date(data[i].Date);
      if(cashReserve > 0)
      {
        stockAmount += 10000/price;
        cashReserve -= 10000;
      }
      else
      {
        console.log("Logic Problem! out of cash reserves");
      }

      trades.push({
        DateOfTrade: date.toISOString(),
        Price: price.toFixed(2),
        TradeType: "Buy",
        CashReserve: cashReserve,
        StockAmount: stockAmount,
        MoneyInStock: (stockAmount*price),
        TotalInPortfolio: (cashReserve + stockAmount*price),
      });
    }
    else if (data[i].Close < movingAverage && data[i-1].Close > previousMovingAverage)
    {
      //sell
      const price = data[i].Close;
      const date = new Date(data[i].Date);
      if(stockAmount > 0)
      {
        stockAmount -= 10000/price;
        cashReserve += 10000;
      }
      else
      {
        console.log("Logic Problem! out of stock");
      }

      trades.push({
        DateOfTrade: date.toISOString(),
        Price: price.toFixed(2),
        TradeType: "Sell",
        CashReserve: cashReserve,
        StockAmount: stockAmount,
        MoneyInStock: (stockAmount*price),
        TotalInPortfolio: (cashReserve + stockAmount*price),
      });
    }

  }
  return trades;
}
module.exports = MACO; // Export the component
