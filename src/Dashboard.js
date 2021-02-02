import React, { Component } from 'react';
import AppNavBar from './AppNavBar';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';
import Alert from 'react-bootstrap/Alert';

import AuthenticationService from './AuthenticationService';

class Dashboard extends Component {

    constructor(props) {
      super(props);
      this.state = {user: undefined};
    }
  
    componentDidMount() {
      const user = AuthenticationService.getCurrentUser();
      this.setState({user: user});
    }
}
export default Dashboard;