import React, {Component} from 'react';

import logger from '../../logger';
import Header from '../Header';
import Tool from '../Tool'

import './App.css';

logger.configure({active: true});

class App extends Component {
    render() {
        logger.log(this);
        return (
            <div className="App">
                <Header/>
                <Tool/>
            </div>
        );
    }
}

export default App;
