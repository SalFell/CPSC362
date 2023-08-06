// client/src/App.js

import React from 'react';
import DataDownloadForm from './components/downloadData.js';
import { withBorder, withBackgroundColor } from './decorators.js';

const App = () => {
  const FormWithBorder = withBorder(DataDownloadForm);
  const FormWithBackgroundColor = withBackgroundColor(DataDownloadForm);
  return (
    <div className="welcome-header">
     <p>Welcome to</p>
     <p id="welcome-trAIder">trAIder</p>
      <h2>Data Download Form with Border</h2>
      <FormWithBorder />

      <h2>Data Download Form with Background Color</h2>
      <FormWithBackgroundColor />
    </div>

  );
}

export default App;
