import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import Tracking from './routes/tracking';

const Public = () => {
  return (
    <Switch>
      <Route path="/public/tracking">
        <Tracking />
      </Route>
      <Redirect to="/login" />
    </Switch>
  );
};

export default Public;
