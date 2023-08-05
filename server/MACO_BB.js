class IStrategy {
    simulateTrades(data) {
        throw new Error("Method not implemented.");
    }
}
//module.exports = IStrategy;
export  { IStrategy };

class MACO extends IStrategy {
    /*
    simulateTrades(data) {
       
         //when the days price goes above or below the moving average, buy or sell
         //first generate moving average, then compare to price
         const trades = [];
         let cashReserve = 10000;
         let cashForTrade = 90000
         let stockAmount = 0;
         let sum = 0;
         let movingAverage;
         let previousMovingAverage;
       
         for(let i = 0; i < 19; i++)
         {
           sum += data[i].Open;
         }
         movingAverage = sum/20;
         stockAmount = cashForTrade/data[19].Open;
       
         //all trades will be $10,000
         for (let i = 20; i < data.length - 1; i++) {
           previousMovingAverage = movingAverage;
           movingAverage = (movingAverage*20 - data[i-20].Open + data[i].Open)/20;
       
           if(data[i].Open > movingAverage && data[i-1].Open < previousMovingAverage)
           {
             //buy
             const price = data[i].Open;
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
               Price: price,
               TradeType: "Buy",
               CashReserve: cashReserve.toFixed(2),
               StockAmount: stockAmount.toFixed(2),
               MoneyInStock: (stockAmount*price).toFixed(2),
               TotalInPortfolio: (cashReserve + stockAmount*price).toFixed(2),
             });
           }
           else if (data[i].Open < movingAverage && data[i-1].Open > previousMovingAverage)
           {
             //sell
             const price = data[i].Open;
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
               Price: price,
               TradeType: "Sell",
               CashReserve: cashReserve.toFixed(2),
               StockAmount: stockAmount.toFixed(2),
               MoneyInStock: (stockAmount*price).toFixed(2),
               TotalInPortfolio: (cashReserve + stockAmount*price).toFixed(2),
             });
           }
       
         }
         return trades;
       }
      */
    simulateTrades(data) {
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
      
          //movingAverage = (movingAverage*lookbackPeriod - data[i-lookbackPeriod].Close + data[i].Close)/20;
          console.log(data[i].Date);
          console.log("Moving Average:");
          console.log(movingAverage);
          console.log("Close Price:");
          console.log(data[i].Close);
          console.log("\n");
      
         
      
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
              TotalInPortfolio: (cashReserve + stockAmount*price),
              //movingAverage: movingAverage
              PercentReturn: (((cashReserve + stockAmount*price)/1000)-100)
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
              TotalInPortfolio: (cashReserve + stockAmount*price),
              //movingAverage: movingAverage
              PercentReturn: ((cashReserve + stockAmount*price)/100000)*100
            });
          }
      
        }
        return trades;
    }
}
//module.exports = MACO;

export  { MACO };

class BB extends IStrategy {
    simulateTrades(data) {
        let window = 20;
        let deviations = 2;
        const bands = [];
        const trades = [];
        let cashReserve = 100000;
        let stockAmount = 0;

        //if(data == null)
        //{
        //}
      
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
            const stockToBuy = Math.floor(cashReserve / price);
            stockAmount += stockToBuy;
            cashReserve -= stockToBuy * price;
      
            trades.push({
              DateOfTrade: currentDate.toISOString(),
              //Price: price.toFixed(2),
              TradeType: 'Buy',
              //CashReserve: cashReserve.toFixed(2),
              //StockAmount: stockAmount.toFixed(2),
              //MoneyInStock: (stockAmount * price).toFixed(2),
              TotalInPortfolio: (cashReserve + stockAmount * price),
              PercentReturn: (((cashReserve + stockAmount*price)/1000)-100)
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
              //CashReserve: cashReserve.toFixed(2),
              //StockAmount: stockAmount.toFixed(2),
              //MoneyInStock: '0.00',
              TotalInPortfolio: cashReserve.toFixed(2),
              PercentReturn: (((cashReserve + stockAmount*price)/1000)-100)
            });
          }
        }
      
        return trades;
      }
}
//module.exports = BB;

export { BB };

class Context{
  constructor(strategy) {
      this.strategy = strategy;
    }
  
    executeStrategy(data) {
      return this.strategy.simulateTrades(data);
    } 
}
export { Context };


