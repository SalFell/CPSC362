// Decorator.js
// Part of Model in MVC
// Part of Decorator design pattern
// Decorator class to add extra data to trade data

import { readHistoricalDataFile } from "../utils/dataFileFunctions.js";
import { writeTradeDataFile } from "../utils/dataFileFunctions.js";
import fs from 'fs';

class Decorator {
    addExtraData(trade_data) {
        const historical_data = readHistoricalDataFile();
        console.log((trade_data[0].DateOfTrade).substring(0,10));
        console.log(historical_data[0].Date);
        let test = 0;

        for(let i = 0; i < trade_data.length; i++)
        {
            for(let j = 0; j < historical_data.length; j++)
            {


                if((trade_data[i].DateOfTrade).substring(0,10) == historical_data[j].Date)
                {
                     //open,high,low,volume
                    console.log("found match");
                    test++;
                    console.log(test);
                    trade_data[i].Open = historical_data[j].Open;
                    trade_data[i].High = historical_data[j].High;
                    trade_data[i].Low = historical_data[j].Low;
                    trade_data[i].Volume = historical_data[j].Volume;
                    break;
                }

            }

        }
        return trade_data;
    }
}

//const decorator = new Decorator();
//decorator.addExtraData(JSON.parse(fs.readFileSync('data/MACO.json')));
