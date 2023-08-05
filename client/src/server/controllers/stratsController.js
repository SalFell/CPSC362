
import { readMACOResultsFile, readBBResultsFile } from '../utils/dataFileFunctions.js';
import { MACO, BB, Context } from '../model/stratsClass.js';
import { writeTradeDataFile } from '../utils/dataFileFunctions.js';

// Function to get trading strategy results
async function getMACOResults(req, res){
    try{
        //MACO
        let context = new Context(new MACO());
        let result = context.executeStrategy();
        await writeTradeDataFile(result, 'MACO');

        // Read MACO results file
        const strategyResults = await readMACOResultsFile();
        res.json(strategyResults);
    } catch (error) {
        console.error('Error occurred while getting MACO results:', error.message);
        res.status(500).json({ error: 'Error occurred during data download. Please try again.' });
    }
};
  
// Function to get trading strategy results
async function getBBResults(req, res){
    try{
        // Call BB strategy
        let context = new Context(new BB());
        let result = context.executeStrategy();
        await writeTradeDataFile(result, 'BB');

        // Read BB results file
        const strategyResults = await readBBResultsFile();
        res.json(strategyResults);
    } catch (error) {
        console.error('Error occurred while getting BB results:', error.message);
        res.status(500).json({ error: 'Error occurred during data download. Please try again.' });
    }
};
  
export { getMACOResults, getBBResults };