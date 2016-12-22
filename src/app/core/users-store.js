import { URL as ApiUrl } from '../config/api';
import ReactHttp from './react-http';

export class UsersStore {

  getCurrentUser() {
    return ReactHttp.fetch(`${ApiUrl}collaborator/me`)
    .then(function (response) {
      return response.json();
    });
  }

}

export default new UsersStore();
