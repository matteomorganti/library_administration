import React, { Component } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import axios from "axios";
import AuthenticationService from "./AuthenticationService";
import Sidebar from "./Sidebar";
import "./Dashboard.css";

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    this.setState({ token: token });
    console.log(token);
  }

  render() {
    return (
      <div>
        <Sidebar />
      </div>
    );
  }
}

export default Dashboard;
