import {REDIRECTON403 as RedirectUrl} from '../config/api';

export class ReactHttp {

  checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response
    } else {
      var error = new Error(response.statusText)
      error.response = response
      throw error
    }
  }

  fetch(endPointUrl, options) {
    var user = window.localStorage.getItem('user');
    if(!user){
      window.location.hash = `#${RedirectUrl}`;
    }
    return fetch(endPointUrl, options)
    .then(this.checkStatus);
  }
}


export default new ReactHttp();
