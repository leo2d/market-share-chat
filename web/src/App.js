import React from 'react';
import { Router } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import history from './services/history';
import Routes from './routes';
import GlobalStyle from './styles/global';
import Header from './components/Header';

const App = () => {
  return (
    <Router history={history}>
      <GlobalStyle />
      <Header/>
      <Routes />
    </Router>
  );
};

export default App;
