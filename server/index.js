// server/index.js

const express = require("express");
const path = require("path");
const cors = require("cors");
const router = require('./routes/dataRoutes');


const app = express();
const PORT = process.env.PORT || 3001;

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// CORS middleware
app.use(cors({origin:'*'}));

// Routes for data requests
app.use('/yahoo-finance', dataRoutes);

// Handle GET requests to /api route
app.get("/api", (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.json({ message: "Hello from server!" });
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
