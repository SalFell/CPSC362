import { expect } from 'chai';
import { MACO, Context } from '../model/stratsClass.js';
import { readHistoricalDataFile } from '../utils/dataFileFunctions.js';
console.log("This program tests the validity of MACO.js");

describe('downloadScript.readHistoricalDataFile()', () => {
  it('Should take the historical data JSON file and turn it into an array', () => {
    const data = readHistoricalDataFile();
    expect(data).to.be.an('array');
  });
});

describe('MACO()', () => {
  it('Should have the same moving averages as calculated here in this test', () => {
    const data = readHistoricalDataFile();
    expect(data).to.be.an('array');
    const macoObj = new MACO();
    //result to test
    const result = macoObj.createData(data);

    let sum = 0;
    let movingAverage;
    let lookbackPeriod = 20; //20 day moving average
    let movingAverages = [];
    let date;

    for(let i = 0; i <= 19; i++)
    {
      sum += data[i].Close;
      movingAverage = data[i].Close;
      date = new Date(data[i].Date);
      movingAverages.push({
        Date: date,
        movingAverage: movingAverage
      });
    }
    sum = 0;

    for (let i = lookbackPeriod; i < data.length; i++) {

      //Add past lookbackperiod number of days of prices
      for(let j = i - 19; j < i; j++){
        sum += data[j].Close;
      }
      //Divide that by the lookbackperiod
      date = new Date(data[i].Date);
      movingAverage = sum/lookbackPeriod;
      movingAverages.push({
        Date: date,
        movingAverage: movingAverage
      });
      sum = 0;
    }

    expect(result).to.eql(movingAverages);

  });
});
