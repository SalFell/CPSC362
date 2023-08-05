//const fs = require('fs');
import fs from 'fs';

// Function to read the JSON file and parse its content
const readHistoricalDataFile = function() {
  const data = fs.readFileSync('../data/historical_data.json');
  return JSON.parse(data);
};
export { readHistoricalDataFile };

const writeTradeDataFile = function(data, filename) {
  fs.writeFile("data/"+filename+".json", JSON.stringify(data,null,2), function(err) { //writeFile requires a callback function (error handling) because it is asynchronous
    if (err) {
      console.error('Error writing to file:', err);
    } else {
      console.log('File "'+filename+'.json" has been saved successfully.');
    }
  });
  //fs.writeFile('data/'+filename+'_trades.json', JSON.stringify(data));
}
export { writeTradeDataFile };


