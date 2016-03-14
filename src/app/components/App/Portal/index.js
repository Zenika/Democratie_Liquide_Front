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
    return 'http://localhost:8080/signin/google';
  }

  getToken(){
    if(!this.props.params.token){
      return false;
    }else{
      return fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${this.props.params.token}`).then(function(response){
        return response.json();
      }).then(function(response){
        window.localStorage.setItem('user',response.email);
        window.location.hash = '#/';
      })
    }
  }

  render() {
    return (
      <div>
        {!this.getToken() ?
          <form method="POST" action={this.getGoogleUrl()}>
            <input type="submit" value="Authenticate by google"/>
          </form> :
          <div> Connexion réussie, redirection </div>
        }
      </div>
    );
  }
}
