import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class HistoricalDataService {

  constructor() { }

  async downloadHistoricalData(symbol: string, date1: string, date2: string) {
    const startDate = new Date(date1);
    const endDate = new Date(date2);

    const url = `https://query1.finance.yahoo.com/v7/finance/download/${symbol}?period1=${startDate.getTime() / 1000}&period2=${endDate.getTime() / 1000}&interval=1d&events=history`;

    try {
      const response = await axios.get(url);
      const rows = response.data.trim().split('\n').slice(1);
      const jsonData = [];

      for (const row of rows) {
        const [date, open, high, low, close, , volume] = row.split(',');

        const formattedData = {
          Date: date,
          Open: parseFloat(open),
          High: parseFloat(high),
          Low: parseFloat(low),
          Close: parseFloat(close),
          Volume: parseInt(volume),
        };

        jsonData.push(formattedData);
      }

      const dataKey = `${symbol}_historical_data`;
      localStorage.setItem(dataKey, JSON.stringify(jsonData));
      console.log(`Historical data for ${symbol} downloaded and saved in local storage with key: ${dataKey}`);
    } catch (error) {
      console.error('An error occurred while downloading the data:', error);
    }
  }
}
