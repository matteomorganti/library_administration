import React, { Component } from 'react';
import AppNavBar from './AppNavBar';
import { Container } from 'reactstrap';
import { Form, Alert, FormGroup, Input, Label, Row, Col } from "reactstrap";
import Button from 'react-bootstrap/Button';
import AuthenticationService from './AuthenticationService';
import avatar from './avatar.png';
import './App.css';

class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      error: ""
    };
  }

  changeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
  }

  doLogin = async (event) => {
    event.preventDefault();

    AuthenticationService
    .userLogin(this.state.email, 
                  this.state.password)
      .then(
        () => {
          this.props.history.push('/Dashboard');
        },
        error => {
          console.log("Login fail: error = { " + error.toString() + " }");
          this.setState({error: "Controllare email e password"});
        }
    );
  }

  render() {
    return ( 
      <div>
        <AppNavBar/>
        <Container fluid>
          <Row style={{marginTop:"20px"}}>
          <Col sm="12" md={{ size: 3, offset: 4 }}>
            <div style={{marginBottom: "10px"}}>
              <img src={avatar} alt="Avatar" className="avatar center" 
                style={{width: "50%", height: "auto"}}/>
            </div>
            <Form  onSubmit={this.doLogin}>
              <FormGroup>
                <Label for="email"><strong>Email</strong></Label>
                <Input autoFocus 
                  type="text"
                  name="email" id="email"
                  value={this.state.email}
                  placeholder="Inserisci Email"
                  autoComplete="email"
                  onChange={this.changeHandler}
                />
              </FormGroup>

              <FormGroup>
                <Label for="password"><strong>Password</strong></Label>
                <Input type="password" 
                  name="password" id="password"
                  value={this.state.password}
                  placeholder="Inserisci Password"
                  autoComplete="password"
                  onChange={this.changeHandler}
                />
              </FormGroup>

              <Button type="submit" variant="primary" size="lg" block>
                Login
              </Button>
              {
                this.state.error && (
                  <Alert color="danger">
                    {this.state.error}
                  </Alert>
                )
              }
            </Form>
            </Col>
          </Row>
        </Container>
      </div>);
  }
}

export default Login;