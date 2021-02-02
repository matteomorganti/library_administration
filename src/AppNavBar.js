import React, { Component } from 'react';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavbarText, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

import { withRouter } from 'react-router-dom';

import AuthenticationService from './AuthenticationService';

class AppNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {isOpen: false};
    this.toggle = this.toggle.bind(this);

    this.state = {
      login: false
    };
  }

  componentDidMount() {
    const user = AuthenticationService.getCurrentUser();

    if (user) {
      const roles = [];

      user.authorities.forEach(authority => {
        roles.push(authority.authority)
      });
  
      this.setState({
        login: true,
      });
    }
  }

  logOut = () => {
    AuthenticationService.logOut(); //da finire 
    window.location.reload();
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return <Navbar color="dark" dark expand="md">
      <Nav className="mr-auto">
      </Nav>
      <NavbarToggler onClick={this.toggle}/>
      <Collapse isOpen={this.state.isOpen} navbar>
        {
          this.state.login ? (
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="#" onClick={this.logOut}>Log out</NavLink>
              </NavItem>
            </Nav>                 
          ) : (
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/userLogin">Login</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/userRegister">Registrati</NavLink>
              </NavItem>
            </Nav>
          )
        }
      </Collapse>
    </Navbar>;
  }
}

export default withRouter(AppNavbar);