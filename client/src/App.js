// client/src/App.js

import React from "react";
//import logo from "./logo.svg";
import "./App.css";
import DataDownloadForm from './downloadData';

function App() {
  //const [data, setData] = React.useState(null);

  //React.useEffect(() => {
  //  fetch("/api")
  //    .then((res) => res.json())
  //    .then((data) => setData(data.message));
  //}, []);

  return (
  //  <div className="App">
  //    <header className="App-header">
  //      <img src={logo} className="App-logo" alt="logo" />
  //      <p>{!data ? "Loading..." : data}</p>
  //    </header>
  //  </div>

  <div className="App">
  <h1>ETF Data Visualization</h1>
  <DataDownloadForm />
</div>
  );
}

export default App;
