import React, {Component} from 'react';
import { Grid } from 'react-bootstrap';

import logger from '../../logger';
import Header from '../Header';
import Tool from '../Tool'

import './App.css';

logger.configure({active: true});

class App extends Component {
    render() {
        return (
            <Grid fluid className="App">
                <Header/>
                <Tool/>
            </Grid>
        );
    }
}

export default App;
