// DataDownloadForm.test.js

// const { expect } = require('chai');
// const { render, screen, fireEvent } = require('@testing-library/react');
// const axios = require('axios');
// const { generateGraph } = require('./chartScript');
// const DataDownloadForm = require('./downloadData');

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import { generateGraph } from './chartScript';
import DataDownloadForm from './downloadData';

jest.mock('axios', () => {
  return {
    get: jest.fn(() =>
      Promise.resolve({
        data: [
          // Mock data you want to return from the API call
          // For example:
          { Date: '2023-01-01', Open: 100, High: 105, Low: 99, Close: 102, Volume: 10000 },
          { Date: '2023-01-02', Open: 102, High: 110, Low: 101, Close: 108, Volume: 12000 },
        ],
      })
    ),
  };
});

jest.mock('./chartScript', () => {
  return {
    generateGraph: jest.fn(),
  };
});

describe('DataDownloadForm Integration Test', () => {
  it('should download data and display it in a table and chart when the form is submitted', async () => {
    render(DataDownloadForm);

    const symbolInput = screen.getByTestId('ETF symbol:');
    const startDateInput = screen.getByLabelText('Start Date:');
    const endDateInput = screen.getByLabelText('End Date:');
    const form = screen.getByTestId('data-download-form');

    // Set the input values
    fireEvent.change(symbolInput, { target: { value: 'FNGD' } });
    fireEvent.change(startDateInput, { target: { value: '2023-01-01' } });
    fireEvent.change(endDateInput, { target: { value: '2023-01-31' } });

    // Simulate form submission
    fireEvent.submit(form);

    // Wait for data to be downloaded and the table to be displayed
    await waitFor(() => {
      const table = screen.getByRole('table');
      const chart = screen.getByRole('figure');
      expect(table).to.exist;
      expect(chart).to.exist;
    });

    // Check if axios.get was called with the correct parameters
    expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/yahoo-finance/FNGD', {
      params: {
        period1: 1672531200,
        period2: 1675132800,
        interval: '1d',
        events: 'history',
        includeAdjustedClose: true,
      },
    });

    // Check if generateGraph was called with the correct data
    expect(generateGraph).toHaveBeenCalledWith([
      { Date: '2023-01-01', Open: 100, High: 105, Low: 99, Close: 102, Volume: 10000 },
      { Date: '2023-01-02', Open: 102, High: 110, Low: 101, Close: 108, Volume: 12000 },
    ]);
  });
});
