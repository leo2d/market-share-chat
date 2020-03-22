import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Chat from './pages/Chat';
import Login from './pages/Login';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/login" exact component={Login} />
      <Route path="/chat" component={Chat} />
    </Switch>
  );
}
