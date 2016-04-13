import React, { Component, PropTypes } from 'react';
import {googleResponsType as responseType,
        googleClientId as clientId,
        googleRedirectUri as redirectUri,
        googleScope as scope} from '../../../config/api';
import {
  Button,
} from 'react-bootstrap';



//import './index.scss';

export default class Portal extends Component {



  getGoogleUrl(){
    return '/signin/google';
  }

  render() {
    return (
      <div>
        <form method="POST" action={this.getGoogleUrl()}>
          <input type="submit" value="Authenticate by google"/>
        </form>
      </div>
    );
  }
}
