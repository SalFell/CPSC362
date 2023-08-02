// Data form component

// Retrieve today's date for setting date bounds
var today = (new Date()).toISOString().split('T')[0];
// Earliest available date
var minDate = "2020-01-01";

// Create data form component
export default function DataForm() {
    return (
        <div>
            <p id="dataForm">
                {/* Dropdown to select ETF symbol */}
                <label htmlFor="symbol">ETF symbol:</label>
                <select id="symbol">
                <option value="">Please select</option>
                <option value="FNGD">FNGD</option>
                <option value="FNGU">FNGU</option>
                </select>

                {/* Date selector for start date */}
                <label htmlFor="startDate">Start Date:</label>
                <input type="date" id="startDate" 
                    min={minDate}
                    max={today}/>

                {/* Date selector for end date */}
                <label htmlFor="endDate">End Date:</label>
                <input type="date" id="endDate"
                    min={minDate}
                    max={today}/>
                
                {/* Button */}
                <button id="button">button.</button>
            </p>
        </div>
    )
}
