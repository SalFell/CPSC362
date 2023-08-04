//const IStrategy = require('./IStrategy');
//const MACO = require('./MACO');
//const BB = require('./BB');

import fs from 'fs';
import { IStrategy } from './MACO_BB.js';
import { MACO } from './MACO_BB.js';
import { BB } from './MACO_BB.js';
import { Context } from './MACO_BB.js';
import { writeTradeDataFile } from './DataFileFunctions.js';
import { readHistoricalDataFile } from './DataFileFunctions.js';

const historicalData = readHistoricalDataFile();

const context = new Context(new MACO());
//console.log('MACO:' + context.executeStrategy(historicalData));
//console.log('------------------------------------------------');
writeTradeDataFile(context.executeStrategy(historicalData), 'MACO');
//context.strategy = new BB();
//console.log('BB:' + context.executeStrategy('data/historical_data.json'));
