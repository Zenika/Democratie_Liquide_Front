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
              <h1>
                <img src="images/favicons/favicon-32x32.png"/>
                ZDemocracy
              </h1>
            </Link>
          </Navbar.Brand>
        </Navbar.Header>
      </Navbar>
    );
  }
}
