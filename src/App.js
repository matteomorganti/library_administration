import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Dashboard from "./Dashboard";
import Login from "./Login";

export default class App extends React.Component {
  componentDidMount() {
    document.title = "Admin Panel";
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact={true} component={Login} />
          <Route path="/userLogin" exact={true} component={Login} />
          <Route path="/Dashboard" exact={true} component={Dashboard} />
        </Switch>
      </Router>
    );
  }
}
