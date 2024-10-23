import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [data, setData] = useState();

  const fetchData = async () => {
    try {
      const response = await fetch('/users');
      const result = await response.text();
      setData(result)
    } catch (error) {
      setData('error fetch')
    }
  }

  console.log("data from server:", data)

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>form server:</p>
        <div>{data}</div>
      </header>
    </div>
  );
}

export default App;
