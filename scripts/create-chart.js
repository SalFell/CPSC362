
import { readJSON } from "./read-json.js";

// Canvas on which chart is created
const ctx = document.getElementById('myChart');

// Read JSON data
const data = await readJSON();

// Change button to say "Update Chart"
function changeText() {
    var button = document.getElementById("chart-button");
    if (button.innerHTML == 'Create Chart') button.innerHTML = 'Update Chart';
}

// Create chart using an array
export function createChart() {
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

    changeText();
    
    return myChart;
}


