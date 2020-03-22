import React from 'react';
import { Router } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import history from './services/history';
import Routes from './routes';

const App = () => {
  return (
    <Router history={history}>
      <Routes />
    </Router>
  );
};

export default App;
