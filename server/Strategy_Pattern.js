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

//MACO
let context = new Context(new MACO());
let result = context.executeStrategy(historicalData);
writeTradeDataFile(result, 'MACO');

//BB
context = new Context(new BB());
result = context.executeStrategy(historicalData);
writeTradeDataFile(result, 'BB');
