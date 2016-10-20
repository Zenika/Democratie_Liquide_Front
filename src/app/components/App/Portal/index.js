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
  ControlLabel,
  Button,
  Panel
} from 'react-bootstrap';

import './index.scss';

export default class Portal extends Component {

  getGoogleUrl() {
    return '/signin/google';
  }

  render() {

    function FieldGroup({ id, label, ...props }) {
      return (
        <FormGroup controlId={id}>
          <ControlLabel>{label}</ControlLabel>
          <FormControl {...props} />
        </FormGroup>
      );
    }

    return (
      <Grid>
        <Row>
          <Col md={6} xsOffset={3}>
            <form method="POST" action={this.getGoogleUrl()}>
              <FormGroup bsSize="large" >
                <FormControl type="submit"
                  value="Authenticate with google"
                  className="google-button"
                />
              </FormGroup>
            </form>
            <Panel>
              <form>
                <FieldGroup
                  id="formControlsEmail"
                  type="email"
                  label="Email address"
                  placeholder="Enter email"
                />
                <FieldGroup
                  id="formControlsPassword"
                  label="Password"
                  type="password"
                />
                <Button type="submit">
                  Submit
                </Button>
              </form>
            </Panel>
          </Col>
        </Row>
      </Grid>
    );
  }
}
