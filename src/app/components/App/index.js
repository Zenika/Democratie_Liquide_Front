import React, { Component } from 'react';

import {
  PageHeader,
  Grid,
  Row
} from 'react-bootstrap';

import ZNavbar from '../Navbar';
import SubjectsList from './SubjectsList';

import './index.scss';

export default class App extends Component {

  render() {
    return (
      <div>
        <ZNavbar />
        <Grid>
          <Row >
            <PageHeader>ZDemocracy</PageHeader>
            {this.props.children}
          </Row>
        </Grid>
      </div>
    );
  }
}
