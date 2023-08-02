import React from 'react';

const BackTestResults = ({ results }) => {
  // Implement how you want to display the back-test results here
  return (
    <div>
      <h2>Back-Test Results</h2>
      {/* Display the back-test results */}
      {/* For example, you can render the results in a table */}
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Trade Type</th>
            <th>Price</th>
            {/* Add more columns as needed */}
          </tr>
        </thead>
        <tbody>
          {results.map((trade, index) => (
            <tr key={index}>
              <td>{trade.DateOfTrade}</td>
              <td>{trade.TradeType}</td>
              <td>{trade.Price}</td>
              {/* Add more cells for other data */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BackTestResults;
