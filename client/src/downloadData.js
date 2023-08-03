// src/DataDownloadForm.js

import React, { useState } from 'react';
import axios from 'axios';
import { generateGraph } from './chartScript';

const DataDownloadForm = () => {
  const [historicalData, setHistoricalData] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [symbol, setSymbol] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get(`http://localhost:3000/yahoo-finance/${symbol}`, {
      params: {
        period1: new Date(startDate).getTime() / 1000,
        period2: new Date(endDate).getTime() / 1000,
        interval: '1d',
        events: 'history',
        includeAdjustedClose: true,
      },
    });

      const data = response.data;

      if (data.length > 0) {
        window.alert('Data downloaded successfully.');
        setHistoricalData(data);
        setShowTable(true);
        generateGraph(data);
      } else {
        window.alert('No data received from Yahoo Finance API.');
      }
    } catch (error) {
      console.error('Error occurred while downloading data:' + error.message + symbol + startDate + endDate);
      window.alert('Error occurred during data download. Please try again.');
    }
  };

  return (
    <div className="data-download-form" data-testid="data-download-form">
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

      <div id = "priceChart-container">
        <canvas id="priceChart"></canvas>
      </div>

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
    </div>
  );
};

export default DataDownloadForm;
