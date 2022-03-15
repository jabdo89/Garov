import React from "react";
import { Switch, Route } from "react-router-dom";
import Private from "./views/private";

const App = () => {
  return (
    <Switch>
      <Route path="/">
        <Private />
      </Route>
    </Switch>
  );
};

export default App;
