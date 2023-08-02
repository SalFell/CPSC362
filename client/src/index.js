// Import React
import React from 'react';
import ReactDOM from 'react-dom/client';

// Import CSS styles and App component
import './view/index.css';
import App from './view/App.js';

// Fill the root component in index.html with the App component
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);