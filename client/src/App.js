// client/src/App.js

import React from 'react';
import DataDownloadForm from './downloadData';

const App = () => {
  return (
    <div className="welcome-header">
     <p>Welcome to</p>
     <p id="welcome-trAIder">trAIder</p>
      <DataDownloadForm />
    </div>

  );
}

export default App;
