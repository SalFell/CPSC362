const fs = require('fs');

// Function to read the JSON file and parse its content
function readHistoricalDataFile() {
  const data = fs.readFileSync('./data/historical_data.json', 'utf8');
  return JSON.parse(data);
};

module.exports = readHistoricalDataFile;
