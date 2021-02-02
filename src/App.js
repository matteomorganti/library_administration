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
          <Route path='/' exact={true} component={Login}/>  
          <Route path='/userLogin' exact={true} component={Login}/>  
          <Route path='/userRegister' exact={true} component={userRegister}/>
          <Route path='/Dashboard' exact={true} component={Dashboard}/>  
        </Switch>
      </Router>
    )
  }
}

export default App;