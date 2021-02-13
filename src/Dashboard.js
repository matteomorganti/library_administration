import React, { Component } from "react";
import axios from "axios";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import HomeIcon from "@material-ui/icons/Home";
import BookIcon from "@material-ui/icons/Book";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonIcon from "@material-ui/icons/Person";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
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
      <div className="sidBar">
        <div className="sb">
          <List component="nav" aria-labelledby="nested-list-subheader">
            <ListItem button>
              <ListItemIcon>
                <HomeIcon className={"menuIcon"} />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <BookIcon className={"menuIcon"}/>
              </ListItemIcon>
              <ListItemText primary="Libri" />
            </ListItem>
            <ListItem button onClick={this.getUser}>
              <ListItemIcon>
                <PersonIcon className={"menuIcon"}/>
              </ListItemIcon>
              <ListItemText primary="Lista Utenti" />
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button onClick={this.doLogout}>
                  <ListItemIcon>
                    <ExitToAppIcon className={"menuIcon"}/>
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItem>
              </List>
            </Collapse>
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
        </div>
      </div>
    );
  }
}
export default Dashboard;
