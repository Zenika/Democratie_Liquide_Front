import React, { Component } from 'react';
import { 
  Navbar,
  Nav,
  NavItem
} from 'react-bootstrap';

import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router';

export default class ZNavbar extends Component {

  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">ZDemocracy</Link>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <LinkContainer to={{ pathname: '/about' }} >
            <NavItem>about</NavItem>
          </LinkContainer>
        </Nav>
      </Navbar>
    );
  }
}
