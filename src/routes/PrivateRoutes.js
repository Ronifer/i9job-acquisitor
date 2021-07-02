import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Hidden, withStyles } from "@material-ui/core";

import Header from "./../components/Header";
import Navigator from "./../components/Navigator";

import Dashboard from "./../pages/Dashboard";
import MyJobs from "./../pages/MyJobs";
import JobDetails from "./../pages/JobDetails";
import Talents from "./../pages/Talents";
import TalentDetails from "./../pages/Talents/details";

const drawerWidth = 256;

const styles = (theme) => ({
  root: {
    display: "flex",
    minHeight: "100vh",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  app: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    background: "#f5f8fb",
  },
  main: {
    flex: 1,
    padding: theme.spacing(6, 4),
    background: "#f5f8fb",
  },
  footer: {
    padding: theme.spacing(2),
    background: "#f5f8fb",
  },
});

function PrivateRoutes(props) {
  const { classes } = props;
  return (
    <Router>
      <nav className={classes.drawer}>
        <Hidden xsDown implementation="css">
          <Navigator PaperProps={{ style: { width: drawerWidth } }} />
        </Hidden>
      </nav>

      <div className={classes.app}>
        {/* <Header /> */}
        <main className={classes.main}>
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
            <Route exact path="/talents">
              <Talents />
            </Route>
            <Route exact path="/talents/:id">
              <TalentDetails />
            </Route>
          </Switch>
        </main>
        <footer className={classes.footer}>{/* <Copyright /> */}</footer>
      </div>
    </Router>
  );
}

export default withStyles(styles)(PrivateRoutes);
