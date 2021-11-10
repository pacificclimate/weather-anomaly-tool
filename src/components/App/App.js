import React from 'react';
import { Container } from 'react-bootstrap';

import logger from '../../logger';
import Header from '../Header';
import Tool from '../Tool'

import './App.css';

logger.configure({active: true});

function App() {
  return (
    <Container fluid className="App">
      <Header/>
      <Tool/>
    </Container>
  );
}

export default App;
