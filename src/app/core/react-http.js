import { REDIRECTON403 as RedirectUrl } from '../config/api';

export class ReactHttp {

  checkStatus(response) {

    var myResponse = new Object();

    if (response.status >= 200 && response.status < 300) {
      myResponse.isInError = false;
      myResponse.msg = "Success";
    } else if (response.status === 403) {
      window.location.hash = `#${RedirectUrl}`;
    } else {
      return response.json().then(body => {
          var myResponse = new Object();
          myResponse.isInError = true;
          myResponse.msg = body.message;
          return myResponse;
        });
    }

    return response;
  }

  fetch(endPointUrl, options) {
    if (!options) {
      options = {};
    }

    options.credentials = 'include';
    return fetch(endPointUrl, options)
    .then(this.checkStatus);
  }
}

export default new ReactHttp();
