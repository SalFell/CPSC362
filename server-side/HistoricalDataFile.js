const fs = require('fs');

// Function to read the JSON file and parse its content
exports.readHistoricalDataFile = function(filename) {
  const data = fs.readFileSync(filename);
  return JSON.parse(data);
};



