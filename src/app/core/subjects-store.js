import { URL as ApiUrl } from '../config/api';
import ReactHttp from './react-http';

export class SubjectsStore {

  getSubjects() {
    return ReactHttp.fetch(`${ApiUrl}subjects/`)
    .then(response => response.json());
  }

  getSubject(id) {
    return ReactHttp.fetch(`${ApiUrl}subjects/${id}`)
    .then(response => response.json());
  }

  createSubject(subject) {
    subject.collaboratorId = window.localStorage.getItem('user');
    return ReactHttp.fetch(`${ApiUrl}subjects/`, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(subject),
    }).then(function (response) {
      if (!response.isInError) {
        const location = response.headers.get('location');
        const splittedLocation = location.split('/');
        response.subjectId = splittedLocation[splittedLocation.length - 1];
      }

      return response;
    });
  }
}

export default new SubjectsStore();
