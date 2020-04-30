import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  const buttonSubmit = async () => {
    const response = await fetch('http://localhost:3001/');
    console.log(response);
  }

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
      </header>
      <button onClick={buttonSubmit}>Server test</button>
    </div>
  );
}

export default App;
