const fs = require('fs');

// Function to read the JSON file and parse its content
function readHistoricalDataFile(filename) {
  const data = fs.readFileSync(filename);
  return JSON.parse(data);
};

module.exports = readHistoricalDataFile;
