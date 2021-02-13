import React, { Component, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import ReactDom from "react-dom";
import { useState } from "react";
import PropTypes from "prop-types";
import AuthenticationService from "./AuthenticationService";

class Dashboard extends Component {
  state = { user: [], book: [] };

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
        "http://g0ptrkwkej5fhqfl.myfritz.net:8090/api/prenotazioni/libriUtente/" +
          utente,
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
        "http://g0ptrkwkej5fhqfl.myfritz.net:8090/api/prenotazioni/numberLibriUtente/" +
          utente,
        { headers: { Authorization: `${JWTToken}` } }
      )
      .then((response) => {
        console.log(JWTToken);
      });
  }

  getUser = async () => {
    let JWTToken = localStorage.getItem("token");
    axios
      .get(
        "http://g0ptrkwkej5fhqfl.myfritz.net:8090/api/authentication/getUsers",
        {
          headers: { Authorization: `${JWTToken}` },
        }
      )
      .then((response) => {
        console.log(response.data);
        console.log(JWTToken);
        const utente = response.data.data[0].map((obj) => ({
          ID: obj.ID,
          Nome: obj.Nome,
          Cognome: obj.Cognome,
          Email: obj.Email,
        }));
        this.setState({ user: utente });
      })
      .catch((error) => console.error(`Error:  ${error}`));
  };

  getAllLibri = async () => {
    let JWTToken = localStorage.getItem("token");
    axios
      .get("http://g0ptrkwkej5fhqfl.myfritz.net:8090/api/libri/getAll", {
        headers: { Authorization: `${JWTToken}` },
      })
      .then((response) => {
        console.log(response.data);
        console.log(JWTToken);
        const libri = response.data.data[0].map((obj) => ({
          ID: obj.ID,
          Titolo: obj.Titolo,
        }));
        this.setState({ book: libri });
      })
      .catch((error) => console.error(`Error:  ${error}`));
  };

  doLogout = async (event) => {
    event.preventDefault();
    AuthenticationService.logOut();
    this.props.history.push("/userLogin");
  };

  render() {
    return (
      <Navbar bg="dark" expand="lg">
        <Navbar.Brand>Benvenuto!</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="">Inserisci libro</Nav.Link>
            <NavDropdown title="Libri" id="basic-nav-dropdown">
              <NavDropdown.Item
                onClick={this.getAllLibri}
                style={{ textDecoration: "none" }}
                href="#action/3.1"
              >
                Lista libri
                <div>
                  {this.state.book.map((libro) => (
                    <p key="book">
                      {libro.Titolo}
                      &nbsp;
                      {libro.ID}
                    </p>
                  ))}
                </div>
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={this.libriNonRestituiti}
                href="#action/3.2"
              >
                Lista generi
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={this.numeroLibriNoleggiati}
                href="#action/3.3"
              >
                Inserisci nuovo genere
              </NavDropdown.Item>
              <NavDropdown.Divider />
            </NavDropdown>
            <Nav.Link href="" onClick={this.getUser}>
              Lista Utenti
              <div>
                {this.state.user.map((utente) => (
                  <p key="user">
                    {utente.ID}
                    &nbsp;
                    {utente.Nome}
                    &nbsp;
                    {utente.Cognome}
                    &nbsp;
                    {utente.Email}
                  </p>
                ))}
              </div>
            </Nav.Link>
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
