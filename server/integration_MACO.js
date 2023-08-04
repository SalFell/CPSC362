const { expect } = require('chai');
const { simulateTrades } = require('./MACO-Gabe.js');
const { readHistoricalDataFile } = require('./HistoricalDataFile.js');
console.log("This program tests the validity of MACO.js");

describe('downloadScript.readHistoricalDataFile()', () => {
  it('Should take the historical data JSON file and turn it into an array', () => {
    const data = readHistoricalDataFile('data/historical_data.json');
    expect(data).to.be.an('array');
  });
});
describe('simulateTrades()', () => {
  it('should return an array of trades. Checks for the inclusion of the following data fields:\n    DataOfTrade\n    Price\n    TradeType\n    CashReserve\n    StockAmount\n    MoneyInStock\n    TotalInPortfolio\n\n', () => {

    // Call the function to simulate trades
    const data = readHistoricalDataFile('data/historical_data.json');
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
  it('Checks if Numbers Make Sense\n    Is CashReserve,MoneyInStock,&TotalInPortfolio > 0?', () => {

    // Call the function to simulate trades
    const data = readHistoricalDataFile('data/historical_data.json');
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
