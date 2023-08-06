// server/index.js

// Imports
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import cors from 'cors';
import router from './routes/dataRoutes.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Get the current module file path and convert it to a directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Have Node serve the files for our built React app
app.use(express.static(resolve(__dirname, '../client/build')));

// CORS middleware
app.use(cors({ origin: '*' }));

// Routes for data requests
app.use('/yahoo-finance', router);

// Handle GET requests to /api route
app.get("/api", (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.json({ message: "Hello from server!" });
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.sendFile(resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

