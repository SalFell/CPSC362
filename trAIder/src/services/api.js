// src/services/api.js
import axios from 'axios';

const BASE_URL = 'http://localhost:3001'; // Assuming the Node.js server is running on port 3001

const api = axios.create({
  baseURL: BASE_URL,
});

// Function to download data from the server based on user input
export const downloadData = async (symbol, startDate, endDate) => {
  try {
    const response = await api.get('/yahoo-finance', {
      params: {
        period1: new Date(startDate).getTime() / 1000,
        period2: new Date(endDate).getTime() / 1000,
        interval: '1d',
        events: 'history',
        includeAdjustedClose: true,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error while downloading data:', error);
    throw new Error('Failed to download data from the server.');
  }
};

// Function to fetch backtest results from the server based on user input
export const fetchBackTestResults = async (data) => {
  try {
    const response = await api.post('/backtest', data);
    return response.data;
  } catch (error) {
    console.error('Error while fetching backtest results:', error);
    throw new Error('Failed to fetch backtest results from the server.');
  }
};
