// const { Chart } = await import('chart.js');

// Update the chart with new data from data.json
function updateChart() {
    // Read the JSON
    async function fetchJSON() {
        const requestUrl = '../data.json';
        const response = await fetch(requestUrl);
        const datapoints = await response.json();
        return datapoints;
    }

    // Change chart labels and datasets to match JSON once done reading
    // Note: Need to change to match what we want to show from stock data
    fetchJSON().then(datapoints => {
        // Update "year" as x-axis
        // Create year array equal array from data.json
        const year = datapoints.map(function(
            index) {
                return index.year;
        });
        // Set chart labels to year array
        myChart.config.data.labels = year;
        // Update chart
        myChart.update();

        // Update "count" as y-axis
        // Create count array equal count from data.json
        const count = datapoints.map(function(
            index) {
                return index.count;
        });
        // Set chart dataset to year array
        myChart.config.data.datasets[0].data = count;
        // Update chart
        myChart.update();

        // Change label to "Ticker" from "-"
        myChart.config.data.datasets[0].label = 'Ticker';
        myChart.update();
    })
};

// Setup
const data = {
    labels: [],
    datasets: [{
        label: '-',
        data: [],
        borderColor: '#FFFFFF'
    }]
}

// Config
const config = {
    type: 'line',
    data,
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
};

// Render init block
const myChart = new Chart(
    document.getElementById('myChart'),
    config
);


document.getElementById('chart-button').onclick = function() {updateChart()};
