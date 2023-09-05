// src/App.js

import React from 'react';
import './App.css';
import CompanyList from './components/CompanyList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <CompanyList />
      </header>
    </div>
  );
}

export default App;
