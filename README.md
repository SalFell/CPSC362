# trAIder

ETF trading strategy analyzer based on Yahoo Finance data.

Built with Node.js and React

MVC architecture

project-root/
|-- server/ (Node.js back-end)
| |-- data/
| | |-- historical_data.json (downloaded historical data)
| |-- controllers/
| | |-- dataController.js (Controller for handling data-related actions)
| |-- models/
| | |-- BullingerBands.js (Model for Bullinger Bands trading strategy)
| | |-- MovingAverage.js (Model for Moving Average trading strategy)
| |-- routes/
| | |-- dataRoutes.js (Express routes for handling data requests)
| |-- tests/
| | |-- unit_MACO.js (unit test for moving average strategy)
| |-- utils/
| | |-- processData.js (utility for processing historical data)
| |-- index.js (entry point to Node.js server)
| |-- proxy.js (endpoint to proxy the Yahoo Finance API request)
| |-- setup.js (allows proxy to write files)
|
|-- client/ (React front-end)
| |-- src/
| | |-- components/
| | | |-- DataDownloadForm.js (View component for data download form)
| | | |-- BackTestResults.js (View component for displaying back-test results)
| | | |-- Chart.js (View component for displaying the chart)
| | |-- App.css
| | |-- App.js
| | |-- App.test.js
| | |-- index.css
| | |-- index.js
| | |-- reportWebVitals.js
| | |-- setupTests.js
| |-- public/
| | |-- index.html
| | |-- manifest.json
| | |-- robots.txt
| |-- ... (other client-related files)
|
|-- data.json
|-- package.json
|-- ... (other project configuration files)