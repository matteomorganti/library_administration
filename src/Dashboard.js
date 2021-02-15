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
import AuthenticationService from "./AuthenticationService";
import "./css/Dashboard.css";

class Dashboard extends Component {
  state = {
    user: [],
    book: [],
    genre: [],
    currGen: null,
    titolo: "",
    trama: "",
    quantita: "",
    cover: null,
    error: "",
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
          Genere: obj.Genere,
        }));
        this.setState({ book: libri });
      })
      .catch((error) => console.error(`Error:  ${error}`));
  };

  addNewLibro(titolo, trama, quantita, genere, copertina) {
    genere = this.state.currGen;
    copertina = new FormData();
    copertina.append("image", this.state.cover);
    let JWTToken = localStorage.getItem("token");
    axios
      .post(
        "http://g0ptrkwkej5fhqfl.myfritz.net:8090/api/upload/caricaLibro",
        {
          titolo: "Maxis",
          genere: 1,
          trama: "DFSFSDFFDS",
          copertina,
          quantita: 1,
        },
        {
          headers: {
            Authorization: `${JWTToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        console.log(JWTToken);
      })
      .catch((error) => console.error(`Error:  ${error}`));
    this.setState({ error: "Qualcosa è andato storto" });
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

  handleFile(e) {
    this.setState({ cover: e.target.files[0] });
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
                    <Dropdown.Item onClick={this.setGenere} key={genere.ID}>
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
        </div>
      </div>
    );
  }
}
export default Dashboard;
