import fs from 'fs';

let writeInProgress = false;

// Function to read the JSON file and parse its content
const readHistoricalDataFile = function () {
  const data = fs.readFileSync('./model/data/historical_data.json');
  return JSON.parse(data);
};

const writeTradeDataFile = (data, filename) => {
  if (writeInProgress) {
    return Promise.reject('Write operation in progress. Try again later.');
  }

  writeInProgress = true;

  return new Promise((resolve, reject) => {
    fs.writeFile("../server/model/data/" + filename + ".json", JSON.stringify(data, null, 2), function (err) {
      writeInProgress = false;

      if (err) {
        console.error('Error writing to file:', err);
        reject(err);
      } else {
        console.log('File ' + filename + '.json has been saved successfully.');
        resolve();
      }
    });
  });
};

const readMACOResultsFile = () => {
  if (writeInProgress) {
    return Promise.reject('Write operation in progress. Try again later.');
  }

  return new Promise((resolve, reject) => {
    const data = fs.readFileSync('./model/data/MACO.json');
    if (data) {
      resolve(JSON.parse(data));
    } else {
      reject('Error reading MACO results file');
    }
  });
};

const readBBResultsFile = () => {
  if (writeInProgress) {
    return Promise.reject('Write operation in progress. Try again later.');
  }

  return new Promise((resolve, reject) => {
    const data = fs.readFileSync('./model/data/BB.json');
    if (data) {
      resolve(JSON.parse(data));
    } else {
      reject('Error reading BB results file');
    }
  });
};

export { readHistoricalDataFile, writeTradeDataFile, readMACOResultsFile, readBBResultsFile };
