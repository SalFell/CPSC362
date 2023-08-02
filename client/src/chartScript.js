// chartUtils.js
import Chart from 'chart.js/auto';

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
};

export default generateGraph;
