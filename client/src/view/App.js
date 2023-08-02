// Import React
import React from 'react';

// Import UI components
import Header from './Header'
import DataForm from './DataForm'

// Import controller module
import controller from '../controller/controller';

// Create App component which contains the UI components
const App = () => {
  return (
    <div>
    <Header />
    <DataForm />
    </div>
  );
}

// Begin the controller module
controller();

// Make 
export default App;