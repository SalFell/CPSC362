const fs = require('fs');
const BBstrat = require('./BB.js');
const MACO = require('./MACO-Gabe.js');

// Main function to run the program
function stratsMain() {
    const BBresults = BBstrat();
    const trades = MACO();
  
    // Output the trades
     console.log('movAvg Trades:');
    console.log('------------------------------------------------');
    trades.forEach((trade) => {
      console.log(
        `On ${trade.DateOfTrade} --- ${trade.TradeType} 
      Stock price: ${trade.Price}`
      );
    });
  
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
    JSON_Trades = JSON.stringify(BBresults, null, 2);
    fs.writeFile("BB.json", JSON_Trades, function(err) { //writeFile requires a callback function (error handling) because it is asynchronous
      if (err) {
        console.error('Error writing to file:', err);
      } else {
        console.log('File "BB.json" has been saved successfully.');
      }
    });
  
    JSON_Trades = JSON.stringify(trades, null, 2);
    fs.writeFile("MACO.json", JSON_Trades, function(err) { //writeFile requires a callback function (error handling) because it is asynchronous
      if (err) {
        console.error('Error writing to file:', err);
      } else {
        console.log('File "MACO.json" has been saved successfully.');
      }
    });
  
  }

module.exports = stratsMain;