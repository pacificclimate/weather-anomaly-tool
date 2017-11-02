import React, {Component} from 'react';

import Header from '../Header';
import Tool from '../Tool'

import './App.css';

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
