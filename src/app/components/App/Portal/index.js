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
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
  Panel
} from 'react-bootstrap';

import authStore from '../../../core/auth-store';
import './index.scss';

export default class Portal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      methods: [],
      email: '',
      password: ''
    };
  }

  componentDidMount() {
    this.refreshData();
  }

  refreshData() {
    authStore.getAuthMethods().then(methods => {
      this.setState({
        methods: methods
      });
    });
  }

  handleChange(field, value) {
    this.setState({ [field]: value });
  }

  handleEvent(e, field) {
    this.handleChange(field, e.target.value);
  }

  submitForm(e) {
    e.preventDefault();
    const {
      email,
      password
    } = this.state;
    authStore.login(email, password)
    .then((response) => {
      this.context.router.push(`/`);
    });
  }

  getGoogleUrl() {
    return '/signin/google';
  }

  render() {

    const {
      methods
    } = this.state;

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
            {methods.GOOGLE_AUTH ?
            <form method="POST" action={this.getGoogleUrl()}>
              <FormGroup bsSize="large" >
                <FormControl type="submit"
                  value="Authenticate with google"
                  className="google-button"
                />
              </FormGroup>
            </form>
            : null }
            {methods.FORM_AUTH ?
            <Panel>
              <Form onSubmit={e => this.submitForm(e)}>
                <ControlLabel>
                  Adresse email
                </ControlLabel>
                <FormControl
                  value={this.state.email}
                  onChange={ e => this.handleEvent(e, 'email') }
                  type="email"
                  label="Adresse email"
                  placeholder="Entrez votre email..."
                />
                  <ControlLabel>
                    Mot de passe
                  </ControlLabel>
                  <FormControl
                    value={this.state.password}
                    onChange={ e => this.handleEvent(e, 'password') }
                    type="password"
                    label="Mot de passe"
                    placeholder="Entrez votre mot de passe..."
                  />
                <Button type="submit">
                  Submit
                </Button>
              </Form>
            </Panel>
            : null }
          </Col>
        </Row>
      </Grid>
    );
  }
}
Portal.contextTypes = {
  router: PropTypes.object.isRequired,
};
