import { URL as ApiUrl} from '../config/api';

export class SubjectsStore {

  getSubjects() {
    return fetch(`${ApiUrl}subjects/inprogress`)
    .then(function(response) {
      return response.json();
    });
  }

  getSubject(id) {
    return fetch(`${ApiUrl}subjects/${id}`)
    .then(function(response) {
      return response.json();
    });
  }

  createSubject(subject) {
    return fetch(`${ApiUrl}subjects/`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(subject)
    })
    .then(function(response) {
      const location= response.headers.get('location');
      const splittedLocation = location.split('/');
      return splittedLocation[splittedLocation.length -1];
    });;
  }

}

export default new SubjectsStore();

