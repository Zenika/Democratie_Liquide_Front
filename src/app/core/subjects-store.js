import { URL as ApiUrl} from '../config/api';
import ReactHttp from './react-http';

export class SubjectsStore {

  getSubjects() {
    return ReactHttp.fetch(`${ApiUrl}subjects/inprogress`)
    .then(function(response) {
      if (response.status === 204) {
        return [];
      }
      return response.json();
    });
  }

  getSubject(id) {
    return ReactHttp.fetch(`${ApiUrl}subjects/${id}`)
    .then(function(response) {
      return response.json();
    });
  }

  createSubject(subject) {
    subject.collaborateurId = window.localStorage.getItem('user');
    return ReactHttp.fetch(`${ApiUrl}subjects/`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(subject)
    }).then(function(response) {
      const location= response.headers.get('location');
      const splittedLocation = location.split('/');
      return splittedLocation[splittedLocation.length -1];
    });
  }

}

export default new SubjectsStore();
