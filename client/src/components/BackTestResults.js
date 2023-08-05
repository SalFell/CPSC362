import React from 'react';

function BackTestResults({ results }) {
  return (
    <div>
      <h2>Back-Test Results</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Trade Type</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {results.map((trade, index) => (
            <tr key={index}>
              <td>{trade.DateOfTrade}</td>
              <td>{trade.TradeType}</td>
              <td>{trade.Price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BackTestResults;
