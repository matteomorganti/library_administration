import React, { Component } from 'react';
import AppNavBar from './AppNavBar';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';
import Alert from 'react-bootstrap/Alert';
import axios from "axios";
import AuthenticationService from './AuthenticationService';

class Dashboard extends Component {

    constructor(props) {
      super(props);
    }
  
    componentDidMount() {
      const token = localStorage.getItem("token");
      this.setState({token: token});
      console.log(token);
    }

    

    render(){
      return(
        <div></div>
      )
    }
}
export default Dashboard;