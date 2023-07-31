
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