// Import Functions
import { readJSON } from "./read-json.js";
import { createChart } from "./create-chart.js";
import { updateChart } from "./update-chart.js";


// Retrieve data using the file ../data.json
const data = await readJSON();

// On Click Functions
// 
document.getElementById("create-chart").onclick = function() {createChart(data)};
//document.getElementById("update-chart").onclick = function() {updateChart()};