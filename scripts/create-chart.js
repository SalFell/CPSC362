
import { readJSON } from "./read-json.js";

// Change button to say "Update Chart"
function changeText() {
    var button = document.getElementById("chart-button");
    if (button.innerHTML == 'Create Chart') button.innerHTML = 'Update Chart';
}

const data = await readJSON();

// Create chart using an array
export async function createChart() {
    let chartStatus = Chart.getChart('myChart');
    if (chartStatus != undefined) {
        chartStatus.destroy();
    }

    var chartCanvas = document.getElementById('myChart');

    const chartInstance = new Chart(
        chartCanvas,
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

    changeText();
}