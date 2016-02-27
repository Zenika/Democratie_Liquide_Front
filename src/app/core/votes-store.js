import { URL as ApiUrl} from '../config/api';

export class VotesStore {

  voteFor(subjectId, propositionId, points = 1) {
    const requestBody = {
      choices: [
        {
          proposition: {
            id: propositionId
          },
          points : points
        }
      ]
    };

    return fetch(`${ApiUrl}votes/${subjectId}`, {
      method: 'put',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });
  }

}

export default new VotesStore();

