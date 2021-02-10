import React, { Component } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import ReactDom from "react-dom";
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
        "http://g0ptrkwkej5fhqfl.myfritz.net:8090/api/prenotazioni/libriUtente/" + utente,
        { headers: { Authorization: `${JWTToken}` } }
      )
      .then((response) => {
        console.log(response);
      });
  }

  libriNonRestituiti() {
    let JWTToken = localStorage.getItem("token");
    axios
      .get(
        "http://g0ptrkwkej5fhqfl.myfritz.net:8090/api/prenotazioni/daRestituire/:utente",
        { headers: { Authorization: `${JWTToken}` } }
      )
      .then((response) => {
        console.log(JWTToken);
      });
  }

  numeroLibriNoleggiati() {
    let JWTToken = localStorage.getItem("token");
    axios
      .get(
        "http://g0ptrkwkej5fhqfl.myfritz.net:8090/api/prenotazioni/numberLibriUtente/:utente",
        { headers: { Authorization: `${JWTToken}` } }
      )
      .then((response) => {
        console.log(JWTToken);
      });
  }

  getUser() {
    let JWTToken = localStorage.getItem("token");
    axios
      .get(
        "http://g0ptrkwkej5fhqfl.myfritz.net:8090/api/authentication/getUsers",
        {
          headers: { Authorization: `${JWTToken}` },
        }
      )
      .then((response) => {
        console.log(JWTToken);
      });
  }

  getLibri() {
    let result = [];
    let JWTToken = localStorage.getItem("token");
    axios
      .get("http://g0ptrkwkej5fhqfl.myfritz.net:8090/api/libri/getAll", {
        headers: { Authorization: `${JWTToken}` },
      })
      .then((response) => {
        result = response.data[0];
        console.log(response.data);
        console.log(JWTToken);
      });
    result.forEach((el) => console.log(el));
  }

  addPrenotazione = (utente, libro, dataPrenotazione) => {
    let JWTToken = localStorage.getItem("token");
    axios
      .post(
        "http://g0ptrkwkej5fhqfl.myfritz.net:8090/api/prenotazioni/addPrenotazione",
        {
          utente,
          libro,
          dataPrenotazione,
          headers: { Authorization: `${JWTToken}` },
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
            <Nav.Link href="">Inserisci libro</Nav.Link>
            <NavDropdown title="Libri" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={this.getUser} href="#action/3.1">
                Visualizza libri
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={this.libriNonRestituiti}
                href="#action/3.2"
              >
                Visualizza autori
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={this.numeroLibriNoleggiati}
                href="#action/3.3"
              >
                visualizza dettagli libro tramite id{" "}
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Cerca libro in base al titolo
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Gestione prenotazioni" id="basic-nav-dropdown">
              <NavDropdown.Item
                onClick={this.libriPrenotati}
                href="#action/3.1"
              >
                Libri prenotati
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
                Inserisci prenotazione
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
