import { URL as ApiUrl } from '../config/api';
import wording from '../config/wording';
import ReactHttp from './react-http';

export class CategoriesStore {

  getCategories() {
    return ReactHttp.fetch(`${ApiUrl}categories`)
    .then(function (response) {
      if (response.status === 204) {
        return [];
      }

      return response.json();
    });
  }

  getCategory(id) {
    return ReactHttp.fetch(`${ApiUrl}categories/${id}`)
    .then(function (response) {
      return response.json();
    });
  }

  createCategory(category) {
    if (category.title === wording.noCategory || category.title === wording.allCategories) {
      return new Promise(function (resolve, reject) {
        resolve({
          isInError: true,
          msg: "Ce nom de catégorie n'est pas autorisé ;)",
        });
      });
    }

    return ReactHttp.fetch(`${ApiUrl}categories`, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(category),
    }).then(function (response) {
      if (response.isInError == false) {
        const location = response.headers.get('location');
        const splittedLocation = location.split('/');
        response.categoryId = splittedLocation[splittedLocation.length - 1];
      }

      return response;
    });
  }

}

export default new CategoriesStore();
