
// Canvas on which chart is created
const ctx = document.getElementById('myChart');

// Create chart using an array
export function createChart(data) {
    const myChart = new Chart(
        ctx,
        {
        type: 'line',
        data: {
            labels: data.map(row => row.year),
            datasets: [
            {
                label: 'Trading Data',
                data: data.map(row => row.count),
                borderColor: '#FFFFFF',
                
            }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
        }
    );
    return myChart;
}


