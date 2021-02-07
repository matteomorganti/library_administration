import React, { Component } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import PropTypes from "prop-types";
import AuthenticationService from "./AuthenticationService";

class Dashboard extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
  };
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    this.setState({ token: token });
    console.log(token);
  }

  libriPrenotati() {
    let JWTToken = localStorage.getItem("token");
    axios
      .get(
        "https://warm-sierra-79194.herokuapp.com/http://progettopawm.ns0.it:8090/api/prenotazioni/libriUtente/:utente",
        { headers: { Authorization: `Bearer ${JWTToken}` } }
      )
      .then((response) => {
        console.log(response);
      });
  }

  doLogout = async (event) => {
    event.preventDefault();
    AuthenticationService.logOut();
    this.props.history.push("/userLogin");
  };

  libriNonRestituiti() {
    let JWTToken = localStorage.getItem("token");
    axios
      .get(
        "https://warm-sierra-79194.herokuapp.com/http://progettopawm.ns0.it:8090/api/prenotazioni/daRestituire/:utente",
        { headers: { Authorization: `Bearer ${JWTToken}` } }
      )
      .then((response) => {
        console.log(JWTToken);
      });
  }

  doLogout = async (event) => {
    event.preventDefault();
    AuthenticationService.logOut();
    this.props.history.push("/userLogin");
  };

  numeroLibriNoleggiati() {
    let JWTToken = localStorage.getItem("token");
    axios
      .get(
        "https://warm-sierra-79194.herokuapp.com/http://progettopawm.ns0.it:8090/api/prenotazioni/numberLibriUtente/:utente",
        { headers: { Authorization: `Bearer ${JWTToken}` } }
      )
      .then((response) => {
        console.log(JWTToken);
      });
  }

  inserisciLibro = (utente, libro, dataPrenotazione) => {
    let JWTToken = localStorage.getItem("token");
    axios
      .post(
        "https://warm-sierra-79194.herokuapp.com/http://progettopawm.ns0.it:8090/api/prenotazioni/addPrenotazione",
        {
          utente,
          libro,
          dataPrenotazione,
          headers: { Authorization: `Bearer ${JWTToken}` },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  };

  doLogout = async (event) => {
    event.preventDefault();
    AuthenticationService.logOut();
    this.props.history.push("/userLogin");
  };

  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Benvenuto!</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#link">Inserisci libro</Nav.Link>
            <NavDropdown title="Prenotazioni" id="basic-nav-dropdown">
              <NavDropdown.Item
                onClick={this.libriPrenotati}
                href="#action/3.1"
              >
                Libri noleggiati
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={this.libriNonRestituiti}
                href="#action/3.2"
              >
                Libri da restituire
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={this.numeroLibriNoleggiati}
                href="#action/3.3"
              >
                Numero libri noleggiati{" "}
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Inserisci; prenotazione
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form inline>
            <Button onClick={this.doLogout} variant="outline-success">
              Logout
            </Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
export default Dashboard;
