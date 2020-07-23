import React from "react";
import {
  Switch,
  Route,
  BrowserRouter as Router,
} from "react-router-dom";

import mainScreen from "./index";
import LandingPage from "./LandingPage"
import schedule from "./LandingPage/schedule.js"

const Main = () => (
  <Router>
    <Switch>
      <Route path="/LandingPage" component={LandingPage} />
      <Route path="/schedule" component={schedule} />
      <Route path="/" component={mainScreen} />
    </Switch>
  </Router>
);
export default Main;
