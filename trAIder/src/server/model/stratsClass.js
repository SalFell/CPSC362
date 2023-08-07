// stratsClass.js
// Desc: Strategy classes for trading strategies
// Part of Model in MVC
// Part of Strategy Design Pattern
// Part of Adapter Design Pattern

import { readHistoricalDataFile } from "../utils/dataFileFunctions.js";

class IStrategy {
  simulateTrades() {
    throw new Error("Method not implemented.");
  }
}

class MACO extends IStrategy {
   createData(){
    const data = readHistoricalDataFile();
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
    return movingAverages;
   }
}

class BB extends IStrategy {
  createData()
  {
    const data = readHistoricalDataFile();
    let window = 20;
    let deviations = 2;
    const bands = [];

    for (let i = window - 1; i < data.length; i++) {
      const currentPrices = data.slice(i - window + 1, i + 1).map((item) => item.Close);
      //calculate price mean
      const mean = currentPrices.reduce((sum, price) => sum + price, 0) / window;
      const variance = currentPrices.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) / window;
      //calculate standard deviation
      const stdDev = Math.sqrt(variance);
      //calculate upperband
      const upperBand = (mean + deviations * stdDev);
      //calculate lowerband
      const lowerBand = (mean - deviations * stdDev);

      let signal = 'Hold';
      if (data[i].Close > upperBand) {
        signal = 'Sell';
      } else if (data[i].Close < lowerBand) {
        signal = 'Buy';
      }

      //Band values
      bands.push({
        Date: data[i].Date,
        sma: mean,
        signal,
        upperBand,
        lowerBand,
      });
    }
    return bands;
  }
}

class Context{
  constructor(strategy) {
    this.strategy = strategy;
  }

  executeStrategy() {
    return this.strategy.createData();
  }
}
export { IStrategy, MACO, BB, Context };
