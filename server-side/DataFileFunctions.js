//const fs = require('fs');
import fs from 'fs';

// Function to read the JSON file and parse its content
const readHistoricalDataFile = function() {
  const data = fs.readFileSync('data/historical_data.json');
  return JSON.parse(data);
};
export { readHistoricalDataFile };

const writeTradeDataFile = function(data, filename) {
  fs.writeFileSync('data/'+filename+'_trades.json', JSON.stringify(data));
}
export { writeTradeDataFile };


