import React, {Component} from 'react';

import withLifeCycleLogging from '../../HOCs/withLifeCycleLogging';
import logger from '../../logger';
import Header from '../Header';
import Tool from '../Tool'

import './App.css';

logger.configure({active: !!process.env.LOGGING});

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

export default withLifeCycleLogging.hoc()(App);
