import React, { Component } from 'react';
import AppNavBar from './AppNavBar';
import { Container } from 'reactstrap';
import { Button, Form, FormGroup, Input, Label, Row, Col } from "reactstrap";
import { Alert } from 'react-bootstrap';
import AuthenticationService from './AuthenticationService';

const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}

class userRegister extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      nome: "",
      cognome: "",
      email: "",
      password: "",
      message: "",
      successful: false,
      validForm: true,
      errors: {
        nome: '',
        cognome: '',
        email: '',
        password: ''
      }
    };
  }

  changeHandler = (event) => {
    const { nome, value } = event.target;
  
    let errors = this.state.errors;

    switch (nome) {
      case 'nome':
        errors.nome = 
          value.length < 3
            ? 'nome deve essere di almeno 3 caratteri'
            : '';
        break;
      case 'cognome':
        errors.cognome = 
          value.length < 3
            ? 'cognome deve essere di almeno 3 caratteri'
            : '';
        break;
      case 'email': 
        errors.email = 
          validEmailRegex.test(value)
            ? ''
            : 'Email non valida';
        break;
      case 'password': 
        errors.password = 
          value.length < 8
            ? 'password deve essere di almeno 8 caratteri'
            : '';
        break;
      default:
        break;
    }
  
    this.setState({errors, [nome]: value}, ()=> {
        console.log(errors)
    })  
  }

  userRegister = (e) => {
    e.preventDefault();
    const valid = validateForm(this.state.errors);
    this.setState({validForm: valid});
    if(valid){
      Authentication.register(
        this.state.nome,
        this.state.cognome,
        this.state.email,
        this.state.password
      ).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
        },
        error => {
          console.log("Fail! Error = " + error.toString());
          
          this.setState({
            successful: false,
            message: error.toString()
          });
        }
      );  
    }
  }

  render()
  {
    const title = <h2>Register User</h2>;
    const errors = this.state.errors;

    let alert = "";

    if(this.state.message){
      if(this.state.successful){
        alert = (
                  <Alert variant="success">
                    {this.state.message}
                  </Alert>
                );
      }else{
        alert = (
                  <Alert variant="danger">
                    {this.state.message}
                  </Alert>
                );
      }
    }

    return ( 
      <div>
        <AppNavbar/>
        <Container fluid>
          <Row>
          <Col sm="12" md={{ size: 4, offset: 4 }}>
          {title}
            <Form onSubmit={this.userRegister}>
              <FormGroup controlId="formNome">
                <Label for="nome">Nome</Label>
                <Input
                  type="text" 
                  placeholder="Inserisci nome"
                  name="nome" id="nome"
                  value={this.state.nome}
                  autoComplete="nome"
                  onChange={this.changeHandler}
                />
                {
                  errors.nome && ( 
                      <Alert variant="danger">
                        {errors.nome}
                      </Alert>
                    )
                }
              </FormGroup>

              <FormGroup controlId="formCognome">
                <Label for="cognome">Cognome</Label>
                <Input
                  type="text" 
                  placeholder="Inserisci cognome"
                  name="cognome" id="cognome"
                  value={this.state.cognome}
                  autoComplete="cognome"
                  onChange={this.changeHandler}
                />
                {
                  errors.cognome && ( 
                      <Alert variant="danger">
                        {errors.cognome}
                      </Alert>
                    )
                }
              </FormGroup>

              <FormGroup controlId="formEmail">
                <Label for="email">Email</Label>
                <Input required
                  type="text" 
                  placeholder="Enter Email"
                  name="email" id="email"
                  value={this.state.email}
                  autoComplete="email"
                  onChange={this.changeHandler}
                />
                {
                  errors.email && ( 
                      <Alert variant="danger">
                        {errors.email}
                      </Alert>
                    )
                }
              </FormGroup>

              <FormGroup controlId="formPassword">
                <Label for="password">Password</Label>
                <Input required 
                  type="password" 
                  placeholder="Enter Password"
                  name="password" id="password"
                  value={this.state.password}
                  autoComplete="password"
                  onChange={this.changeHandler}
                />
                {
                  errors.password && ( 
                      <Alert key="errorspassword" variant="danger">
                        {errors.password}
                      </Alert>
                    )
                }
              </FormGroup>

              <Button variant="primary" type="submit">
                Create
              </Button>
              {
                !this.state.validForm && (
                  <Alert key="validForm" variant="danger">
                    Please check the inputs again!
                  </Alert>
                )
              }

              {alert}
            </Form>
            </Col>
          </Row>
        </Container>
      </div>);
  }
}

export default userRegister;