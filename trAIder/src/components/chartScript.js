// chartScript.js
// Part of View in MVC

import Chart from 'chart.js/dist/chart.js';

export function generateGraph(historicalData) {
  const dates = historicalData.map((item) => item.Date);
  const prices = historicalData.map((item) => item.Close);

  const ctx = document.getElementById('priceChart');

  // Destroy the previous Chart instance if it exists
  const existingChart = Chart.getChart(ctx);
  if (existingChart) {
    existingChart.destroy();
  }

  // Create a new Chart instance
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: dates,
      datasets: [
        {
          label: 'Closing Price',
          data: prices,
          borderColor: 'white',
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
}
