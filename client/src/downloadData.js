// src/DataDownloadForm.js

import React, { useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';

const DataDownloadForm = () => {
  const [historicalData, setHistoricalData] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [symbol, setSymbol] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // window.alert('arguments:' + symbol + startDate + endDate);
      const response = await axios.get(
        `http://localhost:3001/yahoo-finance/${symbol}?period1=${new Date(startDate).getTime() / 1000}&period2=${new Date(endDate).getTime() / 1000}&interval=1d&events=history&includeAdjustedClose=true`
      );

      const data = response.data;
      const historicalData = processData(data);

      if (historicalData.length > 0) {
        setHistoricalData(historicalData);
        setShowTable(true);
        generateGraph(historicalData);
        downloadDataAsJson(historicalData, symbol);
      } else {
        window.alert('No data received from Yahoo Finance API.');
      }
    } catch (error) {
      console.error('Error occurred while downloading data:' + error.message + symbol + startDate + endDate);
      window.alert('Error occurred during data download. Please try again.');
    }
  };

  const processData = (data) => {
    if (
      data.chart &&
      data.chart.result &&
      data.chart.result[0].timestamp &&
      data.chart.result[0].indicators &&
      data.chart.result[0].indicators.quote &&
      data.chart.result[0].indicators.quote[0]
    ) {
      const timestamps = data.chart.result[0].timestamp;
      const quotes = data.chart.result[0].indicators.quote[0];

      return timestamps.map((timestamp, index) => ({
        Date: new Date(timestamp * 1000).toISOString().split('T')[0],
        Open: quotes.open[index],
        High: quotes.high[index],
        Low: quotes.low[index],
        Close: quotes.close[index],
        Volume: quotes.volume[index],
      }));
    } else {
      window.alert('No historical price data received from Yahoo Finance API.');
      return [];
    }
  };

  const generateGraph = (historicalData) => {
    const dates = historicalData.map((item) => item.Date);
    const prices = historicalData.map((item) => item.Close);

    const ctx = document.getElementById('priceChart').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [
          {
            label: 'Closing Price',
            data: prices,
            borderColor: 'blue',
            borderWidth: 1,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Date',
            },
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Closing Price',
            },
          },
        },
      },
    });
  };

  const downloadDataAsJson = (data, symbol) => {
    const jsonData = JSON.stringify(data, null, 2);
    const fileName = `${symbol}_historical_data.json`;

    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    window.alert(`Data for ${symbol} downloaded successfully to ${fileName}`);
    URL.revokeObjectURL(url);
  };
  return (
    <div>
    <form id="dataForm" onSubmit ={handleFormSubmit}>
        <label htmlFor="symbol">ETF symbol:</label>
        <select id="symbol" onChange={(e) => setSymbol(e.target.value)} required>
          <option value="">Please select</option>
          <option value="FNGD">FNGD</option>
          <option value="FNGU">FNGU</option>
        </select>
        <label htmlFor="startDate">Start Date:</label>
        <input
          type="date"
          id="startDate"
          min="2020-01-01"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
        <label htmlFor="endDate">End Date:</label>
        <input
          type="date"
          id="endDate"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
        <button id="submitButton" type="submit">Download</button>
      </form>

    {showTable && historicalData.length > 0 && (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Open</th>
                <th>High</th>
                <th>Low</th>
                <th>Close</th>
                <th>Volume</th>
              </tr>
            </thead>
            <tbody>
              {historicalData.map((item) => (
                <tr key={item.Date}>
                  <td>{item.Date}</td>
                  <td>{item.Open}</td>
                  <td>{item.High}</td>
                  <td>{item.Low}</td>
                  <td>{item.Close}</td>
                  <td>{item.Volume}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div id = "priceChart-container">
        <canvas id="priceChart"></canvas>
      </div>
    </div>
  );
};

export default DataDownloadForm;
