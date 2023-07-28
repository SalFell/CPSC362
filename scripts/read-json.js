// Read JSON file and parse into text, then fill into array
export async function readJSON() {
    var db  = [];
    const requestUrl = "../data.json";
    const request = new Request(requestUrl);

    const response = await fetch(request);
    const historicalDataText = await response.text();

    db = JSON.parse(historicalDataText);
    return db;
}