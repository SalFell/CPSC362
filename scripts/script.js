// Import Functions
import { createChart } from "./create-chart.js";

// On Click Functions
// Use button text as state
var created = false;
// Create chart, changes button to call updateChart() after first click
document.getElementById("chart-button").onclick = function() {createChart()};
