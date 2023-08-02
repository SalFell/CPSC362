import model from "../model/model";

// Data form values
var symbolVal;
var startDateVal;
var endDateVal;

// Retrieve values from form
function getValues() {
    symbolVal = document.getElementById("symbol").value;
    startDateVal = document.getElementById("startDate").value;
    endDateVal = document.getElementById("endDate").value;
};

// Reset values of form
function resetValues() {
    document.getElementById("symbol").value = "";
    document.getElementById("startDate").value = "";
    document.getElementById("endDate").value = "";
};

// TESTING PURPOSES ONLY 
// Log form values
function logValues() {
    console.log(symbolVal);
    console.log(startDateVal);
    console.log(endDateVal);
}

// Controller module
export default function controller() {
    // When the page is ready, any functions within this will be called
    window.onload  = function() {
        document.getElementById("button").onclick = function() {
            // TESTING PURPOSES ONLY
            // Shows that values can be taken from data forms for use in
            // other functions
            getValues();
            logValues();
            resetValues();
    };  
  };
};