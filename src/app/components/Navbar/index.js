import React, { Component } from 'react';
import {
  Navbar,
  Nav,
  NavItem,
  Button,
  Glyphicon
} from 'react-bootstrap';

import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router';

import './index.scss';

export default class ZNavbar extends Component {

  render() {
    return (

      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">
              <img src="images/favicons/favicon-32x32.png" />
              ZDemocracy
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
      </Navbar>
    );
  }
}
