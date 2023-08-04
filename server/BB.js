import fs from 'fs';

function readHistoricalDataFile(filename) {
  const data = fs.readFileSync(filename);
  return JSON.parse(data);
}
// Function simulate trades based on the Bollinger Data
function BBstrat(data, window = 20, deviations = 2) {
  const bands = [];
  const trades = [];
  let cashReserve = 10000;
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
      const stockToBuy = Math.floor(cashReserve / price);
      stockAmount += stockToBuy;
      cashReserve -= stockToBuy * price;

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
      cashReserve += stockAmount * price;
      stockAmount = 0;

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



// Function to simulate trades based on the "Open" data
/*
function simulateTrades(data) {
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

    //movingAverage = (movingAverage*lookbackPeriod - data[i-lookbackPeriod].Close + data[i].Close)/20;
 
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
*/

// Main function to run the program
function main() {
  
  const filename = 'data/historical_data.json';
  const data = readHistoricalDataFile(filename);
  
  const BBresults = BBstrat(data);

  console.log('------------------------------------------------');
  console.log('BB Trades:');
  console.log('------------------------------------------------');
  BBresults.forEach((trade) => {
    console.log(
      `On ${trade.DateOfTrade} --- ${trade.TradeType} 
    Stock price: ${trade.Price}`
    );
    });


  // Write the trades to a JSON file
  let JSON_Trades = JSON.stringify(BBresults, null, 2);
  fs.writeFile("BB.json", JSON_Trades, function(err) { //writeFile requires a callback function (error handling) because it is asynchronous
    if (err) {
      console.error('Error writing to file:', err);
    } else {
      console.log('File "BB.json" has been saved successfully.');
    }
  });
}

// Run the main function
main();