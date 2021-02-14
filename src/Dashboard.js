/* eslint-disable react/no-string-refs */
import React, { Component } from "react";
import axios from "axios";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
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
import FormControl from "@material-ui/core/FormControl";
import Paper from "@material-ui/core/Paper";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import AuthenticationService from "./AuthenticationService";
import "./css/Dashboard.css";

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

  addNewLibro(titolo, data, quantita, copertina, genere) {
    let JWTToken = localStorage.getItem("token");
    axios
      .post("http://g0ptrkwkej5fhqfl.myfritz.net:8090/api/upload/caricaLibro", {
        titolo,
        data,
        quantita,
        copertina,
        genere,
        headers: { Authorization: `${JWTToken}` },
      })
      .then((response) => {
        console.log(response.data);
        console.log(JWTToken);
      })
      .catch((error) => console.error(`Error:  ${error}`));
    this.setState({ error: "Qualcosa è andato storto" });
  }

  doAddNewLibro = async (event) => {
    event.preventDefault();
    this.addNewLibro(
      this.state.titolo,
      this.state.data,
      this.state.quantita,
      this.state.copertina,
      this.state.genere
    ).then(
      () => {
        console.log(response.data);
      },
      (error) => {
        console.log("Uploading fail error = { " + error.toString() + " }");
        this.setState({ error: "Inserimento non riuscito" });
      }
    );
  };

  doLogout = async (event) => {
    event.preventDefault();
    AuthenticationService.logOut();
    this.props.history.push("/userLogin");
  };

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
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.book.map((libro) => (
                    <TableRow key="book">
                      <TableCell>{libro.ID}</TableCell>
                      <TableCell>{libro.Titolo}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <FormControl
            noValidate
            autoComplete="off"
            onSubmit={this.doAddNewLibro}
          >
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
                name="data"
                id="data"
                placeholder="GG/MM/AAAA"
                label="Data"
                value={this.state.data}
                autoComplete="data"
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
                style={{ marginTop: "10px", marginBottom: "10px" }}
              />
            </div>
            <div>
              <Button
                variant="contained"
                component="label"
                style={{
                  backgroundColor: "white",
                  marginTop: "10px",
                  marginBottom: "30px",
                }}
              >
                Carica Copertina
                <input type="file" hidden />
              </Button>
            </div>
            <div>
              <TextField
                variant="outlined"
                type="text"
                name="genere"
                id="genere"
                label="Genere"
                value={this.state.genere}
                autoComplete="genere"
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
                marginBottom: "30px",
              }}
            >
              Invia
            </Button>
          </FormControl>
        </div>
      </div>
    );
  }
}
export default Dashboard;
