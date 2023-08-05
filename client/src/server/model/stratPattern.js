// import fs from 'fs';
import { MACO, BB, Context } from './stratsClass.js';
import { writeTradeDataFile, readHistoricalDataFile } from '../../../../server/utils/dataFileFunctions.js';

const historicalData = readHistoricalDataFile();

//MACO
let context = new Context(new MACO());
let result = context.executeStrategy(historicalData);
writeTradeDataFile(result, 'MACO');

//BB
context = new Context(new BB());
result = context.executeStrategy(historicalData);
writeTradeDataFile(result, 'BB');