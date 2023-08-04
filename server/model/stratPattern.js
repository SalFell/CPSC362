import fs from 'fs';
import { IStrategy, MACO, BB, Context } from './stratsClass.js';
import { writeTradeDataFile, readHistoricalDataFile } from '../utils/dataFileFunctions.js';

const historicalData = readHistoricalDataFile();

const context = new Context(new MACO());
const result = context.executeStrategy(historicalData);
//console.log('MACO:' + context.executeStrategy(historicalData));
//console.log('------------------------------------------------');
writeTradeDataFile(result, 'MACO');
//context.strategy = new BB();
//console.log('BB:' + context.executeStrategy('data/historical_data.json'));