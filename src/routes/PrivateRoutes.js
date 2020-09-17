import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./../components/Header";

import Dashboard from "./../pages/Dashboard";
import MyJobs from "./../pages/MyJobs";
import JobDetails from "./../pages/JobDetails";

export default function PrivateRoutes() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <Dashboard />
        </Route>
        <Route exact path="/my-jobs">
          <MyJobs />
        </Route>
        <Route exact path="/jobs/:id/details">
          <JobDetails />
        </Route>
      </Switch>
    </Router>
  );
}
