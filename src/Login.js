import React, { Component } from "react";
import PropTypes from "prop-types";
import { Container } from "reactstrap";
import { Form, Alert, Row, Col } from "reactstrap";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import AuthenticationService from "./AuthenticationService";
import avatar from "./avatar.png";
import "./css/Login.css";
import Grid from "@material-ui/core/Grid";

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
        <Container fluid style={{ margin: "0 auto", width: "fit-content" }}>
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
              <Form
                style={{ textAlign: "center" }}
                noValidate
                autoComplete="off"
                onSubmit={this.doLogin}
              >
                <Grid
                  id="grid"
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                  style={{
                    backgroundColor: "#ffffff",
                    padding: "1.5rem",
                    borderRadius: "15px",
                    boxShadow: "0 0.5rem 0.75rem -0.25rem rgb(39 48 54 / 45%)",
                  }}
                >
                  <div>
                    <TextField
                      variant="outlined"
                      type="text"
                      name="utente"
                      id="utente"
                      value={this.state.utente}
                      label="Nome utente"
                      autoComplete="utente"
                      onChange={this.changeHandler}
                      style={{ marginTop: "25px", marginBottom: "10px" }}
                    />
                  </div>

                  <div>
                    <TextField
                      variant="outlined"
                      type="password"
                      name="password"
                      id="password"
                      label="Password"
                      value={this.state.password}
                      autoComplete="password"
                      onChange={this.changeHandler}
                      style={{ marginTop: "10px", marginBottom: "10px" }}
                    />
                  </div>

                  <Button
                    variant="contained"
                    type="submit"
                    style={{
                      color: "whitesmoke",
                      backgroundColor: "#006ddb",
                      marginTop: "10px",
                    }}
                  >
                    Login
                  </Button>
                </Grid>
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
