const fs = require('fs');

function readHistoricalDataFile(filename) {
    const data = fs.readFileSync(filename);
    return JSON.parse(data);
  }


function calculateMovingAverage(data,period,dataPoint)
{
    let sum = 0;
    for(let i = dataPoint-period; i <= dataPoint; i++)
    {
        sum += data[i].Open;
    }
    return sum/period;
}

function simulateTrades(data)
{
    const trades = [];
    let cashReserve = 10000;
    let stockAmount = 90000/data[20].Open;

    for(let i = 20; i < data.length - 1; i++)
    {
        movingAverage = calculateMovingAverage(data,20,i);
        previousMovingAverage = calculateMovingAverage(data,20,i-1);
        if(data[i].Open > movingAverage && data[i-1].Open < previousMovingAverage){
      //buy
      const price = data[i].Open;
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
        Price: price,
        TradeType: "Buy",
        CashReserve: cashReserve.toFixed(2),
        StockAmount: stockAmount.toFixed(2),
        MoneyInStock: (stockAmount*price).toFixed(2),
        TotalInPortfolio: (cashReserve + stockAmount*price).toFixed(2),
      });
    }
    else if (data[i].Open < movingAverage && data[i-1].Open > previousMovingAverage)
    {
      //sell
      const price = data[i].Open;
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
        Price: price,
        TradeType: "Sell",
        CashReserve: cashReserve.toFixed(2),
        StockAmount: stockAmount.toFixed(2),
        MoneyInStock: (stockAmount*price).toFixed(2),
        TotalInPortfolio: (cashReserve + stockAmount*price).toFixed(2),
      });
    }
    }
    return trades;
}

function main()
{
  const data = readHistoricalDataFile("data/FNGD_historical_data.json");
  const trades = simulateTrades(data);
  console.log(trades);
}

main();

