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
        collaborateurIdTo:delegatingTo,
      })
    })
  }

  removePower(subject) {
    return ReactHttp.fetch(`${ApiUrl}powers/${subject.uuid}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    });
  }

}

export default new PowersStore();
