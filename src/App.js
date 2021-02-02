import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Dashboard from './Dashboard';
import userRegister from './userRegister';
import Login from './Login';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact={true} component={Home}/>
          <Route path='/Dashboard' exact={true} component={Dashboard}/>
          <Route path='/userLogin' exact={true} component={Login}/>
          <Route path='/userRegister' exact={true} component={userRegister}/>  
        </Switch>
      </Router>
    )
  }
}

export default App;