const { expect } = require('chai');
const { simulateTrades } = require('../MACO-Gabe.js');
const readHistoricalDataFile = require('../readData.js');

console.log("This program tests if modules are able to function with one another");

describe('readHistoricalDataFile()', () => {
  it('Should read given data JSON file and turn it into an array for other modules to use', () => {

    // Call the function to read the historical data json
    const data = readHistoricalDataFile('../data/historical_data.json');

    // Assertions
    expect(data).to.be.an('array');
  });
});

describe('simulateTrades()', () => {
  it('Should receive a valid array from the data retrieval module \n If the array is valid, trading calculations are performed\n', () => {

    // Call the function to simulate trades
    const data = readHistoricalDataFile('../data/historical_data.json');
    const trades = simulateTrades(data);

    // Assertions
    expect(trades).to.be.an('array');
    trades.forEach((trade) => {
      expect(trade).to.have.property('DateOfTrade');
      expect(trade).to.have.property('Price');
      expect(trade).to.have.property('TradeType');
      expect(trade).to.have.property('CashReserve');
      expect(trade).to.have.property('StockAmount');
      expect(trade).to.have.property('MoneyInStock');
      expect(trade).to.have.property('TotalInPortfolio');
    });
  });

  it('Checks if the data received make sense\n    Is CashReserve,MoneyInStock,&TotalInPortfolio > 0?', () => {

    // Call the function to simulate trades
    const data = readHistoricalDataFile('../data/historical_data.json');
    const trades = simulateTrades(data);

    // Assertions
    expect(trades).to.be.an('array');
    trades.forEach((trade) => {
      expect(trade.CashReserve).to.be.at.least(0);
      expect(trade.MoneyInStock).to.be.at.least(0.1);
      expect(trade.TotalInPortfolio).to.be.at.least(0.1);
    });
  });

  // Add more specific test cases if needed
});
