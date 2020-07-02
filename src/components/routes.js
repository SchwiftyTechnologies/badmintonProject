import React from "react";
import {
  Switch,
  Route,
  BrowserRouter as Router,
} from "react-router-dom";

import mainScreen from "./index";

const Main = () => (
  <Router>
    <Switch>
      <Route path="/" component={mainScreen} />
    </Switch>
  </Router>
);
export default Main;
