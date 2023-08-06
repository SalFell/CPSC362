// Adapter.js
// Part of Adapter Design Pattern
// Part of Model in MVC

import { MACO, BB, Context } from '../model/stratsClass.js';
import { readHistoricalDataFile } from "../utils/dataFileFunctions.js";

// Function to get trading strategy results
class Adapter{
    //My code is in here
    MACO_backtest(){
      let data = readHistoricalDataFile();
      let context = new Context(new MACO());
      let result = context.executeStrategy();

      let cashReserve = 10000;
      let cashForTrade = 90000
      let stockAmount = 0;
      let trades = [];
      stockAmount = cashForTrade / data[19].Close;

      for(let i = 0; i < data.length - 1; i++)
      {
          if(result[i].movingAverage > data[i].Close && result[i-1].movingAverage < data[i-1].Close)
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
                  TradeType: "Buy",
                  TotalInPortfolio: (cashReserve + stockAmount*price).toFixed(2),
                  PercentReturn: (((cashReserve + stockAmount*price)/1000)-100).toFixed(2) + '%'
                });
          }
          else if (result[i].movingAverage < data[i].Close && result[i-1].movingAverage > data[i-1].Close)
          {
              //sell
              const price = data[i].Close;
              const date = new Date(data[i].Date);
              if(stockAmount > 0)
              {
                  cashReserve += 10000;
                  stockAmount -= 10000/price;
              }
              else
              {
                  console.log("Logic Problem! out of stock");
              }
              trades.push({
                  DateOfTrade: date.toISOString(),
                  TradeType: "Sell",
                  TotalInPortfolio: (cashReserve + stockAmount*price).toFixed(2),
                  PercentReturn: (((cashReserve + stockAmount*price)/1000)-100).toFixed(2) + '%'
                });
          }
      }
      return trades;
    }

    BB_backtest(){
      let data = readHistoricalDataFile();
      let context = new Context(new BB());
      let bands = context.executeStrategy();
      const trades = [];
      let cashReserve = 100000;
      let stockAmount = 0;

      for (let i = 0; i < bands.length; i++) {
          const currentDate = new Date(bands[i].Date);
          const signal = bands[i].signal;
          if (signal === 'Buy') {
            // Buy
            const price = data[i].Close;
            const stockToBuy = Math.floor(cashReserve / price);
            stockAmount += stockToBuy;
            cashReserve -= stockToBuy * price;

            trades.push({
              DateOfTrade: currentDate.toISOString(),
              //Price: price.toFixed(2),
              TradeType: 'Buy',
              TotalInPortfolio: (cashReserve + stockAmount * price).toFixed(2),
              PercentReturn: (((cashReserve + stockAmount * price) / 1000) - 100).toFixed(2) + '%'
          });
          } else if (signal === 'Sell') {
            // Sell
            const price = data[i].Close;
            cashReserve += stockAmount * price;
            stockAmount = 0;

          trades.push({
              DateOfTrade: currentDate.toISOString(),
              //Price: price.toFixed(2),
              TradeType: 'Sell',
              TotalInPortfolio: cashReserve.toFixed(2),
              PercentReturn: (((cashReserve + stockAmount * price) / 1000) - 100).toFixed(2) + '%'
          });
          }
      }
      return trades;
    }
}
export { Adapter };
