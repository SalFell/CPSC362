// DataDownloadForm.test.js

import React from 'react';
import { mount } from 'enzyme';
import DataDownloadForm from './downloadData';

// This configures Enzyme to work with React 16
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('DataDownloadForm Integration Test', () => {
  it('should download data and display it in a table and chart when the form is submitted', async () => {
    // Mount the DataDownloadForm component
    const wrapper = mount(<DataDownloadForm />);

    // Simulate user input in the form fields
    const symbolInput = wrapper.find('#symbol');
    symbolInput.simulate('change', { target: { value: 'FNGD' } });

    const startDateInput = wrapper.find('#startDate');
    startDateInput.simulate('change', { target: { value: '2023-01-01' } });

    const endDateInput = wrapper.find('#endDate');
    endDateInput.simulate('change', { target: { value: '2023-01-31' } });

    // Simulate form submission
    const form = wrapper.find('form');
    form.simulate('submit', { preventDefault: () => {} });

    // Wait for data to be downloaded and the table to be displayed
    await new Promise((resolve) => setTimeout(resolve, 1000)); // You may need to adjust the time based on your API response time

    // Assert that the table is displayed
    const table = wrapper.find('.data-table');
    expect(table.exists()).toBe(true);

    // Assert that the chart is displayed
    const chart = wrapper.find('#priceChart');
    expect(chart.exists()).toBe(true);
  });
});
