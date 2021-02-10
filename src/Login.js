import React, { Component } from "react";
import PropTypes from "prop-types";
import { Container } from "reactstrap";
import { Form, Alert, FormGroup, Input, Row, Col } from "reactstrap";
import Button from "react-bootstrap/Button";
import AuthenticationService from "./AuthenticationService";
import avatar from "./avatar.png";
import "./App.css";

class Login extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
  };
  constructor(props) {
    super(props);

    this.state = {
      utente: "",
      password: "",
      error: "",
    };
  }

  changeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  };

  doLogin = async (event) => {
    event.preventDefault();

    AuthenticationService.userLogin(
      this.state.utente,
      this.state.password
    ).then(
      () => {
        this.props.history.push("/Dashboard");
      },
      (error) => {
        console.log("Login fail: error = { " + error.toString() + " }");
        this.setState({ error: "Controllare nome utente e password" });
      }
    );
  };

  render() {
    return (
      <div>
        <Container fluid>
          <Row style={{ marginTop: "20px" }}>
            <Col sm="12" md={{ size: 3, offset: 4 }}>
              <div style={{ marginBottom: "10px" }}>
                <img
                  src={avatar}
                  alt="Avatar"
                  className="avatar center"
                  style={{ width: "15%", height: "15%" }}
                />
              </div>
              <Form style={{ textAlign: "center" }} onSubmit={this.doLogin}>
                <FormGroup
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "1.5rem",
                  }}
                >
                  <Input
                    autoFocus
                    type="text"
                    name="utente"
                    id="utente"
                    value={this.state.utente}
                    placeholder="Nome utente"
                    autoComplete="utente"
                    onChange={this.changeHandler}
                    style={{ padding: "0.25rem" }}
                  />
                </FormGroup>

                <FormGroup
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "1.5rem",
                  }}
                >
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    value={this.state.password}
                    placeholder="Password"
                    autoComplete="password"
                    onChange={this.changeHandler}
                    style={{ padding: "0.35rem", borderRadius: "4px" }}
                  />
                </FormGroup>

                <Button type="submit" variant="primary" size="lg" block>
                  Login
                </Button>
                {this.state.error && (
                  <Alert color="danger">{this.state.error}</Alert>
                )}
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default Login;
