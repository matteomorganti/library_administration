import React, { Component } from "react";
import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";
import { Alert, Form } from "reactstrap";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import BookIcon from "@material-ui/icons/Book";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonIcon from "@material-ui/icons/Person";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import { Bar } from "react-chartjs-2";
import AuthenticationService from "./AuthenticationService";
import "./css/Dashboard.css";

class Dashboard extends Component {
  state = {
    user: [],
    book: [],
    genre: [],
    currGen: 1,
    titolo: "",
    trama: "",
    quantita: 1,
    cover: {},
    error: "",
    addGen: "",
    addNomeAutore: "",
    addCognomeAutore: "",
    addDataAutore: "",
    autore: "",
    idLibro: 0,
    grafico: [],
    anno: "2020",
  };

  static propTypes = {
    history: PropTypes.object.isRequired,
  };
  constructor(props) {
    super(props);

    this.handleFile = this.handleFile.bind(this);
  }

  changeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    this.setState({ token: token });
    console.log(token);
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
          Genere: obj.Genere,
          Autori: obj.Autori,
        }));
        this.setState({ book: libri });
      })
      .catch((error) => console.error(`Error:  ${error}`));
  };

  addNewLibro(titolo, trama, quantita, genere, copertina) {
    titolo = this.state.titolo;
    trama = this.state.trama;
    quantita = this.state.quantita;
    genere = this.state.currGen;
    copertina = this.state.cover;
    let JWTToken = localStorage.getItem("token");
    var axios = require("axios");
    var FormData = require("form-data");
    var fs = require("fs");
    var data = new FormData();
    data.append("titolo", titolo);
    data.append("trama", trama);
    data.append("quantita", quantita);
    data.append("genere", genere);
    data.append("copertina", copertina);

    var config = {
      method: "post",
      url: "http://g0ptrkwkej5fhqfl.myfritz.net:8090/api/upload/caricaLibro",
      headers: {
        Authorization: `${JWTToken}`,
        "Content-Type": "multipart/form-data",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  doAddNewLibro = async () => {
    this.addNewLibro(
      this.state.titolo,
      this.state.trama,
      this.state.quantita,
      this.state.currGen,
      this.state.cover
    );
  };

  doLogout = async (event) => {
    event.preventDefault();
    AuthenticationService.logOut();
    this.props.history.push("/userLogin");
  };

  getGenre = async () => {
    let JWTToken = localStorage.getItem("token");
    axios
      .get("http://g0ptrkwkej5fhqfl.myfritz.net:8090/api/genere/getAllKinds", {
        headers: { Authorization: `${JWTToken}` },
      })
      .then((response) => {
        console.log(response.data.data[0]);
        console.log(JWTToken);
        const genere = response.data.data[0].map((obj) => ({
          ID: obj.ID,
          Descrizione: obj.Descrizione,
        }));
        this.setState({ genre: genere });
        console.log(genere);
      })
      .catch((error) => console.error(`Error:  ${error}`));
  };

  setGenere = async (genere) => {
    this.setState({
      currGen: genere,
    });
  };

  addGenere = async (genere) => {
    genere = this.state.addGen;
    let JWTToken = localStorage.getItem("token");
    axios
      .post(
        "http://g0ptrkwkej5fhqfl.myfritz.net:8090/api/genere/addGenere",
        { genere },
        { headers: { Authorization: `${JWTToken}` } }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.error(`Error:  ${error}`));
    this.setState({ error: "Qualcosa è andato storto" });
  };

  addAutore = async (nome, cognome, dataNascita) => {
    nome = this.state.addNomeAutore;
    cognome = this.state.addCognomeAutore;
    dataNascita = this.state.addDataAutore;
    let JWTToken = localStorage.getItem("token");
    axios
      .post(
        "http://g0ptrkwkej5fhqfl.myfritz.net:8090/api/autori/addAutore",
        { nome, cognome, dataNascita },
        { headers: { Authorization: `${JWTToken}` } }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.error(`Error:  ${error}`));
    this.setState({ error: "Qualcosa è andato storto" });
  };

  associaAutore = async (libro, autore) => {
    /*libro = this.state.idLibro;
    autore = this.state.autore;
    let JWTToken = localStorage.getItem("token");
    console.log(libro, autore);
    axios
      .post(
        "http://g0ptrkwkej5fhqfl.myfritz.net:8090/api/libri/associaAutore",
        { libro, autore },
        { headers: { Authorization: `${JWTToken}` } }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.error(`Error:  ${error}`));
    this.setState({ error: "Qualcosa è andato storto" });*/
    let JWTToken = localStorage.getItem("token");
    libro = this.state.idLibro;
    autore = this.state.autore;
    var axios = require("axios");
    var data = JSON.stringify({
      libro: libro,
      autore: autore,
    });

    var config = {
      method: "post",
      url: "http://g0ptrkwkej5fhqfl.myfritz.net:8090/api/libri/associaAutore",
      headers: {
        Authorization: `${JWTToken}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  getGrafico = async () => {
    let JWTToken = localStorage.getItem("token");
    axios
      .get(
        `http://g0ptrkwkej5fhqfl.myfritz.net:8090/api/grafici/getAllNumberLibriMese/ ${this.state.anno}`,
        { headers: { Authorization: `${JWTToken}` } }
      )
      .then((response) => {
        console.log(response.data);
        console.log(JWTToken);
        const datiGrafico = response.data.data[0];
        let numeroLibri = [];
        let mese = [];
        Array.from(datiGrafico).forEach((element) => {
          numeroLibri.push(element.NumeroLibri);
          mese.push(element.Mese);
        });
        this.setState({
          grafico: {
            labels: mese,
            datasets: [
              {
                label: "Libri letti",
                data: numeroLibri,
                backgroundColor: [
                  "rgba(255,105,145,0.6)",
                  "rgba(155,100,210,0.6)",
                  "rgba(90,178,255,0.6)",
                  "rgba(240,134,67,0.6)",
                  "rgba(120,120,120,0.6)",
                  "rgba(250,55,197,0.6)",
                ],
              },
            ],
          },
        });
        console.log(this.state.grafico);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleFile(e) {
    this.setState({ cover: e.target.files[0] });
    console.log(this.state.cover);
  }

  render() {
    return (
      <div className="sidBar">
        <div className="sb">
          <List component="nav" aria-labelledby="nested-list-subheader">
            <ListItem button>
              <ListItemIcon>
                <HomeIcon className={"menuIcon"} />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button onClick={this.getAllLibri}>
              <ListItemIcon>
                <BookIcon className={"menuIcon"} />
              </ListItemIcon>
              <ListItemText primary="Lista libri" />
            </ListItem>
            <ListItem button onClick={this.getUser}>
              <ListItemIcon>
                <PersonIcon className={"menuIcon"} />
              </ListItemIcon>
              <ListItemText primary="Lista utenti" />
            </ListItem>
            <ListItem button onClick={this.doLogout}>
              <ListItemIcon>
                <ExitToAppIcon className={"menuIcon"} />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </div>
        <div className="main">
          <div style={{ padding: "2rem" }}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell>Nome</TableCell>
                    <TableCell>Cognome</TableCell>
                    <TableCell>Email</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.user.map((utente) => (
                    <TableRow key="user">
                      <TableCell>{utente.ID}</TableCell>
                      <TableCell>{utente.Nome}</TableCell>
                      <TableCell>{utente.Cognome}</TableCell>
                      <TableCell>{utente.Email}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div style={{ padding: "2rem" }}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell>Titolo</TableCell>
                    <TableCell>Generi</TableCell>
                    <TableCell>Autori</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.book.map((libro) => (
                    <TableRow key="book">
                      <TableCell>{libro.ID}</TableCell>
                      <TableCell>{libro.Titolo}</TableCell>
                      <TableCell>{libro.Genere}</TableCell>
                      <TableCell>{libro.Autori}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <Form noValidate autoComplete="off">
            <div>
              <TextField
                variant="outlined"
                type="text"
                name="titolo"
                id="titolo"
                value={this.state.titolo}
                label="Titolo"
                autoComplete="titolo"
                onChange={this.changeHandler}
                style={{ marginTop: "25px", marginBottom: "10px" }}
              />
            </div>

            <div>
              <TextField
                variant="outlined"
                type="text"
                name="trama"
                id="trama"
                label="Trama"
                value={this.state.trama}
                autoComplete="trama"
                onChange={this.changeHandler}
                style={{ marginTop: "10px", marginBottom: "10px" }}
              />
            </div>
            <div>
              <TextField
                variant="outlined"
                type="text"
                name="quantita"
                id="quantita"
                label="Quantità"
                value={this.state.quantita}
                autoComplete="quantita"
                onChange={this.changeHandler}
                style={{ marginTop: "10px", marginBottom: "10px" }}
              />
            </div>
            <div className="">
              <label>Seleziona Copertina</label>
              <input
                type="file"
                name="copertina"
                onChange={(e) => this.handleFile(e)}
              />
            </div>
            <div>
              <Dropdown onClick={this.getGenre}>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Dropdown Button
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {this.state.genre.map((genere) => (
                    <Dropdown.Item key={genere.ID}>
                      {genere.Descrizione}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <Button
              onClick={this.doAddNewLibro}
              variant="contained"
              style={{
                color: "whitesmoke",
                backgroundColor: "#006ddb",
                marginTop: "10px",
                marginBottom: "30px",
              }}
            >
              Invia
            </Button>
            {this.state.error && (
              <Alert color="danger">{this.state.error}</Alert>
            )}
          </Form>

          <Form>
            <div>
              <TextField
                variant="outlined"
                type="text"
                name="addGen"
                id="addGen"
                label="Inserisci genere"
                value={this.state.addGen}
                onChange={this.changeHandler}
                style={{ marginTop: "10px", marginBottom: "10px" }}
              />
            </div>
            <Button
              onClick={this.addGenere}
              variant="contained"
              style={{
                color: "whitesmoke",
                backgroundColor: "#006ddb",
                marginTop: "10px",
                marginBottom: "30px",
              }}
            >
              Inserisci
            </Button>
          </Form>
          {this.state.error && <Alert color="danger">{this.state.error}</Alert>}
          <Form>
            <div>
              <TextField
                variant="outlined"
                type="text"
                name="addNomeAutore"
                id="addNomeAutore"
                label="Nome"
                value={this.state.addNomeAutore}
                onChange={this.changeHandler}
                style={{ marginTop: "10px", marginBottom: "10px" }}
              />
            </div>
            <div>
              <TextField
                variant="outlined"
                type="text"
                name="addCognomeAutore"
                id="addCognomeAutore"
                label="Cognome"
                value={this.state.addCognomeAutore}
                onChange={this.changeHandler}
                style={{ marginTop: "10px", marginBottom: "10px" }}
              />
            </div>
            <div>
              <TextField
                variant="outlined"
                type="text"
                name="addDataAutore"
                id="addDataAutore"
                label="Data di nascita"
                value={this.state.addDataAutore}
                onChange={this.changeHandler}
                style={{ marginTop: "10px", marginBottom: "10px" }}
              />
            </div>
            <Button
              onClick={this.addAutore}
              variant="contained"
              style={{
                color: "whitesmoke",
                backgroundColor: "#006ddb",
                marginTop: "10px",
                marginBottom: "30px",
              }}
            >
              Inserisci Autore
            </Button>
          </Form>
          {this.state.error && <Alert color="danger">{this.state.error}</Alert>}
          <Form>
            <div>
              <TextField
                variant="outlined"
                type="text"
                name="autore"
                id="autore"
                label="Autore"
                value={this.state.autore}
                onChange={this.changeHandler}
                style={{ marginTop: "10px", marginBottom: "10px" }}
              />
            </div>
            <div>
              <TextField
                variant="outlined"
                type="text"
                name="idLibro"
                id="idLibro"
                label="Libro"
                value={this.state.idLibro}
                onChange={this.changeHandler}
                style={{ marginTop: "10px", marginBottom: "10px" }}
              />
            </div>
            <Button
              onClick={this.associaAutore}
              variant="contained"
              style={{
                color: "whitesmoke",
                backgroundColor: "#006ddb",
                marginTop: "10px",
                marginBottom: "30px",
              }}
            >
              Aggiungi Autore
            </Button>
          </Form>
          {this.state.error && <Alert color="danger">{this.state.error}</Alert>}
          <div>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Anno
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => this.setState({ anno: 2019 })}
                  key={"anno0"}
                >
                  2019
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => this.setState({ anno: 2020 })}
                  key={"anno1"}
                >
                  2020
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => this.setState({ anno: 2021 })}
                  key={"anno2"}
                >
                  2021
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Button
              onClick={this.getGrafico}
              variant="contained"
              style={{
                color: "whitesmoke",
                backgroundColor: "#006ddb",
                marginTop: "10px",
                marginBottom: "30px",
              }}
            >
              Visualizza grafico
            </Button>
          </div>
          <div>
            <Bar
              data={this.state.grafico}
              options={{ maintainAspectRatio: false }}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default Dashboard;
