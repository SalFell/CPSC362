// DataDownloadForm.test.js

// import React from 'react';
// import { expect } from 'chai';
// import { render, screen, waitFor } from '@testing-library/react';
// import { JSDOM } from 'jsdom';
// import fetch from 'node-fetch';
// import DataDownloadForm from './DataDownloadForm';

// convert above to ES modules
const React = require('react');
const { expect } = require('chai');
const { render, screen, waitFor } = require('@testing-library/react');
const { JSDOM } = require('jsdom');
const fetch = require('node-fetch');
const DataDownloadForm = require('./downloadData');


describe('DataDownloadForm Integration Test', () => {
  // Set up the JSDOM environment
  const jsdom = new JSDOM('<!doctype html><html><body></body></html>', {
    url: 'http://localhost:3000',
  });
  global.window = jsdom.window;
  global.document = jsdom.window.document;
  global.fetch = fetch;

  it('should download data and display it in a table and chart when the form is submitted', async () => {
    // Render the DataDownloadForm component
    render(DataDownloadForm);

    // Simulate user input in the form fields
    const symbolInput = screen.getByLabelText('ETF symbol:');
    const startDateInput = screen.getByLabelText('Start Date:');
    const endDateInput = screen.getByLabelText('End Date:');

    // Set the input values
    symbolInput.value = 'FNGD';
    startDateInput.value = '2023-01-01';
    endDateInput.value = '2023-01-31';

    // Simulate form submission
    const form = screen.getByRole('form');
    form.dispatchEvent(new Event('submit', { cancelable: true }));

    // Wait for data to be downloaded and the table to be displayed
    await waitFor(() => {
      const table = screen.getByRole('table');
      const chart = screen.getByRole('figure');
      expect(table).to.exist;
      expect(chart).to.exist;
    });
  });
});
