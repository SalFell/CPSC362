// src/DataDownloadForm.js

import React, { useState } from 'react';
import axios from 'axios';
import { generateGraph } from './chartScript.js';

const DataDownloadForm = () => {
  const [historicalData, setHistoricalData] = useState([]);
  const [MACOtrades, setMACOTrades] = useState([]);
  const [BBtrades, setBBTrades] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [symbol, setSymbol] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // Download data from Yahoo Finance API
      const historicalResponse = await axios.get(`http://localhost:3000/yahoo-finance/${symbol}`, {
        params: {
          period1: new Date(startDate).getTime() / 1000,
          period2: new Date(endDate).getTime() / 1000,
          interval: '1d',
          events: 'history',
          includeAdjustedClose: true,
        },
      });
      const yfData = historicalResponse.data;

      // Fetch MACO strategy results from the server
      const MACOtradesResponse = await axios.get('http://localhost:3001/yahoo-finance/' + symbol + '/MACO-strategy-results');
      const MACOtradesData = MACOtradesResponse.data;

      // Fetch BB strategy results from the server
      const BBtradesResponse = await axios.get('http://localhost:3001/yahoo-finance/' + symbol + '/BB-strategy-results');
      const BBtradesData = BBtradesResponse.data;

      if (yfData.length > 0) {
        window.alert('Data downloaded successfully.');
        setHistoricalData(yfData);
        setMACOTrades(MACOtradesData);
        setBBTrades(BBtradesData);
        setShowTable(true);
        generateGraph(yfData);
      } else {
        window.alert('No data received from Yahoo Finance API.');
      }
    } catch (error) {
      console.error('Error occurred while downloading data: ' + error.message + ' ' + symbol + ' ' + startDate + ' ' + endDate);
      window.alert('Error occurred during data download. Please try again.');
    }
  };

  // Function to get the maximum allowed date (previous day)
  // Form dates already have validation to prevent future dates but this is an extra precaution. 
  // Data from the future won't be downloaded anyways, but just in case.
  async function getMaxEndDate() {
    const today = new Date();
    today.setDate(today.getDate() - 1);
    return today.toISOString().split('T')[0];
  }

  return (
    <div className="data-download-form" data-testid="data-download-form">
      <form id="dataForm" onSubmit={handleFormSubmit}>
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
          max={getMaxEndDate()}
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
        <label htmlFor="endDate">End Date:</label>
        <input
          type="date"
          id="endDate"
          min="2020-01-31"
          max={getMaxEndDate()}
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
        <button id="submitButton" type="submit">Download</button>
      </form>
      
      <div id="priceChart-container">
        <canvas id="priceChart"></canvas>
      </div>
      
      {showTable && MACOtrades.length > 0 && (
        <div className="MACO-trades-container">
          <h2>Moving Average Cross-over Results</h2>
          <table className="MACO-trades-table">
            <thead>
              <tr>
                <th>Date of Trade</th>
                <th>Trade Type</th>
                <th>Total In Portfolio</th>
                <th>Percent Return</th>
              </tr>
            </thead>
            <tbody>
              {MACOtrades.map((trade, index) => (
                <tr key={index}>
                  <td>{trade.DateOfTrade}</td>
                  <td>{trade.TradeType}</td>
                  <td>{trade.TotalInPortfolio}</td>
                  <td>{trade.PercentReturn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {showTable && BBtrades.length > 0 && (
        <div className="BB-trades-container">
          <h2>Bollinger Bands Results</h2>
          <table className="BB-trades-table">
            <thead>
              <tr>
                <th>Date of Trade</th>
                <th>Trade Type</th>
                <th>Total In Portfolio</th>
                <th>Percent Return</th>
              </tr>
            </thead>
            <tbody>
              {BBtrades.map((trade, index) => (
                <tr key={index}>
                  <td>{trade.DateOfTrade}</td>
                  <td>{trade.TradeType}</td>
                  <td>{trade.TotalInPortfolio}</td>
                  <td>{trade.PercentReturn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {showTable && historicalData.length > 0 && (
        <div className="history-container">
          <h2>Historical Data</h2>
          <table className="history-table">
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
                  <td>{item.Open.toFixed(2)}</td>
                  <td>{item.High.toFixed(2)}</td>
                  <td>{item.Low.toFixed(2)}</td>
                  <td>{item.Close.toFixed(2)}</td>
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
