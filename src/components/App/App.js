import React, { Component } from 'react';
import './App.css';
import Header from '../Header';
import Tool from '../Tool'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <Tool/>
      </div>
    );
  }
}

export default App;
