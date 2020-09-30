import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Signin from "./../pages/Signin";
import TalentLink from "./../pages/TalentLink";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Signin />
        </Route>
        <Route exact path="/talent/:code">
          <TalentLink />
        </Route>
      </Switch>
    </Router>
  );
}
