import {REDIRECTON403 as RedirectUrl} from '../config/api';

export class ReactHttp {

  checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response
    } else if(response.status === 403){
      window.location.hash = `#${RedirectUrl}`;
    } else {
      var error = new Error(response.statusText)
      error.response = response
      throw error
    }
  }

  fetch(endPointUrl, options) {
    if(!options){
      options = {}
    }
    options.credentials = 'include';
    return fetch(endPointUrl, options)
    .then(this.checkStatus);
  }
}


export default new ReactHttp();
