import { PropTypes } from 'react';
import { URL as ApiUrl} from '../config/api';
import ReactHttp from './react-http';

export class AuthStore {

  getAuthMethods() {
    return ReactHttp.fetch(`signin/methods`)
    .then(function(response) {
      return response.json();
    });
  }

  login(email, password) {

    // login data has to be form encoded
    var formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    return ReactHttp.fetch(`signin/form`, {
      method: 'post',
      body: formData,
    }).then(function (response) {
      return response;
    });
  }

}

export default new AuthStore();
