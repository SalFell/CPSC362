const fs = require('fs');

// Function to read the JSON file and parse its content
const readHistoricalDataFile = (filename) => {
  const data = fs.readFileSync(filename);
  return JSON.parse(data);
}

function runTradingStrategy(data, window = 20, deviations = 2) {
  const bands = [];
  const trades = [];
  let cashReserve = 10000;
  let stockAmount = 0;

  for (let i = window - 1; i < data.length; i++) {
    const currentPrices = data.slice(i - window + 1, i + 1).map((item) => item.Open);
    const mean = currentPrices.reduce((sum, price) => sum + price, 0) / window;
    const variance = currentPrices.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) / window;
    const stdDev = Math.sqrt(variance);
    const upperBand = (mean + deviations * stdDev).toFixed(2);
    const lowerBand = (mean - deviations * stdDev).toFixed(2);

    // Determine the signal based on Bollinger Bands
    let signal = 'Hold';
    if (data[i].Open > upperBand) {
      signal = 'Sell';
    } else if (data[i].Open < lowerBand) {
      signal = 'Buy';
    }

    bands.push({
      Date: data[i].Date,
      sma: mean.toFixed(2),
      upperBand,
      lowerBand,
      signal,
    });

    const currentDate = new Date(data[i].Date);
    if (signal === 'Buy') {
      // Buy
      const price = data[i].Open;
      const stockToBuy = Math.floor(cashReserve / price);
      stockAmount += stockToBuy;
      cashReserve -= stockToBuy * price;

      trades.push({
        DateOfTrade: currentDate.toISOString(),
        Price: price,
        TradeType: 'Buy',
        CashReserve: cashReserve.toFixed(2),
        StockAmount: stockAmount.toFixed(2),
        MoneyInStock: (stockAmount * price).toFixed(2),
        TotalInPortfolio: (cashReserve + stockAmount * price).toFixed(2),
      });
    } else if (signal === 'Sell') {
      // Sell
      const price = data[i].Open;
      cashReserve += stockAmount * price;
      stockAmount = 0;

      trades.push({
        DateOfTrade: currentDate.toISOString(),
        Price: price,
        TradeType: 'Sell',
        CashReserve: cashReserve.toFixed(2),
        StockAmount: stockAmount.toFixed(2),
        MoneyInStock: '0.00',
        TotalInPortfolio: cashReserve.toFixed(2),
      });
    }
  }

  // Print the Bollinger Bands data
 // console.log('Bollinger Bands Data:');
  //console.log('------------------------------------------------');
  //bands.forEach((band) => {
    //console.log(
    //  `Date: ${band.Date}, SMA: $${band.sma}, Upper //Band: $${band.upperBand}, Lower Band: $${band.lowerBand}, Signal: ${band.signal}`
   // );//
  //});
  //console.log('------------------------------------------------');//

  return trades;
}

// Rest of the code remains the same...


// Function to simulate trades based on the "Open" data
function simulateTrades(data) {
  //when the days price goes above or below the moving average, buy or sell
  //first generate moving average, then compare to price
  const trades = [];
  let cashReserve = 10000;
  let cashForTrade = 90000
  let stockAmount = 0;
  let sum = 0;
  let movingAverage;

  for(let i = 0; i < 19; i++)
  {
    sum += data[i].Open;
  }
  movingAverage = sum/20;
  stockAmount = cashForTrade/data[19].Open;

  //all trades will be $10,000
  for (let i = 20; i < data.length - 1; i++) {
    previousMovingAverage = movingAverage;
    movingAverage = (movingAverage*20 - data[i-20].Open + data[i].Open)/20;

    if(data[i].Open > movingAverage && data[i-1].Open < previousMovingAverage)
    {
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


// Main function to run the program
function BBmain(filename) {
  const data = readHistoricalDataFile(filename);
  const BBresults = runTradingStrategy(data);
  const trades = simulateTrades(data);

  // Output the trades
  console.log('movAvg Trades:');
  console.log('------------------------------------------------');
  trades.forEach((trade) => {
    console.log(
      `On ${trade.DateOfTrade}--- ${trade.TradeType}ing: $10000 in stock. Portfolio: $${trade.TotalInPortfolio} Amount of Stock: ${trade.StockAmount} Cash Reserve: ${trade.CashReserve}`
    );
    });
    // Output the trades
  console.log('------------------------------------------------');
  console.log('BB Trades:');
  console.log('------------------------------------------------');
  BBresults.forEach((trade) => {
    console.log(
      `On ${trade.DateOfTrade}--- ${trade.TradeType}ing: $10000 in stock. Portfolio: $${trade.TotalInPortfolio} Amount of Stock: ${trade.StockAmount} Cash Reserve: ${trade.CashReserve}`
    );
    });

  // Write the trades to a JSON file
  JSON_Trades = JSON.stringify(trades);
  fs.writeFile("./data/MACO.json", JSON_Trades, function(err) { //writeFile requires a callback function (error handling) because it is asynchronous
    if (err) {
      console.error('Error writing to file:', err);
    } else {
      console.log('File "MACO.json" has been saved successfully.');
    }
  });

  // Write the trades to a JSON file
  BB_Trades = JSON.stringify(BBresults);
  fs.writeFile("./data/BB.json", BB_Trades, function(err) { //writeFile requires a callback function (error handling) because it is asynchronous
    if (err) {
      console.error('Error writing to file:', err);
    } else {
      console.log('File "BB.json" has been saved successfully.');
    }
  });

}

// Run the main function
// BBmain(filename);

module.exports = BBmain;
