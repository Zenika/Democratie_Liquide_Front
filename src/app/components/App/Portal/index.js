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
    return `https://accounts.google.com/o/oauth2/v2/auth?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
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
          <a href={this.getGoogleUrl()}>GO GO GOOGLE I CHOOSE YOU</a> :
          <div> Connexion réussie, redirection </div>
        }
      </div>
    );
  }
}
