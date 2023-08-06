import { readHistoricalDataFile } from "../utils/dataFileFunctions.js";

class IStrategy {
  simulateTrades() {
    throw new Error("Method not implemented.");
  }
}

class MACO extends IStrategy {
  /*
  simulateTrades() {
    const data = readHistoricalDataFile();
    //when the days price goes above or below the moving average, buy or sell
    //first generate moving average, then compare to price
    const trades = [];
    let cashReserve = 10000;
    let cashForTrade = 90000
    let stockAmount = 0;
    let sum = 0;
    let movingAverage;
    let lookbackPeriod = 20; //20 day moving average
    let previousMovingAverage;

    for(let i = 0; i < 19; i++)
    {
      sum += data[i].Close;
    }
    movingAverage = sum/lookbackPeriod;
    sum = 0;
    stockAmount = cashForTrade/data[lookbackPeriod].Close;

    //all trades will be $10,000
    for (let i = lookbackPeriod; i < data.length - 1; i++) {


      previousMovingAverage = movingAverage;

      //Add past lookbackperiod number of days of prices
      for(let j = i - 19; j <= i; j++){
        sum += data[j].Close;
      }
      //Divide that by the lookbackperiod
      movingAverage = sum/lookbackPeriod;
      sum = 0;

      if(data[i].Close > movingAverage && data[i-1].Close < previousMovingAverage)
      {
        //buy
        const price = data[i].Close;
        const date = new Date(data[i].Date);
        if(cashReserve > 0)
        {
          stockAmount += 10000/price;
          cashReserve -= 10000;
        }
        else
        {
          console.log("Logic Problem! out of cash reserves");
        }

        trades.push({
          DateOfTrade: date.toISOString(),
          //Price: price,
          TradeType: "Buy",
          //CashReserve: cashReserve,
          //StockAmount: stockAmount,
          //MoneyInStock: (stockAmount*price),
          TotalInPortfolio: (cashReserve + stockAmount*price).toFixed(2),
          //movingAverage: movingAverage
          PercentReturn: (((cashReserve + stockAmount*price)/1000)-100).toFixed(2)
        });
      }
      else if (data[i].Close < movingAverage && data[i-1].Close > previousMovingAverage)
      {
        //sell
        const price = data[i].Close;
        const date = new Date(data[i].Date);
        if(stockAmount > 0)
        {
          stockAmount -= 10000/price;
          cashReserve += 10000;
        }
        else
        {
          console.log("Logic Problem! out of stock");
        }

        trades.push({
          DateOfTrade: date.toISOString(),
          //Price: price,
          TradeType: "Sell",
          //CashReserve: cashReserve,
          //StockAmount: stockAmount,
          //MoneyInStock: (stockAmount*price),
          TotalInPortfolio: (cashReserve + stockAmount*price).toFixed(2),
          //movingAverage: movingAverage
          PercentReturn: (((cashReserve + stockAmount*price)/100000)*100).toFixed(2)
        });
      }
    }
    return trades;
  }
  */
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
  /*
  simulateTrades() {
    const data = readHistoricalDataFile();
    let window = 20;
    let deviations = 2;
    const bands = [];
    const trades = [];
    let cashReserve = 100000;
    let stockAmount = 0;

    for (let i = window - 1; i < data.length; i++) {
      const currentPrices = data.slice(i - window + 1, i + 1).map((item) => item.Close);
      const mean = currentPrices.reduce((sum, price) => sum + price, 0) / window;
      const variance = currentPrices.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) / window;
      const stdDev = Math.sqrt(variance);
      //calculate upperband
      const upperBand = (mean + deviations * stdDev);
      //calculate lowerband
      const lowerBand = (mean - deviations * stdDev);

      // Determine the signal based on Bollinger Bands
      let signal = 'Hold';
      if (data[i].Close > upperBand) {
        signal = 'Sell';
      } else if (data[i].Close < lowerBand) {
        signal = 'Buy';
      }

      bands.push({
        Date: data[i].Date,
        sma: mean,
        upperBand,
        lowerBand,
        signal,
      });

      const currentDate = new Date(data[i].Date);
      if (signal === 'Buy') {
        // Buy
        const price = data[i].Close;
        const date = new Date(data[i].Date);
         if(cashReserve > 0)
         {
           stockAmount += 10000/price;
           cashReserve -= 10000;
         }

        trades.push({
          DateOfTrade: currentDate.toISOString(),
          Price: price.toFixed(2),
          TradeType: 'Buy',
          CashReserve: cashReserve.toFixed(2),
          StockAmount: stockAmount.toFixed(2),
          MoneyInStock: (stockAmount * price).toFixed(2),
          TotalInPortfolio: (cashReserve + stockAmount * price).toFixed(2),
          PercentReturn: (((cashReserve + stockAmount*price)/1000)-100).toFixed(2)
        });
      } else if (signal === 'Sell') {
        // Sell
        const price = data[i].Close;
        const date = new Date(data[i].Date);
         if(cashReserve > 0)
         {
           stockAmount += 10000/price;
           cashReserve -= 10000;
         }

        trades.push({
          DateOfTrade: currentDate.toISOString(),
          Price: price.toFixed(2),
          TradeType: 'Sell',
          CashReserve: cashReserve.toFixed(2),
          StockAmount: stockAmount.toFixed(2),
          MoneyInStock: '0.00',
          TotalInPortfolio: cashReserve.toFixed(2),
          PercentReturn: (((cashReserve + stockAmount*price)/100000)*100).toFixed(2)
        });
      }
    }
    return trades;
  }
  */
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
