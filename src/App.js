import React from "react";
import { Switch, Route } from "react-router-dom";
import Private from "./views/private";
import Public from "./views/public";

const App = () => {
  return (
    <Switch>
      <Route path="/public">
        <Public />
      </Route>
      <Route path="/">
        <Private />
      </Route>
    </Switch>
  );
};

export default App;
