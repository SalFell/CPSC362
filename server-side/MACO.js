const fs = require('fs');

// Function to read the JSON file and parse its content
const readHistoricalDataFile = (filename) =>{
  const data = fs.readFileSync(filename);
  return JSON.parse(data);
}


// Function to simulate trades based on the "Open" data
const simulateTrades = (data) => {

 if (data.length < 20) {
  window.alert('Insufficient data provided.');
  return [];
}

  //when the days price goes above or below the moving average, buy or sell
  //first generate moving average, then compare to price
  const trades = [];
  let cashReserve = 10000;
  let cashForTrade = 90000
  let stockAmount = 0;
  let sum = 0;
  let movingAverage = 0;

  for(let i = 0; i < 19; i++)
  {
    sum += data[i].Open;
  }
  movingAverage = sum/20;
  stockAmount = cashForTrade/data[19].Open;

  //all trades will be $10,000
  for (let i = 20; i < data.length - 1; i++) {
    let previousMovingAverage = movingAverage;
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
function main(filename) {
  const data = readHistoricalDataFile(filename);
  const trades = simulateTrades(data);

  // Output the trades
  console.log('Trades:');
  console.log('------------------------------------------------');
  trades.forEach((trade) => {
    console.log(
      `On ${trade.DateOfTrade}--- ${trade.TradeType}ing: $10000 in stock. Portfolio: $${trade.TotalInPortfolio} Amount of Stock: ${trade.StockAmount} Cash Reserve: ${trade.CashReserve}`
    );
  });
  console.log('------------------------------------------------');

  // Write the trades to a JSON file
  let JSON_Trades = JSON.stringify(trades, null, 2);
  fs.writeFile("MACO.json", JSON_Trades, function(err) { //writeFile requires a callback function (error handling) because it is asynchronous
    if (err) {
      console.error('Error writing to file:', err);
    } else {
      console.log('File "MACO.json" has been saved successfully.');
    }
  });
}
// Run the main function
// if (require.main === module) {
   main('data/FNGD_historical_data.json');
// }

module.exports = main;
