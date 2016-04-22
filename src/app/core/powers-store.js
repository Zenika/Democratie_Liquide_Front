import { URL as ApiUrl} from '../config/api';
import ReactHttp from './react-http';

export class PowersStore {

  givePower(subject, delegatingTo) {
    return ReactHttp.fetch(`${ApiUrl}powers/${subject.uuid}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        collaboratorIdTo:delegatingTo,
      })
    }).then(function(response) {
      return response;
    });
  }

  removePower(subject) {
    return ReactHttp.fetch(`${ApiUrl}powers/${subject.uuid}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(function(response) {
      return response;
    });
  }

}

export default new PowersStore();
