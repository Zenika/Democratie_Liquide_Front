import React, { Component, PropTypes } from 'react';
import {
  googleResponsType as responseType,
  googleClientId as clientId,
  googleRedirectUri as redirectUri,
  googleScope as scope
} from '../../../config/api';
import {
  Grid,
  Row,
  Col,
  FormGroup,
  FormControl,
} from 'react-bootstrap';

import './index.scss';

export default class Portal extends Component {

  getGoogleUrl() {
    return '/signin/google';
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col md={6} xsOffset={3}>
            <form method="POST" action={this.getGoogleUrl()}>
              <FormGroup bsSize="large" >
                <FormControl type="submit"
                  value="Authenticate by google"
                  className="google-button"
                />
              </FormGroup>
            </form>
          </Col>
        </Row>
      </Grid>
    );
  }
}
