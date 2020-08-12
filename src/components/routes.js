import React from "react";
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";

import mainScreen from "./index";
import LandingPage from "./LandingPage";
import schedule from "./LandingPage/schedule.js";

const Main = () => (
  <Router>
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/landingpage" />} />
      <Route path="/landingpage" component={LandingPage} />
      <Route path="/schedule" component={schedule} />
      <Route path="/macth1" component={mainScreen} />
    </Switch>
  </Router>
);
export default Main;
